import { useState } from "react";
import { assets } from "../assets/admin-assets/assets";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AddAlbum = () => {
  const [imageFile, setImageFile] = useState(false);
  const [colour, setColour] = useState("#121212");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [artistId, setArtistId] = useState("");

  const [artistData, setArtistData] = useState([]);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const [loading, setLoading] = useState(false);

  const searchArtist = async () => {
    try {
      const res = await axios.get(`${url}/api/search/artist/?query=${query}`);
      if (res.status === 200) {
        setArtistData(res.data.artists);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query) {
      searchArtist();
    }
  }, [query]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("artist", artistId);
      formData.append("image", imageFile);
      formData.append("bgColour", colour);

      const res = await axios.post(`${url}/api/album/add`, formData);

      if (res.data.success) {
        toast.success("Album added successfully");
        setName("");
        setDesc("");
        setArtistId("");
        setImageFile(false);
      } else {
        toast.error("Something went wrong" + res.data.message);
      }
    } catch (err) {
      toast.error("Error encountered:" + err);
    }

    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin "></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-start gap-8 text-gray-600"
    >
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input
          type="file"
          id="image"
          accept="image/*"
          hidden
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <label htmlFor="image">
          <img
            className="w-24 cursor-pointer "
            src={
              imageFile ? URL.createObjectURL(imageFile) : assets.upload_area
            }
            alt=""
          />
        </label>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album Name</p>
        <input
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          type="text"
          placeholder="Type here"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album Description</p>
        <input
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          type="text"
          placeholder="Type here"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Artist</p>
        <input
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          type="text"
          placeholder="Search artist"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
        />
        {showDropdown && artistData.length > 0 && (
          <ul className="bg-white border border-gray-400 rounded mt-1 w-[max(40vw,250px)] max-h-40 overflow-y-auto">
            {artistData?.map((artist) => (
              <li
                key={artist._id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setArtistId(artist._id);
                  setQuery(artist.name);
                  setShowDropdown(false);
                }}
              >
                {artist.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-3 ">
        <p>Background Colour</p>
        <input
          type="color"
          value={colour}
          onChange={(e) => setColour(e.target.value)}
        />
      </div>

      <button
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer border-2 hover:border-green-600 rounded"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};

export default AddAlbum;
