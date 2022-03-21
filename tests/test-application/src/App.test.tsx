import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
    render(<App />);
    const ticksCountElement = screen.getByTestId("test");
    expect(ticksCountElement).toHaveTextContent("0");
    const setToFiveButton = screen.getByText(/Set to five./i);
    setToFiveButton.click();
    expect(ticksCountElement).toHaveTextContent("5");
    const resetButton = screen.getByText(/Reset with counterRewrite./i);
    resetButton.click();
    expect(ticksCountElement).toHaveTextContent("0");
});
