const PlaylistAlbumItem = ({ album, onClick }) => {
  return (
    <div className="flex w-full px-4 justify-between items-center text-[#a7a7a7] py-2 rounded-sm border border-transparent hover:bg-[#ffffff1a] transition-colors duration-400    ">
      <div className="flex gap-2">
        <img src={album.image} className="w-[2.5rem] h-[2.5rem]" alt="" />
        <div className="flex flex-col">
          <p className="text-white font-semibold ">{album.name}</p>
          <p className="text-sm">Album</p>
        </div>
      </div>

      <button
        className="flex py-2 px-6 sm:px-4 justify-center text-sm rounded-full  border-gray-500 hover:border-white hover:scale-105 hover:text-white cursor-pointer "
        onClick={onClick}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
};

export default PlaylistAlbumItem;
