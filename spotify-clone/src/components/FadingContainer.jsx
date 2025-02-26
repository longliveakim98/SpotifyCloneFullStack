const FadingContainer = ({ children, className }) => {
  return (
    <div
      className={className}
      style={{
        maskImage:
          "linear-gradient(to right, rgba(0,0,0,1) 0%,rgba(0,0,0,1) 80%, rgba(0,0,0,0.3) 100% )",
      }}
    >
      {children}
    </div>
  );
};

export default FadingContainer;
