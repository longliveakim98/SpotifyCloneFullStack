import { useContext } from "react";
import { assets } from "../assets/frontend-assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Popover from "./ui/Popover";

import SearchBar from "./ui/SearchBar";

const Navbar = () => {
  const { user, userDetail, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-between items-center py-1.5 semi-bold px-5">
        <div className="hidden items-center gap-2 sm:flex">
          <button className="hover:bg-[#ffffff1a] p-2 rounded-full">
            <img
              className="w-8 p-2 rounded-2xl cursor-pointer"
              src={assets.arrow_left}
              alt=""
              onClick={() => navigate(-1)}
            />
          </button>
          <button className="hover:bg-[#ffffff1a] p-2 rounded-full ">
            <img
              className="w-8 p-2 rounded-2xl cursor-pointer"
              src={assets.arrow_right}
              alt=""
              onClick={() => navigate(+1)}
            />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="rounded-full hover:bg-[#ffffff1a] p-4 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={assets.home_icon} alt="" className="w-8  " />
          </button>
          <div className="hidden sm:block  ">
            <Popover icon={<SearchBar />} />
          </div>
        </div>

        <div className="flex items-center gap-4 ">
          <p className="font-semibold text-[12px] md:text-[20px] text-gray-300 hover:text-white cursor-pointer hidden sm:block ">
            Premium
          </p>

          <div className="bg-white w-0.5 h-10 hidden sm:block" />

          <p className="font-semibold text-[10px] md:text-[15px] text-gray-300 hover:text-white cursor-pointer hidden sm:block">
            Install App
          </p>

          {!user && (
            <>
              <p
                className="font-semibold text-[15px] text-gray-300 hover:text-white cursor-pointer hidden xl:block"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </p>
              <p
                className="bg-white text-black py-[0.5rem] px-[1rem] md:px-[2rem] rounded-4xl text-[10px] md:text-[15px] font-semibold cursor-pointer hover:scale-110 "
                onClick={() => navigate("/login")}
              >
                Login
              </p>
            </>
          )}
          {user && (
            <Popover
              content={
                <div className="grid grid-rows-4 z-20">
                  <p className="text-sm sm:text-base text-white rounded-sm font-semibold hover:bg-[#3b3b3bbb] py-3 cursor-pointer pl-2">
                    Account
                  </p>
                  <p className="text-sm sm:text-base text-white rounded-sm font-semibold hover:bg-[#3b3b3bbb] py-3 cursor-pointer pl-2">
                    Profile
                  </p>
                  <p className="text-sm sm:text-base text-white rounded-sm font-semibold hover:bg-[#3b3b3bbb] py-3 cursor-pointer pl-2">
                    Account
                  </p>
                  <p
                    className="text-sm sm:text-base text-white rounded-sm font-semibold hover:bg-[#3b3b3bbb] py-3 cursor-pointer pl-2"
                    onClick={logout}
                  >
                    Log Out
                  </p>
                </div>
              }
              icon={userDetail?.name?.slice(0, 1)}
              contentClass="top-10 -left-10 w-48"
              iconClass="bg-purple-500"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
