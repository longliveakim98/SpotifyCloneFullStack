import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const SongsItem = ({ image, name, id, artist }) => {
  const { playWithId } = useContext(PlayerContext);

  return (
    <div
      onClick={() => playWithId(id)}
      className="min-w-[180px] w-[200px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img className="rounded" src={image} alt="" />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{artist.name}</p>
    </div>
  );
};

export default SongsItem;
