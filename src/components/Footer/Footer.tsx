import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.scss";
import waveBg from "../../../public/images/wave.png";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <div className="header-container">
      <div className="wave-background">
        <Image src={waveBg} alt="Wave background" className="wave-img" />
      </div>

      <div className="header-content">
        <div className="logo-section">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Helpstir"
              width={140}
              height={40}
            />
          </Link>
          <div className="social-icons">
            <a
              href="https://instagram.com/helpstir"
              className="social-icon instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com/company/helpstir-india"
              className="social-icon linkedin"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
        <div className="contact-section">
          Feel free to connect us at:
          <br />
          <a href="mailto:connect@helpstir.in">connect@helpstir.in</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
