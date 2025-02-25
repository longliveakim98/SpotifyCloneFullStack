import { createContext, useContext, useEffect, useRef, useState } from "react";
// import { songsData } from "../assets/frontend-assets/assets";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const { user } = useContext(AuthContext);
  const url = import.meta.env.VITE_BASE_URL;

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [artistsData, setArtistsData] = useState([]);
  const [artistData, setArtistData] = useState([]);
  const [track, setTrack] = useState(null);

  const [userPlaylists, setUserPlaylists] = useState([]);
  const [playlistData, setPlaylistData] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isSongDisplay, setIsSongDisplay] = useState(false);
  const [hasUpdatedPlayCount, setHasUpdatedPlayCount] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };
  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const playWithId = async (id) => {
    await songsData.map((item) => {
      if (id === item._id) {
        setTrack(item);
        setIsSongDisplay(true);
      }
    });
    await audioRef.current.play();
    setIsPlaying(true);
  };

  const previous = async () => {
    songsData.map(async (item, i) => {
      if (track._id === item._id && i > 0) {
        setTrack(songsData[i - 1]);
        await audioRef.current.play();
        setIsPlaying(true);
      }
    });
  };
  const next = async () => {
    songsData.map(async (item, i) => {
      if (track._id === item._id && i < songsData.length) {
        await setTrack(songsData[i + 1]);
        await audioRef.current.play();
        setIsPlaying(true);
      }
    });
  };

  const seekSong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  const getSongsData = async () => {
    try {
      const res = await axios.get(`${url}/api/song/list`);
      setSongsData(res.data.songs);
      setTrack(res.data.songs[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const getAlbumsData = async () => {
    try {
      const res = await axios.get(`${url}/api/album/list`);
      setAlbumsData(res.data.albums);
    } catch (err) {
      console.log(err);
    }
  };

  const getArtist = async (id) => {
    try {
      const res = await axios.get(`${url}/api/artist/detail/${id}`);
      setArtistData(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const getArtistData = async () => {
    try {
      const res = await axios.get(`${url}/api/artist/list`);
      setArtistsData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAlbumsByArtist = async (id) => {
    try {
      const res = await axios.get(`${url}/api/album/by-artist/?artist=${id}`);
      const newAlbums = res.data.albums;
      setAlbumsData((prevAlbums) => {
        const mergedAlbums = newAlbums.filter(
          (newAlbum) =>
            !prevAlbums.some(
              (existingAlbum) => existingAlbum._id === newAlbum._id
            )
        );

        return [...prevAlbums, ...mergedAlbums]; // Merge old and new albums
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updatePlayCount = async (id) => {
    try {
      await axios.put(`${url}/api/song/play/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserPlaylist = async (userId) => {
    try {
      const res = await axios.get(`${url}/api/playlist/list/?user=${userId}`);
      if (res.data.success) {
        setUserPlaylists(res.data.playlists);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getPlaylist = async (id) => {
    try {
      const res = await axios.get(`${url}/api/playlist/${id}`);

      if (res.data.success) {
        setPlaylistData(res.data.playlist);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addSongToPlaylist = async (songId, playlistId) => {
    try {
      const res = await axios.patch(`${url}/api/playlist/add-song`, {
        playlistId,
        songId,
      });

      if (res.data.success) {
        setPlaylistSongs((prevSongs) => [...prevSongs, res.data.song]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeSongToPlaylist = async (songId, playlistId) => {
    try {
      const res = await axios.patch(`${url}/api/playlist/remove-song`, {
        playlistId,
        songId,
      });

      if (res.data.success) {
        setPlaylistSongs((prevSongs) =>
          prevSongs.filter((song) => song._id !== songId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width = `${Math.floor(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        )}%`;

        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    }, 1000);
  }, [audioRef]);

  useEffect(() => {
    if (time.currentTime.minute === 0 && time.currentTime.second === 30) {
      if (!hasUpdatedPlayCount) {
        updatePlayCount(track._id);
        setHasUpdatedPlayCount(true);
      }
    }
  }, [time.currentTime]);

  useEffect(() => {
    setHasUpdatedPlayCount(false);
  }, [track]);

  useEffect(() => {
    getSongsData();
    getAlbumsData();
    getArtistData();
  }, []);

  useEffect(() => {
    getUserPlaylist(user?.userId);
  }, [user]);

  useEffect(() => {
    if (playlistData?.songs?.length > 0) {
      setPlaylistSongs(playlistData.songs);
    } else {
      setPlaylistSongs([]);
    }
  }, [playlistData]);
  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    isPlaying,
    setIsPlaying,
    time,
    setTime,
    play,
    pause,
    playWithId,
    next,
    previous,
    seekSong,
    songsData,
    albumsData,
    setIsSongDisplay,
    isSongDisplay,
    artistsData,
    setArtistsData,
    getArtist,
    artistData,
    getAlbumsByArtist,
    userPlaylists,
    getPlaylist,
    playlistData,
    addSongToPlaylist,
    setPlaylistSongs,
    playlistSongs,
    removeSongToPlaylist,
    setUserPlaylists,
    isOpen,
    setIsOpen,
    setPlaylistData,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
