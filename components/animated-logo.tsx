import { motion } from "framer-motion";

const AnimatedLogo = ({ centerLetter, firstPart, lastPart, open }: any) => {
  // Variants for the center letter (X) with rotation
  const centerLetterVariants = {
    hidden: { opacity: 0, scale: 0, rotate: 90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
  };

  // Variants for firstPart and lastPart (fade-in effect)
  const partVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="flex justify-center items-center space-x-2"
      initial="hidden"
      animate={open ? "visible" : "hidden"}
    >
      {/* Animate the first part */}
      <motion.div
        className="flex"
        initial="hidden"
        animate={open ? "visible" : "hidden"}
        variants={partVariants}
        transition={{
          duration: 0.5,
        }}
      >
        <span>{firstPart}</span>
      </motion.div>

      {/* Animate the center letter (X) with rotation */}
      <motion.span
        key="center"
        variants={centerLetterVariants}
        transition={{
          duration: 0.5,
          delay: 0, // Animate immediately
        }}
      >
        {centerLetter}
      </motion.span>

      {/* Animate the last part */}
      <motion.div
        className="flex"
        initial="hidden"
        animate={open ? "visible" : "hidden"}
        variants={partVariants}
        transition={{
          delay: 0.5, // Delay after centerLetter animation ends
        }}
      >
        <span>{lastPart}</span>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedLogo;
