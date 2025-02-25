import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/frontend-assets/assets";
import Popover from "./ui/Popover";
import RowContainers from "./ui/RowContainers";
import axios from "axios";
import { sortColorsByBrightness } from "../utils/sortColorsByBrightness";
import useColorThief from "use-color-thief";
import { useLocation } from "react-router-dom";
import SongPagePlayer from "./ui/songPagePlayer";

const items = [
  { iconClass: "fa-solid fa-plus", label: "Add to your Liked Songs" },
  { iconClass: "fa-regular fa-user", label: "Go to artist" },
  { iconClass: "fa-regular fa-compact-disc", label: "Go to album" },
];

const DisplaySong = ({ withPlayer }) => {
  const location = useLocation().pathname;

  const { setIsSongDisplay, track, isOpen } = useContext(PlayerContext);

  const url = import.meta.env.VITE_BASE_URL;
  const [artist, setArtist] = useState("");

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
    <div
      className={`h-full flex-col text-white w-full ${
        location === "/song" ? "" : "hidden"
      } ${isOpen ? "opacity-30" : ""}  lg:flex lg:m-2  rounded-sm px-3 py-1`}
      style={{
        backgroundImage: `linear-gradient( ${
          bgColor?.[1] || "#121212"
        } ,#121212)`,
      }}
    >
      <div className="flex h-[8%] justify-between items-center sticky py-3  ">
        <p className="font-semibold text-xl">{track?.name}</p>
        <div className="flex gap-2 items-center">
          <Popover
            icon={
              <i className="fa-solid fa-ellipsis text-xl p-2 hover:bg-[#ffffff1a] rounded-full cursor-pointer "></i>
            }
            content={
              <div className={`grid grid-rows-${items.length} min-w-[15rem]`}>
                {items.map((item, i) => (
                  <RowContainers
                    key={i}
                    iconClass={item.iconClass}
                    label={item.label}
                  />
                ))}
              </div>
            }
            contentClass="-left-20 top-10"
          />
          <button
            className="p-2 hover:bg-[#ffffff1a] rounded-full cursor-pointer sm:block hidden"
            onClick={() => setIsSongDisplay(false)}
          >
            <img src={assets.plus_icon} alt="" className="rotate-45 size-5" />
          </button>
        </div>
      </div>
      <div className="h-full flex flex-col overflow-y-auto gap-4">
        <div className="flex items-center justify-center ">
          <img
            src={track?.image}
            alt=""
            className="rounded-lg min-w-[20rem]  min-h-[20rem] shadow-lg shadow-black"
          />
        </div>
        <div>
          <p className="text-3xl font-bold">{track?.name}</p>
          <p className="text-xl text-[rgb(179,179,179)] font-medium">
            {track?.album ? track?.artist : artist}
          </p>
        </div>
        <div className="block xl:hidden">
          {withPlayer && <SongPagePlayer />}
        </div>
        <div className="bg-[#1E1E1E] p-3 rounded-md flex flex-col gap-4">
          <b className="font-semibold text-lg">Credits</b>
          <div className="">
            <p className="text-xl font-semibold">
              {track?.album ? track?.artist : artist}
            </p>
            <p className="text-[rgb(179,179,179)] font-semibold">Main Artist</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplaySong;
