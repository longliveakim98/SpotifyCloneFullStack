import Navbar from "./Navbar";

import AlbumItem from "./AlbumItem";
import SongsItem from "./SongsItem";
import { PlayerContext } from "../context/PlayerContext";
import { useContext } from "react";

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);
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
              id={album._id}
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
              id={song._id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
