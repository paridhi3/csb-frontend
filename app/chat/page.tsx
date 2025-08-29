"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, MessageSquare, Send, ArrowLeft, FileText, Sparkles } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { chatWithBackend } from "../../service";

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

interface Message {
  id: number
  type: "user" | "ai"
  content: string
  timestamp: string
  sources?: string[]
}

export default function ChatPage() {
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

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content:
        "Hello! I'm your AI assistant with access to all your uploaded case studies. I can help you find insights, compare approaches, and answer questions across all your files. What would you like to know?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sources: [],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    try {
      const botReply = await chatWithBackend(inputMessage)

      const aiResponse: Message = {
        id: messages.length + 2,
        type: "ai",
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sources: [], // You can populate this if your backend returns sources
      }

      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        type: "ai",
        content: "Sorry, something went wrong while fetching the response.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const suggestedQuestions = [
    "What are the common technologies used across all case studies?",
    "Compare the methodologies used in different domains",
    "What security practices are mentioned in the files?",
    "Show me patterns in user experience approaches",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Uploaded Files</span>
                </CardTitle>
                <CardDescription>{results?.length ?? 0} case study files</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {results && results.length > 0 ? (
                  results.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm truncate" title={item.fileName}>{item.fileName}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No files uploaded</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="min-h-[500px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-red-600" />
                  <span>AI Assistant</span>
                </CardTitle>
                <CardDescription>
                  Chat with AI agents that have comprehensive knowledge of all your case studies
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <ScrollArea className="flex-1 pr-4 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                        >
                          {message.type === "ai" ? (
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                          ) : (
                            <p className="text-sm">{message.content}</p>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <span className={`text-xs ${message.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                              {message.timestamp}
                            </span>
                            {message.sources && message.sources.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {message.sources.map((source, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {source}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t pt-4 mt-4">
                  <div className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask anything about your case studies..."
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-red-600 hover:bg-red-700 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    AI agents will search across all your uploaded case studies to provide comprehensive answers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Suggested Questions */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <span>Suggested Questions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full text-left justify-start h-auto p-3 text-sm whitespace-normal break-words cursor-pointer"
                    onClick={() => setInputMessage(question)}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
