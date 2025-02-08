"use client";
import React, { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date()); // Stato per tenere traccia dell'ora

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date()); // Ogni secondo aggiorniamo l'ora
    }, 1000);

    // Pulisce l'intervallo quando il componente viene smontato
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString();

  return <p className="text-sm md:text-xl">{formattedTime}</p>;
};

export default Clock;
