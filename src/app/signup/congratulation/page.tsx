import CongratulationsScreen from "@/containers/Prejoining/CongratulationPage/CongratulationsScreen";
import React from "react";

const Congratulation = () => {
  const socialLinks = {
    youtube: "https://youtube.com/helpstir",
    instagram: "https://instagram.com/helpstir",
    linkedin: "https://linkedin.com/company/helpstir",
  };

  return (
    <CongratulationsScreen
      socialLinks={socialLinks}
      successMessage=""
      note="Get ready for quirky updates, insider launch secrets, and all the community buzz from day one!"
    />
  );
};

export default Congratulation;
