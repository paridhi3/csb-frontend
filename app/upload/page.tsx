"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  ArrowLeft,
  Brain,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

import { uploadFiles } from "../../service";

interface UploadedFile {
  id: number;
  name: string;
  size: string;
  status: "uploading" | "processing" | "completed" | "error";
  progress: number;
}

export default function UploadPage() {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{
    metadata: any[];
    validation: any[];
  } | null>(null);

  // Handle file selection from input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setSelectedFiles(Array.from(e.target.files));
  };

  // Upload files to backend
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select files to upload.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await uploadFiles(selectedFiles);
      console.log("upload: ", data);
      localStorage.setItem("classificationResults", JSON.stringify(data));
      router.push("/classification");

      // setResults(data);
      // router.push("/classification");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }

    setLoading(false);
  };

  // Helpers to format file size nicely
  const formatSize = (size: number) =>
    size > 1024 * 1024
      ? (size / (1024 * 1024)).toFixed(2) + " MB"
      : (size / 1024).toFixed(2) + " KB";

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
                <Upload className="h-6 w-6 text-sky-800" />
                <span className="text-lg font-semibold text-gray-900">
                  Upload Case Studies
                </span>
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
              <Brain className="h-5 w-5 text-sky-800" />
              <span>AI-Powered File Upload</span>
            </CardTitle>
            <CardDescription>
              Upload your case study files and let our AI agents automatically
              analyze and categorize them
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <input
                type="file"
                multiple
                accept=".pdf,.pptx"
                onChange={handleFileChange}
                id="file-upload"
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="inline-block border-2 hover:border-transparent border-black bg-white text-black hover:bg-sky-800 hover:text-white px-4 py-2 rounded">
                  Select Files from Device
                </span>
              </label>

              <p className="text-sm text-gray-500 mt-4">
                Supported formats: PDF, PPTX (Max 10MB per file)
              </p>

              {selectedFiles.length > 0 && (
                <div className="mt-4 text-left">
                  <h4 className="font-semibold mb-1">Selected Files:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedFiles.map((file, idx) => (
                      <li key={idx}>
                        {file.name} ({formatSize(file.size)})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6">
                <Button
                  className="bg-sky-800 hover:bg-sky-700 cursor-pointer"
                  onClick={handleUpload}
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Upload and Process"}
                </Button>
              </div>

              {error && (
                <p className="mt-4 text-red-600 font-semibold">{error}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* AI Processing Info */}
        <Card className="mb-8 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Brain className="h-6 w-6 text-sky-800" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  AI Agent Processing
                </h3>
                <p className="text-gray-600 mb-3">
                  Our intelligent AI agents will automatically:
                </p>
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
      </div>
    </div>
  );
}
