import { Button } from "@/components/ui/button";
import { Upload, MessageSquare, Brain, Zap, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="grid lg:grid-cols-2 w-full h-full">

        {/* Text */}
        <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto w-full">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-sky-800 text-sm font-medium">
                <Zap className="h-4 w-4 mr-2" />
                Powered by AI Agents
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Intelligent Case Study{" "}
                <span className="text-sky-800">Categorizer</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Harness the power of advanced AI agents to automatically
                classify, analyze, and chat with your case study files.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/upload">
                <Button
                  size="lg"
                  className="cursor-pointer bg-sky-800 hover:bg-sky-600 text-white px-8 py-3 text-lg"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Case Studies
                </Button>
              </Link>
              <Link href="/chat">
                <Button
                  size="lg"
                  variant="outline"
                  className="cursor-pointer border-red-500 text-red-600 hover:bg-red-50 px-8 py-3 text-lg bg-transparent"
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Chat with Files
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                Secure Processing
              </div>
              <div className="flex items-center">
                <Brain className="h-4 w-4 mr-1" />
                AI-Powered Analysis
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full h-screen">
          <Image
            src="/images/hero.jpg"
            alt="AI-powered case study analysis landscape"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}

