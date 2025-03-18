"use client"

import { useState } from "react"
import ReactPlayer from "react-player"
import { Loader2 } from "lucide-react"

interface CourseVideoPlayerProps {
  videoUrl: string
  lessonTitle: string
}

export function CourseVideoPlayer({ videoUrl, lessonTitle }: CourseVideoPlayerProps) {
  const [isReady, setIsReady] = useState(false)

  if (!videoUrl) {
    return (
      <div className="flex aspect-video w-full items-center justify-center bg-muted">
        <p className="text-sm text-muted-foreground">No video available for this lesson</p>
      </div>
    )
  }

  return (
    <div className="relative aspect-video bg-black">
      {!isReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading video...</p>
        </div>
      )}
      <ReactPlayer
        url={videoUrl}
        width="100%"
        height="100%"
        controls
        playing={false}
        onReady={() => setIsReady(true)}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
              disablePictureInPicture: true,
            },
          },
        }}
      />
    </div>
  )
}

