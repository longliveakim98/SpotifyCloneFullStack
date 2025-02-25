import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { assets } from "../../assets/frontend-assets/assets";

const SongPagePlayer = () => {
  const {
    seekBar,
    seekBg,
    isPlaying,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
  } = useContext(PlayerContext);

  return (
    <div className="w-full px-2 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p>
            {time.currentTime.minute}:
            {time.currentTime.second < 10
              ? `0${time.currentTime.second}`
              : time.currentTime.second}
          </p>
          <p>
            {time.totalTime.minute}:
            {time.totalTime.second < 10
              ? `0${time.totalTime.second}`
              : time.totalTime.second}
          </p>
        </div>
        <div className="flex items-center gap-5  ">
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[90vw] sm:w-full bg-slate-600 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-white rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 m-auto w-full justify-between ">
        <img className="w-6 cursor-pointer" src={assets.shuffle_icon} alt="" />
        <img
          className="w-8 cursor-pointer"
          src={assets.prev_icon}
          alt=""
          onClick={previous}
        />
        <div className="p-4 rounded-full bg-black">
          {isPlaying ? (
            <img
              className="w-8 cursor-pointer p-4 bg-white"
              src={assets.pause_icon}
              alt=""
              onClick={pause}
            />
          ) : (
            <img
              className="w-8 cursor-pointer  "
              src={assets.play_icon}
              alt=""
              onClick={play}
            />
          )}
        </div>

        <img
          className="w-8 cursor-pointer"
          src={assets.next_icon}
          alt=""
          onClick={next}
        />
        <img className="w-6 cursor-pointer" src={assets.loop_icon} alt="" />
      </div>
    </div>
  );
};

export default SongPagePlayer;
