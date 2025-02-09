"use client";
import { useEffect } from "react";
import useNavigationStore from "@/stores/useNavigationStore";

const PageInitializer = () => {
  const setPageState = useNavigationStore((state) => state.setPageState);

  useEffect(() => {
    setPageState("ready");
  }, []);

  return null;
};

export default PageInitializer;
