"use client"
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
    <>
     <div className="lg:hidden overflow-hidden fixed inset-0 flex items-center justify-center bg-black text-white z-50 p-4 text-center">
        <div className="bg-white/10 border border-white/20 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-sm">
          <h2 className="text-xl font-bold mb-2">Desktop Experience Required</h2>
          <p className="text-sm text-gray-300">
          CloneChamp is optimized for larger screens to provide the best experience. Please access this platform from a desktop or laptop device.

          </p>
        </div>
      </div>
    
    <div className="flex min-h-screen flex-col">
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
    </>
  );
}
