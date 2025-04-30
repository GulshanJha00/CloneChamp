import Link from "next/link";
import { Button } from "@/components/ui/button";
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
    <div className="flex min-h-screen bg-(--background) flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
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
