import { useState } from "react";
import { url } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { Modal } from "../components/Modal";
import { assets } from "../assets/admin-assets/assets";

const ListUsers = () => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState({ userId: "", role: "", allowed: false });

  const [details, setDetails] = useState(null);
  const [imageFile, setImageFile] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editDetails, setEditDetails] = useState({
    userId: "",
    allowPic: false,
  });
  const excludedKeys = [
    "likedSongs",
    "lastPlayedSong",
    "lastPlayedAlbum",
    "playlists",
    "updatedAt",
    "__v",
    "image",
  ];

  const [isOpen, setIsOpen] = useState(false);

  const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;
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

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${url}/api/user/list`);

      if (res.data) {
        setData(res.data);
      }
    } catch (err) {
      toast.error("Error occured " + err);
    }
  };

  const handleDetails = (userId) => {
    getDetails(userId);
    setIsOpen(true);
  };

  const getDetails = async (userId) => {
    try {
      const res = await axios.get(`${url}/api/user/user/${userId}`);

      if (res.data) {
        setDetails(res.data);
      }
    } catch (err) {
      toast.error("Error occured " + err);
    }
  };

  const handleProfilePicture = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { name, _id } = details;

      if (!imageFile) {
        toast.error("Please select an image.");
        return;
      }
      const image = await uploadToCloudinary(
        imageFile,
        `${name}-ProfilePicture-${Math.round(Date.now() / 1000)}`,
        "image"
      );

      const res = await axios.put(`${url}/api/user/${_id}/profile-picture`, {
        image: image.secure_url,
      });

      if (res.status === 200) {
        toast.success(`${name} Profile picture changed successfully`);
        setImageFile(false);
        setEditDetails((prev) => ({ ...prev, userId: "", allowPic: "" }));
        setIsOpen(false);
      } else {
        toast.error("Something went wrong" + res.data.message);
      }
    } catch (err) {
      toast.error("Error encountered:" + err);
    }

    setLoading(false);
  };

  const editRole = async (userId, newRole) => {
    try {
      const response = await axios.put(`${url}/api/user/${userId}/role`, {
        role: newRole,
      });
      if (response.status === 200) {
        setEdit((prev) => ({ ...prev, userId: "", role: "", allowed: false }));
      }
      // Optionally, update your frontend state here to reflect the change
    } catch (error) {
      console.error("Failed to update user role:", error);
      // Handle error appropriately in your UI
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [loading]);
  return (
    <div className="h-screen mx-auto mb-10 ">
      <div className={isOpen ? "opacity-40" : ""}>
        <p className="text-xl font-bold">All Users List</p>
        <br />
        <div className="w-full flex gap-2  ">
          <div className="flex flex-col sm:w-full">
            <div className=" hidden sm:grid grid-cols-[0.5fr_1fr_1fr_0.5fr_1fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
              <b>Image</b>
              <b>Id</b>
              <b>Name</b>

              <b>role</b>
              <b>Action</b>
            </div>
            {data.map((item, i) => {
              return (
                <div
                  key={i}
                  className="grid grid-cols-[0.5fr_1fr_1fr_0.5fr_1fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5  "
                >
                  {item.image ? (
                    <img className="w-12" src={item.image} alt="" />
                  ) : (
                    <div className="w-[2rem] h-[2rem] bg-green-500 rounded flex items-center justify-center">
                      <p className="font-bold">{item.name.slice(0, 1)}</p>
                    </div>
                  )}
                  <p className="">{item._id}</p>
                  <p>{item.name}</p>

                  <select
                    name=""
                    id=""
                    defaultValue={item.role}
                    className="py-2 bg-slate-200 rounded-md border-1 cursor-pointer"
                    onChange={(e) =>
                      setEdit((prev) => ({ ...prev, role: e.target.value }))
                    }
                    disabled={!(edit.userId === item._id && edit.allowed)}
                  >
                    <option value="user">user</option>
                    <option value="artist">artist</option>
                    <option value="admin">admin</option>
                  </select>
                  <div className="">
                    {!(edit.userId === item._id && edit.allowed) ? (
                      <div className="flex gap-2">
                        <button
                          className="cursor-pointer py-2 px-4  bg-slate-400 font-semibold rounded-md "
                          onClick={() => {
                            setEdit((prev) => ({
                              ...prev,
                              userId: item._id,
                              role: item.role,
                              allowed: true,
                            }));
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="cursor-pointer py-2 px-4  bg-yellow-400 font-semibold rounded-md "
                          onClick={() => handleDetails(item._id)}
                        >
                          Details
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          className="cursor-pointer py-2 px-4 bg-red-500 text-white font-semibold rounded-md "
                          onClick={() => {
                            setEdit((prev) => ({
                              ...prev,
                              userId: "",
                              role: "",
                              allowed: false,
                            }));
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="cursor-pointer py-2 px-4  bg-slate-400 font-semibold rounded-md "
                          onClick={() => editRole(edit.userId, edit.role)}
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-[#1E1E1E] rounded-lg h-100 flex flex-col items-center px-4 py-2 gap-4 overflow-y-scroll  ">
          <div className=" w-full rounded-4xl flex flex-col justify-center items-center gap-2">
            {!details?.image && !editDetails.allowPic ? (
              <div className=" rounded-xl bg-green-500">
                <p className="text-2xl py-8 px-10">
                  {details?.name.slice(0, 1)}
                </p>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  hidden
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
                <label htmlFor="image">
                  <img
                    src={
                      details?.image
                        ? details?.image
                        : imageFile
                        ? URL.createObjectURL(imageFile)
                        : assets.upload_area
                    }
                    alt=""
                    className=" w-24 cursor-pointer rounded-xl"
                  />
                </label>
              </>
            )}
            <div className="flex gap-2">
              <button
                className={`${
                  editDetails.allowPic ? "bg-red-700" : "bg-green-700"
                } text-white py-2 px-4 rounded-full cursor-pointer`}
                onClick={() => {
                  setEditDetails((prev) => ({
                    ...prev,
                    allowPic: !editDetails.allowPic,
                  }));
                }}
              >
                {editDetails.allowPic ? (
                  "Cancel"
                ) : (
                  <>
                    {" "}
                    <i className="fa-solid fa-pencil"></i> Profile Picture{" "}
                  </>
                )}
              </button>
              {editDetails.allowPic && (
                <button
                  className="text-white py-2 px-4 rounded-full cursor-pointer bg-green-700"
                  onClick={handleProfilePicture}
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Save"}
                </button>
              )}
            </div>
          </div>

          <div className="bg-[#2A2A2A] flex flex-col text-white px-4 py-2 rounded-md text-sm sm:text-lg ">
            {Object.entries(details || {})
              .filter(([key]) => !excludedKeys.includes(key))
              .map(([key, value]) => (
                <div key={key} className="flex gap-2 rounded-lg">
                  <b className="w-[30%] py-1 bg-black flex justify-center ">
                    {key}
                  </b>
                  <input
                    value={value || "None"}
                    className="w-[15rem]"
                    type={key === "bgColour" ? "color" : "text"}
                    readOnly
                  />
                </div>
              ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListUsers;
