"use client";
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import YouTubePlayer from "./components/YouTubePlayer";
import Header from "./components/Header";
import InfoSections from "./components/InfoSection";
import Footer from "./components/Footer";
import SavedLoops from "./components/SavedLoops";

const Home: React.FC = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [startAt, setStartAt] = useState<number>(0);
  const [endAt, setEndAt] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);

  const handleSearch = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      let id: string | null = null;

      // Check for YouTube short URL
      if (parsedUrl.hostname === "youtu.be") {
        id = parsedUrl.pathname.substring(1); // Remove leading slash
      }
      // Check for YouTube regular URL
      else if (
        parsedUrl.hostname === "www.youtube.com" &&
        parsedUrl.searchParams.has("v")
      ) {
        id = parsedUrl.searchParams.get("v");
      }

      if (id) {
        setVideoId(id);
      } else {
        console.error("Invalid YouTube URL format.");
      }
    } catch (error) {
      console.error("Error parsing URL:", error);
    }
  };
  console.log(videoId);

  return (
    <div className="container mx-auto md:p-4 p-2 flex flex-col items-center ">
      <Header />
      <div className="md:max-w-[690px] mx-auto w-full">
        <SearchBar onSearch={handleSearch} />
        <YouTubePlayer
          videoId={videoId || ""}
          startAt={startAt}
          endAt={endAt}
          playbackRate={playbackRate}
          onStartAtChange={setStartAt}
          onEndAtChange={setEndAt}
          onPlaybackRateChange={setPlaybackRate}
        />
        <SavedLoops />
        <InfoSections />
      </div>
    </div>
  );
};

export default Home;
