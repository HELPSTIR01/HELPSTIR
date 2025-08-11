"use client";
import React, { memo } from "react";
import CountdownTimer from "@/components/CountdownTimer/CountdownTimer";
import "./LandingPage.scss";
import { useRouter } from "next/navigation";
import RightSection from "../RightSection";

export default memo(({ mode = "" }: { mode: string | undefined }) => {
  const router = useRouter();

  return (
    <div className="landing-container">
      {/* Countdown Timer */}
      <CountdownTimer />
<div> <p className="tag-line">Help to Hope, One Click Away.</p></div>
      {/* Two-Column Section */}
      <div className="content-section">
        {/* Left Section */}
        <div className="left-section">
          <div className="header-button-container">
            <h2>
              Do You Believe in a <strong>Brighter Tomorrow?</strong>
            </h2>
          </div>

          <p className="subtext">CREATE IT WITH US</p>

          <p className="signup-text">
            <span className="highlight">First 1000 Signups</span> get early
            access to network for purpose!
          </p>
          <button
            className="cta-button"
            onClick={() => {
              router.push("/signup");
            }}
          >
            Join HELPSTiR
          </button>
        </div>

        {/* Vertical Separator */}
        <div className="separator"></div>
        <hr />
        {/* Right Section */}
        <RightSection mode={mode} />
      </div>
    </div>
  );
});
