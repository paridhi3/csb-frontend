import Header from "@/app/Home/Header";
import Hero from "@/app/Home/Hero";
import Features from "@/app/Home/Features";
import Footer from "@/app/Home/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}