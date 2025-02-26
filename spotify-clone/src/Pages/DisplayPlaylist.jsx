import { useParams } from "react-router-dom";
import { assets } from "../assets/frontend-assets/assets";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useState } from "react";
import { useEffect } from "react";
import SongRow from "../components/SongRow";

import useColorThief from "use-color-thief";
import { sortColorsByBrightness } from "../utils/sortColorsByBrightness";
import PlaylistAlbumItem from "../components/ui/PlaylistAlbumItem";
import PlaylistArtistItem from "../components/ui/PlaylistArtistItem";
import PlaylistSongItem from "../components/ui/PlaylistSongItem";
import { SearchContext } from "../context/SearchContext";
import RowContainers from "../components/ui/RowContainers";
import Popover from "../components/ui/Popover";
import Modal from "../components/ui/Modal";
import axios from "axios";
import { url } from "../App";

const DisplayPlaylist = () => {
  const params = useParams();
  const {
    getPlaylist,
    playlistData,
    playlistSongs,
    isOpen,
    setIsOpen,
    setPlaylistData,
    setUserPlaylists,
  } = useContext(PlayerContext);
  const {
    query,
    setQuery,
    results,
    getArtistSongs,
    getAlbumSongs,
    songs,
    album,
    artist,
    albums,
    getAlbumsByArtist,
    loading,
    setResults,
  } = useContext(SearchContext);

  const [formImage, setFormImage] = useState(false);
  const [formName, setFormName] = useState(playlistData?.name);
  const [formDesc, setFormDesc] = useState(playlistData?.desc);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", playlistData._id);
    formData.append("name", formName);
    formData.append("desc", formDesc);
    formData.append("image", formImage);
    formData.append("oldImage", playlistData?.image);

    try {
      const { data } = await axios.patch(`${url}/api/playlist/edit`, formData);

      if (data.success) {
        setPlaylistData((prev) => ({
          ...prev,
          name: data.playlist.name,
          desc: data.playlist.desc,
          image: data.playlist.image,
        }));

        setUserPlaylists((prev) =>
          prev.map((item) =>
            item._id === playlistData._id
              ? {
                  ...item,
                  name: data.playlist.name,
                  desc: data.playlist.desc,
                  image: data.playlist.image,
                }
              : item
          )
        );

        setIsOpen(false);
        setFormName(data.playlist.name);
        setFormDesc(data.playlist.desc);
        setFormImage(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [hasImage, setHasImage] = useState(false);

  const [searchPage, setSearchPage] = useState("all");
  const [isFromArtist, setIsFromArtist] = useState(false);

  const items = [
    {
      iconClass: "fa-solid fa-pen",
      label: "Edit details",
      onClick: () => setIsOpen(true),
    },
  ];

  const { palette } = useColorThief(
    playlistData?.image || playlistSongs[0]?.image,
    {
      format: "hex",
      colorCount: 3,
      quality: 10,
    }
  );

  const bgColor = sortColorsByBrightness(palette);

  useEffect(() => {
    if (params.id) {
      getPlaylist(params.id);
    }
    setSearchPage("all");
    setResults({
      songs: [],
      albums: [],
      artists: [],
    });
    setQuery("");
  }, [params.id]);

  useEffect(() => {
    if (playlistData?.image || playlistSongs[0]?.image) {
      setHasImage(true);
    } else {
      setHasImage(false);
    }

    if (playlistData?.name || playlistData?.desc) {
      setFormName(playlistData?.name);
      setFormDesc(playlistData?.desc);
    }
  }, [playlistData?.image, playlistSongs[0]?.image]);

  useEffect(() => {
    if (searchPage === "all") {
      setIsFromArtist(false);
    }
  }, [searchPage]);

  return (
    <div className="bg-[#121212] h-full">
      <div
        className={`${isOpen ? "opacity-30" : ""} transition-all duration-300`}
      >
        <div
          className=" overflow-auto "
          style={{
            backgroundImage: `linear-gradient( ${
              playlistData?.image || playlistSongs[0]?.image
                ? bgColor[1]
                : "#1E1E1E"
            },#1E1E1E,#121212`,
          }}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div className="mt-10 flex gap-8 flex-col sm:flex-row md:items-end px-4   ">
              <div className="flex items-center justify-center ">
                <div
                  className={`flex items-center justify-center h-48 w-48 border cursor-pointer mb-3 group relative shadow-xl shadow-black  ${
                    hasImage ? "border-none" : "border"
                  }`}
                >
                  {hasImage ? (
                    <img
                      src={playlistData?.image || playlistSongs[0]?.image}
                      className="group-hover:opacity-30"
                      onClick={() => setIsOpen(true)}
                    />
                  ) : (
                    <div
                      className="rounded group-hover:hidden"
                      onClick={() => setIsOpen(true)}
                    >
                      <i className="fa-solid fa-music text-4xl"></i>
                    </div>
                  )}
                  <div className="hidden group-hover:flex absolute flex-col justify-center items-center">
                    <img
                      className="w-15 rounded "
                      src={assets.plus_icon}
                      alt=""
                    />
                    <p className="text-sm  italic">Edit Image</p>
                  </div>
                </div>
              </div>

              <div
                className="flex flex-col sm:justify-between"
                onClick={() => setIsOpen(true)}
              >
                <p className="text-sm font-semibold">Public Playlist</p>
                <h2 className="text-3xl font-bold mb-4 sm:text-7xl">
                  {playlistData?.name}
                </h2>
                <h4 className="">{playlistData?.desc}</h4>
                <div className="py-2 flex gap-2 items-center">
                  {!playlistData?.owner.image ? (
                    <div className="bg-green-600 rounded-full w-6 flex justify-center items-center text-black font-bold">
                      <p>{playlistData?.owner?.name?.slice(0, 1) || "?"}</p>
                    </div>
                  ) : (
                    <img
                      className="inline-block w-8 mr-6 rounded-full"
                      src={playlistData?.owner.image}
                      alt=""
                    />
                  )}
                  <b className=" text-sm">{playlistData?.owner.name}</b>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Popover
                icon={
                  <i className="fa-solid fa-ellipsis text-xl p-2 hover:bg-[#ffffff1a] rounded-full cursor-pointer "></i>
                }
                content={
                  <div
                    className={`grid grid-rows-${items.length} min-w-[15rem]`}
                  >
                    {items.map((item, i) => (
                      <RowContainers
                        key={i}
                        iconClass={item.iconClass}
                        label={item.label}
                        onClick={item.onClick}
                      />
                    ))}
                  </div>
                }
                contentClass="-left-20 top-10"
              />
            </div>
          </div>
          <div className="w-full mt-4 sm:mt-0 px-4">
            <div className="hidden sm:grid grid-cols-6 gap-4 items-center mt-1  text-gray-400 text-xs  ">
              <div className="col-span-3 flex gap-4 items-center ">
                <p>#</p>
                <p>Title</p>
              </div>
              <p className="col-span-2 text-center ">Plays</p>
              <div className="col-span-1 flex justify-center">
                <img className="w-3" src={assets.clock_icon} alt="" />
              </div>
            </div>
            <hr className="text-gray-700 mt-2" />
          </div>
          <div>
            {playlistSongs?.length > 0 ? (
              playlistSongs
                .slice(0, 6)
                .map((song, i) => (
                  <SongRow key={i} song={song} onImage number={i + 1} />
                ))
            ) : (
              <div className="flex flex-col justify-center items-center h-[20vh] ">
                <p className="text-3xl font-bold  text-gray-400 ">
                  Add a song to the playlist
                </p>
                <p className="text-xl font-bold  text-gray-400 italic">
                  You can use the search bar below
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="bg-[#121212] ">
          {playlistSongs?.length > 6 &&
            playlistSongs
              .slice(6)
              .map((song, i) => (
                <SongRow key={i} song={song} onImage number={i + 6} />
              ))}
          <hr className="text-gray-700 mx-4 " />
        </div>
        {/* Search Bar */}
        <div className="bg-[#121212] pt-3 flex flex-col gap-2">
          <div className="flex gap-2 border-2 py-2 px-5 rounded-sm sm:w-[40vw] w-[90vw] bg-[#1E1E1E] border-[#2A2A2A] hover:border-white ml-2 items-center  ">
            <img src={assets.search_icon} className="size-4" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search artist, song, or album..."
              className="border-none border-transparent px-1 text-lgfont-medium outline-none w-[16rem] lg:w-[36rem] "
            />
          </div>
          {/* Results */}
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="mb-10">
              {searchPage === "all" && (
                <div className="flex flex-col">
                  {results.songs.length > 0 &&
                    results.songs.map((song, i) => {
                      const isAdded = playlistSongs.some(
                        (s) => s._id === song._id
                      );
                      return (
                        <PlaylistSongItem
                          key={i}
                          song={song}
                          isAdded={isAdded}
                          playlistId={playlistData._id}
                        />
                      );
                    })}
                  {results.albums.length > 0 &&
                    results.albums.map((album, i) => (
                      <PlaylistAlbumItem
                        album={album}
                        key={i}
                        onClick={() => {
                          getAlbumSongs(album);
                          setSearchPage("album");
                        }}
                      />
                    ))}
                  {results.artists.length > 0 &&
                    results.artists.map((artist, i) => (
                      <PlaylistArtistItem
                        artist={artist}
                        key={i}
                        onClick={() => {
                          getArtistSongs(artist._id);
                          getAlbumsByArtist(artist._id);
                          setSearchPage("artist");
                        }}
                      />
                    ))}
                </div>
              )}
              {searchPage === "album" && (
                <div className="min-h-[50vh] flex flex-col mt-2 ">
                  <div className="flex gap-2 px-4 items-center mb-2">
                    <div
                      onClick={() => {
                        isFromArtist
                          ? setSearchPage("artist")
                          : setSearchPage("all");
                      }}
                      className="cursor-pointer hover:bg-[#1e1e1e] p-2 rounded-full"
                    >
                      <img src={assets.arrow_left} className="w-4" alt="" />
                    </div>
                    <p className="ml-2">{album?.name}</p>
                  </div>
                  {songs
                    ?.filter((song) => song.album?._id === album?._id)
                    .map((song, i) => {
                      const isAdded = playlistSongs.some(
                        (s) => s._id === song._id
                      );
                      return (
                        <PlaylistSongItem
                          key={i}
                          song={song}
                          isAdded={isAdded}
                          playlistId={playlistData._id}
                        />
                      );
                    })}
                </div>
              )}
              {searchPage === "artist" && (
                <div className="min-h-[50vh] flex flex-col mt-2 ">
                  <div className="flex gap-2 px-4 items-center mb-2">
                    <div
                      onClick={() => setSearchPage("all")}
                      className="cursor-pointer"
                    >
                      <img src={assets.arrow_left} className="w-4" alt="" />
                    </div>
                    <p className="ml-2">{artist?.name}</p>
                  </div>
                  {songs?.length > 0 &&
                    songs
                      ?.filter((song) => song.artist._id === artist?._id)
                      .map((song, i) => {
                        const isAdded = playlistSongs.some(
                          (s) => s._id === song._id
                        );
                        return (
                          <PlaylistSongItem
                            key={i}
                            song={song}
                            isAdded={isAdded}
                            playlistId={playlistData._id}
                          />
                        );
                      })}
                  {albums?.length > 0 &&
                    albums
                      ?.filter((album) => album.artist._id === artist?._id)
                      .map((album, i) => {
                        return (
                          <PlaylistAlbumItem
                            key={i}
                            album={album}
                            playlistId={playlistData._id}
                            onClick={() => {
                              getAlbumSongs(album);
                              setIsFromArtist(true);
                              setSearchPage("album");
                            }}
                          />
                        );
                      })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isOpen}>
        <div
          className="flex flex-col p-4 rounded-md gap-4"
          style={{
            backgroundImage:
              "linear-gradient(#1E1E1E,#222222, #2A2A2A,#323232)",
          }}
        >
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-2xl">Edit details</h2>
            <img
              src={assets.plus_icon}
              alt=""
              className="rotate-45 w-8 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-[80vw] md:w-[50vw] lg:w-[40vw] xl:w-[25vw] flex flex-col rounded-md gap-4 justify-center"
          >
            <div className="w-full gap-4 grid sm:grid-cols-5 items-center">
              {/* Image Upload Section */}
              <div
                className={`flex items-center justify-center border cursor-pointer w-30 sm:w-full group relative sm:col-span-2 col-span-5 ${
                  hasImage ? "border-none" : "border"
                }`}
              >
                {/* Display Image or Music Icon */}
                {hasImage ? (
                  <img
                    src={
                      formImage
                        ? URL.createObjectURL(formImage)
                        : playlistData?.image || playlistSongs[0]?.image
                    }
                    className="group-hover:opacity-30 rounded-md "
                    alt="Playlist Cover"
                  />
                ) : (
                  <div className="rounded group-hover:hidden">
                    <i className="fa-solid fa-music text-4xl"></i>
                  </div>
                )}

                <div
                  className="xl:hidden absolute justify-end items-end"
                  onClick={() => document.getElementById("imageUpload").click()}
                >
                  <p>Edit Image</p>
                </div>

                {/* Edit Overlay (Shows on Hover for PC, Always Visible on Mobile) */}
                <div className="hidden group-hover:flex  absolute flex-col justify-center items-center rounded-md">
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <img
                      className="w-15 rounded"
                      src={assets.plus_icon}
                      alt="Edit Icon"
                    />
                    <p className="text-sm italic">Edit Image</p>
                  </label>
                </div>
              </div>

              {/* Hidden File Input */}
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFormImage(file);
                  }
                }}
              />

              {/* Playlist Name & Description */}
              <div className="flex flex-col justify-between items-start w-full sm:col-span-3 col-span-5 h-full gap-2">
                <input
                  type="text"
                  value={formName}
                  className="p-2 bg-[#3A3A3A] w-[80vw] sm:w-full rounded-md"
                  placeholder="Playlist Name"
                  onChange={(e) => setFormName(e.target.value)}
                />

                <textarea
                  value={formDesc || ""}
                  className="p-2 bg-[#3A3A3A] w-[80vw] sm:w-full resize-none rounded-md"
                  placeholder="Description"
                  rows={5}
                  onChange={(e) => setFormDesc(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="bg-white text-black font-semibold px-4 py-2 rounded-full cursor-pointer shadow-md shadow-white/50"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default DisplayPlaylist;
