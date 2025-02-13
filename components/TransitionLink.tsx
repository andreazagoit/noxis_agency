"use client";
import useCursorStore from "@/stores/useCursorStore";
import useNavigationStore from "@/stores/useNavigationStore";
import delay from "@/utils/delay";
import { useRouter } from "next/navigation";
import React, {
  ReactNode,
  cloneElement,
  isValidElement,
  ReactElement,
} from "react";

type TransitionLinkProps = {
  href: string;
  children: ReactNode;
  asChild?: boolean;
};

const TransitionLink = ({
  href,
  children,
  asChild = false,
}: TransitionLinkProps) => {
  const router = useRouter();
  const setShowBrand = useNavigationStore((state) => state.setShowBrand);
  const setPageState = useNavigationStore((state) => state.setPageState);
  const setCursorVariant = useCursorStore((state) => state.setCursorVariant);

  const handleNavigationChange = async (href: string) => {
    setPageState("loading");
    if (href === "/") {
      setShowBrand(false);
    } else {
      setShowBrand(true);
    }
    setCursorVariant("default");
    await delay(1);
    window.scroll(0, 0);
    router.push(href);
  };

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<any>, {
      onClick: () => handleNavigationChange(href),
    });
  }

  return <span onClick={() => handleNavigationChange(href)}>{children}</span>;
};

export default TransitionLink;
