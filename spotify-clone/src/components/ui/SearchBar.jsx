import { useEffect, useState } from "react";
import { assets } from "../../assets/frontend-assets/assets";

import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!query) {
      navigate(`/`);
    }
    if (query) {
      navigate(`/search?query=${query}`);
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return (
    <div className="flex gap-2 border-2 py-2 px-5 rounded-full bg-[#1E1E1E] border-[#2A2A2A] hover:border-white">
      <img src={assets.search_icon} className="size-8" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search artist, song, or album..."
        className="border-none border-transparent px-1 text-lgfont-medium outline-none w-[16rem] lg:w-[20rem]"
      />
    </div>
  );
};

export default SearchBar;
