// components/YouTubePlayer.tsx
import React, { useEffect, useRef, useState } from "react";
import YouTubePlayer from "youtube-player";
import ControlPanel from "./ControlPanel"; // Ensure ControlPanel is imported

interface YouTubePlayerProps {
  videoId: string;
  startAt: number;
  endAt: number;
  playbackRate: number;
  onStartAtChange: (value: number) => void;
  onEndAtChange: (value: number) => void;
  onPlaybackRateChange: (value: number) => void;
  onSaveLoop: () => void;
}

const YouTubePlayerComponent: React.FC<YouTubePlayerProps> = ({
  videoId,
  startAt,
  endAt,
  playbackRate,
  onStartAtChange,
  onEndAtChange,
  onPlaybackRateChange,
  onSaveLoop,
}) => {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    playerRef.current = YouTubePlayer("youtube-player", {
      videoId: videoId,
      playerVars: {
        start: startAt,
        end: endAt,
        autoplay: 0,
        modestbranding: 1,
        rel: 0,
        fs: 0,
        loop: 1,
      },
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(startAt, true);
      playerRef.current.setPlaybackRate(playbackRate);
    }
  }, [startAt, playbackRate]);

  useEffect(() => {
    const interval = setInterval(() => {
      playerRef.current.getCurrentTime().then((currentTime: number) => {
        if (endAt && currentTime >= endAt) {
          playerRef.current.seekTo(startAt, true);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [startAt, endAt]);

  const handlePlayPause = () => {
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="mt-12 w-full flex flex-col items-center border-2 border-gray-200 md:p-6  p-2 shadow-md">
      <div
        id="youtube-player"
        className={
          videoId
            ? "block bg-[#EEEEEE] w-full md:h-[350px] h-[230px]"
            : "hidden"
        }
      ></div>
      {videoId ? (
        <ControlPanel
          videoId={videoId}
          startAt={startAt}
          endAt={endAt}
          playbackRate={playbackRate}
          onStartAtChange={onStartAtChange}
          onEndAtChange={onEndAtChange}
          onPlaybackRateChange={onPlaybackRateChange}
          onPlayPause={handlePlayPause}
          isPlaying={isPlaying}
          onSaveLoop={onSaveLoop}
        />
      ) : (
        <div className="md:h-[50vh]  h-[250px] bg-[#EEEEEE] flex items-center justify-center w-full text-center text-gray-700 font-semibold">
          <p className="text-2xl">
            Video is not loaded <br />
            Please, paste a URL above
          </p>
        </div>
      )}
    </div>
  );
};
export default YouTubePlayerComponent;
