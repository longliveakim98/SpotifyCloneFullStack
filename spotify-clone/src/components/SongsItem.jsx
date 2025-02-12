import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import axios from "axios";

const SongsItem = ({ image, name, id, artist, album }) => {
  const url = import.meta.env.VITE_BASE_URL;
  const { playWithId } = useContext(PlayerContext);

  const [artistName, setArtistName] = useState(artist);

  const getArtist = async () => {
    try {
      const res = await axios.get(`${url}/api/user/user/${artist}`);
      setArtistName(res.data.name);
    } catch (error) {
      console.log(error + "Cant fetch artist");
    }
  };

  useEffect(() => {
    if (!album) {
      getArtist();
    }
  }, []);

  return (
    <div
      onClick={() => playWithId(id)}
      className="min-w-[180px] w-[200px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img className="rounded" src={image} alt="" />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{artistName}</p>
    </div>
  );
};

export default SongsItem;
