import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../App";
import { toast } from "react-toastify";

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const res = await axios.get(`${url}/api/album/list`);

      if (res.data.success) {
        setData(res.data.albums);
      }
    } catch (err) {
      toast.error("Error occured " + err);
    }
  };

  const removeAlbum = async (id) => {
    try {
      const res = await axios.post(`${url}/api/album/remove`, { id });

      if (res.data.success) {
        toast.success(res.data.message);
        await fetchAlbums();
      }
    } catch (err) {
      toast.error("Error occured " + err);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <p>All Albums List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Descriptions</b>
          <b>Album Colour</b>
          <b>Action</b>
        </div>
        {data.map((item, i) => {
          return (
            <div
              key={i}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
            >
              <img src={item.image} className="w-12" alt="" />
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <input type="color" value={item.bgColour} readOnly />
              <p
                className="cursor-pointer"
                onClick={() => removeAlbum(item._id)}
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

export default ListAlbum;
