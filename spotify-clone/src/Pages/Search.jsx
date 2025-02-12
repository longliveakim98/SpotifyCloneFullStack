import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import Header from "../components/ui/Header";
import AlbumItem from "../components/AlbumItem";
import ArtistItem from "../components/ArtistItem";
import SongRow from "../components/SongRow";
import { PlayerContext } from "../context/PlayerContext";

const Search = () => {
  const location = useLocation();

  const { playWithId } = useContext(PlayerContext);

  const [results, setResults] = useState({
    songs: [],
    albums: [],
    artists: [],
  });
  const [active, setActive] = useState("all");
  const [topResult, setTopResult] = useState(null);

  const url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const searchParams = location.search;
        console.log("🚀 ~ handleSearch ~ searchParams:", searchParams);

        const { data } = await axios.get(
          `${url}/api/search/all/${searchParams}`
        );

        setResults(data);
        if (data.songs) setTopResult(data.songs[0]);
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    if (!location.search) {
      setResults({
        songs: [],
        albums: [],
        artists: [],
      });
    }

    handleSearch();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, active]);

  return (
    <>
      <div className="sticky flex gap-2 h-[10%] items-center px-6 rounded-sm">
        <button
          className={`py-2 px-4 rounded-full ${
            active === "all" ? "bg-white text-black" : "bg-[#1E1E1E]"
          } cursor-pointer`}
          onClick={() => setActive("all")}
        >
          All
        </button>
        <button
          className={`py-2 px-4 rounded-full ${
            active === "artist" ? "bg-white text-black" : "bg-[#1E1E1E]"
          } cursor-pointer`}
          onClick={() => setActive("artist")}
        >
          Artist
        </button>
        <button
          className={`py-2 px-4 rounded-full ${
            active === "song" ? "bg-white text-black" : "bg-[#1E1E1E]"
          } cursor-pointer`}
          onClick={() => setActive("song")}
        >
          Songs
        </button>
        <button
          className={`py-2 px-4 rounded-full ${
            active === "album" ? "bg-white text-black" : "bg-[#1E1E1E]"
          } cursor-pointer`}
          onClick={() => setActive("album")}
        >
          Album
        </button>
      </div>
      {active === "all" && (
        <div className="overflow-y-auto mx-6">
          {results.songs.length > 0 && (
            <div className="grid grid-cols-6  gap-4">
              <div className="flex flex-col md:col-span-2 col-span-4">
                <Header>Top Result</Header>
                <div className="flex flex-col hover:bg-[#ffffff1a] h-full rounded-sm p-4 gap-2 relative group">
                  <img src={topResult.image} className="w-32" alt="" />
                  <div className="flex gap-2 justify-between">
                    <div className="flex flex-col">
                      <p className="text-3xl font-bold">{topResult.name}</p>
                      <p className="text-gray-300">{topResult.artist.name}</p>
                    </div>
                    <button
                      className="bg-green-900 rounded-full px-6 hover:bg-green-500 text-black text-lg 
      opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 cursor-pointer"
                      onClick={() => playWithId(topResult._id)}
                    >
                      <i className="fa-solid fa-play"></i>
                    </button>
                  </div>
                </div>
                ;
              </div>
              <div className=" flex flex-col col-span-6 md:col-span-4">
                <Header>Songs</Header>
                <div className="flex flex-col  ">
                  {results?.songs.map((song) => (
                    <SongRow key={song._id} song={song} />
                  ))}
                </div>
              </div>
            </div>
          )}
          {results?.artists.length > 0 && (
            <div className="mt-8 flex-flex-col gap-8">
              <Header>Artists</Header>
              <div className="flex overflow-auto ">
                {results?.artists.map((artist) => (
                  <ArtistItem key={artist._id} artist={artist} />
                ))}
              </div>
            </div>
          )}
          {results.albums?.length > 0 && (
            <div className="mt-8 flex-flex-col gap-8">
              <Header>Albums</Header>
              <div className="flex overflow-auto ">
                {results.albums?.map((album) => (
                  <AlbumItem key={album._id} {...album} id={album._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
