import { cleanup, render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => render(<App />));
afterEach(cleanup);

describe("all elements should be visible on the screen", () => {
  it("should render dropdown menu with number of records per page", () => {
    const dropdown = screen.getByTestId("dropdown-posts");
    expect(dropdown).toBeVisible();
  });
  it("should render dropdown menu with profit/loss filter", () => {
    const dropdown = screen.getByTestId("dropdown-profitLoss");
    expect(dropdown).toBeVisible();
  });
  it("should render searchbar", () => {
    const dropdown = screen.getByTestId("input-searchbar");
    expect(dropdown).toBeVisible();
  });
  it("should render the table", () => {
    const dropdown = screen.getByTestId("main-table");
    expect(dropdown).toBeVisible();
  });
});
