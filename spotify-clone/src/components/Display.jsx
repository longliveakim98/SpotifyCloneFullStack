import { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "../Pages/DisplayHome";
import DisplayAlbum from "../Pages/DisplayAlbum";

import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import Search from "../Pages/Search";
import DisplayArtist from "../Pages/DisplayArtist";
import DisplaySong from "./DisplaySong";
import DisplayPlaylist from "../Pages/DisplayPlaylist";

const Display = () => {
  const { albumsData } = useContext(PlayerContext);

  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : "#121212";
  const bgColor =
    isAlbum && albumsData.length > 0
      ? albumsData.find((x) => x._id === albumId).bgColour
      : "";

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else {
      displayRef.current.style.background = "#121212";
    }
  });

  return (
    <div
      ref={displayRef}
      className="w-[100%] mt-2 mb-10 sm:mb-2 lg:h-full rounded bg-[#121212] text-white overflow-y-auto mx-0  "
    >
      {albumsData.length > 0 && (
        <Routes>
          <Route path="/" element={<DisplayHome />} />
          <Route
            path="/album/:id"
            element={
              <DisplayAlbum album={albumsData.find((x) => x._id === albumId)} />
            }
          />
          <Route path="/search" element={<Search />} />
          <Route path="/artist/:id" element={<DisplayArtist />} />
          <Route path="/song" element={<DisplaySong withPlayer />} />
          <Route path="/playlist/:id" element={<DisplayPlaylist />} />
        </Routes>
      )}
    </div>
  );
};

export default Display;
