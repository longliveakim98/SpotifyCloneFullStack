import { useEffect, useRef, useState } from "react";
import { assets } from "../assets/admin-assets/assets";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";

const AddSong = () => {
  const [imageFile, setImageFile] = useState(false);
  const [songFile, setSongFile] = useState(false);
  const [songDuration, setSongDuration] = useState(null);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;

  const handleSongFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSongFile(file);

      const audio = new Audio();
      audio.src = URL.createObjectURL(file);
      audio.addEventListener("loadedmetadata", () => {
        setSongDuration(audio.duration);
      });
    }
  };

  const uploadToCloudinary = async (file, name, resourceType) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("public_id", name);
      formData.append("upload_preset", "unsigned");

      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const response = await axios.post(uploadUrl, formData);

      return response.data;
    } catch (error) {
      toast.error("Cloudinary upload failed: " + error.message);
      return null;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const audio = await uploadToCloudinary(songFile, name, "video");
      const image = await uploadToCloudinary(
        imageFile,
        `${name}-cover`,
        "image"
      );

      const formData = new FormData();

      formData.append("image", image.secure_url);
      formData.append("audio", audio.secure_url);
      formData.append("audioDuration", songDuration);

      console.log(audio.duration);

      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("album", album);

      const res = await axios.post(`${url}/api/song/add`, formData);

      if (res.data.success) {
        toast.success("Song added successfully");
        setName("");
        setDesc("");
        setAlbum("none");
        setImageFile(false);
        setSongFile(false);
      } else {
        toast.error("Something went wrong" + res.data.message);
      }
    } catch (err) {
      toast.error("Error encountered:" + err);
    }

    setLoading(false);
  };

  const loadAlbums = async () => {
    try {
      const res = await axios.get(`${url}/api/album/list`);
      if (res.data.success) {
        setAlbumData(res.data.albums);
      } else {
        toast.error("Unable to load albums data");
      }
    } catch (err) {
      toast.error("Error encountered:" + err);
    }
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin "></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-start gap-8 text-gray-600"
    >
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload song</p>
          <input
            type="file"
            id="song"
            accept="audio/*"
            onChange={handleSongFileChange}
            hidden
          />
          <label htmlFor="song">
            <img
              src={songFile ? assets.upload_added : assets.upload_song}
              className="w-24 cursor-pointer"
              alt=""
            />
          </label>
        </div>

        <div className="flex flex-col gap-4">
          <p>Upload image</p>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            hidden
          />
          <label htmlFor="image">
            <img
              src={
                imageFile ? URL.createObjectURL(imageFile) : assets.upload_area
              }
              className="w-24 cursor-pointer"
              alt=""
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Song name</p>
        <input
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)] "
          type="text"
          placeholder="Enter song name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Song description</p>
        <input
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)] "
          type="text"
          placeholder="Enter song description"
          required
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2.5 ">
        <p>Album</p>
        <select
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(150px)]"
          defaultValue={album}
          onChange={(e) => setAlbum(e.target.value)}
        >
          <option value="none">None</option>
          {albumData.map((album, i) => (
            <option key={i} value={album.name}>
              {album.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer border-2 hover:border-green-600 rounded"
      >
        ADD
      </button>
    </form>
  );
};

export default AddSong;
