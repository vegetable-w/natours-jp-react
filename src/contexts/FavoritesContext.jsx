/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

import { useUser } from "../contexts/GlobalState";
import {
  addFavoriteToBackend,
  removeFavoriteFromBackend,
  getMyFavorites,
} from "../api/favorites";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const user = useUser();

  const fetchAndSetFavorites = async (
    userId,
    setLoading = () => {},
    setError = () => {}
  ) => {
    try {
      setLoading(true);
      const fetchedFavorites = await getMyFavorites(userId);
      setFavorites(fetchedFavorites);
      setError(null);
    } catch (err) {
      setError("Failed to fetch tours");
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (tour) => {
    if (!favorites.find((f) => f.id === tour.id)) {
      setFavorites([...favorites, tour]);
      try {
        await addFavoriteToBackend({ userId: user._id, tour });
      } catch (error) {
        console.error("Error adding favorite:", error);
        setFavorites(favorites.filter((f) => f.id !== tour.id));
      }
    }
  };

  const removeFavorite = async (tourId) => {
    const originalFavorites = [...favorites];
    setFavorites(favorites.filter((tour) => tour.id !== tourId));
    try {
      await removeFavoriteFromBackend({ userId: user._id, tourId });
    } catch (error) {
      console.error("Error removing favorite:", error);
      setFavorites(originalFavorites);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, fetchAndSetFavorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
