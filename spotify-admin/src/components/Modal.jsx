export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className=" rounded-lg shadow-lg flex flex-col bg-[#1E1E1E] ">
        <div className="flex justify-end px-4 py-2">
          <button
            className=" text-xl font-bold text-white cursor-pointer"
            onClick={onClose}
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
