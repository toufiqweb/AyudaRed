import Banner from "@/components/homepage/Banner";
import CallToAction from "@/components/homepage/CallToAction";
import FeatureGrid from "@/components/homepage/FeatureGrid";
import FundingSection from "@/components/homepage/FundingSection";
import HowItWorks from "@/components/homepage/HowItWorks";
import StatsPage from "@/components/homepage/Stats";
import BloodDonationLanding from "@/components/homepage/BloodDonationLanding";
import NewsletterCTA from "@/components/homepage/NewsletterCTA";

export const metadata = {
  title: "AyudaRed - Save Lives by Donating Blood",
  description: "Join AyudaRed to request blood, find donors, and fund vital campaigns in your area.",
};

export default function Home() {
  return (
    <div>
      <Banner />
      <StatsPage />
      <HowItWorks />
      <FeatureGrid />
      <CallToAction />
      <FundingSection />
      <BloodDonationLanding />
      <NewsletterCTA />
    </div>
  );
}
