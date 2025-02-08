"use client";
import useNavigationStore from "@/stores/useNavigationStore";
import delay from "@/utils/delay";
import { redirect, useRouter } from "next/navigation";
import React, { ReactNode } from "react";

type TransitionLinkProps = {
  href: string;
  children: ReactNode;
};

const TransitionLink = ({ href, children }: TransitionLinkProps) => {
  const router = useRouter();
  const setShowBrand = useNavigationStore((state) => state.setShowBrand);
  const setTransitionState = useNavigationStore(
    (state) => state.setTransitionState
  );

  const handleNavigationChange = async (href: string) => {
    setTransitionState("open");
    if (href === "/") {
      setShowBrand(false);
    } else {
      setShowBrand(true);
    }
    await delay(1);
    router.push(href);
    await delay(0.5);

    setTransitionState("close");
  };

  return <span onClick={() => handleNavigationChange(href)}>{children}</span>;
};

export default TransitionLink;
