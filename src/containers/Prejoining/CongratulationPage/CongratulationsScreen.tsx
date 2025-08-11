"use client";
import React from "react";
import CountdownTimer from "@/components/CountdownTimer/CountdownTimer";
import { SocialLinks } from "@/types/sociallinks.types";
import { Youtube, Instagram, Linkedin } from "lucide-react"; // Import Lucide icons

import "./CongratulationsScreen.scss";

interface CongratulationsScreenProps {
  socialLinks: SocialLinks;
  note: string;
  successMessage: string;
}

const CongratulationsScreen: React.FC<CongratulationsScreenProps> = ({
  socialLinks,
  note = "",
  successMessage = "",
}) => {
  return (
    <div className="congratulations-screen">
      {/* Header with Checkmark */}
      <div className="header">
        <div className="checkmark-circle">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17L4 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="title">
          <h1>Congratulations</h1>
          <p>You're now part of the HELPSTiR crew</p>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="content">
        <div className="countdown-timer">
          <CountdownTimer />
        </div>
        <div className="successMessage"> {successMessage}</div>
      </div>

      {/* Footer with Glassmorphism on Text Only */}
      <div className="footer">
        <div className="glass-card">{note}</div>
        <div className="communities">
          <p>Join our communities!</p>
          <div className="social-icons">
            <a
              href={socialLinks.youtube}
              className="youtube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube size={24} color="white" />
            </a>
            <a
              href={socialLinks.instagram}
              className="instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={24} color="white" />
            </a>
            <a
              href={socialLinks.linkedin}
              className="linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={24} color="white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsScreen;
