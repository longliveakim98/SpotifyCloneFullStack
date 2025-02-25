import { useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend-assets/assets";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { url } from "../App";
import { PlayerContext } from "../context/PlayerContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { userPlaylists, setUserPlaylists, isOpen } = useContext(PlayerContext);

  const [isMini, setIsMini] = useState(true);

  const handleAddPlaylist = async (e) => {
    e.preventDefault();
    try {
      const userId = user?.userId;

      const res = await axios.post(`${url}/api/playlist/add`, { userId });
      if (res.data.success) {
        setUserPlaylists((prev) => [...prev, res.data.playlistRes]);

        navigate(`/playlist/${res.data.playlistRes._id}`);
      }
    } catch (err) {
      console.log("Failed to Add" + err);
    }
  };

  return (
    <div
      className={`h-full flex-col  text-white hidden lg:flex m-2 ${
        isMini ? "w-[5%]" : "w-[28%]"
      } ${isOpen ? "opacity-30" : ""} `}
    >
      <div className="bg-[#121212] h-full rounded">
        <div
          className={`px-4 py-3 flex items-center justify-between ${
            isMini ? "flex-col gap-2" : ""
          }`}
        >
          <div
            className={`flex items-center gap-4 cursor-pointer`}
            onClick={() => setIsMini(!isMini)}
          >
            {isMini ? (
              <i className="fa-solid fa-grip text-2xl"></i>
            ) : (
              <i className="fa-solid fa-grip-vertical text-2xl"></i>
            )}
            <p className={`font-semibold text-sm ${isMini ? "hidden" : ""}`}>
              Your Library
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* <img
              className={`w-6 ${isMini ? "" : "rotate-180"}`}
              src={assets.arrow_icon}
              alt=""
              
            /> */}
            <div
              className="p-2 bg-[#1E1E1E] rounded-full cursor-pointer"
              onClick={user ? handleAddPlaylist : () => navigate("/login")}
            >
              <img className="w-4" src={assets.plus_icon} alt="" />
            </div>
          </div>
        </div>
        {userPlaylists.length === 0 ? (
          <div className={`${isMini ? "hidden" : ""}`}>
            <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
              <h1>Create your first playlist</h1>
              <p className="font-light ">it&apos;s easy we will help you</p>
              <button
                className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 cursor-pointer "
                onClick={user ? handleAddPlaylist : () => navigate("/login")}
              >
                Create Playlist
              </button>
            </div>
            <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
              <h1>Let&apos;s find some podcasts to follow</h1>
              <p className="font-light ">
                we&apos;ll keep you update on new episodes
              </p>
              <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
                Browse podcasts
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            {userPlaylists.map((playlist, i) => (
              <div
                key={i}
                className={`p-2 hover:bg-[#242424]  rounded font-semibold flex  gap-2 cursor-pointer ${
                  isMini ? "justify-center" : "justify-start"
                }`}
                onClick={() => navigate(`/playlist/${playlist._id}`)}
              >
                <div className="flex  bg-gray-500 w-10 h-10 justify-center items-center ">
                  {playlist.image ? (
                    <img src={playlist.image} className="w-10 h-10" />
                  ) : (
                    <i className="fa-solid fa-music"></i>
                  )}
                </div>
                <p className={`text-sm ${isMini ? "hidden" : ""}`}>
                  {playlist.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
