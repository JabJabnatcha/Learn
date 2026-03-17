import { render, screen } from "@testing-library/react";
import App from "./App.js";

test("renders app without crashing", () => {
  render(<App />);
  screen.debug();
});