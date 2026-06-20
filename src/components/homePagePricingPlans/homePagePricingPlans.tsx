"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import PricingCard from "./pricingCard";
import Image from "next/image";
import { usPricingPlans, canadaPricingPlans } from "@/src/data/pricingData";

interface UpgradePrice {
  from: string;
  to: string;
  price: number;
  paymentUrl?: string;
  /** Stripe checkout for `/en-ca` when different from US */
  canadaPaymentUrl?: string;
}

const upgradePrices: UpgradePrice[] = [
  {
    from: "PRIME",
    to: "PROFESSIONAL",
    price: 240,
    paymentUrl: "https://buy.stripe.com/7sY7sN2128uS1DWdcz3AY08",
    canadaPaymentUrl: "https://buy.stripe.com/bJe28t9tu26u96o5K73AY0q",
  },
  {
    from: "PRIME",
    to: "EXECUTIVE",
    price: 490,
    paymentUrl: "https://buy.stripe.com/fZu3cx6hi9yW82k0pN3AY09",
    canadaPaymentUrl: "https://buy.stripe.com/6oU8wRcFG4eC5Uc1tR3AY0r",
  },
  {
    from: "IGNITE",
    to: "PROFESSIONAL",
    price: 170,
    paymentUrl: "https://buy.stripe.com/28E6oJ9tu7qOfuM3BZ3AY0d",
    canadaPaymentUrl: "https://buy.stripe.com/00w9AV212eTg6YgfkH3AY0n",
  },
  {
    from: "IGNITE",
    to: "EXECUTIVE",
    price: 420,
    paymentUrl: "https://buy.stripe.com/5kQcN7eNO7qO2I06Ob3AY0e",
    canadaPaymentUrl: "https://buy.stripe.com/fZu5kF9tueTg82kc8v3AY0v",
  },
  {
    from: "PROFESSIONAL",
    to: "EXECUTIVE",
    price: 285,
    paymentUrl: "https://buy.stripe.com/00w7sNgVW4eCbew1tR3AY0f",
    canadaPaymentUrl: "https://buy.stripe.com/5kQ5kF212aD0eqIfkH3AY0x",
  },
];

