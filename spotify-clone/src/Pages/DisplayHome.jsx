import AlbumItem from "../components/AlbumItem";
import ArtistItem from "../components/ArtistItem";
import SongsItem from "../components/SongsItem";
import Header from "../components/ui/Header";
import { PlayerContext } from "../context/PlayerContext";
import { useContext } from "react";

const DisplayHome = () => {
  const { songsData, albumsData, artistsData } = useContext(PlayerContext);
  return (
    <div className="mx-6 overflow-y-auto py-6 gap-y-4">
      <div className=" mb-4 ">
        <Header>Popular Artists</Header>
        <div className="flex overflow-auto ">
          {artistsData.map((artist, i) => (
            <ArtistItem key={i} artist={artist} />
          ))}
        </div>
      </div>
      {albumsData.length > 0 && (
        <div className=" mb-4 ">
          <Header>Popular Albums</Header>
          <div className="flex overflow-auto ">
            {albumsData?.map((album, i) => (
              <AlbumItem key={i} {...album} id={album._id} />
            ))}
          </div>
        </div>
      )}
      <div className=" mb-4 ">
        <Header>Today Biggest Hits</Header>
        <div className="flex overflow-auto ">
          {songsData.map((song, i) => (
            <SongsItem key={i} {...song} id={song._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayHome;
