import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";

const SongRow = ({ song, number, onImage }) => {
  const { image, _id: id, artist, duration, playCount } = song;
  const { playWithId, isPlaying, track, pause, play } =
    useContext(PlayerContext);
  const [isPlayingThis, setIsPlayingThis] = useState(false);

  useEffect(() => {
    if (track._id === song._id) {
      setIsPlayingThis(true);
    } else {
      setIsPlayingThis(false);
    }
  }, [track._id, song._id]);

  if (!song) return null;
  return (
    <div className="flex w-full px-4 justify-between  items-center text-[#a7a7a7] py-2 rounded-sm border border-transparent hover:bg-[#ffffff1a] transition-colors duration-400  ">
      <div className="grid grid-cols-6 gap-4 justify-center items-center w-full">
        <div className="flex gap-4 col-span-3 w-60 items-center sm:text-xs text-sm">
          {number && <p className="hidden sm:block text-xs">{number}</p>}
          {onImage && (
            <div
              className="flex justify-center items-center group relative cursor-pointer"
              onClick={
                isPlayingThis
                  ? isPlaying
                    ? pause
                    : play
                  : () => {
                      playWithId(id);
                    }
              }
            >
              <img
                className={`inline w-[3.5rem] h-[3.5rem] sm:w-[2.5rem] sm:h-[2.5rem]  ${
                  isPlayingThis ? "opacity-30" : "opacity-100"
                } `}
                src={image}
                alt=""
              />

              <p
                className={`absolute ${
                  isPlayingThis ? "block" : "hidden"
                } group-hover:block`}
              >
                {isPlayingThis ? (
                  isPlaying ? (
                    <i className="fa-solid fa-pause text-white "></i>
                  ) : (
                    <i className="fa-solid fa-play text-white"></i>
                  )
                ) : (
                  <i className="fa-solid fa-play text-white"></i>
                )}
              </p>
            </div>
          )}
          <div className="flex flex-col">
            <p
              className={`${
                isPlayingThis ? "text-green-500" : "text-white"
              } font-semibold sm:text-sm text-lg `}
            >
              {song.name}
            </p>
            <p className="sm:text-xs ">{artist?.name || artist}</p>
          </div>
        </div>
        <p className=" sm:text-xs text-center sm:px-8 col-span-2">
          {playCount}
        </p>
        <p className="sm:text-xs text-center sm:px-8 col-span-1 ">{duration}</p>
      </div>
    </div>
  );
};

export default SongRow;
