import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import useColorThief from "use-color-thief";
import { sortColorsByBrightness } from "../utils/sortColorsByBrightness";

const DisplayArtist = () => {
  const params = useParams();

  const { getArtist, artistData, getAlbumsByArtist } =
    useContext(PlayerContext);
  const { name, image } = artistData;

  const { palette } = useColorThief(image, {
    format: "hex",
    colorCount: 3,
    quality: 10,
  });

  const sortedColors = sortColorsByBrightness(palette);
  useEffect(() => {
    getArtist(params.id);
    getAlbumsByArtist(params.id);
  }, []);
  return (
    <>
      {artistData ? (
        <div
          className="flex flex-col"
          style={{
            backgroundImage: `linear-gradient( ${
              sortedColors?.[1] || "#121212"
            } ,#121212,#121212)`,
          }}
        >
          <div
            className="bg-fixed bg-cover bg min-h-[30vh] flex justify-end px-8 py-4 gap-2 flex-col  "
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${image})`,
            }}
          >
            <div className="flex gap-2 items-center ">
              <div>
                <i className="fa-solid fa-check rounded-full bg-sky-400 px-1 py-1"></i>
              </div>
              <p className="font-semibold text-lg">Verified Artist</p>
            </div>
            <p className="font-bold text-6xl sm:text-8xl">{name}</p>
          </div>
          <div className=" min-h-[70vh] "></div>
        </div>
      ) : (
        <div className="flex justify-center items-center">Loading</div>
      )}
    </>
  );
};

export default DisplayArtist;
