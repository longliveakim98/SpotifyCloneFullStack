const RowContainers = ({ iconClass, label }) => {
  return (
    <div className="flex hover:bg-[#3b3b3bbb] py-3 cursor-pointer pl-2 rounded-sm items-center gap-2">
      <i className={iconClass}></i>
      <p className="text-sm sm:text-base text-white  font-semibold ">{label}</p>
    </div>
  );
};

export default RowContainers;
