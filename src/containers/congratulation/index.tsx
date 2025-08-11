import CongratulationsScreen from "@/containers/Prejoining/CongratulationPage/CongratulationsScreen";
import React from "react";

const Congratulation = ({
  message = '"Please Note: we are partnering with selected NGOs across sectors and locations and values. So if you hear from us, you’ve made it our value check! ✨"',
}: {
  message?: string;
}) => {
  const socialLinks = {
    youtube: "https://youtube.com/helpstir",
    instagram: "https://instagram.com/helpstir",
    linkedin: "https://linkedin.com/company/helpstir",
  };

  return (
    <CongratulationsScreen
      socialLinks={socialLinks}
      successMessage="we’re so excited to help you help better! Our team will get in touch with you soonest!"
      note={message}
    />
  );
};

export default Congratulation;
