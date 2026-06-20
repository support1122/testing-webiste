"use client";

import { usePathname } from "next/navigation";
import { heroSectionData, heroSectionDataCA } from "@/src/data/herosection";
import HeroSectionClient from "./heroSectionClient";

type Props = {
  country?: "us" | "ca";
};

export default function HeroSection({ country }: Props) {
  const pathname = usePathname();
  const isCanadaContext =
    country === "ca" || (country !== "us" && pathname?.startsWith("/en-ca"));
  const data = isCanadaContext ? heroSectionDataCA : heroSectionData;
  const heroImageSrc = "/images/landingpageImg.png";

  return (
    <HeroSectionClient
      data={data}
      heroImageSrc={heroImageSrc}
      shiftHeroImageLeft={false}
    />
  );
}
