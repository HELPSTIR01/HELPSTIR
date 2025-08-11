"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./CountdownTimer.scss";
import Image from "next/image";
interface DateType {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const CountdownTimer = () => {
  const targetDate = new Date(process.env.NEXT_PUBLIC_GO_LIVE_DATE!);
  const [isClient, setIsClient] = useState(false);
  const calculateTimeLeft = useCallback(() => {
    if (!isClient) return null;
    const difference = targetDate.getTime() - new Date().getTime();

    if (difference > 0) {
      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      ).toLocaleString("en-IN", {
        minimumIntegerDigits: 2,
      });

      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ).toLocaleString("en-IN", {
        minimumIntegerDigits: 2,
      });
      const minutes = Math.floor((difference / 1000 / 60) % 60).toLocaleString(
        "en-IN",
        {
          minimumIntegerDigits: 2,
        }
      );
      const seconds = Math.floor((difference / 1000) % 60).toLocaleString(
        "en-IN",
        {
          minimumIntegerDigits: 2,
        }
      );
      return { days, hours, minutes, seconds };
    }
    return null;
  }, [isClient]);
  const [timeLeft, setTimeLeft] = useState<DateType | null>(
    calculateTimeLeft()
  );
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (isClient) {
      setTimeLeft(calculateTimeLeft() as DateType);
    }
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft() as DateType);
    }, 1000);
    return () => clearInterval(interval);
  }, [isClient]);

  if (!timeLeft) return null;
  return (
    <div className="helpstir-timer">
      <div className="timer-header">
        {/* <img src="/images/logo.svg" alt="helpstir" /> */}
        <img src="/images/logo_light.svg" alt="helpstir" />
        {/* <span className="live-text">live in</span> */}
      </div>
      <div className="timer-container">
        <div className="time-section">
          <span className="number">{timeLeft.days}</span>
          <span className="unit">d</span>
        </div>
        <div className="time-section">
          <span className="number">{timeLeft.hours}</span>
          <span className="unit">h</span>
        </div>
        <div className="time-section">
          <span className="number">{timeLeft.minutes}</span>
          <span className="unit">m</span>
        </div>
        <div className="time-section">
          <span className="number">{timeLeft.seconds}</span>
          <span className="unit">s</span>
        </div>
      </div>
      <div className="indicator-container">
        <Image
          src="/images/helpicon.svg"
          alt="indicator"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default CountdownTimer;
