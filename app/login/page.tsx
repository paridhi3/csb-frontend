import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center text-sky-800 hover:text-sky-600 mb-4 cursor-pointer">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-8 w-8 text-sky-800" />
            <span className="text-2xl font-bold text-gray-900">Case Study AI</span>
          </div>
          <p className="text-gray-600">Access your AI-powered case study analysis</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your case studies and AI agents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>
            <Button className="w-full bg-sky-800 hover:bg-sky-600 cursor-pointer">Sign In</Button>
            <div className="text-center">
              <Link href="/signup" className="text-sm text-sky-800 hover:text-sky-600 cursor-pointer">
                {"Don't have an account? Sign up"}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
