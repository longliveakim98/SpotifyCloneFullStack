import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddSong from "./pages/AddSong";
import AddAlbum from "./pages/AddAlbum";
import ListSong from "./pages/ListSong";
import ListAlbum from "./pages/ListAlbum";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ListUsers from "./pages/ListUsers";

export const url = import.meta.env.VITE_BASE_URL;

function App() {
  return (
    <>
      <div className="flex items-start min-h-screen">
        <ToastContainer />
        <Sidebar />
        <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
          <Navbar />
          <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
            <Routes>
              <Route>
                <Route path="/" element={<Navigate to="/list-song" />} />
                <Route path="add-song" element={<AddSong />} />
                <Route path="add-album" element={<AddAlbum />} />
                <Route path="list-song" element={<ListSong />} />
                <Route path="list-album" element={<ListAlbum />} />
                <Route path="list-users" element={<ListUsers />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
