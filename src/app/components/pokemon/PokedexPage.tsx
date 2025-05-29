"use client";
import React, { useState, useEffect, useCallback, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortMode,
  setPokemonListByPageIndex,
  fetchPokedex,
  navigateToPreviousPage,
  navigateToNextPage,
} from "../../store/pokedex.store";
import type { SortMode } from "../../store/pokedex.constants";
import type { RootState, AppDispatch } from "../../store";
import "./PokedexPage.scss";

import PokemonTile from "./PokemonTile";

export default function PokedexPage() {
  const dispatch: AppDispatch = useDispatch();

  const {
    isLoading,
    sortMode,
    currentPageIndex,
    totalPages,
    currentPokemonList,
  } = useSelector((state: RootState) => state.pokedex);

  const [isPreviousPageEnabled, setIsPreviousPageEnabled] = useState(false);
  const [isNextPageEnabled, setIsNextPageEnabled] = useState(false);

  useEffect(() => {
    setIsNextPageEnabled(currentPageIndex < totalPages - 1 ? true : false);
    setIsPreviousPageEnabled(currentPageIndex > 0 ? true : false);
  }, [currentPageIndex, totalPages]);

  const sortByNameInputId = useId();
  const sortByIdInputId = useId();

  const setSortModeHandler = useCallback((mode: SortMode) => {
    dispatch(setSortMode(mode));
  }, []);

  const nextPageNavHandler = useCallback(() => {
    if (isNextPageEnabled) dispatch(navigateToNextPage());
  }, [currentPageIndex, isNextPageEnabled]);

  const prevPageNavHandler = useCallback(() => {
    if (isPreviousPageEnabled) dispatch(navigateToPreviousPage());
  }, [currentPageIndex, isPreviousPageEnabled]);

  useEffect(() => {
    dispatch(fetchPokedex(true));
  }, []);

  useEffect(() => {
    dispatch(setPokemonListByPageIndex(currentPageIndex + 1));
  }, [currentPageIndex, sortMode]);

  return (
    <div className="pokedex-outer-container">
      <div className="pokedex-inner-container">
        <div className="pokedex-page-title-row">
          <div className="pokedex-title">
            <h1>All The Pokemon!</h1>
          </div>
          <div className="pokedex-sort-mode-panel">
            <input
              type="radio"
              id={sortByNameInputId}
              name="sort_by_name"
              value="byName"
              onChange={(e) => setSortModeHandler(e.target.value as SortMode)}
              checked={sortMode === "byName"}
              disabled={isLoading}
            />
            <label htmlFor={sortByNameInputId}> Sort Name </label>
            <input
              type="radio"
              id={sortByIdInputId}
              name="sort_by_id"
              value="byId"
              onChange={(e) => setSortModeHandler(e.target.value as SortMode)}
              checked={sortMode === "byId"}
              disabled={isLoading}
            />
            <label htmlFor={sortByIdInputId}> Sort ID </label>
          </div>
        </div>

        <div className="pokemon-tiles-container">
          {currentPokemonList &&
            currentPokemonList.map((p) => (
              <PokemonTile
                key={`pokemon-${p.id}`}
                pokemonId={p.id}
                name={p.name}
                spritImgUri={p.spriteImgUri}
                isLoaded={p.isLoaded}
              ></PokemonTile>
            ))}
        </div>

        <div className="pokedex-navigation-panel">
          <button
            type="button"
            disabled={!isPreviousPageEnabled}
            onClick={prevPageNavHandler}
          >
            Previous 12
          </button>
          <button
            type="button"
            disabled={!isNextPageEnabled}
            onClick={nextPageNavHandler}
          >
            Next 12
          </button>
        </div>
      </div>
    </div>
  );
}
