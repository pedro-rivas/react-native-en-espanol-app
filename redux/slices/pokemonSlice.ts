import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  pokemons: [],
  explorePokemons: [],
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemons: (state, action: PayloadAction<{ pokemons: any[]}>) => {
      state.pokemons = action.payload.pokemons;
      state.explorePokemons = action.payload.pokemons.filter((_, index) => index < 10);
    },
    deletePokemon: (state, action: PayloadAction<{ name: string }>) => {
      state.pokemons = state.pokemons.filter(pokemon => pokemon.name !== action.payload.name);
      state.explorePokemons = state.explorePokemons.filter(pokemon => pokemon.name !== action.payload.name);
    }
  },
});

export const { setPokemons, deletePokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
