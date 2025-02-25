import { createContext, useEffect, useState } from "react";
// import { songsData } from "../assets/frontend-assets/assets";
import axios from "axios";

import { url } from "../App";

export const SearchContext = createContext();

const SearchContextProvider = (props) => {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState({
    songs: [],
    albums: [],
    artists: [],
  });
  const [songs, setSongs] = useState([]);
  const [album, setAlbum] = useState(null);
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);

  const getAlbumSongs = async (album) => {
    try {
      const { data } = await axios.get(
        `${url}/api/song/get-album-songs/?albumId=${album?._id}`
      );

      setAlbum(album);

      setSongs((prev) => [
        ...prev,
        ...data.songs.filter(
          (song) => !prev.some((existingSong) => existingSong._id === song._id)
        ),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const getArtistSongs = async (artistId) => {
    try {
      const { data } = await axios.get(
        `${url}/api/song/get-artist-songs/?artistId=${artistId}`
      );
      const filtered = results.artists.filter(
        (artist) => artist._id === artistId
      );
      setArtist(filtered[0]);

      setSongs((prev) => [
        ...prev,
        ...data.songs.filter(
          (song) => !prev.some((existingSong) => existingSong._id === song._id)
        ),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const getAlbumsByArtist = async (id) => {
    try {
      const res = await axios.get(`${url}/api/album/by-artist/?artist=${id}`);
      const newAlbums = res.data.albums;
      setAlbums((prevAlbums) => {
        const mergedAlbums = newAlbums.filter(
          (newAlbum) =>
            !prevAlbums.some(
              (existingAlbum) => existingAlbum._id === newAlbum._id
            )
        );

        return [...prevAlbums, ...mergedAlbums];
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const search = async (query) => {
      try {
        const { data } = await axios.get(
          `${url}/api/search/all/?query=${query}`
        );

        setResults(data);
        setSongs((prev) => [
          ...prev,
          ...data.songs.filter(
            (song) =>
              !prev.some((existingSong) => existingSong._id === song._id)
          ),
        ]);

        const newAlbums = data.albums;
        setAlbums((prevAlbums) => {
          const mergedAlbums = newAlbums.filter(
            (newAlbum) =>
              !prevAlbums.some(
                (existingAlbum) => existingAlbum._id === newAlbum._id
              )
          );

          return [...prevAlbums, ...mergedAlbums];
        });
      } catch (error) {
        console.log(error);
      }
      if (!query) {
        setResults({
          songs: [],
          albums: [],
          artists: [],
        });
      }
    };

    if (query) {
      search(query);
    }
  }, [query]);

  const contextValue = {
    query,
    setQuery,
    results,
    getArtistSongs,
    getAlbumSongs,
    getAlbumsByArtist,
    album,
    songs,
    artist,
    albums,
  };
  return (
    <SearchContext.Provider value={contextValue}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
