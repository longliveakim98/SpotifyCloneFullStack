const SongItem = ({ song, removeSong }) => {
  const { name, album, duration, image } = song;
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 ">
      <img className="w-12" src={image} alt="" />
      <p>{name}</p>
      <p>{album?.name || "Single"}</p>
      <p>{duration}</p>
      <p className="cursor-pointer" onClick={removeSong}>
        x
      </p>
    </div>
  );
};

export default SongItem;
