import Banner from "@/components/homepage/Banner";
import CallToAction from "@/components/homepage/CallToAction";
import FeatureGrid from "@/components/homepage/FeatureGrid";
import FundingSection from "@/components/homepage/FundingSection";
import HowItWorks from "@/components/homepage/HowItWorks";
import StatsPage from "@/components/homepage/Stats";

export default function Home() {
  return (
    <div>
      <Banner />
      <StatsPage />
      <HowItWorks />
      <FeatureGrid />
      <FundingSection />
      <CallToAction />
    </div>
  );
}
