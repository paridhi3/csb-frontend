import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Intelligent Features Powered by AI</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our advanced AI agents work tirelessly to understand, categorize, and analyze your case studies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Classification */}
          <Card className="border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-sky-800" />
                </div>
                <CardTitle className="text-xl">Smart Classification</CardTitle>
              </div>
              <CardDescription className="text-base">
                AI agents automatically analyze and categorize your case studies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-gray-600">
                <li>File categorization & domain classification</li>
                <li>Technology stack identification</li>
                <li>Comprehensive metadata extraction</li>
              </ul>
              {/* <Link href="/classification">
                <Button className="cursor-pointer w-full bg-sky-800 hover:bg-sky-700">View Classification Table</Button>
              </Link> */}
            </CardContent>
          </Card>

          {/* Chat */}
          <Card className="border-red-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">Cross-File Chat</CardTitle>
              </div>
              <CardDescription className="text-base">
                Intelligent conversations across all your case study files
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-gray-600">
                <li>Query across multiple documents simultaneously</li>
                <li>Get contextual answers with references</li>
                <li>Discover patterns & insights</li>
              </ul>
              {/* <Link href="/chat">
                <Button className="cursor-pointer w-full bg-red-600 hover:bg-red-700">Start Chatting</Button>
              </Link> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
