import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../App";
import { toast } from "react-toastify";

const ListSong = () => {
  const [data, setData] = useState([]);

  const fetchSongs = async () => {
    try {
      const res = await axios.get(`${url}/api/song/list`);

      if (res.data.sucess) {
        setData(res.data.songs);
      }
    } catch (err) {
      toast.error("Error occured " + err);
    }
  };

  const removeSong = async (id) => {
    try {
      const res = await axios.post(`${url}/api/song/remove`, { id });

      if (res.data.success) {
        toast.success(res.data.message);
        await fetchSongs();
      }
    } catch (err) {
      toast.error("Error occured " + err);
    }
  };
  useEffect(() => {
    fetchSongs();
  }, []);
  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.map((item, i) => {
          return (
            <div
              key={i}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 "
            >
              <img className="w-12" src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.album}</p>
              <p>{item.duration}</p>
              <p
                className="cursor-pointer"
                onClick={() => removeSong(item._id)}
              >
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListSong;
