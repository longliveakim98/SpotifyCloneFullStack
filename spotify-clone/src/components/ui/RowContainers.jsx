const RowContainers = ({ iconClass, label, onClick }) => {
  return (
    <div
      className="flex hover:bg-[#3b3b3bbb] py-3 cursor-pointer pl-2 rounded-sm items-center gap-2"
      onClick={onClick}
    >
      <i className={iconClass}></i>
      <p className="text-sm sm:text-base text-white  font-semibold ">{label}</p>
    </div>
  );
};

export default RowContainers;
