import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const SongRow = ({ song }) => {
  const { image, _id: id, artist, duration, playCount } = song;
  const { playWithId } = useContext(PlayerContext);
  return (
    <div
      onClick={() => playWithId(id)}
      className="flex justify-between items-center text-[#a7a7a7] py-2 cursor-pointer rounded-sm border border-transparent hover:bg-[#ffffff1a] transition-colors duration-400  "
    >
      <div className="flex gap-4">
        <img className="inline w-[3.5rem] ml-4" src={image} alt="" />
        <div className="flex flex-col   ">
          <p className="text-white font-semibold text-lg">{song.name} </p>{" "}
          <p>{artist?.name}</p>
        </div>
      </div>
      <p className="text-[15px] text-center px-8">{playCount}</p>
      <p className="text-[15px] text-center px-8">{duration}</p>
    </div>
  );
};

export default SongRow;
