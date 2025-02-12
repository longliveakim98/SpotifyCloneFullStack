import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend-assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import axios from "axios";

const Player = () => {
  const {
    seekBar,
    seekBg,
    isPlaying,
    play,
    pause,
    track,
    time,
    previous,
    next,
    seekSong,
  } = useContext(PlayerContext);

  const url = import.meta.env.VITE_BASE_URL;
  const [artist, setArtist] = useState("");

  const getArtistName = async () => {
    const artist = await axios.get(`${url}/api/user/user/${track.artist}`);
    setArtist(artist.data.name);
  };
  useEffect(() => {
    if (!track.album) {
      getArtistName();
    }
  }, [track]);
  return track ? (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12 " src={track.image} alt="" />
        <div>
          <p className="text-lg font-semibold">{track.name}</p>
          <p className="text-sm text-gray-400">
            {track.album ? track.artist : artist}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4 ">
          <img
            className="w-4 cursor-pointer"
            src={assets.shuffle_icon}
            alt=""
          />
          <img
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            alt=""
            onClick={previous}
          />
          {isPlaying ? (
            <img
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt=""
              onClick={pause}
            />
          ) : (
            <img
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt=""
              onClick={play}
            />
          )}

          <img
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt=""
            onClick={next}
          />
          <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="" />
        </div>
        <div className="flex items-center gap-5 ">
          <p>
            {time.currentTime.minute}:
            {time.currentTime.second < 10
              ? `0${time.currentTime.second}`
              : time.currentTime.second}
          </p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-slate-600 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-white rounded-full"
            />
          </div>
          <p>
            {time.totalTime.minute}:
            {time.totalTime.second < 10
              ? `0${time.totalTime.second}`
              : time.totalTime.second}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4" src={assets.plays_icon} alt="" />
        <img className="w-4" src={assets.mic_icon} alt="" />
        <img className="w-4" src={assets.queue_icon} alt="" />
        <img className="w-4" src={assets.speaker_icon} alt="" />
        <img className="w-4" src={assets.volume_icon} alt="" />
        <div className="w-20 bg-slate-50 h-1 rounded"></div>
        <img className="w-4" src={assets.mini_player_icon} alt="" />
        <img className="w-4" src={assets.zoom_icon} alt="" />
      </div>
    </div>
  ) : null;
};

export default Player;
