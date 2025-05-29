import React, { useState, useEffect, useCallback, useId } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortMode,
  setPokemonListByPageIndex,
  fetchPokedex,
  fetchPokemonDataById,
} from "../../store/pokedex.store";
import type { RootState, AppDispatch } from "../../store";
import "./PokemonTile.scss";

interface IPokemonTileProps {
  pokemonId: number;
  name: string;
  spritImgUri: string;
  isLoaded: boolean;
}
export default function PokemonTile({
  pokemonId,
  spritImgUri,
  name,
  isLoaded,
}: IPokemonTileProps) {
  const dispatch: AppDispatch = useDispatch();

  // Check if a specific pokemon data is loaded
  // So we won't need to refetch its sprite data
  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchPokemonDataById(pokemonId));
    }
  }, [isLoaded]);

  return (
    <div className="pokemon-tile-card">
      <div className="pokemon-sprite-wrapper">
        <Image
          className="pokemon-sprite-image"
          src={spritImgUri}
          alt={name}
          width="72"
          height="72"
        />
        <div className="sprite-background"></div>
      </div>
      <div className="pokemon-name-container">{name}</div>
    </div>
  );
}
