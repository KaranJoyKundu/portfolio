import { site } from "@/content/site.config";

export type NavItem = {
  to: string;
  label: string;
  hidden?: boolean;
};

/** Primary navigation, in reading order. */
export const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/engineering", label: "Engineering" },
  { to: "/software", label: "Software" },
  { to: "/achievements", label: "Achievements", hidden: !site.achievements.enabled },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
];

export function visibleNavItems(): NavItem[] {
  return NAV_ITEMS.filter((item) => !item.hidden);
}
