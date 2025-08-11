// src/test-utils.tsx
import React from "react";
import { render, RenderOptions } from "@testing-library/react";

const customRender = (
  ui: React.ReactElement,
  theme = "light",
  options?: RenderOptions
) => {
  return render(<>{ui}</>, options);
};

// Re-export everything from @testing-library/react
export * from "@testing-library/react";

// Override render method
export { customRender as render };
