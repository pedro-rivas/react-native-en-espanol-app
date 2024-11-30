import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Image, Touchable, TouchableOpacity } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { setPokemons, deletePokemon } from '@/redux/slices/pokemonSlice';
import Animated, { LinearTransition } from 'react-native-reanimated';

export interface Pokemon {
  name: string;
  url: string;
  image: string;
}

const fetchPokemonList = async (): Promise<Pokemon[]> => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
    const data = await response.json();
    return data.results.map((pokemon: { name: string; url: string }) => ({
      name: pokemon.name,
      url: pokemon.url,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        pokemon.url.split('/')[6]
      }.png`,
    }));
  } catch (error) {
    throw new Error('Failed to fetch Pokémon');
  }
};

const PokemonListScreen = () => {

  const dispatch = useAppDispatch();
  const { pokemons } = useAppSelector(state => state.pokemon);

  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadPokemonList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPokemonList();
      dispatch(setPokemons({ pokemons: data }));
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPokemonList().finally(() => setRefreshing(false));
  }, [loadPokemonList]);

  useEffect(() => {
    loadPokemonList();
  }, [loadPokemonList]);

  const renderItem = ({ item }: { item: Pokemon }) => (
    <Animated.View layout={LinearTransition}>
      <TouchableOpacity style={styles.itemContainer} onLongPress={()=>{
        dispatch(deletePokemon({ name: item.name }));
      }}>
        <Text style={styles.pokemonName}>{item.name}</Text>
        <Image source={{ uri: item.image }} style={styles.pokemonImage} />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} size="large" color="#0061fe" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={pokemons}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#0061fe']} />
          }
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  itemContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
    borderColor: '#dddddd',
    borderWidth: 1,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default PokemonListScreen;