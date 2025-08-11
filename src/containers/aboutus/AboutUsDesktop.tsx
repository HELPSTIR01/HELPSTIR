"use client";
import React, { memo } from "react";

import WhatIsSection from "./sections/WhatIsSection";
import FeatureSectionList from "./sections/FeaturesListSection";
import HelpstirWorks from "@/components/HelpstirWorks";

import "./styles.scss";
import PartnerSection from "./sections/PartnerSection";

export default memo(() => {
  return (
    <div className="full-width">
      <WhatIsSection />
      <HelpstirWorks />
      <div className="images-bg">
        <FeatureSectionList />
        <PartnerSection />
      </div>
    </div>
  );
});
