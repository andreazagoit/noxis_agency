import React, { useEffect, useState } from "react";
import * as motion from "motion/react-client";

const Menu = () => {
  const menuVariants = {
    open: { scale: 1 },
    close: { scale: 0 },
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <motion.div
      style={{
        position: "fixed",
        background: "black",
        top: 100,
        right: 100,
        height: 64,
        width: 64,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flexDirection: "column",
        gap: 8,
      }}
      animate={open ? "open" : "close"}
      variants={menuVariants}
      transition={{
        type: "spring",
        duration: 1,
        bounce: 0.2,
        delay: 1,
      }}
    >
      <span className="bg-white h-[2px] w-8" />
      <span className="bg-white h-[2px] w-8" />
    </motion.div>
  );
};

export default Menu;
