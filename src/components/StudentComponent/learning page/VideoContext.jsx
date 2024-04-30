import React, { createContext, useContext, useRef } from "react"

const VideoContext = createContext(undefined)

export const VideoProvider = ({ children }) => {
  const playerRef = useRef(null)

  const handleSeek = seconds => {
    if (playerRef.current) {
      playerRef.current.seekTo(seconds, "seconds")
    }
  }

  return (
    <VideoContext.Provider value={{ playerRef, handleSeek }}>
      {children}
    </VideoContext.Provider>
  )
}

export const useVideo = () => {
  const context = useContext(VideoContext)
  if (!context) {
    throw new Error("useVideo must be used within a VideoProvider")
  }
  return context
}
