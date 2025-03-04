import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import useColorThief from "use-color-thief";
import { sortColorsByBrightness } from "../utils/sortColorsByBrightness";
import Header from "../components/ui/Header";
import SongRow from "../components/SongRow";
import AlbumItem from "../components/AlbumItem";

const DisplayArtist = () => {
  const params = useParams();

  const { getArtist, artistData, getAlbumsByArtist, songsData, albumsData } =
    useContext(PlayerContext);

  const { palette } = useColorThief(artistData?.image, {
    format: "hex",
    colorCount: 3,
    quality: 10,
  });

  const albums = albumsData?.filter((album) => album.artist._id === params?.id);

  const sortedColors = sortColorsByBrightness(palette);
  useEffect(() => {
    getArtist(params.id);
    getAlbumsByArtist(params.id);
  }, []);

  return (
    <>
      {artistData ? (
        <div
          className="flex flex-col overflow-auto"
          style={{
            backgroundImage: `linear-gradient( ${
              sortedColors?.[1] || "#121212"
            } ,#121212,#121212)`,
          }}
        >
          <div
            className="bg-fixed bg-cover bg min-h-[30vh] flex justify-end px-8 py-4 gap-2 flex-col  "
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${artistData?.image})`,
            }}
          >
            <div className="flex gap-2 items-center ">
              <div>
                <i className="fa-solid fa-check rounded-full bg-sky-400 px-1 py-1"></i>
              </div>
              <p className="font-semibold text-lg">Verified Artist</p>
            </div>
            <p className="font-bold text-6xl sm:text-8xl">{artistData?.name}</p>
          </div>
          <div className="px-4 mt-4">
            <div className="flex flex-col">
              <div className="grid grid-cols-2">
                <div className="col-span-2 xl:col-span-1 flex flex-col">
                  <Header>Popular</Header>
                  {songsData
                    ?.filter((song) => song.artist._id === params?.id)
                    .map((song, i) => (
                      <SongRow key={i} song={song} onImage />
                    ))}
                </div>
                {albums.length > 0 && (
                  <div className="flex overflow-x-auto flex-col">
                    <Header>Albums</Header>
                    <div className="flex gap-2">
                      {albums.map((album, i) => (
                        <AlbumItem
                          {...album}
                          id={album._id}
                          key={i}
                          className="min-w-[180px] w-[180px]"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">Loading</div>
      )}
    </>
  );
};

export default DisplayArtist;
