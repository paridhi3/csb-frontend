import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Brain, FileText, Upload, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const classificationData = [
  {
    id: 1,
    fileName: "ecommerce-platform-redesign.pdf",
    category: "UX/UI Design",
    domain: "E-commerce",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    confidence: 95,
    status: "Processed",
  },
  {
    id: 2,
    fileName: "ai-chatbot-implementation.docx",
    category: "AI/ML",
    domain: "Customer Service",
    technologies: ["Python", "TensorFlow", "FastAPI", "Docker"],
    confidence: 92,
    status: "Processed",
  },
  {
    id: 3,
    fileName: "mobile-banking-security.pdf",
    category: "Security",
    domain: "FinTech",
    technologies: ["Swift", "Kotlin", "OAuth", "Biometrics"],
    confidence: 88,
    status: "Processed",
  },
  {
    id: 4,
    fileName: "cloud-migration-strategy.pdf",
    category: "Infrastructure",
    domain: "Enterprise",
    technologies: ["AWS", "Kubernetes", "Terraform", "Jenkins"],
    confidence: 91,
    status: "Processing",
  },
  {
    id: 5,
    fileName: "blockchain-supply-chain.docx",
    category: "Blockchain",
    domain: "Supply Chain",
    technologies: ["Ethereum", "Solidity", "Web3.js", "IPFS"],
    confidence: 89,
    status: "Processed",
  },
]

export default function ClassificationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-semibold text-gray-900">Classification Dashboard</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Link href="/upload">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Smart Classification</h1>
              <p className="text-gray-600">AI agents have analyzed and categorized your case studies</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Files</p>
                    <p className="text-2xl font-bold text-blue-600">5</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Processed</p>
                    <p className="text-2xl font-bold text-green-600">4</p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Processing</p>
                    <p className="text-2xl font-bold text-yellow-600">1</p>
                  </div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Confidence</p>
                    <p className="text-2xl font-bold text-purple-600">91%</p>
                  </div>
                  <Brain className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Classification Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <span>AI Classification Results</span>
            </CardTitle>
            <CardDescription>
              Detailed analysis and categorization performed by our intelligent AI agents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>Technologies</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classificationData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-blue-50">
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="truncate max-w-xs">{item.fileName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-gray-300">
                          {item.domain}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {item.technologies.slice(0, 2).map((tech, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                              {tech}
                            </Badge>
                          ))}
                          {item.technologies.length > 2 && (
                            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                              +{item.technologies.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-full bg-gray-200 rounded-full h-2 max-w-[60px]">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${item.confidence}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{item.confidence}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={item.status === "Processed" ? "default" : "secondary"}
                          className={
                            item.status === "Processed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <span>AI Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Most Common Domain</h4>
                <p className="text-blue-700">Technology & Software Development</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Top Technology</h4>
                <p className="text-green-700">React & Node.js Stack</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Emerging Trend</h4>
                <p className="text-purple-700">AI/ML Integration</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
