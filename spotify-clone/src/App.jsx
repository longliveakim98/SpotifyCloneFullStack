import { useContext } from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import { PlayerContext } from "./context/PlayerContext";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import DisplaySong from "./components/DisplaySong";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

import FloatingPlayer from "./components/ui/FloatingPlayer";

export const url = import.meta.env.VITE_BASE_URL;

function App() {
  const PlayerLayout = () => {
    const { audioRef, track, songsData, isSongDisplay, playNextSong } =
      useContext(PlayerContext);

    return (
      <div className="h-screen bg-black px-2 sm:px-0">
        <div className="h-[6%]">
          <Navbar />
        </div>

        {songsData?.length !== 0 ? (
          <>
            <div
              className={`h-[94%] lg:h-[90%] ${
                track ? "xl:h-[84%]" : "xl:h-[92%]"
              } flex pt-2 lg:px-4`}
            >
              <Sidebar />
              <Display />
              <div
                className={`hidden xl:block ${
                  isSongDisplay ? "xl:w-[35%]" : ""
                } `}
              >
                {isSongDisplay && <DisplaySong />}
              </div>
            </div>

            <Player />
            <FloatingPlayer />
          </>
        ) : null}

        <audio
          ref={audioRef}
          src={track ? track.file : ""}
          preload="auto"
          onEnded={playNextSong}
        ></audio>
      </div>
    );
  };
  return (
    <>
      <Routes>
        <Route path="*" element={<PlayerLayout />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
