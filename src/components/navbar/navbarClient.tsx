"use client";

import { useState, useEffect, useRef } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./navbar.module.css";
import type { NavLink, NavbarCTA } from "../../types/navbarData";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useRouter } from "next/navigation";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { smoothScrollToElement, smoothScrollTo } from "@/src/utils/smoothScroll";


type Props = {
  links: NavLink[];
  ctas: NavbarCTA;
};

export default function NavbarClient({ links, ctas }: Props) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeatureOpen, setIsFeatureOpen] = useState(false);
  const featureCloseTimer = useRef<NodeJS.Timeout | null>(null);
  const cancelFeatureClose = () => {
    if (featureCloseTimer.current) {
      clearTimeout(featureCloseTimer.current);
      featureCloseTimer.current = null;
    }
  };

  const scheduleFeatureClose = () => {
    cancelFeatureClose();
    featureCloseTimer.current = setTimeout(() => {
      setIsFeatureOpen(false);
    }, 400);
  };
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const pathname = usePathname();
  const safePathname = pathname || (typeof window !== 'undefined' ? window.location.pathname : '') || '';
  const isCanadaContext = safePathname.startsWith("/en-ca");
  const prefix = isCanadaContext ? "/en-ca" : "";

  const isImageTestimonialsPage = safePathname === "/testimonials" || safePathname === "/en-ca/testimonials" || safePathname === "/image-testimonials" || safePathname === "/en-ca/image-testimonials";
  const isBlogsPage =
    safePathname.startsWith("/blogs") ||
    safePathname.startsWith("/blog") ||
    safePathname.startsWith("/en-ca/blogs") ||
    safePathname.startsWith("/en-ca/blog");

  const isExternalHref = (href: string) => href.startsWith("http");

  const getHref = (href: string) => {
    if (isExternalHref(href) || href.startsWith("#")) {
      return href;
    }
    return `${prefix}${href}`;
  };
  const pricingSectionHref = `${prefix}/pricing`;

  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showCalendlyModal"));
      }
    },
  });

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, skipNavigation = false) => {
    const sectionMap: { [key: string]: string } = {};
    const sectionId = sectionMap[href];

    e.preventDefault();

    if (!sectionId) return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const elementTop = rect.top + scrollTop;
    const stickyNavbar = document.querySelector('.sticky.top-0') ||
      document.querySelector('nav') ||
      document.querySelector('[class*="nav"]');
    const navbarHeight = stickyNavbar ? stickyNavbar.getBoundingClientRect().height : 0;
    const offset = navbarHeight + 20;
    const targetScrollPosition = Math.max(0, elementTop - offset);
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (Math.abs(currentScrollPosition - targetScrollPosition) < 50) {
      const targetUrl = `${prefix}${href}`;
      if (window.location.pathname !== targetUrl) {
        window.history.pushState({}, '', targetUrl);
      }
      return;
    }

    if (!skipNavigation) {
      const targetUrl = `${prefix}${href}`;
      window.history.pushState({}, '', targetUrl);
    }

    smoothScrollToElement(sectionId, {
      duration: 800,
      easing: 'easeInOutCubic',
    }).then(() => {});
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = () => {
      const currentPath = window.location.pathname;
      const sectionMap: { [key: string]: string } = {};
      const sectionId = sectionMap[currentPath];
      if (sectionId) {
        setTimeout(() => {
          smoothScrollToElement(sectionId, {
            duration: 800,
            easing: 'easeInOutCubic',
          });
        }, 100);
      } else if (currentPath === '/' || currentPath === '/en-ca') {
        smoothScrollTo(0, {
          duration: 600,
          easing: 'easeOutCubic',
        });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Countdown timer - resets every 24 hours at local midnight.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      const difference = endOfDay.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days: 0, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();

    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Sticky Container for Navbar */}
      <div className="sticky top-0 left-0 right-0 z-50">
        <nav
          className={styles.navContainer}
          style={{
            backdropFilter: 'blur(120px)',
            WebkitBackdropFilter: 'blur(120px)',
          }}
        >
          <div className={styles.navInner}>
            {/* Left Section: Logo */}
            <div className={styles.navLeft}>
              <Link
                href={isCanadaContext ? "/en-ca" : "/"}
                className={styles.navLogoText}
                onClick={(e) => {
                  const currentPath = pathname;
                  const isOnHomePage = currentPath === "/" || currentPath === "/en-ca" || currentPath === prefix + "/";

                  if (isOnHomePage) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: "instant" });
                    }, 100);
                  }
                }}
              >
                FLASHFIRE
              </Link>
            </div>

            {/* Center Section: Links (Desktop) */}
            <ul className={styles.navLinks}>
              {links.map((link) => {
                const sectionLinks: string[] = [];
                const isSectionLink = sectionLinks.includes(link.href);
                const isOnHomePage = pathname === '/' || pathname === '/en-ca' || pathname === prefix + '/';
                const isOnPricingPage = pathname === '/pricing' || pathname === '/en-ca/pricing' || pathname === prefix + '/pricing';
                const isOnSectionPage = pathname === getHref(link.href) || pathname === link.href || pathname === prefix + link.href;
                const isExternal = isExternalHref(link.href) || link.target === "_blank";
                const isFeaturesLink = link.name.toLowerCase() === "features";

                return (
                  <li
                    key={link.href}
                    className={styles.navLinkItem}
                    onMouseEnter={() => {
                      if (isFeaturesLink) {
                        cancelFeatureClose();
                        setIsFeatureOpen(true);
                      }
                    }}
                    onMouseLeave={() => {
                      if (isFeaturesLink) {
                        scheduleFeatureClose();
                      }
                    }}
                  >
                    {isFeaturesLink ? (
                      <>
                        <button
                          type="button"
                          className={`${styles.navLinkText} ${styles.featureToggle}`}
                          onClick={() => setIsFeatureOpen((prev) => !prev)}
                          suppressHydrationWarning
                        >
                          {link.name}
                          <span
                            className={`${styles.caret} ${isFeatureOpen ? styles.caretOpen : ""}`}
                          >
                            ▾
                          </span>
                        </button>

                        {isFeatureOpen && (
                          <div
                            className={styles.featureDropdown}
                            onMouseEnter={cancelFeatureClose}
                            onMouseLeave={scheduleFeatureClose}
                          >
                            <div className={styles.featureDropdownGrid}>
                              <Link
                                href={getHref("/features/ats-resume-optimizer")}
                                className={styles.featureDropdownItem}
                                onClick={() => setIsFeatureOpen(false)}
                              >
                                <div className={styles.featureIcon}>
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14 2V8H20" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 13H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 17H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 9H9H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                                <div className={styles.featureTexts}>
                                  <span className={styles.featureTitle}>Resume Optimizer</span>
                                  <span className={styles.featureSub}>Resume score for ATS</span>
                                </div>
                              </Link>

                              <Link
                                href={getHref("/features/linkedin-profile-optimization-tool")}
                                className={styles.featureDropdownItem}
                                onClick={() => setIsFeatureOpen(false)}
                              >
                                <div className={styles.featureIcon}>
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 9H2V21H6V9Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="4" cy="4" r="2" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                                <div className={styles.featureTexts}>
                                  <span className={styles.featureTitle}>LinkedIn Optimization</span>
                                  <span className={styles.featureSub}>Optimize LinkedIn profile</span>
                                </div>
                              </Link>

                              <Link
                                href={getHref("/features/automated-job-applications")}
                                className={styles.featureDropdownItem}
                                onClick={() => setIsFeatureOpen(false)}
                              >
                                <div className={styles.featureIcon}>
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 17L12 22L22 17" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 12L12 17L22 12" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                                <div className={styles.featureTexts}>
                                  <span className={styles.featureTitle}>Job Automation</span>
                                  <span className={styles.featureSub}>Auto apply to roles</span>
                                </div>
                              </Link>

                              <Link
                                href={getHref("/features/job-application-tracker")}
                                className={styles.featureDropdownItem}
                                onClick={() => setIsFeatureOpen(false)}
                              >
                                <div className={styles.featureIcon}>
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 8V12L15 15" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                                <div className={styles.featureTexts}>
                                  <span className={styles.featureTitle}>Job Tracker</span>
                                  <span className={styles.featureSub}>Track applications</span>
                                </div>
                              </Link>

                              <Link
                                href={getHref("/features/ai-job-targeting")}
                                className={styles.featureDropdownItem}
                                onClick={() => setIsFeatureOpen(false)}
                              >
                                <div className={styles.featureIcon}>
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="12" cy="12" r="6" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="12" cy="12" r="2" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                                <div className={styles.featureTexts}>
                                  <span className={styles.featureTitle}>Precision Targeting</span>
                                  <span className={styles.featureSub}>Smart job matching</span>
                                </div>
                              </Link>

                              <Link
                                href={getHref("/features/dashboard-analytics")}
                                className={styles.featureDropdownItem}
                                onClick={() => setIsFeatureOpen(false)}
                              >
                                <div className={styles.featureIcon}>
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 3V21H21" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7 16L12 11L16 15L21 10" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M21 10V3H14" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                                <div className={styles.featureTexts}>
                                  <span className={styles.featureTitle}>Dashboard & Analytics</span>
                                  <span className={styles.featureSub}>Performance insights</span>
                                </div>
                              </Link>

                              <Link
                                href={getHref("/features/ai-cover-letter-generator")}
                                className={styles.featureDropdownItem}
                                onClick={() => setIsFeatureOpen(false)}
                              >
                                <div className={styles.featureIcon}>
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14 2V8H20" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 13H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 17H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 9H9H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                                <div className={styles.featureTexts}>
                                  <span className={styles.featureTitle}>Cover Letter Builder</span>
                                  <span className={styles.featureSub}>AI-powered writing</span>
                                </div>
                              </Link>

                              <Link
                                href={getHref("/features/interview-tips")}
                                className={styles.featureDropdownItem}
                                onClick={() => setIsFeatureOpen(false)}
                              >
                                <div className={styles.featureIcon}>
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4H20V16H5.17L4 17.17V4Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8 9H16" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8 13H12" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 20L14 16" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                                <div className={styles.featureTexts}>
                                  <span className={styles.featureTitle}>Interview Tips</span>
                                  <span className={styles.featureSub}>Real-time AI prep</span>
                                </div>
                              </Link>
                            </div>

                            <Link
                              href={getHref(link.href)}
                              className={styles.featureDropdownFooter}
                              onClick={() => setIsFeatureOpen(false)}
                              prefetch={true}
                            >
                              All Features →
                            </Link>
                          </div>
                        )}
                      </>
                    ) : isSectionLink ? (
                      <a
                        href={`#${link.href.replace('/', '')}`}
                        className={styles.navLinkText}
                        onClick={(e) => {
                          e.preventDefault();
                          if (isOnPricingPage || (!isOnHomePage && !isOnSectionPage)) {
                            router.push(prefix + '/');
                            const scrollToSectionOnHome = () => {
                              const currentPath = window.location.pathname;
                              const isNowOnHome = currentPath === '/' || currentPath === '/en-ca' || currentPath === prefix + '/';
                              if (isNowOnHome) {
                                const sectionId = link.href.replace('/', '');
                                const section = document.getElementById(sectionId);
                                if (section) {
                                  handleSectionClick(e, link.href);
                                } else {
                                  setTimeout(scrollToSectionOnHome, 100);
                                }
                              } else {
                                setTimeout(scrollToSectionOnHome, 100);
                              }
                            };
                            requestAnimationFrame(() => {
                              setTimeout(scrollToSectionOnHome, 300);
                            });
                          } else if (isOnSectionPage && !isOnHomePage) {
                            handleSectionClick(e, link.href, true);
                          } else {
                            handleSectionClick(e, link.href);
                          }
                        }}
                      >
                        {link.name}
                      </a>
                    ) : isExternal ? (
                      <a
                        href={getHref(link.href)}
                        className={styles.navLinkText}
                        target={link.target}
                        rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={getHref(link.href)}
                        className={styles.navLinkText}
                        onClick={(e) => {
                          if (link.href === '/pricing' && isOnPricingPage) {
                            e.preventDefault();
                            e.stopPropagation();
                            const headingElement = document.getElementById('pricing-heading');
                            if (headingElement) {
                              const stickyNavbar = document.querySelector('.sticky.top-0') ||
                                document.querySelector('nav') ||
                                document.querySelector('[class*="nav"]');
                              const navbarHeight = stickyNavbar ? stickyNavbar.getBoundingClientRect().height : 0;
                              const offset = navbarHeight + 20;
                              const rect = headingElement.getBoundingClientRect();
                              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                              const elementTop = rect.top + scrollTop;
                              const targetScrollPosition = Math.max(0, elementTop - offset);
                              const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                              if (Math.abs(currentScrollPosition - targetScrollPosition) > 50) {
                                smoothScrollToElement('pricing-heading', {
                                  duration: 800,
                                  easing: 'easeInOutCubic',
                                });
                              }
                            }
                          }
                        }}
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Right Section: CTAs (Desktop) */}
            <div className={styles.navRight}>
              {ctas.primary && (ctas.primary.href === "/Get-Started" || ctas.primary.href === "/en-ca/Get-Started") ? (
                <Link
                  href={getHref(ctas.primary.href)}
                  className={styles.navPrimaryButton}
                  {...getButtonProps()}
                  onClick={() => {
                    trackButtonClick(ctas.primary.label, "navigation", "cta", {
                      button_location: "navbar",
                      navigation_type: "primary_cta",
                    });
                    trackSignupIntent("navbar_cta", {
                      signup_source: "navbar_button",
                      funnel_stage: "signup_intent",
                      target_url: "/Get-Started",
                    });
                    if (typeof window !== "undefined") {
                      const currentPath = safePathname || window.location.pathname;
                      sessionStorage.setItem('previousPageBeforeBookADemo', currentPath);
                      const currentScrollY = window.scrollY || window.pageYOffset || 0;
                      sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());
                      window.dispatchEvent(new CustomEvent("showCalendlyModal"));
                    }
                  }}
                >
                  {ctas.primary.label}
                </Link>
              ) : null}
            </div>

            {/* Mobile Menu Icon */}
            <button
              className={styles.navMenuIcon}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div
                className={isMenuOpen ? styles.iconClose : styles.iconHamburger}
              />
            </button>
          </div>

          {/* Mobile Dropdown */}
          {isMenuOpen && (
            <div className={styles.navMobileMenu}>
              <ul className={styles.navMobileLinks}>
                {links.map((link) => {
                  const sectionLinks: string[] = [];
                  const isSectionLink = sectionLinks.includes(link.href);
                  const isOnHomePage = safePathname === '/' || safePathname === '/en-ca' || safePathname === prefix + '/';
                  const isOnPricingPage = safePathname === '/pricing' || safePathname === '/en-ca/pricing' || safePathname === prefix + '/pricing';
                  const isOnSectionPage = safePathname === getHref(link.href) || safePathname === link.href || safePathname === prefix + link.href;
                  const isExternal = isExternalHref(link.href) || link.target === "_blank";
                  const isFeaturesLink = link.name.toLowerCase() === "features";

                  return (
                    <li key={link.href}>
                      {isFeaturesLink ? (
                        <>
                          <button
                            type="button"
                            className={`${styles.navMobileLink} ${styles.featureToggleMobile}`}
                            onClick={() => setIsFeatureOpen((prev) => !prev)}
                            suppressHydrationWarning
                          >
                            {link.name}
                            <span
                              className={`${styles.caret} ${isFeatureOpen ? styles.caretOpen : ""}`}
                            >
                              ▾
                            </span>
                          </button>

                          {isFeatureOpen && (
                            <div className={styles.featureDropdownMobile}>
                              <div className={styles.featureDropdownGridMobile}>
                                <a
                                  href={getHref("/features/ats-resume-optimizer")}
                                  className={styles.featureDropdownItemMobile}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setIsMenuOpen(false);
                                    setIsFeatureOpen(false);
                                    router.push(getHref("/features/ats-resume-optimizer"));
                                    trackButtonClick("Resume Optimizer", "navigation", "link", {
                                      button_location: "navbar_mobile_features",
                                      navigation_type: "internal_link",
                                      destination: "/features/ats-resume-optimizer"
                                    });
                                  }}
                                >
                                  <div className={styles.featureIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M14 2V8H20" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M16 13H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M16 17H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M10 9H9H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                  <div className={styles.featureTexts}>
                                    <span className={styles.featureTitle}>Resume Optimizer</span>
                                    <span className={styles.featureSub}>Resume score for ATS</span>
                                  </div>
                                </a>

                                <a
                                  href={getHref("/features/linkedin-profile-optimization-tool")}
                                  className={styles.featureDropdownItemMobile}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setIsMenuOpen(false);
                                    setIsFeatureOpen(false);
                                    router.push(getHref("/features/linkedin-profile-optimization-tool"));
                                    trackButtonClick("LinkedIn Opt.", "navigation", "link", {
                                      button_location: "navbar_mobile_features",
                                      navigation_type: "internal_link",
                                      destination: "/features/linkedin-profile-optimization-tool"
                                    });
                                  }}
                                >
                                  <div className={styles.featureIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M6 9H2V21H6V9Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <circle cx="4" cy="4" r="2" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                  <div className={styles.featureTexts}>
                                    <span className={styles.featureTitle}>LinkedIn Opt.</span>
                                    <span className={styles.featureSub}>Optimize LinkedIn profile</span>
                                  </div>
                                </a>

                                <a
                                  href={getHref("/features/automated-job-applications")}
                                  className={styles.featureDropdownItemMobile}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setIsMenuOpen(false);
                                    setIsFeatureOpen(false);
                                    router.push(getHref("/features/automated-job-applications"));
                                    trackButtonClick("Job Automation", "navigation", "link", {
                                      button_location: "navbar_mobile_features",
                                      navigation_type: "internal_link",
                                      destination: "/features/automated-job-applications"
                                    });
                                  }}
                                >
                                  <div className={styles.featureIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M2 17L12 22L22 17" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M2 12L12 17L22 12" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                  <div className={styles.featureTexts}>
                                    <span className={styles.featureTitle}>Job Automation</span>
                                    <span className={styles.featureSub}>Auto apply to roles</span>
                                  </div>
                                </a>

                                <a
                                  href={getHref("/features/job-application-tracker")}
                                  className={styles.featureDropdownItemMobile}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setIsMenuOpen(false);
                                    setIsFeatureOpen(false);
                                    router.push(getHref("/features/job-application-tracker"));
                                    trackButtonClick("Job Tracker", "navigation", "link", {
                                      button_location: "navbar_mobile_features",
                                      navigation_type: "internal_link",
                                      destination: "/features/job-application-tracker"
                                    });
                                  }}
                                >
                                  <div className={styles.featureIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M12 8V12L15 15" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                  <div className={styles.featureTexts}>
                                    <span className={styles.featureTitle}>Job Tracker</span>
                                    <span className={styles.featureSub}>Track applications</span>
                                  </div>
                                </a>

                                <a
                                  href={getHref("/features/ai-job-targeting")}
                                  className={styles.featureDropdownItemMobile}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setIsMenuOpen(false);
                                    setIsFeatureOpen(false);
                                    router.push(getHref("/features/ai-job-targeting"));
                                    trackButtonClick("Precision Targeting", "navigation", "link", {
                                      button_location: "navbar_mobile_features",
                                      navigation_type: "internal_link",
                                      destination: "/features/ai-job-targeting"
                                    });
                                  }}
                                >
                                  <div className={styles.featureIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="12" cy="12" r="10" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <circle cx="12" cy="12" r="6" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <circle cx="12" cy="12" r="2" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                  <div className={styles.featureTexts}>
                                    <span className={styles.featureTitle}>Precision Targeting</span>
                                    <span className={styles.featureSub}>Smart job matching</span>
                                  </div>
                                </a>

                                <a
                                  href={getHref("/features/dashboard-analytics")}
                                  className={styles.featureDropdownItemMobile}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setIsMenuOpen(false);
                                    setIsFeatureOpen(false);
                                    router.push(getHref("/features/dashboard-analytics"));
                                    trackButtonClick("Dashboard & Analytics", "navigation", "link", {
                                      button_location: "navbar_mobile_features",
                                      navigation_type: "internal_link",
                                      destination: "/features/dashboard-analytics"
                                    });
                                  }}
                                >
                                  <div className={styles.featureIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M3 3V21H21" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M7 16L12 11L16 15L21 10" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M21 10V3H14" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                  <div className={styles.featureTexts}>
                                    <span className={styles.featureTitle}>Dashboard & Analytics</span>
                                    <span className={styles.featureSub}>Performance insights</span>
                                  </div>
                                </a>

                                <a
                                  href={getHref("/features/ai-cover-letter-generator")}
                                  className={styles.featureDropdownItemMobile}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setIsMenuOpen(false);
                                    setIsFeatureOpen(false);
                                    router.push(getHref("/features/ai-cover-letter-generator"));
                                    trackButtonClick("Cover Letter Builder", "navigation", "link", {
                                      button_location: "navbar_mobile_features",
                                      navigation_type: "internal_link",
                                      destination: "/features/ai-cover-letter-generator"
                                    });
                                  }}
                                >
                                  <div className={styles.featureIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M14 2V8H20" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M16 13H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M16 17H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M10 9H9H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                  <div className={styles.featureTexts}>
                                    <span className={styles.featureTitle}>Cover Letter Builder</span>
                                    <span className={styles.featureSub}>AI-powered writing</span>
                                  </div>
                                </a>

                                <a
                                  href={getHref("/features/interview-tips")}
                                  className={styles.featureDropdownItemMobile}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setIsMenuOpen(false);
                                    setIsFeatureOpen(false);
                                    router.push(getHref("/features/interview-tips"));
                                    trackButtonClick("Interview Tips", "navigation", "link", {
                                      button_location: "navbar_mobile_features",
                                      navigation_type: "internal_link",
                                      destination: "/features/interview-tips"
                                    });
                                  }}
                                >
                                  <div className={styles.featureIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M4 4H20V16H5.17L4 17.17V4Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M8 9H16" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M8 13H12" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M10 20L14 16" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                  <div className={styles.featureTexts}>
                                    <span className={styles.featureTitle}>Interview Tips</span>
                                    <span className={styles.featureSub}>Real-time AI prep</span>
                                  </div>
                                </a>
                              </div>

                              <button
                                type="button"
                                className={styles.featureDropdownFooterMobile}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setIsMenuOpen(false);
                                  setIsFeatureOpen(false);
                                  trackButtonClick("All Features", "navigation", "link", {
                                    button_location: "navbar_mobile_features",
                                    navigation_type: "internal_link",
                                    destination: link.href
                                  });
                                  setTimeout(() => {
                                    router.push(getHref(link.href));
                                  }, 100);
                                }}
                              >
                                All Features →
                              </button>
                            </div>
                          )}
                        </>
                      ) : isSectionLink ? (
                        <a
                          href={`#${link.href.replace('/', '')}`}
                          className={styles.navMobileLink}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsMenuOpen(false);
                            if (isOnPricingPage || (!isOnHomePage && !isOnSectionPage)) {
                              router.push(prefix + '/');
                              const scrollToSectionOnHome = () => {
                                const currentPath = window.location.pathname;
                                const isNowOnHome = currentPath === '/' || currentPath === '/en-ca' || currentPath === prefix + '/';
                                if (isNowOnHome) {
                                  const sectionId = link.href.replace('/', '');
                                  const section = document.getElementById(sectionId);
                                  if (section) {
                                    handleSectionClick(e, link.href);
                                  } else {
                                    setTimeout(scrollToSectionOnHome, 100);
                                  }
                                } else {
                                  setTimeout(scrollToSectionOnHome, 100);
                                }
                              };
                              requestAnimationFrame(() => {
                                setTimeout(scrollToSectionOnHome, 300);
                              });
                            } else if (isOnSectionPage && !isOnHomePage) {
                              handleSectionClick(e, link.href, true);
                            } else {
                              handleSectionClick(e, link.href);
                            }
                          }}
                        >
                          {link.name}
                        </a>
                      ) : isExternal ? (
                        <a
                          href={getHref(link.href)}
                          className={styles.navMobileLink}
                          target={link.target}
                          rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.name}
                        </a>
                      ) : (
                        <a
                          href={getHref(link.href)}
                          className={styles.navMobileLink}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsMenuOpen(false);
                            trackButtonClick(link.name, "navigation", "link", {
                              button_location: "navbar_mobile",
                              navigation_type: "internal_link",
                              destination: link.href
                            });
                            if (link.href === '/pricing' && isOnPricingPage) {
                              const headingElement = document.getElementById('pricing-heading');
                              if (headingElement) {
                                const stickyNavbar = document.querySelector('.sticky.top-0') ||
                                  document.querySelector('nav') ||
                                  document.querySelector('[class*="nav"]');
                                const navbarHeight = stickyNavbar ? stickyNavbar.getBoundingClientRect().height : 0;
                                const offset = navbarHeight + 20;
                                const rect = headingElement.getBoundingClientRect();
                                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                                const elementTop = rect.top + scrollTop;
                                const targetScrollPosition = Math.max(0, elementTop - offset);
                                const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                                if (Math.abs(currentScrollPosition - targetScrollPosition) > 50) {
                                  smoothScrollToElement('pricing-heading', {
                                    duration: 800,
                                    easing: 'easeInOutCubic',
                                  });
                                }
                              }
                              return;
                            }
                            router.push(getHref(link.href));
                          }}
                        >
                          {link.name}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </nav>

        {/* Mobile Bottom Book a Demo CTA */}
        {!isMenuOpen &&
          ctas.primary &&
          (ctas.primary.href === "/Get-Started" ||
            ctas.primary.href === "/en-ca/Get-Started") && (
            <div className={styles.navMobileButtonsSticky}>

              <Link
                href={getHref("/book-a-demo")}
                className={styles.navMobilePrimary}
                {...getButtonProps()}
                onClick={() => {
                  const utmSource =
                    typeof window !== "undefined"
                      ? localStorage.getItem("utm_source") || "WEBSITE"
                      : "WEBSITE";
                  const utmMedium =
                    typeof window !== "undefined"
                      ? localStorage.getItem("utm_medium") || "Navigation_Navbar_Button"
                      : "Navigation_Navbar_Button";
                  const utmCampaign =
                    typeof window !== "undefined"
                      ? localStorage.getItem("utm_campaign") || "Website"
                      : "Website";
                  GTagUTM({
                    eventName: "whatsapp_support_click",
                    label: "Navbar_Book_A_Demo_Button_Mobile_Bottom_Bar",
                    utmParams: {
                      utm_source: utmSource,
                      utm_medium: utmMedium,
                      utm_campaign: utmCampaign,
                    },
                  });
                  trackButtonClick("Book a Demo", "navigation", "cta", {
                    button_location: "navbar_mobile_bottom_bar",
                    navigation_type: "primary_cta",
                    page: "book-a-demo",
                  });
                  trackSignupIntent("book_a_demo_mobile_bottom_bar", {
                    signup_source: "navbar_mobile_bottom_bar",
                    funnel_stage: "signup_intent",
                    target_url: "/book-a-demo",
                  });
                  if (typeof window !== "undefined") {
                    const currentPath = safePathname || window.location.pathname;
                    sessionStorage.setItem("previousPageBeforeBookADemo", currentPath);
                    const currentScrollY =
                      window.scrollY || window.pageYOffset || 0;
                    sessionStorage.setItem(
                      "preserveScrollPosition",
                      currentScrollY.toString()
                    );
                    window.dispatchEvent(new CustomEvent("showCalendlyModal"));
                  }
                }}
              >
                Book a Demo →

              </Link>

            </div>
          )}
      </div>
    </>
  );
}
