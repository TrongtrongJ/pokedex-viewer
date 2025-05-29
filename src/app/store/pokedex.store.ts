import {
  createSlice,
  PayloadAction,
  Reducer,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  Pokemon,
  PokedexState,
  SortMode,
  basePokeApiUri,
  placeholderImageUri,
  initialPokedexState,
  PokedexResponse,
  PokemonDataResponse,
} from "./pokedex.constants.ts";
import type { AppDispatch } from "./index";

export const pokedexSlice = createSlice({
  name: "pokedex",
  initialState: initialPokedexState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.errorText = action.payload;
    },
    setSortMode: (state, action: PayloadAction<SortMode>) => {
      const newSortMode = action.payload;
      state.sortMode = newSortMode;
      state.currentPageIndex = 0;
      state.pokemonMetadata = state.pokemonMetadata.sort((a, b) => {
        return newSortMode === "byId"
          ? a.id - b.id
          : a.name.localeCompare(b.name);
      });
    },
    setPokemonListByPageIndex: (state, action: PayloadAction<number>) => {
      const { currentPageIndex, pokemonsPerPage } = state;
      const pokemonIndexOffset =
        currentPageIndex === 0 ? 0 : pokemonsPerPage * currentPageIndex;
      const pokemonIndexTo = pokemonIndexOffset + pokemonsPerPage;
      state.currentPokemonList = state.pokemonMetadata.slice(
        pokemonIndexOffset,
        pokemonIndexTo
      );
    },
    resyncPageNavAvailability: (state) => {
      // resync page nav buttons,
      // disable a corresponding button if there's no next/prev page
      const isNextPageAvailable = state.totalPages - 1 > state.currentPageIndex;
      state.isNextPageEnabled = isNextPageAvailable;
      const isPrevPageAvailable = state.currentPageIndex > 0;
      state.isPreviousPageEnabled = isPrevPageAvailable;
    },
    navigateToNextPage: (state) => {
      state.currentPageIndex += 1;
    },
    navigateToPreviousPage: (state) => {
      state.currentPageIndex -= 1;
    },
  },
  // Cases for operations from 'reateAsyncThunk',
  // it's kinda messy since this is the very first time I try this ('createAsyncThunk'),
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokedex.pending, (state) => {
        state.isLoading = true;
        state.errorText = null;
      })
      .addCase(fetchPokedex.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          const totalPokemons = action.payload.length;
          state.pokemonMetadata = action.payload.map((p, idx) => ({
            id: idx + 1,
            name: p.name,
            spriteImgUri: placeholderImageUri,
            isLoaded: false,
          }));
          state.totalPokemons = totalPokemons;
          state.totalPages = Math.ceil(totalPokemons / state.pokemonsPerPage);
          state.currentPageIndex = 0;
          state.currentPokemonList = state.pokemonMetadata.slice(
            0,
            state.pokemonsPerPage
          );
          state.isNextPageEnabled = true;
          state.isPreviousPageEnabled = false;
        }
      })
      .addCase(fetchPokedex.rejected, (state, action) => {
        state.isLoading = false;
        state.errorText = action.payload as string;
      })
      .addCase(fetchPokemonDataById.fulfilled, (state, action) => {
        const pokemonData = action.payload;
        if (pokemonData) {
          // Sync both pokemon metadata and pokemon data on current page
          const { id, spriteImgUri } = pokemonData;
          state.pokemonMetadata = state.pokemonMetadata.map((p) => {
            const isTargetPokemon = p.id === id;
            return {
              ...p,
              ...(isTargetPokemon && { isLoaded: true, spriteImgUri }),
            };
          });
          state.currentPokemonList = state.currentPokemonList.map((p) => {
            const isTargetPokemon = p.id === id;
            return {
              ...p,
              ...(isTargetPokemon && { isLoaded: true, spriteImgUri }),
            };
          });
        }
      });
  },
});

export const {
  setLoading,
  setError,
  setSortMode,
  setPokemonListByPageIndex,
  navigateToNextPage,
  navigateToPreviousPage,
  resyncPageNavAvailability,
} = pokedexSlice.actions;

// Since Pokeapi doesn't support name search, and the data is relatively light,
// Frontend pagination might be suitable for the scope of this project.
export const fetchPokedex = createAsyncThunk(
  "pokedex/fetchPokedex",
  async (fetchAll: boolean, { rejectWithValue, signal }) => {
    try {
      const response = await fetch(`${basePokeApiUri}/pokemon?limit=10000`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const data = (await response.json()) as PokedexResponse;

      return data.results;
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          return rejectWithValue("Fetching pokedex cancelled");
        }
        return rejectWithValue(err.message);
      }
    }
  }
);

// Pokedex data doesn't provide pokemon sprites,
// they have to be fetched one by one.
export const fetchPokemonDataById = createAsyncThunk(
  "pokedex/fetchPokemonDataById",
  async (pokemonId: number, { rejectWithValue, signal }) => {
    try {
      const response = await fetch(`${basePokeApiUri}/pokemon/${pokemonId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const data = (await response.json()) as PokemonDataResponse;

      return {
        id: pokemonId,
        spriteImgUri: data.sprites.front_default,
      };
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          return rejectWithValue(pokemonId);
        }
        return rejectWithValue(pokemonId);
      }
    }
  }
);

export const reducer: Reducer<PokedexState> = pokedexSlice.reducer;

export default pokedexSlice.reducer as Reducer<PokedexState>;
