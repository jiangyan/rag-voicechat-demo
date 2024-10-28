'use client'

import React, { useState } from 'react'
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Mic, Square } from 'lucide-react'
import { Conversation } from '@11labs/client'

export function ConversationalAiDemo() {
  const [isConnected, setIsConnected] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [conversation, setConversation] = useState<any>(null)

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      // Important: Stop the stream immediately after getting permission
      stream.getTracks().forEach(track => track.stop())
      return true
    } catch (error) {
      console.error('Microphone permission denied:', error)
      return false
    }
  }

  const getSignedUrl = async () => {
    try {
      // In development: /api/signed-url
      // In production: /api/signed-url (Vercel handles this automatically)
      const response = await fetch('/api/signed-url')
      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(`Server error: ${errorData}`)
      }
      const data = await response.json()
      if (!data.signedUrl) {
        throw new Error('No signed URL in response')
      }
      return data.signedUrl
    } catch (error) {
      console.error('Error getting signed URL:', error)
      throw error
    }
  }

  const startConversation = async () => {
    try {
      // First, check for microphone permission
      const hasPermission = await requestMicrophonePermission()
      if (!hasPermission) {
        alert('Microphone permission is required for the conversation.')
        return
      }

      // Get the signed URL for authentication
      const signedUrl = await getSignedUrl()
      
      // Initialize the conversation with the ElevenLabs SDK
      const conv = await Conversation.startSession({
        signedUrl,
        onConnect: () => {
          setIsConnected(true)
          console.log('Connected to conversation')
        },
        onDisconnect: () => {
          setIsConnected(false)
          setIsSpeaking(false)
          console.log('Disconnected from conversation')
        },
        onError: (error) => {
          console.error('Conversation error:', error)
          alert('An error occurred during the conversation.')
        },
        onModeChange: (mode) => {
          setIsSpeaking(mode.mode === 'speaking')
          console.log('Mode changed:', mode)
        }
      })
      
      setConversation(conv)
    } catch (error) {
      console.error('Failed to start conversation:', error)
      alert('Failed to start conversation: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  const endConversation = async () => {
    try {
      if (conversation) {
        await conversation.endSession()
        setConversation(null)
        setIsConnected(false)
        setIsSpeaking(false)
      }
    } catch (error) {
      console.error('Error ending conversation:', error)
      alert('Failed to end conversation: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-800">
          事成员工指南AI语音
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center space-x-3">
          <Badge 
            variant={isConnected ? "default" : "secondary"}
            className={`px-3 py-1 text-sm font-medium transition-colors duration-200
              ${isConnected 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700'}`}
          >
            {isConnected ? "Connected / 已连接" : "Disconnected / 未连接"}
          </Badge>
          <Badge 
            variant={isSpeaking ? "default" : "secondary"}
            className={`px-3 py-1 text-sm font-medium transition-colors duration-200
              ${isSpeaking 
                ? 'bg-blue-500 hover:bg-blue-600 text-white animate-pulse' 
                : 'bg-gray-200 text-gray-700'}`}
          >
            {isSpeaking ? "Agent Speaking / 正在说话" : "Agent Silent / 沉默"}
          </Badge>
        </div>
        <div className="space-y-4">
          <Button
            variant="default"
            onClick={startConversation}
            disabled={isConnected}
            className={`w-full h-12 text-base font-medium transition-all duration-200
              ${!isConnected 
                ? 'bg-black hover:bg-gray-800 text-white shadow-md hover:shadow-lg' 
                : 'bg-gray-100 text-gray-400'}`}
          >
            <Mic className="mr-2 h-5 w-5" />
            Call AI agent / 呼叫AI代理
          </Button>
          <Button
            variant="outline"
            onClick={endConversation}
            disabled={!isConnected}
            className={`w-full h-12 text-base font-medium border-2 transition-all duration-200
              ${isConnected 
                ? 'border-red-500 hover:bg-red-50 text-red-500 hover:text-red-600' 
                : 'border-gray-200 text-gray-400'}`}
          >
            <Square className="mr-2 h-5 w-5" />
            End Call / 结束通话
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
