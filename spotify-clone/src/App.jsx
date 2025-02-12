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

function App() {
  const PlayerLayout = () => {
    const { audioRef, track, songsData, isSongDisplay } =
      useContext(PlayerContext);

    return (
      <div className="h-screen bg-black px-2 sm:px-0">
        <div className="h-[6%]">
          <Navbar />
        </div>

        {songsData.length !== 0 ? (
          <>
            <div className="h-[84%] flex pt-2 px-2 ">
              <Sidebar />
              <Display />
              {isSongDisplay && <DisplaySong />}
            </div>
            <Player />
          </>
        ) : null}

        <audio
          ref={audioRef}
          src={track ? track.file : ""}
          preload="auto"
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
