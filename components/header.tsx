import React from "react";
import Container from "./ui/container";

type HeaderProps = {};

const Header = () => {
  return (
    <div className="fixed w-full bg-black/30 backdrop-blur border-b border-white/10 z-[1000] mix-blend-difference">
      <Container>
        <div className="flex justify-between py-4 items-center text-white">
          Header<div>links</div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
