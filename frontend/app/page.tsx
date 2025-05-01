"use client"
import MainNav from "@/components/Landing/main-nav";
import Footer from "@/components/Landing/footer";
import HowWork from "@/components/Landing/HowWork";
import Pricing from "@/components/Landing/Pricing";
import JoinCommunity from "@/components/Landing/JoinCommunity";
import MainPage from "@/components/Landing/MainPage";
import FAQ from "@/components/Landing/Faq";
import ChallengePreview from "@/components/Landing/preview";
import Testimonials from "@/components/Landing/Testimonial";

export default function Home() {


  return (
    <div className="flex min-h-screen  flex-col">
      <MainNav />
      <main className="flex-1">
        <MainPage />
        <HowWork />
        <ChallengePreview />
        <Testimonials />
        <Pricing />
        <FAQ />
        <JoinCommunity />
      </main>
      <Footer />
    </div>
  );
}
