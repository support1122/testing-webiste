import type { NavLink, NavbarCTA } from "../types/navbarData";

export const navbarLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "How It Works", href: "/how-flashfire-ai-job-automation-platform-works" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Pricing", href: "/pricing" },
  // { name: "Blog", href: "/blog" },
  // { name: "Employers", href: "/employers", target: "_blank" },
];

export const navbarCTAs: NavbarCTA = {
  primary: { label: "Get Started →", href: "/Get-Started" },
};
