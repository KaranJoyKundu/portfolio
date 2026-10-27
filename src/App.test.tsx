import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { App } from "./App";
import { site } from "@/content/site.config";

describe("App", () => {
  it("renders the home hero and primary navigation", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { level: 1, name: site.name })).toBeInTheDocument();
    const nav = within(screen.getByRole("navigation", { name: "Primary" }));
    expect(nav.getByRole("link", { name: "Projects" })).toBeInTheDocument();
    expect(nav.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  it("navigates to the 404 page for unknown routes", () => {
    render(
      <MemoryRouter initialEntries={["/nope"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("ERR 404 · SIGNAL LOST")).toBeInTheDocument();
  });
});
