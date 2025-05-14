"use client";
import React, { useEffect, useState } from "react";
import hum, { Options } from "humanize-duration";

const arabicHumanizer = hum.humanizer({
  language: "ar",
  units: ["w", "d", "h"],
  digitReplacements: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  round: true,
});

const TimerCard = ({ name }: { name: "watani" | "jihawi" }) => {
  const wataniDate = new Date("2025-05-29T00:00:00");
  const jihawiDate = new Date("2025-05-26T00:00:00");
  const date = name === "watani" ? wataniDate : jihawiDate;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  });

  const dateText = date.toLocaleDateString("ar", {
    dateStyle: "full",
  });
  // const timeText = date.toLocaleTimeString(undefined, {
  //   hour12: false,
  // });

  const [remainingText, setRemainingText] = useState(
    arabicHumanizer(date.getTime() - Date.now())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingText(arabicHumanizer(date.getTime() - Date.now()));
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="flex flex-col items-center justify-center w-[250px] sm:w-[300px] md:w-[350px] py-6 bg-emerald-900 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold">
        {name === "watani" ? "الإمتحان الوطني" : "الإمتحان الجهوي"}
      </h2>
      <div className="mt-2 flex flex-col items-center">
        <p className="font-semibold text-xl text-blue-400">
          {loading ? "..." : dateText}
        </p>
        <p className="font-bold text-xl text-emerald-400">{remainingText}</p>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <main
      dir="rtl"
      className="flex flex-col text-center items-center justify-center h-screen bg-emerald-950 text-emerald-50"
    >
      <h1 className="text-2xl lg:text-3xl font-bold">
        الوقت المتبقي للإمتحان الوطني والجهوي بالمغرب 2025!
      </h1>
      <div className="flex flex-col lg:flex-row gap-4 mt-12">
        <TimerCard name="jihawi" />
        <TimerCard name="watani" />
      </div>
    </main>
  );
};

export default HomePage;