export default function HomePagePricingPlans() {
  const pathname = usePathname();
  const isCanadaContext = pathname.startsWith("/en-ca");
  const pricingPlans = isCanadaContext ? canadaPricingPlans : usPricingPlans;
  const [selectedPlanForUpgrade, setSelectedPlanForUpgrade] = useState<string | null>(null);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number | null>(null);
  const [selectedPlanForBooster, setSelectedPlanForBooster] = useState<string | null>(null);
  const [selectedBoosterPlanIndex, setSelectedBoosterPlanIndex] = useState<number | null>(null);
  const [selectedBoosterIndex, setSelectedBoosterIndex] = useState<number | null>(null);
  const boosterSectionRef = useRef<HTMLDivElement>(null);
  const upgradeSectionRef = useRef<HTMLDivElement>(null);
  const shouldScrollBoosterRef = useRef<boolean>(false);
  const shouldScrollUpgradeRef = useRef<boolean>(false);

  const currencySymbol = isCanadaContext ? "CA$" : "$";

  const openCheckout = (paymentUrl?: string) => {
    if (!paymentUrl || typeof window === "undefined") {
      return;
    }

    const checkoutWindow = window.open(paymentUrl, "_blank", "noopener,noreferrer");

    if (!checkoutWindow) {
      window.location.href = paymentUrl;
    }
  };

  // Scroll to booster section when it becomes visible
  useEffect(() => {
    if (shouldScrollBoosterRef.current && boosterSectionRef.current) {
      const scrollToBooster = () => {
        if (boosterSectionRef.current) {
          // Wait for layout to fully update
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              // Dynamically calculate navbar height
              const stickyNavbar = document.querySelector('.sticky.top-0') || 
                                  document.querySelector('nav') ||
                                  document.querySelector('[class*="nav"]');
              const navbarHeight = stickyNavbar ? stickyNavbar.getBoundingClientRect().height : 0;
              
              const elementTop = boosterSectionRef.current?.getBoundingClientRect().top;
              if (elementTop !== undefined) {
                // Add navbar height + extra padding (30px) to ensure content is fully visible
                const offset = navbarHeight + 30;
                const offsetPosition = elementTop + window.pageYOffset - offset;
                window.scrollTo({
                  top: Math.max(0, offsetPosition),
                  behavior: "smooth"
                });
              }
              shouldScrollBoosterRef.current = false;
            });
          });
        }
      };
      
      // Increased delay to ensure DOM is fully updated and layout recalculated
      setTimeout(scrollToBooster, 300);
    }
  }, [selectedPlanForBooster, selectedBoosterPlanIndex]);

  // Scroll to upgrade section when it becomes visible
  useEffect(() => {
    if (shouldScrollUpgradeRef.current && upgradeSectionRef.current) {
      const scrollToUpgrade = () => {
        if (upgradeSectionRef.current) {
          // Wait for layout to fully update
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              // Dynamically calculate navbar height
              const stickyNavbar = document.querySelector('.sticky.top-0') || 
                                  document.querySelector('nav') ||
                                  document.querySelector('[class*="nav"]');
              const navbarHeight = stickyNavbar ? stickyNavbar.getBoundingClientRect().height : 0;
              
              const elementTop = upgradeSectionRef.current?.getBoundingClientRect().top;
              if (elementTop !== undefined) {
                // Add navbar height + extra padding (30px) to ensure content is fully visible
                const offset = navbarHeight + 30;
                const offsetPosition = elementTop + window.pageYOffset - offset;
                window.scrollTo({
                  top: Math.max(0, offsetPosition),
                  behavior: "smooth"
                });
              }
              shouldScrollUpgradeRef.current = false;
            });
          });
        }
      };
      
      // Increased delay to ensure DOM is fully updated and layout recalculated
      setTimeout(scrollToUpgrade, 300);
    }
  }, [selectedPlanForUpgrade, selectedPlanIndex]);

  // Get upgrade options for the selected plan
  const upgradeOptions = useMemo(() => {
    if (!selectedPlanForUpgrade) return [];
    
    const planHierarchy = ["PRIME", "IGNITE", "PROFESSIONAL", "EXECUTIVE"];
    const currentPlanIndex = planHierarchy.indexOf(selectedPlanForUpgrade);
    
    if (currentPlanIndex === -1 || currentPlanIndex === planHierarchy.length - 1) {
      return [];
    }
    
    return pricingPlans
      .filter(plan => {
        const planIndex = planHierarchy.indexOf(plan.title);
        // Exclude IGNITE from PRIME upgrade options
        if (selectedPlanForUpgrade === "PRIME" && plan.title === "IGNITE") {
          return false;
        }
        return planIndex > currentPlanIndex;
      })
      .map(plan => {
        const upgradePriceConfig = upgradePrices.find(
          up => up.from === selectedPlanForUpgrade && up.to === plan.title
        );
        const upgradePrice = upgradePriceConfig?.price || 0;
        const upgradePaymentUrl = isCanadaContext
          ? upgradePriceConfig?.canadaPaymentUrl ?? upgradePriceConfig?.paymentUrl
          : upgradePriceConfig?.paymentUrl;
        
        return {
          ...plan,
          upgradePrice: upgradePrice,
          upgradePaymentUrl: upgradePaymentUrl,
        };
      });
  }, [selectedPlanForUpgrade, pricingPlans, isCanadaContext]);

  const handleUpgradeClick = (planTitle: string, planIndex: number) => {
    if (selectedPlanForUpgrade === planTitle) {
      setSelectedPlanForUpgrade(null);
      setSelectedPlanIndex(null);
      shouldScrollUpgradeRef.current = false;
    } else {
      setSelectedPlanForUpgrade(planTitle);
      setSelectedPlanIndex(planIndex);
      // Mark that we should scroll
      shouldScrollUpgradeRef.current = true;
    }
  };

  const handleBoosterClick = (planTitle: string, planIndex: number) => {
    if (selectedPlanForBooster === planTitle) {
      setSelectedPlanForBooster(null);
      setSelectedBoosterPlanIndex(null);
      setSelectedBoosterIndex(null);
      shouldScrollBoosterRef.current = false;
    } else {
      setSelectedPlanForBooster(planTitle);
      setSelectedBoosterPlanIndex(planIndex);
      setSelectedBoosterIndex(null);
      // Mark that we should scroll
      shouldScrollBoosterRef.current = true;
    }
  };

  const handleOptionsClick = (planTitle: string, planIndex: number) => {
    const plan = pricingPlans[planIndex];
    const hasBooster = plan.addOn;
    const planHierarchy = ["PRIME", "IGNITE", "PROFESSIONAL", "EXECUTIVE"];
    const currentPlanIndex = planHierarchy.indexOf(planTitle);
    const hasUpgrade = currentPlanIndex !== -1 && currentPlanIndex < planHierarchy.length - 1 && 
      pricingPlans.some(p => {
        const pIndex = planHierarchy.indexOf(p.title);
        if (planTitle === "PRIME" && p.title === "IGNITE") return false;
        return pIndex > currentPlanIndex;
      });

    // Toggle both options
    if ((selectedPlanForBooster === planTitle && hasBooster) || (selectedPlanForUpgrade === planTitle && hasUpgrade)) {
      // Close both if already open
      setSelectedPlanForBooster(null);
      setSelectedBoosterPlanIndex(null);
      setSelectedBoosterIndex(null);
      setSelectedPlanForUpgrade(null);
      setSelectedPlanIndex(null);
      shouldScrollBoosterRef.current = false;
      shouldScrollUpgradeRef.current = false;
    } else {
      // Open both if available
      if (hasBooster) {
        setSelectedPlanForBooster(planTitle);
        setSelectedBoosterPlanIndex(planIndex);
        setSelectedBoosterIndex(null);
        shouldScrollBoosterRef.current = true;
      }
      if (hasUpgrade) {
        setSelectedPlanForUpgrade(planTitle);
        setSelectedPlanIndex(planIndex);
        shouldScrollUpgradeRef.current = true;
      }
    }
  };

  // Get booster options for the selected plan
  const boosterOptions = useMemo(() => {
    if (!selectedPlanForBooster) return [];
    
    const country = isCanadaContext ? "CA" : "US";
    const planBoosterOptions: Record<string, Record<string, Array<{
      applications: number;
      price: number;
      label: string;
      paymentUrl: string;
    }>>> = {
      US: {
        PRIME: [
          { applications: 250, price: 120, label: "+250 Add-On", paymentUrl: "https://buy.stripe.com/dRmeVf7lm8uSaas6Ob3AY05" },
          { applications: 500, price: 200, label: "+500 Add-On", paymentUrl: "https://buy.stripe.com/28E5kF3567qObewegD3AY06" },
          { applications: 1000, price: 350, label: "+1000 Add-On", paymentUrl: "https://buy.stripe.com/00w28t35626udmE2xV3AY07" },
        ],
        IGNITE: [
          { applications: 250, price: 130, label: "+250 Add-On", paymentUrl: "https://buy.stripe.com/28E7sN9tufXk6Yga0n3AY0a" },
          { applications: 500, price: 220, label: "+500 Add-On", paymentUrl: "https://buy.stripe.com/eVqaEZ5debH4fuM7Sf3AY0b" },
          { applications: 1000, price: 380, label: "+1000 Add-On", paymentUrl: "https://buy.stripe.com/9B69AVfRS6mKdmEgoL3AY0c" },
        ],
        PROFESSIONAL: [
          { applications: 250, price: 120, label: "+250 Add-On", paymentUrl: "https://buy.stripe.com/dRmeVf7lm8uSaas6Ob3AY05" },
          { applications: 500, price: 200, label: "+500 Add-On", paymentUrl: "https://buy.stripe.com/28E5kF3567qObewegD3AY06" },
          { applications: 1000, price: 350, label: "+1000 Add-On", paymentUrl: "https://buy.stripe.com/00w28t35626udmE2xV3AY07" },
        ],
        EXECUTIVE: [
          { applications: 250, price: 110, label: "+250 Add-On", paymentUrl: "https://buy.stripe.com/28EfZj9tu9yW2I0goL3AY0g" },
          { applications: 500, price: 190, label: "+500 Add-On", paymentUrl: "https://buy.stripe.com/fZu6oJdJK7qObew1tR3AY0h" },
          { applications: 1000, price: 330, label: "+1000 Add-On", paymentUrl: "https://buy.stripe.com/4gM5kF9tu6mK1DW3BZ3AY0i" },
        ],
      },
      CA: {
        PRIME: [
          { applications: 250, price: 170, label: "+250 Extra Applications", paymentUrl: "https://buy.stripe.com/00w9AV212eTg6YgfkH3AY0n" },
          { applications: 500, price: 280, label: "+500 Extra Applications", paymentUrl: "https://buy.stripe.com/00w7sN2124eCdmE0pN3AY0o" },
          { applications: 1000, price: 490, label: "+1000 Extra Applications", paymentUrl: "https://buy.stripe.com/00w14pcFGfXk96o7Sf3AY0p" },
        ],
        IGNITE: [
          { applications: 250, price: 180, label: "+250 Extra Applications", paymentUrl: "https://buy.stripe.com/cNi3cx49ah1odmEc8v3AY0s" },
          { applications: 500, price: 305, label: "+500 Extra Applications", paymentUrl: "https://buy.stripe.com/9B65kF9tu12qfuM0pN3AY0t" },
          { applications: 1000, price: 530, label: "+1000 Extra Applications", paymentUrl: "https://buy.stripe.com/9B69AV7lmbH46Yg8Wj3AY0u" },
        ],
        PROFESSIONAL: [
          { applications: 250, price: 170, label: "+250 Extra Applications", paymentUrl: "https://buy.stripe.com/00w9AV212eTg6YgfkH3AY0n" },
          { applications: 500, price: 280, label: "+500 Extra Applications", paymentUrl: "https://buy.stripe.com/7sYcN7eNObH41DW8Wj3AY0w" },
          { applications: 1000, price: 490, label: "+1000 Extra Applications", paymentUrl: "https://buy.stripe.com/00w14pcFGfXk96o7Sf3AY0p" },
        ],
        EXECUTIVE: [
          { applications: 250, price: 155, label: "+250 Extra Applications", paymentUrl: "https://buy.stripe.com/14A8wRfRS9yWdmEb4r3AY0y" },
          { applications: 500, price: 265, label: "+500 Extra Applications", paymentUrl: "https://buy.stripe.com/5kQ6oJ356fXk1DWc8v3AY0z" },
          { applications: 1000, price: 460, label: "+1000 Extra Applications", paymentUrl: "https://buy.stripe.com/eVqaEZ3565iG3M4dcz3AY0A" },
        ],
      },
    };
    
    return planBoosterOptions[country]?.[selectedPlanForBooster] || [];
  }, [selectedPlanForBooster, isCanadaContext]);

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-white py-12 sm:py-16 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 font-['Space_Grotesk',sans-serif] text-center min-h-fit"
    >
      <div id="pricing-heading" className="relative mx-auto mb-8 sm:mb-12 w-full max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[3.15rem] font-bold mb-3 sm:mb-4 text-[#393939] leading-tight px-2 capitalize lg:whitespace-nowrap">
          Choose Your Career Acceleration Plan
        </h2>
        <p className="max-w-[43rem] mx-auto text-[#393939] text-sm sm:text-[1.05rem] lg:text-[1.2rem] leading-relaxed px-2">
          All plans include our AI-powered job matching and application
          automation.
          <strong> Save 150+ hours monthly</strong> while we work for you 24/7.
        </p>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-4 mb-[91px] items-stretch max-w-[1510px] mx-auto">
        {pricingPlans.map((plan, index) => (
            <PricingCard
            key={index}
            title={plan.title}
            tag={plan.tag}
            subTitle={plan.subTitle}
            description={plan.description}
            price={plan.price}
            oldPrice={plan.oldPrice}
            features={plan.features}
            inheritsFrom={plan.inheritsFrom}
            addOn={plan.addOn}
            highlight={plan.highlight}
            paymentLink={plan.paymentLink}
            allPlans={pricingPlans}
            visualHighlight={false}
            onUpgradeClick={(planTitle) => handleUpgradeClick(planTitle, index)}
            isUpgradeOptionsVisible={selectedPlanForUpgrade === plan.title}
            onBoosterClick={(planTitle) => handleBoosterClick(planTitle, index)}
            isBoosterOptionsVisible={selectedPlanForBooster === plan.title}
            onOptionsClick={(planTitle) => handleOptionsClick(planTitle, index)}
            isOptionsVisible={(selectedPlanForBooster === plan.title || selectedPlanForUpgrade === plan.title)}
          />
        ))}
      </div>

      {/* === Options Sections - Below Cards === */}
      {((selectedPlanForBooster !== null && selectedBoosterPlanIndex !== null && boosterOptions.length > 0) ||
        (selectedPlanForUpgrade !== null && selectedPlanIndex !== null && upgradeOptions.length > 0)) && (
        <div className="mb-16 sm:mb-20 lg:mb-24 mt-4 sm:mt-6 px-2 sm:px-0">
          {(() => {
            const boosterPlanIndex = selectedBoosterPlanIndex;
            const upgradePlanIndex = selectedPlanIndex;
            const hasBoth = boosterPlanIndex !== null && upgradePlanIndex !== null &&
                            selectedPlanForBooster !== null && selectedPlanForUpgrade !== null;

            // When both are visible, display them full width side by side
            if (hasBoth) {
              return (
                <div className="flex flex-col sm:flex-row gap-4 max-w-6xl mx-auto">
                  {/* Booster Add-On section */}
                  <div ref={boosterSectionRef} className="flex-1 bg-white border border-[#ffb99d] rounded-lg p-4 sm:p-5 shadow-[0_18px_50px_rgba(255,76,0,0.12)]">
                    <div className="relative mb-3 sm:mb-4">
                      <div className="text-center">
                        <h5 className="text-base sm:text-[1.1rem] font-bold mb-1 text-black">
                          Booster Add-On
                        </h5>
                        <p className="text-xs sm:text-[0.75rem] text-[#666]">
                          Add more applications to boost your reach
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedPlanForBooster(null);
                          setSelectedBoosterPlanIndex(null);
                          setSelectedBoosterIndex(null);
                        }}
                          className="absolute top-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#fff1e9] text-[#ff4c00] font-semibold text-xs hover:bg-[#ffe0d2]"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {boosterOptions.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedBoosterIndex(index);
                            openCheckout(option.paymentUrl);
                          }}
                          className={`w-full text-left p-3 rounded-md border transition-all duration-200 ${
                            selectedBoosterIndex === index
                              ? "bg-[#ff4c00] border-[#ff4c00] text-white shadow-[0_8px_20px_rgba(255,76,0,0.2)]"
                              : "bg-[#fffaf7] border-[#f3dfd5] text-black hover:bg-[#fff1e9] hover:border-[#ffb99d]"
                          }`}
                        >
                          <div className="flex justify-between items-center gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-xs sm:text-sm mb-0.5">
                                {option.label}
                              </div>
                            </div>
                            <div className="font-bold text-xs sm:text-sm flex-shrink-0">
                              {currencySymbol}{option.price}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Upgrade Plan section */}
                  <div ref={upgradeSectionRef} className="flex-1 bg-white border border-[#ffb99d] rounded-lg p-4 sm:p-5 shadow-[0_18px_50px_rgba(255,76,0,0.12)]">
                    <div className="relative mb-3 sm:mb-4">
                      <div className="text-center">
                        <h5 className="text-base sm:text-[1.1rem] font-bold mb-1 text-black">
                          Upgrade Plan
                        </h5>
                        <p className="text-xs sm:text-[0.75rem] text-[#666]">
                          Upgrade to a higher tier for more applications and features
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedPlanForUpgrade(null);
                          setSelectedPlanIndex(null);
                        }}
                          className="absolute top-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#fff1e9] text-[#ff4c00] font-semibold text-xs hover:bg-[#ffe0d2]"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {upgradeOptions.map((upgradePlan) => (
                        <button
                          key={upgradePlan.title}
                          onClick={() => {
                            const paymentUrl = (upgradePlan as any).upgradePaymentUrl || upgradePlan.paymentLink;
                            openCheckout(paymentUrl);
                          }}
                          className="w-full text-left p-3 rounded-md border transition-all duration-200 bg-[#fffaf7] border-[#ffb99d] text-black hover:bg-[#fff1e9] hover:border-[#ff4c00]"
                        >
                          <div className="flex justify-between items-center gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-xs sm:text-sm mb-0.5">
                                {upgradePlan.title}
                              </div>
                              <div className="text-[0.7rem] sm:text-xs opacity-90">
                                {upgradePlan.subTitle}
                              </div>
                            </div>
                            <div className="font-bold text-xs sm:text-sm flex-shrink-0">
                              {currencySymbol}{(upgradePlan as any).upgradePrice || 0}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            // When only one is visible, center it in the middle
            const planIndex = boosterPlanIndex !== null ? boosterPlanIndex : (upgradePlanIndex !== null ? upgradePlanIndex : 0);

            if (planIndex === null) return null;

            // Calculate empty columns to center the section (2 columns wide in a 4-column grid)
            const totalColumns = 4;
            const sectionWidth = 2;
            const emptyColumnsBefore = Math.floor((totalColumns - sectionWidth) / 2);
            const emptyColumnsAfter = totalColumns - sectionWidth - emptyColumnsBefore;

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
                {/* Empty columns before the section (to center it) */}
                {Array.from({ length: emptyColumnsBefore }).map((_, i) => (
                  <div key={`empty-before-${i}`} />
                ))}

                {/* Booster Add-On section (when only booster is visible) */}
                {selectedPlanForBooster !== null && boosterPlanIndex !== null && boosterOptions.length > 0 && (
                  <div ref={boosterSectionRef} className="col-span-1 sm:col-span-2 lg:col-span-2 bg-white border border-[#ffb99d] rounded-lg p-4 sm:p-5 shadow-[0_18px_50px_rgba(255,76,0,0.12)]">
                    <div className="relative mb-3 sm:mb-4">
                      <div className="text-center">
                        <h5 className="text-base sm:text-[1.1rem] font-bold mb-1 text-black">
                          Booster Add-On
                        </h5>
                        <p className="text-xs sm:text-[0.75rem] text-[#666]">
                          Add more applications to boost your reach
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedPlanForBooster(null);
                          setSelectedBoosterPlanIndex(null);
                          setSelectedBoosterIndex(null);
                        }}
                        className="absolute top-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#fff1e9] text-[#ff4c00] font-semibold text-xs hover:bg-[#ffe0d2]"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {boosterOptions.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedBoosterIndex(index);
                            openCheckout(option.paymentUrl);
                          }}
                          className={`w-full text-left p-3 rounded-md border transition-all duration-200 ${
                            selectedBoosterIndex === index
                              ? "bg-[#ff4c00] border-[#ff4c00] text-white shadow-[0_8px_20px_rgba(255,76,0,0.2)]"
                              : "bg-[#fffaf7] border-[#f3dfd5] text-black hover:bg-[#fff1e9] hover:border-[#ffb99d]"
                          }`}
                        >
                          <div className="flex justify-between items-center gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-xs sm:text-sm mb-0.5">
                                {option.label}
                              </div>
                            </div>
                            <div className="font-bold text-xs sm:text-sm flex-shrink-0">
                              {currencySymbol}{option.price}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upgrade Plan section (when only upgrade is visible) */}
                {selectedPlanForUpgrade !== null && upgradePlanIndex !== null && upgradeOptions.length > 0 && (
                  <div ref={upgradeSectionRef} className="col-span-1 sm:col-span-2 lg:col-span-2 bg-white border border-[#ffb99d] rounded-lg p-4 sm:p-5 shadow-[0_18px_50px_rgba(255,76,0,0.12)]">
                    <div className="relative mb-3 sm:mb-4">
                      <div className="text-center">
                        <h5 className="text-base sm:text-[1.1rem] font-bold mb-1 text-black">
                          Upgrade Plan
                        </h5>
                        <p className="text-xs sm:text-[0.75rem] text-[#666]">
                          Upgrade to a higher tier for more applications and features
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedPlanForUpgrade(null);
                          setSelectedPlanIndex(null);
                        }}
                        className="absolute top-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#fff1e9] text-[#ff4c00] font-semibold text-xs hover:bg-[#ffe0d2]"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {upgradeOptions.map((upgradePlan) => (
                        <button
                          key={upgradePlan.title}
                          onClick={() => {
                            const paymentUrl = (upgradePlan as any).upgradePaymentUrl || upgradePlan.paymentLink;
                            openCheckout(paymentUrl);
                          }}
                          className="w-full text-left p-3 rounded-md border transition-all duration-200 bg-[#fffaf7] border-[#ffb99d] text-black hover:bg-[#fff1e9] hover:border-[#ff4c00]"
                        >
                          <div className="flex justify-between items-center gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-xs sm:text-sm mb-0.5">
                                {upgradePlan.title}
                              </div>
                              <div className="text-[0.7rem] sm:text-xs opacity-90">
                                {upgradePlan.subTitle}
                              </div>
                            </div>
                            <div className="font-bold text-xs sm:text-sm flex-shrink-0">
                              {currencySymbol}{(upgradePlan as any).upgradePrice || 0}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty columns after the section (to center it) */}
                {Array.from({ length: emptyColumnsAfter }).map((_, i) => (
                  <div key={`empty-after-${i}`} />
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* === Risk-Free Section === */}
      <div className="relative mx-auto mt-12 sm:mt-16 mb-6 sm:mb-8 w-full max-w-[1393px] min-h-[229px] bg-white border border-[#8f8f8f] p-[3px]">

      <div className="flex min-h-[221px] items-center border-[3px] border-[#ffc7b4] bg-white px-5 py-7 sm:px-8 lg:px-[72px] lg:py-[32px]">
        <div className="flex w-full flex-col items-center justify-center gap-8 lg:flex-row lg:justify-between lg:gap-0">
          {/* Left Section */}
          <div className="flex w-full max-w-[720px] flex-col items-center gap-6 sm:flex-row sm:items-center lg:gap-[65px]">
            {/* Pixel Art Mascot - on the left */}
            <div className="relative h-[108px] w-[108px] shrink-0 sm:h-[124px] sm:w-[124px]">
              <Image
                src="/images/right logo.png"
                alt="Risk-free shield"
                fill
                sizes="124px"
                className="object-contain"
              />
            </div>

            <div className="text-center sm:text-left">
              <h3 className="mb-[10px] text-[28px] font-bold leading-none text-[#02060a] sm:text-[32px]">
                100% Risk Free
              </h3>
              <p className="max-w-[620px] text-[15px] font-medium leading-[1.35] text-[#02060a] sm:text-[17px]">
                If you didn&rsquo;t land interviews, we&rsquo;ll send{" "}
                <span className="font-bold italic text-[#ff4c00]">
                  150-200 more applications,
                </span>
                <br className="hidden sm:block" />
                <span className="font-bold italic text-[#ff4c00]">
                  free of charge.
                </span>{" "}
                Because at Flashfire, you only pay for progress.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden h-[122px] w-px bg-[#7c7c7c] lg:block" />

          <div className="flex w-full items-center justify-center gap-[24px] lg:w-auto lg:min-w-[330px] lg:justify-start">
              <div className="relative h-[92px] w-[92px] shrink-0 sm:h-[106px] sm:w-[106px]">
              <Image
                src="/images/flashfire-logo.png"
                alt="Flashfire mascot"
                fill
                  sizes="106px"
                className="object-contain"
              />
            </div>

            <div className="text-left text-[32px] font-bold leading-[1.08] text-[#02060a] sm:text-[36px]">
              <span className="block">
                Flashfire
              </span>
              <span className="block">
                Guarantee
              </span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
