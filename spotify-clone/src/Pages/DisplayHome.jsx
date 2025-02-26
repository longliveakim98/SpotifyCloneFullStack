import AlbumItem from "../components/AlbumItem";
import ArtistItem from "../components/ArtistItem";
import FadingContainer from "../components/FadingContainer";
import SongsItem from "../components/SongsItem";
import Header from "../components/ui/Header";
import { PlayerContext } from "../context/PlayerContext";
import { useContext } from "react";

const DisplayHome = () => {
  const { songsData, albumsData, artistsData } = useContext(PlayerContext);

  return (
    <div className="mx-6 overflow-y-auto py-6 gap-y-4 ">
      <div className="grid grid-cols-2">
        <div className="col-span-2 sm:col-span-1"></div>
        <div className="col-span-2 sm:col-span-1"></div>
      </div>
      <FadingContainer className=" mb-4 ">
        <Header>Popular Artists</Header>
        <div className="flex overflow-auto ">
          {artistsData?.map((artist, i) => (
            <ArtistItem key={i} artist={artist} />
          ))}
        </div>
      </FadingContainer>
      {albumsData.length > 0 && (
        <FadingContainer className=" mb-4 ">
          <Header>Popular Albums</Header>
          <div className="flex overflow-auto ">
            {albumsData?.map((album, i) => (
              <AlbumItem
                key={i}
                {...album}
                id={album._id}
                className="min-w-[180px] w-[230px]"
              />
            ))}
          </div>
        </FadingContainer>
      )}
      <FadingContainer className=" mb-4 ">
        <Header>Today Biggest Hits</Header>
        <div className="flex overflow-auto ">
          {songsData?.map((song, i) => (
            <SongsItem key={i} {...song} id={song._id} />
          ))}
        </div>
      </FadingContainer>
    </div>
  );
};

export default DisplayHome;
