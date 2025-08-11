import React from "react";
import ComingSoon from "@/components/pages/comingsoon/ComingSoon";

const formData = {
  organizationName: "test",
  email: "test@gmail.com",
  mobileNo: "0000000",
  registeredAddress: "test, test",
  city: "test",
  state: "test",
  pinCode: "test",
  causes: ["test"],
  specificAreas: ["test"],
  bio: "test",
  accountManager: {
    name: "test",
    email: "test@gmail.com",
  },
};

const ComingSoonPage = () => {
  return (
    <div>
      <ComingSoon formData={formData} />
    </div>
  );
};

export default ComingSoonPage;
