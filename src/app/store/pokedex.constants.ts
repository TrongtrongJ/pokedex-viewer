export const basePokeApiUri = process.env.NEXT_PUBLIC_POKEAPI_BASE_URI;
export const placeholderImageUri = "/images/pokeball.svg";

export interface Pokemon {
  id: number;
  name: string;
  spriteImgUri: string;
  // Specify if each pokemon data (sprite) is fetched
  isLoaded: boolean;
}

export const sortMode = ["byId", "byName"] as const;
export type SortMode = (typeof sortMode)[number];

export interface PokedexState {
  isLoading: boolean;
  errorText: string | null;
  sortMode: SortMode;
  currentPageIndex: number;
  pokemonsPerPage: number;
  totalPokemons: number;
  totalPages: number;
  pokemonMetadata: Pokemon[];
  currentPokemonList: Pokemon[];
  isNextPageEnabled: boolean;
  isPreviousPageEnabled: boolean;
}

export const initialPokedexState: Readonly<PokedexState> = {
  isLoading: false,
  errorText: null,
  sortMode: "byId",
  currentPageIndex: 0,
  pokemonsPerPage: 12,
  totalPokemons: 0,
  totalPages: 0,
  pokemonMetadata: [],
  currentPokemonList: [],
  isNextPageEnabled: false,
  isPreviousPageEnabled: false,
};

export interface PokedexResItem {
  name: string;
  url: string;
}
export interface PokedexResponse {
  count: number;
  results: PokedexResItem[];
}

export interface PokemonDataResponse {
  name: string;
  sprites: {
    front_default: string;
  };
}
