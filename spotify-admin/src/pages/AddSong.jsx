import { useEffect, useState } from "react";
import { assets } from "../assets/admin-assets/assets";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";

const AddSong = () => {
  const [imageFile, setImageFile] = useState(false);
  const [songFile, setSongFile] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  const getCloudinarySignature = async (timestamp) => {
    try {
      const res = await axios.get(`${url}/api/cloudinary-signature`, {
        params: { timestamp }, // Pass the timestamp to the backend
      });
      return res.data.signature;
    } catch (error) {
      console.error("Error getting Cloudinary signature", error);
      throw new Error("Unable to fetch signature");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resCloud = await getCloudinarySignature();
      const { signature, timestamp } = resCloud.data;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", imageFile);
      formData.append("audio", songFile);
      formData.append("album", album);

      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("upload_preset", "preset");

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
            onChange={(e) => setSongFile(e.target.files[0])}
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
