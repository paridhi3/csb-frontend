import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-sky-800" />
            <span className="text-xl font-bold text-gray-900">Case Study AI</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-sky-800 font-medium hover:text-blue-700 transition-colors cursor-pointer">
              Home
            </Link>
            <Link href="#features" className="text-gray-600 hover:text-sky-800 transition-colors cursor-pointer">
              Features
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-sky-800 transition-colors cursor-pointer">
              Login
            </Link>
          </nav>
          <Button variant="outline" className="md:hidden bg-transparent cursor-pointer">
            Menu
          </Button>
        </div>
      </div>
    </header>
  );
}
