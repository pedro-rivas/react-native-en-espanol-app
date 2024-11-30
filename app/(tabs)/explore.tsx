import { useAppSelector, } from "@/redux/hooks";
import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Image,
} from "react-native";
import { Text, } from "react-native-paper";

interface Pokemon {
  name: string;
  url: string;
  image: string;
}

const ExploreScreen = () => {
  const { explorePokemons } = useAppSelector((state) => state.pokemon);

  const renderItem = ({ item }: { item: Pokemon }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.pokemonName}>{item.name}</Text>
      <Image source={{ uri: item.image }} style={styles.pokemonImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={explorePokemons}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  itemContainer: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    alignItems: "center",
    borderColor: "#dddddd",
    borderWidth: 1,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
});

export default ExploreScreen;
