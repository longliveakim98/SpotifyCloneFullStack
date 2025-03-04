import * as motion from "motion/react-client";

const Transition = () => {
  return (
    <div className="relative">
      <motion.div
        className="fixed  w-full h-full bg-[#003A10] origin-right"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="fixed left-0  w-100 h-full bg-[#003A10] origin-right"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
};

export default Transition;
