import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/frontend-assets/assets";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useState } from "react";
import { useEffect } from "react";
import SongRow from "../components/SongRow";

const DisplayAlbum = ({ album }) => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState("");
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);
  const navigate = useNavigate();

  useEffect(() => {
    albumsData.map((item) => {
      if (item._id === id) {
        setAlbumData(item);
      }
    });
  }, []);

  return (
    albumData && (
      <div
        className="h-full "
        style={{
          backgroundImage: `linear-gradient( ${
            album?.bgColour || "#121212"
          } ,#121212,#121212`,
        }}
      >
        <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end px-4 ">
          <div className="flex items-center justify-center sm:items-start sm:h-50 ">
            <img className="w-48 rounded " src={albumData?.image} alt="" />
          </div>
          <div className="flex flex-col">
            <p>Album</p>
            <h2 className="text-3xl font-bold mb-4 md:text-7xl">
              {albumData?.name}
            </h2>
            <h4 className="hidden">{albumData?.desc}</h4>
            <p className="mt-1">
              <img
                className="inline-block w-8 mr-6 rounded-full"
                src={albumData.artist.image}
                alt=""
              />
              <b
                className="cursor-pointer hover:underline"
                onClick={() => navigate(`/artist/${albumData.artist._id}`)}
              >
                {albumData.artist.name}
              </b>
            </p>
          </div>
        </div>
        <div className="h-100 w-full mt-4 sm:mt-0">
          <div className="hidden sm:grid grid-cols-6 gap-4 items-center mt-1 px-4 mb-2 text-gray-400 text-sm">
            <div className="col-span-3 flex gap-4 items-center ">
              <p>#</p>
              <p>Title</p>
            </div>
            <p className="col-span-2 text-center ">Plays</p>
            <div className="col-span-1 flex justify-center">
              <img className="w-3" src={assets.clock_icon} alt="" />
            </div>
          </div>
          <hr />
          {songsData
            .filter((item) => item.album?.name === album.name)
            .map((song, i) => (
              <div
                onClick={() => playWithId(song._id)}
                key={i}
                className="flex w-full "
              >
                <p className="text"></p>
                <SongRow song={song} number={i + 1} />
              </div>
            ))}
        </div>
      </div>
    )
  );
};

export default DisplayAlbum;
