// src/components/List.test.tsx
import React from "react";
import { render, screen } from "@/utils/test-renderer"; // Import the custom render function
import List from "./index";

describe("List Component", () => {
  const items = ["Item 1", "Item 2", "Item 3"];

  test("renders the list with correct items", () => {
    render(<List items={items} />);

    // Check if all items are rendered
    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("renders an empty list when no items are provided", () => {
    render(<List items={[]} />);

    // Check if the list has no items
    expect(screen.queryByRole("list")).toBeInTheDocument(); // The list itself should still render
    expect(screen.queryByRole("listitem")).toBeNull(); // No list items should be present
  });
});
