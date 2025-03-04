import * as motion from "motion/react-client";

const SongItem = ({ song, removeSong, i }) => {
  const { name, album, duration, image } = song;

  return (
    <motion.div
      initial={{ y: 20 }}
      whileInView={{ y: 0 }}
      transition={{ delay: 0.025 * i, duration: 0.2 * i }}
      className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 "
    >
      <img className="w-12" src={image} alt="" />
      <p>{name}</p>
      <p>{album?.name || "Single"}</p>
      <p>{duration}</p>
      <p
        className="cursor-pointer py-2 px-1 bg-red-800 text-center text-white hover:opacity-75 hover:scale-105 rounded-full"
        onClick={removeSong}
      >
        Delete
      </p>
    </motion.div>
  );
};

export default SongItem;
