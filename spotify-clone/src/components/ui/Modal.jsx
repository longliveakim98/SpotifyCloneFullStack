const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-10  ">
      {children}
    </div>
  );
};

export default Modal;
