"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import styles from "./homePageCareerCTA.module.css";
import { FaBolt } from "react-icons/fa";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { useEffect, useState } from "react";

export default function HomePageCareerCTA() {
  const router = useRouter();
  const pathname = usePathname();
  const [showStrategyCard, setShowStrategyCard] = useState(false);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
      }
    },
  });
  useEffect(() => {
    const openCard = () => setShowStrategyCard(true);
    window.addEventListener("showStrategyCallCard", openCard);
    return () =>
      window.removeEventListener("showStrategyCallCard", openCard);
  }, []);
  return (
    <section className={styles.careerSection}>
      <div className={styles.container}>
        {/* === LEFT: Content === */}
        <div className={styles.leftContent}>
          <h2 className={styles.heading}>
            AI-Powered Job Search for Fresh Graduates & Early-Career Professionals
          </h2>

          <p className={styles.subtext}>
            You&apos;ve done your part, now let Flashfire handle the job hunt. <br />
            Our AI-powered team gets your profile recruiter-ready and{" "}
            <strong>
              applies to the right jobs so you can land interviews faster.
            </strong>
          </p>

          <ul className={styles.featuresList}>
            <li>
              <FaBolt className={styles.icon} /> Resumes tailored according to each job description.
            </li>
            <li>
              <FaBolt className={styles.icon} /> Optimized LinkedIn profile so recruiters notice you.
            </li>
            <li>
              <FaBolt className={styles.icon} /> Targeting jobs with AI, even for new hires
            </li>
            <li>
              <FaBolt className={styles.icon} /> Updated weekly through WhatsApp on the application status and interviews.
            </li>
          </ul>

          <div className={styles.ctaRow}>
            <button
              {...getButtonProps()}
              className={styles.ctaButton}
              onClick={() => {
                const utmSource = typeof window !== "undefined"
                  ? localStorage.getItem("utm_source") || "WEBSITE"
                  : "WEBSITE";
                const utmMedium = typeof window !== "undefined"
                  ? localStorage.getItem("utm_medium") || "Career_CTA_Section"
                  : "Career_CTA_Section";

                GTagUTM({
                  eventName: "sign_up_click",
                  label: "Career_CTA_Button",
                  utmParams: {
                    utm_source: utmSource,
                    utm_medium: utmMedium,
                    utm_campaign: typeof window !== "undefined"
                      ? localStorage.getItem("utm_campaign") || "Website"
                      : "Website",
                  },
                });

                trackButtonClick("Schedule a Free Career Call", "career_cta", "cta", {
                  button_location: "career_section",
                  section: "career_cta",
                  target_url: "/schedule-a-free-career-call"
                });
                trackSignupIntent("career_cta", {
                  signup_source: "career_cta_button",
                  funnel_stage: "signup_intent",
                  target_url: "/schedule-a-free-career-call"
                });

                // Check current path first
                const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
                const normalizedPath = currentPath.split('?')[0]; // Remove query params
                const isAlreadyOnScheduleACareerCall = normalizedPath === '/schedule-a-free-career-call' ||
                  normalizedPath === '/en-ca/schedule-a-free-career-call';

                // Navigate to /schedule-a-free-career-call WITHOUT exposing UTM params in the URL
                const targetPath = '/schedule-a-free-career-call';

                // Dispatch custom event to force show modal FIRST
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
                }

                // If already on the route, save scroll position and prevent navigation
                if (isAlreadyOnScheduleACareerCall) {
                  // Save current scroll position before modal opens
                  const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

                  // Restore scroll position immediately after modal opens
                  requestAnimationFrame(() => {
                    window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                    requestAnimationFrame(() => {
                      window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                      setTimeout(() => {
                        window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                      }, 50);
                    });
                  });

                  // Just trigger the modal, don't navigate or scroll
                  return;
                }

                // Save current scroll position before navigation to preserve it
                if (typeof window !== 'undefined') {
                  const currentScrollY = window.scrollY;
                  sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());
                  
                  // Navigate to the target path
                  router.push(targetPath);
                  
                  // Immediately restore scroll position to prevent scroll to top
                  requestAnimationFrame(() => {
                    window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                    requestAnimationFrame(() => {
                      window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                      setTimeout(() => {
                        window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                      }, 50);
                    });
                  });
                } else {
                  router.push(targetPath);
                }
              }}
            >
              Schedule a Free Career Call
            </button>
            <div className={styles.userNote}>
              <div className={styles.userAvatars}>
                <Image
                  src="https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aman.jpg"
                  alt="user1"
                  width={28}
                  height={28}
                  className={styles.avatar}
                  unoptimized
                />

                <Image
                  src="https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/anjali.jpeg"
                  alt="user2"
                  width={28}
                  height={28}
                  className={styles.avatar}
                  unoptimized
                />

                <Image
                  src="https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/utkarsh.jpg"
                  alt="user3"
                  width={28}
                  height={28}
                  className={styles.avatar}
                  unoptimized
                />
              </div>

              <p>
                Join <span className={styles.highlight}>600+</span> graduates
                who landed offers at top companies.
              </p>
            </div>
          </div>
        </div>

        {/* === RIGHT: Stats Grid === */}
        <div className={styles.rightGrid}>
          <div className={styles.rightGridTop}>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>SUCCESS RATE</p>
              <h3 className={styles.statValue}>95%</h3>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>JOB LANDED</p>
              <h3 className={styles.statValue}>50+</h3>
            </div>
          </div>
          <div className={styles.rightGridBottom}>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>HOURS SAVED</p>
              <h3 className={styles.statValue}>150+</h3>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>SUPPORT</p>
              <h3 className={styles.statValue}>24/7</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
