"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, ArrowLeft, CheckCircle, AlertCircle, Brain } from "lucide-react"
import Link from "next/link"

interface UploadedFile {
  id: number
  name: string
  size: string
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
}

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    const newFiles: UploadedFile[] = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      status: "uploading",
      progress: 0,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])

    // Simulate upload and processing
    newFiles.forEach((file, index) => {
      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === file.id && f.progress < 100 ? { ...f, progress: f.progress + 10 } : f)),
        )
      }, 200)

      // Complete upload and start processing
      setTimeout(
        () => {
          clearInterval(uploadInterval)
          setUploadedFiles((prev) =>
            prev.map((f) => (f.id === file.id ? { ...f, status: "processing", progress: 100 } : f)),
          )

          // Complete processing
          setTimeout(
            () => {
              setUploadedFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: "completed" } : f)))
            },
            3000 + index * 1000,
          )
        },
        2000 + index * 500,
      )
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "processing":
        return <Brain className="h-4 w-4 text-blue-500 animate-pulse" />
      default:
        return <Upload className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">AI Processing</Badge>
      case "uploading":
        return <Badge variant="secondary">Uploading</Badge>
      default:
        return <Badge variant="outline">Pending</Badge>
    }
  }

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
                <Upload className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-semibold text-gray-900">Upload Case Studies</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Area */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <span>AI-Powered File Upload</span>
            </CardTitle>
            <CardDescription>
              Upload your case study files and let our AI agents automatically analyze and categorize them
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Drop your case study files here</h3>
              <p className="text-gray-600 mb-4">or click to browse and select multiple files</p>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button className="bg-blue-600 hover:bg-blue-700">Select Files</Button>
              </label>
              <p className="text-sm text-gray-500 mt-4">Supported formats: PDF, DOC, DOCX, TXT (Max 10MB per file)</p>
            </div>
          </CardContent>
        </Card>

        {/* AI Processing Info */}
        <Card className="mb-8 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">AI Agent Processing</h3>
                <p className="text-gray-600 mb-3">Our intelligent AI agents will automatically:</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Extract and analyze content from your files
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Categorize by domain and subject matter
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Identify technologies and methodologies
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Prepare for cross-file chat functionality
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Files</CardTitle>
              <CardDescription>Track the progress of your file uploads and AI processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(file.status)}
                        <div>
                          <p className="font-medium text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-500">{file.size}</p>
                        </div>
                      </div>
                      {getStatusBadge(file.status)}
                    </div>

                    {file.status === "uploading" && (
                      <div className="space-y-2">
                        <Progress value={file.progress} className="h-2" />
                        <p className="text-sm text-gray-600">Uploading... {file.progress}%</p>
                      </div>
                    )}

                    {file.status === "processing" && (
                      <div className="flex items-center space-x-2">
                        <Brain className="h-4 w-4 text-blue-500 animate-pulse" />
                        <p className="text-sm text-blue-600">AI agents are analyzing this file...</p>
                      </div>
                    )}

                    {file.status === "completed" && (
                      <p className="text-sm text-green-600">✓ File processed and ready for classification and chat</p>
                    )}
                  </div>
                ))}
              </div>

              {uploadedFiles.some((f) => f.status === "completed") && (
                <div className="mt-6 flex space-x-4">
                  <Link href="/classification">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <FileText className="h-4 w-4 mr-2" />
                      View Classification
                    </Button>
                  </Link>
                  <Link href="/chat">
                    <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 bg-transparent">
                      <Brain className="h-4 w-4 mr-2" />
                      Start Chatting
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
