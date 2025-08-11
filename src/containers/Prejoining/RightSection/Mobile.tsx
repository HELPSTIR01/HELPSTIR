import { memo } from "react";
import { useRouter } from "next/navigation";

export default memo(() => {
  const router = useRouter();
  return (
    <div className="right-section">
      <div className="hook-badge">NGO callouts</div>

      <div className="header-button-container">
        <h2>
          Partner With Us, Create <strong>Better Impact</strong>
        </h2>
      </div>
      <img src="/images/hand.svg" alt="Changemaker" />
      <div className="ngo-banner">
        <div className="main-text">Are you a changemaker </div>
        <div className="supportive-text">who is leading in your community?</div>
      </div>
      <button
        className="cta-button"
        onClick={() => {
          router.push("/ngo-signup");
        }}
      >
        Sign Up
      </button>
    </div>
  );
});
