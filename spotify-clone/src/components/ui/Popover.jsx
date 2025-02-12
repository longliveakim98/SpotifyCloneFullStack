import { useState, useRef, useEffect } from "react";

const Popover = ({ icon, content, iconClass, contentClass }) => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block " ref={popoverRef}>
      <button
        onClick={() => setOpen(!open)}
        className={` ${iconClass} text-white px-4 py-2 text-sm rounded-full cursor-pointer`}
      >
        {icon}
      </button>

      {open && (
        <div
          className={`absolute ${contentClass} transform -translate-x-1/2 mt-2 bg-[#1E1E1E] shadow-lg border rounded-md py-1 px-1 border-[#2A2A2A] z-10 `}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
