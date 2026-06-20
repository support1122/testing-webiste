import HomePageOfferLettersClient from "./homePageOfferLettersClient";

interface HomePageOfferLettersProps {
  heading?: string;
  variant?: "split" | "auto";
  autoScroll?: boolean;
  enableLoopControls?: boolean;
  buttonOnlyScroll?: boolean;
  continuousScroll?: boolean;
}

export default function HomePageOfferLetters(props: HomePageOfferLettersProps) {
  return <HomePageOfferLettersClient {...props} />;
}
