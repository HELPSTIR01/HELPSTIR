import React from "react";
import AboutPage from "./AboutUsDesktop";
import "./desktop.scss";
import Footer from "@/components/Footer/Footer";
import ContentSection from "./sections/ContentSection";

const Desktop = async () => {
  return (
    <div className="desktop">
      <ContentSection className="about-section" />
      <AboutPage />
      <Footer />
    </div>
  );
};

export default Desktop;
