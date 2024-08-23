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
    const id = new URL(url).searchParams.get("v");
    if (id) {
      setVideoId(id);
    }
  };
  console.log(videoId);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center ">
      <Header />
      <div className="max-w-[690px] mx-auto w-full">
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
