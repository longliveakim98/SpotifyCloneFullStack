import React from "react";
import Navbar from "./Navbar";
import { albumsData, songsData } from "../assets/frontend-assets/assets";
import AlbumItem from "./AlbumItem";
import SongsItem from "./SongsItem";

const DisplayHome = () => {
  return (
    <>
      <Navbar />
      <div className=" mb-4 ">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto ">
          {albumsData.map((album, i) => (
            <AlbumItem
              key={i}
              name={album.name}
              desc={album.desc}
              image={album.image}
              id={album.id}
            />
          ))}
        </div>
      </div>
      <div className=" mb-4 ">
        <h1 className="my-5 font-bold text-2xl">Today&apos;s Biggest Hits</h1>
        <div className="flex overflow-auto ">
          {songsData.map((song, i) => (
            <SongsItem
              key={i}
              name={song.name}
              desc={song.desc}
              image={song.image}
              id={song.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
