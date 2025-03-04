import { assets } from "../assets/admin-assets/assets";
import { NavLink } from "react-router-dom";
import * as motion from "motion/react-client";

const Sidebar = () => {
  return (
    <motion.div
      initial={{
        background: "linear-gradient(to center right, #003A10 , #168D40)",
      }}
      animate={{
        background: [
          "linear-gradient(to bottom right, #003A10 , #168D40)",
          "linear-gradient(to bottom left, #003A10 , #168D40)",
          "linear-gradient(to top left, #003A10 , #168D40)",
          "linear-gradient(to top right, #003A10 , #168D40)",
        ],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
      className=" min-h-screen relative pl-[4vw] "
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5, 1] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          background: "linear-gradient(to bottom right, #003A10 , #168D40)",
        }}
      ></motion.div>
      <img
        className="mt-5 w-[max(10vw,100px)] hidden sm:block"
        src={assets.logo}
        alt=""
      />
      <img
        className="mt-5 w-[max(5vw,40px)] mr-5 sm:hidden block"
        src={assets.logo_small}
        alt=""
      />
      <div className="flex flex-col gap-5 mt-10">
        <NavLink
          to={"/add-song"}
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium "
        >
          <img className="w-5" src={assets.add_song} alt="" />
          <p className="hidden sm:block ">Add Song</p>
        </NavLink>

        <NavLink
          to={"/list-song"}
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium "
        >
          <img className="w-5" src={assets.song_icon} alt="" />
          <p className="hidden sm:block ">List of Songs</p>
        </NavLink>

        <NavLink
          to={"/add-album"}
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium "
        >
          <img className="w-5" src={assets.add_album} alt="" />
          <p className="hidden sm:block ">Add Album</p>
        </NavLink>

        <NavLink
          to={"/list-album"}
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium "
        >
          <img className="w-5" src={assets.album_icon} alt="" />
          <p className="hidden sm:block ">List Album</p>
        </NavLink>
        <NavLink
          to={"/list-users"}
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium "
        >
          <img className="w-5" src={assets.album_icon} alt="" />
          <p className="hidden sm:block ">List Users</p>
        </NavLink>
      </div>
    </motion.div>
  );
};

export default Sidebar;
