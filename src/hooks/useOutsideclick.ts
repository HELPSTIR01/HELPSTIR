import { SyntheticEvent, useEffect } from "react";

const useOutsideClick = (ref: any, callback: any) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // Check if the clicked target is outside the referenced element
      if (ref.current && !ref.current.contains(event.target)) {
        callback(); // Call the provided callback
      }
    };

    // Add the event listener for detecting clicks
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]); // Re-run the effect if ref or callback changes
};

export default useOutsideClick;
