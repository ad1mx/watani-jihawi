"use client";

import hd, { Options } from "humanize-duration";
import { Nunito, Tajawal } from "next/font/google";
import React, { useEffect, useState } from "react";

const tajawal = Tajawal({ weight: ["700"], subsets: ["arabic"] });
const nunito = Nunito({ weight: ["700"], subsets: ["latin"] });

const TimerPage = () => {
  const jihawiDate = new Date("2024-06-30T22:00:00");

  const [remaingTineString, setRemaingTineString] = useState<
    string | undefined
  >();
  const [date, setDate] = useState<string | undefined>();

  const textOptions = {
    units: ["w", "d", "h", "m"],
    language: "ar",
    digitReplacements: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    round: true,
  } satisfies Options;

  const updateTime = () => {
    const remaingTime = jihawiDate.getTime() - Date.now();

    const upText = `${hd(remaingTime, textOptions)} (${hd(remaingTime, {
      ...textOptions,
      units: ["d"],
    })})`;

    setRemaingTineString(upText);
  };

  useEffect(() => {
    setDate(
      `${jihawiDate.toLocaleDateString("ar", {
        dateStyle: "full",
      })} - ${jihawiDate.toLocaleTimeString(undefined, { hour12: false })}`
    );

    updateTime();

    const timeout = setInterval(updateTime, 1000);

    return () => clearInterval(timeout);
  });

  return (
    <main className="h-full flex flex-col justify-center px-4 items-center text-center">
      <header className={`${tajawal.className} text-3xl flex flex-col`}>
        <span className={`${nunito.className}`}>Time remaing to JIHAWI</span>
        <span>الوقت المتبقي للجهوي</span>
      </header>

      <div dir="rtl" className="mt-8 flex text-green-400">
        <p
          className={`mr-2 text-3xl font-semibold text-green-400 ${tajawal.className}`}
        >
          {remaingTineString ?? "..Loading remaing time"}
        </p>
      </div>

      <div className="mt-8 flex" dir="rtl">
        <p
          className={`text-3xl font-semibold text-blue-400 ${tajawal.className}`}
        >
          {date ?? "..Loading date"}
        </p>
      </div>
    </main>
  );
};

export default TimerPage;
