import { useNavigate } from "react-router-dom";

const ArtistItem = ({ artist }) => {
  const navigate = useNavigate();
  return (
    <div
      key={artist._id}
      className="flex flex-col gap-2 p-2 cursor-pointer rounded-sm border border-transparent min-w-[240px] hover:bg-[#ffffff1a] transition-colors duration-400 "
      onClick={() => navigate(`/artist/${artist._id}`)}
    >
      <img src={artist.image} alt="" className="inline rounded-full w-65" />
      <div className="flex flex-col ">
        <p className="text-lg text-white font-semibold">{artist.name}</p>
        <p className="text-[#a7a7a7]">Artist</p>
      </div>
    </div>
  );
};

export default ArtistItem;
