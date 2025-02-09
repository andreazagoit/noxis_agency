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
  const setPageState = useNavigationStore((state) => state.setPageState);

  const handleNavigationChange = async (href: string) => {
    setPageState("loading");
    if (href === "/") {
      setShowBrand(false);
    } else {
      setShowBrand(true);
    }
    await delay(1);
    router.push(href);
  };

  return <span onClick={() => handleNavigationChange(href)}>{children}</span>;
};

export default TransitionLink;
