// about/mobile.tsx
import React from "react";
import AboutPage from "./AboutUsDesktop";
import "./mobile.scss";
import Footer from "@/components/Footer/Footer";
import ContentSection from "./sections/ContentSection";

const Mobile = async () => {
  return (
    <>
      <ContentSection className="about-section" />
      <AboutPage />
      <Footer />
    </>
  );
};

export default Mobile;
