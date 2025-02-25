import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { assets } from "../../assets/frontend-assets/assets";
import useColorThief from "use-color-thief";
import { sortColorsByBrightness } from "../../utils/sortColorsByBrightness";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FloatingPlayer = () => {
  const { track, isPlaying, play, pause } = useContext(PlayerContext);

  const url = import.meta.env.VITE_BASE_URL;
  const [artist, setArtist] = useState("");
  const navigate = useNavigate();

  const { palette } = useColorThief(track?.image, {
    format: "hex",
    colorCount: 3,
    quality: 10,
  });

  const bgColor = sortColorsByBrightness(palette);

  const getArtistName = async () => {
    const artist = await axios.get(`${url}/api/user/user/${track.artist}`);
    setArtist(artist.data.name);
  };
  useEffect(() => {
    if (!track.album) {
      getArtistName();
    }
  }, [track]);

  return (
    track && (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-transparent px-4 py-5 flex items-center  shadow-lg xl:hidden justify-center ">
        <div
          className=" flex justify-between w-[100vw] md:w-[60vw] lg:w-[70vw] lg:h-[10vw] py-2 px-4 rounded-md "
          style={{
            backgroundImage: `linear-gradient( ${
              bgColor?.[1] || "#121212"
            } ,#121212)`,
          }}
        >
          {/* Song Info */}
          <div className="flex items-center space-x-4">
            {track?.image && (
              <img
                src={track.image}
                alt="Cover"
                className="w-12 h-12 rounded lg:h-16 lg:w-16 "
              />
            )}
            <div onClick={() => navigate("/song")}>
              <h4 className="text-white font-bold text-lg lg:text-2xl">
                {track?.name || "No Track Playing"}
              </h4>
              <p className="text-gray-400 text-sm lg:text-lg font-semibold">
                {track?.album ? track?.artist : artist}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4 md:px-5 ">
            {isPlaying ? (
              <img
                className="w-4 lg:w-8 cursor-pointer"
                src={assets.pause_icon}
                alt=""
                onClick={pause}
              />
            ) : (
              <img
                className="w-4 lg:w-8  cursor-pointer"
                src={assets.play_icon}
                alt=""
                onClick={play}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default FloatingPlayer;
