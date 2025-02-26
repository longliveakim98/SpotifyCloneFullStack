import { useNavigate } from "react-router-dom";

const AlbumItem = ({ image, name, id, artist, className }) => {
  const navigate = useNavigate();

  return (
    <div
      className={` p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] ${className}`}
      onClick={() => navigate(`/album/${id}`)}
    >
      <img className="rounded" src={image} alt="" />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-gray-300 text-sm">{artist.name}</p>
    </div>
  );
};

export default AlbumItem;
