import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/frontend-assets/assets";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useState } from "react";
import { useEffect } from "react";

const DisplayAlbum = ({ album }) => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState("");
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);

  useEffect(() => {
    albumsData.map((item) => {
      if (item._id === id) {
        setAlbumData(item);
      }
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    albumData && (
      <>
        <Navbar />
        <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
          <img className="w-48 rounded" src={albumData.image} alt="" />
          <div className="flex flex-col">
            <p>Playlist</p>
            <h2 className="text-5xl font-bold mb-4 md:text-7xl">
              {albumData.name}
            </h2>
            <h4 className="">{albumData.desc}</h4>
            <p className="mt-1">
              <img
                className="inline-block w-5 mr-6 "
                src={assets.spotify_logo}
                alt=""
              />
              <b>Spotify </b>• 1,324,035 likes
              <b> 50 songs, </b>
              about 2 hr 30 mins
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
          <p>
            <b className="mr-4">#</b>Title
          </p>
          <p>Album</p>
          <p className="hidden sm:block">Date Added</p>
          <img className="m-auto w-4" src={assets.clock_icon} alt="" />
        </div>
        <hr />
        {songsData
          .filter((item) => item.album === album.name)
          .map((song, i) => (
            <div
              onClick={() => playWithId(song._id)}
              key={i}
              className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
            >
              <p className="text-white ">
                <b className="mr-4 text-[#a7a7a7]">{i + 1}</b>
                <img className="inline w-10 mr-5" src={song.image} alt="" />
                {song.name}
              </p>
              <p className="text-[15px]">{albumData.name}</p>
              <p className="text-[15px] hidden sm:block">5 days ago</p>
              <p className="text-[15px] text-center">{song.duration}</p>
            </div>
          ))}
      </>
    )
  );
};

export default DisplayAlbum;
