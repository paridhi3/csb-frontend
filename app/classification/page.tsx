"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Brain, FileText, Upload, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react";
import Header from "../Home/Header"

interface ClassificationItem {
  id: number;
  fileName: string;
  category: string;
  domain: string;
  technologies: string;
  confidence: number;
}

export default function ClassificationPage() {
  const [results, setResults] = useState<ClassificationItem[] | null>(null);
  useEffect(() => {
    const stored = localStorage.getItem("classificationResults");
    console.log("classifi.tsx: ", stored);
    if (stored) {
      const parsed = JSON.parse(stored);

      // Assuming parsed.metadata is an array of objects with the required fields
      const formatted = parsed.metadata.map((item: any, index = 0) => ({
        id: index + 1,
        fileName: item.file_name,
        category: item.category,
        domain: item.domain,
        technologies: item.technology,
        confidence: item.confidence ?? 90,
      }));

      setResults(formatted);
    }
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-sky-800" />
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
                    <p className="text-2xl font-bold text-sky-800">{results?.length ?? 0}</p>
                  </div>
                  <FileText className="h-8 w-8 text-sky-800" />
                </div>
              </CardContent>
            </Card>

            {/* <Card>
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
            </Card> */}
          </div>
        </div>

        {/* Classification Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-sky-800" />
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results?.map((item) => (
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
                          {item.technologies
                            .split(",")
                            .slice(0, 2)
                            .map((tech, index) => (
                              <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                                {tech.trim()}
                              </Badge>
                            ))}
                          {item.technologies.split(",").length > 2 && (
                            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                              +{item.technologies.split(",").length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-full bg-gray-200 rounded-full h-2 max-w-[60px]">
                            <div
                              className="bg-sky-800 h-2 rounded-full"
                              style={{ width: `${item.confidence}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{item.confidence}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        {/* <Card className="mt-6">
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
                <p className="text-sky-700">Technology & Software Development</p>
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
        </Card> */}
      </div>
    </div>
  )
}
