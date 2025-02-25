import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";

const PlaylistSongItem = ({ song, isAdded, playlistId }) => {
  const { removeSongToPlaylist, addSongToPlaylist } = useContext(PlayerContext);
  return (
    <div className="flex w-full px-4 justify-between items-center text-[#a7a7a7] py-2 rounded-sm border border-transparent hover:bg-[#ffffff1a] transition-colors duration-400  ">
      <div className="flex gap-2">
        <img src={song.image} className="w-[2.5rem] h-[2.5rem]" alt="" />
        <div className="flex flex-col">
          <p className="text-white font-semibold">{song.name}</p>
          <p className="text-sm">{song.artist.name}</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-4 grid-cols-1 gap-4 items-center  ">
        <p className="text-sm col-span-3 hidden sm:block">
          {song.album ? song.album.name : ""}
        </p>

        <button
          onClick={() => {
            isAdded
              ? removeSongToPlaylist(song._id, playlistId)
              : addSongToPlaylist(song._id, playlistId);
          }}
          className={`flex py-2 px-6 sm:px-4 justify-center text-sm rounded-full border-1 hover:scale-105 cursor-pointer group w-18 sm:w-24 ${
            isAdded
              ? "bg-green-700 text-black font-semibold hover:bg-red-700"
              : "border-gray-500 hover:border-white hover:text-white"
          }`}
        >
          {isAdded ? (
            <>
              <p className="group-hover:hidden ">Added</p>

              <p className="hidden group-hover:block ">Remove</p>
            </>
          ) : (
            "Add"
          )}
        </button>
      </div>
    </div>
  );
};

export default PlaylistSongItem;
