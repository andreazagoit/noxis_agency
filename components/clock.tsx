"use client";
import React, { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState<Date | null>(null); // Initialize time as null
  const [isClient, setIsClient] = useState(false); // State to track if component is mounted on client

  useEffect(() => {
    setIsClient(true); // Component is now mounted on the client
    const interval = setInterval(() => {
      setTime(new Date()); // Update time every second
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  const formattedTime = time ? time.toLocaleTimeString() : ""; // Format time if available

  return (
    <p className="text-sm md:text-xl" suppressHydrationWarning>
      {formattedTime}
    </p>
  );
};

export default Clock;
