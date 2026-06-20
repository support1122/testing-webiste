"use client";

import { useMemo } from "react";
import { FaBolt } from "react-icons/fa";
import { trackButtonClick } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";

interface PricingPlan {
  title: string;
  tag?: string;
  subTitle: string;
  description: string;
  price: string;
  oldPrice?: string;
  features: PricingFeature[];
  inheritsFrom?: string;
  addOn?: boolean;
  highlight?: boolean;
  paymentLink?: string;
}

interface PricingFeature {
  title: string;
  description: string;
}

interface PricingCardProps {
  title: string;
  tag?: string;
  subTitle: string;
  description: string;
  price: string;
  oldPrice?: string;
  features: PricingFeature[];
  inheritsFrom?: string;
  addOn?: boolean;
  highlight?: boolean;
  paymentLink?: string;
  allPlans?: PricingPlan[];
  onUpgradeClick?: (planTitle: string) => void;
  isUpgradeOptionsVisible?: boolean;
  onBoosterClick?: (planTitle: string) => void;
  isBoosterOptionsVisible?: boolean;
  onOptionsClick?: (planTitle: string) => void;
  isOptionsVisible?: boolean;
  visualHighlight?: boolean;
}

export default function PricingCard({
  title,
  tag,
  subTitle,
  description,
  price,
  oldPrice,
  features,
  inheritsFrom,
  addOn,
  highlight,
  paymentLink,
  allPlans = [],
  onUpgradeClick,
  onBoosterClick,
  onOptionsClick,
  visualHighlight,
}: PricingCardProps) {
  // Check if this plan has upgrade options
  const hasUpgradeOptions = useMemo(() => {
    if (!allPlans || allPlans.length === 0) return false;

    const planHierarchy = ["PRIME", "IGNITE", "PROFESSIONAL", "EXECUTIVE"];
    const currentPlanIndex = planHierarchy.indexOf(title);

    if (currentPlanIndex === -1 || currentPlanIndex === planHierarchy.length - 1) {
      return false;
    }

    // Check if there are any plans higher in hierarchy (excluding IGNITE from PRIME)
    return allPlans.some(plan => {
      const planIndex = planHierarchy.indexOf(plan.title);
      if (title === "PRIME" && plan.title === "IGNITE") {
        return false;
      }
      return planIndex > currentPlanIndex;
    });
  }, [title, allPlans]);

  // Parse base price from string (handles "$199" or "CA$279")
  const basePrice = useMemo(() => {
    const priceMatch = price.match(/[\d.]+/);
    return priceMatch ? parseFloat(priceMatch[0]) : 0;
  }, [price]);

  // Parse old price
  const oldBasePrice = useMemo(() => {
    if (!oldPrice) return 0;
    const match = oldPrice.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }, [oldPrice]);

  // Calculate discount percentage
  const discountPercent = useMemo(() => {
    if (!oldBasePrice || !basePrice) return 0;
    const discount = ((oldBasePrice - basePrice) / oldBasePrice) * 100;
    return Math.round(discount);
  }, [oldBasePrice, basePrice]);

  // Get currency symbol
  const currencySymbol = useMemo(() => {
    if (price.includes("CA$")) return "CA$";
    if (price.includes("$")) return "$";
    return "$";
  }, [price]);

  // Calculate displayed price: show base price
  const displayedPrice = useMemo(() => {
    return basePrice;
  }, [basePrice]);

  // Format price with currency
  const formattedPrice = useMemo(() => {
    return `${currencySymbol}${displayedPrice.toFixed(0)}`;
  }, [displayedPrice, currencySymbol]);

  // Get payment URL: use original paymentLink
  const currentPaymentLink = useMemo(() => {
    return paymentLink;
  }, [paymentLink]);

  const maxFeatureCount = useMemo(() => {
    if (!allPlans || allPlans.length === 0) return features.length;
    return Math.max(features.length, ...allPlans.map((plan) => plan.features.length));
  }, [allPlans, features.length]);

  const isDarkCard = visualHighlight ?? highlight;
  const cardTextClass = isDarkCard ? "text-white" : "text-[#262626]";
  const mutedTextClass = isDarkCard ? "text-white/78" : "text-[#262626]/70";
  const dividerClass = isDarkCard ? "border-white/30" : "border-black/35";
  const tabMainWidth = 154;
  const tabStepOneLeft = tabMainWidth;
  const tabStepTwoLeft = tabMainWidth + 16;
  const tabSquareLeft = tabMainWidth + 40;
  const tabTotalWidth = tabMainWidth + 68;

  return (
    <div className="group flex h-full w-full flex-col pt-9">
      <div
        className="relative z-0 ml-1 h-[58px] max-w-[92%] transition-transform duration-300 group-hover:-translate-y-1"
        style={{ width: tabTotalWidth }}
      >
        <div
          className="absolute left-0 top-0 h-[42px] rounded-tl-[6px] bg-[#262626]"
          style={{ width: tabMainWidth }}
        />
        <div
          className="absolute top-[12px] h-[46px] w-4 bg-[#262626]"
          style={{ left: tabStepOneLeft }}
        />
        <div
          className="absolute top-[28px] h-5 w-4 bg-[#262626]"
          style={{ left: tabStepTwoLeft }}
        />
        <div
          className="absolute top-[12px] h-4 w-4 bg-[#262626]"
          style={{ left: tabSquareLeft }}
        />
        <div
          className="absolute left-0 top-0 flex h-[42px] items-center px-6"
          style={{ width: tabMainWidth }}
        >
          <span className="truncate text-[15px] font-medium uppercase text-white">
            {title}
          </span>
        </div>
      </div>
      <div
        className={`relative z-10 -mt-[22px] flex flex-1 flex-col rounded-[14px] border border-black p-5 sm:p-6 text-left shadow-[-5px_6px_0_0_#000] transition-transform duration-300 group-hover:-translate-y-1 ${isDarkCard ? "bg-black" : "bg-white"}`}
      >
        {tag && (
          <div
            className={`absolute right-5 top-5 text-white text-[0.65rem] sm:text-xs font-semibold rounded px-2 sm:px-3 py-1 ${tag === "MOST POPULAR" ? "bg-[#ff4c00]" : "bg-[#262626]"
              }`}
          >
            {tag}
          </div>
        )}

        <div className="mb-4 pt-6 sm:pt-7">
          {/* Old price + Discount tag */}
          {oldPrice && (
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-sm line-through ${isDarkCard ? "text-white/45" : "text-gray-400"}`}>
                {oldPrice}
              </span>

              {discountPercent > 0 && (
                <span className="bg-orange-100 text-[#ff4c00] text-[11px] font-semibold px-2 py-[2px] rounded-full">
                  Save {discountPercent}%
                </span>
              )}
            </div>
          )}

          {/* Main price */}
          <div className="flex flex-wrap items-end gap-x-1.5 gap-y-1">
            <h3 className={`text-3xl sm:text-[2.35rem] font-extrabold leading-none tracking-[-0.02em] ${cardTextClass}`}>
              {formattedPrice}
            </h3>
          </div>
        </div>



        <p className={`${cardTextClass} text-sm sm:text-[0.95rem] mb-4 min-h-[2rem]`}>
          {description}
        </p>

        <hr className={`mb-5 border-t ${dividerClass}`} />

        <ul className="list-none p-0 mb-4 sm:mb-5">
          <li className={`flex items-start gap-3 mb-5 ${cardTextClass}`}>
            <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center">
              <FaBolt className="text-[#ff4c00] text-[16px]" />
            </span>
            <span className="min-w-0">
              <strong className="block text-[0.95rem] font-extrabold leading-tight text-[#ff4c00]">
                {subTitle}
              </strong>
            </span>
          </li>
          {inheritsFrom && (
            <li className={`flex items-start gap-3 mb-5 ${cardTextClass}`}>
              <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                <FaBolt className="text-[#ff4c00] text-[16px]" />
              </span>
              <span className="min-w-0">
                <strong className={`block text-[0.95rem] font-extrabold leading-tight ${isDarkCard ? "text-white/60" : "text-[#262626]/50"}`}>
                  Everything in {inheritsFrom.charAt(0) + inheritsFrom.slice(1).toLowerCase()} +
                </strong>
              </span>
            </li>
          )}
          {features.map((feature, i) => (
            <li
              key={i}
              className={`flex items-start gap-3 mb-5 last:mb-0 ${cardTextClass}`}
            >
              <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                <FaBolt className="text-[#ff4c00] text-[16px]" />
              </span>
              <span className="min-w-0">
                <strong className={`block text-[0.95rem] font-extrabold leading-tight ${cardTextClass}`}>
                  {feature.title}
                </strong>
                <span className={`mt-1 block text-[0.8rem] leading-snug ${mutedTextClass}`}>
                  {feature.description}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          {(addOn || hasUpgradeOptions) ? (
            <button
              onClick={() => {
                if (onOptionsClick) {
                  onOptionsClick(title);
                } else {
                  // Fallback to individual handlers if combined handler not provided
                  if (addOn && onBoosterClick) {
                    onBoosterClick(title);
                  } else if (hasUpgradeOptions && onUpgradeClick) {
                    onUpgradeClick(title);
                  }
                }
              }}
              className="bg-[#ff4c00] text-white border border-[#ff4c00] py-2.5 sm:py-3 px-3 sm:px-4 font-semibold text-xs sm:text-sm rounded-md w-full cursor-pointer transition-all duration-300 hover:bg-[#e24300] mb-3 sm:mb-4"
            >
              {addOn && hasUpgradeOptions ? "View Options" : addOn && title === "EXECUTIVE" ? "View Options" : addOn ? "Booster Add-On" : "Upgrade Plan"}
            </button>
          ) : (
            <div className="mb-3 sm:mb-4 h-[2rem] sm:h-[2.5rem]"></div>
          )}

          {/* <p className="text-[0.85rem] text-[#555] mb-5">
        Total {subTitle.toLowerCase()} included
      </p> */}

          <button
            className="border border-black bg-black py-3 sm:py-[0.9rem] px-3 sm:px-4 font-semibold text-sm sm:text-[0.95rem] rounded-md w-full cursor-pointer text-white transition-all duration-300 hover:bg-[#222]"
            onClick={() => {
              const utmSource = typeof window !== "undefined"
                ? localStorage.getItem("utm_source") || "WEBSITE"
                : "WEBSITE";
              const utmMedium = typeof window !== "undefined"
                ? localStorage.getItem("utm_medium") || "Pricing_Section"
                : "Pricing_Section";

              const finalPlanName = title;
              const finalPrice = formattedPrice;
              const finalSubtitle = subTitle;

              if (typeof window !== "undefined") {
                GTagUTM({
                  eventName: "pricing_cta_click",
                  label: `Pricing_${finalPlanName}_Button`,
                  utmParams: {
                    utm_source: utmSource,
                    utm_medium: utmMedium,
                    utm_campaign: localStorage.getItem("utm_campaign") || "Website",
                  },
                });
              }

              // PostHog tracking
              trackButtonClick(`Start Now - ${finalPlanName}`, "pricing_cta", "cta", {
                button_location: "pricing_plan",
                plan_name: finalPlanName,
                original_plan: title,
                plan_price: finalPrice,
                plan_subtitle: finalSubtitle,
                selected_booster: null,
                total_price: finalPrice
              });

              if (currentPaymentLink && typeof window !== "undefined") {
                const checkoutWindow = window.open(currentPaymentLink, "_blank", "noopener,noreferrer");

                if (!checkoutWindow) {
                  window.location.href = currentPaymentLink;
                }
              }
            }}
          >
            Start Now
          </button>
        </div>
      </div>

    </div>
  );
}
