import React, { useState } from "react";
import { FaPlay, FaPause, FaBackward } from "react-icons/fa";
import { IoIosArrowDown, IoMdPause, IoMdPlay } from "react-icons/io";
import { GrPlayFill } from "react-icons/gr";
import { IoPlaySkipBackSharp } from "react-icons/io5";
interface ControlPanelProps {
  startAt: number;
  endAt: number;
  playbackRate: number;
  onStartAtChange: (value: number) => void;
  onEndAtChange: (value: number) => void;
  onPlaybackRateChange: (value: number) => void;
  onPlayPause: () => void;
  isPlaying: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  startAt,
  endAt,
  playbackRate,
  onStartAtChange,
  onEndAtChange,
  onPlaybackRateChange,
  onPlayPause,
  isPlaying,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSpeedChange = (value: number) => {
    onPlaybackRateChange(value);
    setShowDropdown(false);
  };

  const handleTimeChange = (
    value: number,
    type: "start" | "end",
    isMinutes: boolean
  ) => {
    const isStart = type === "start";
    if (isMinutes) {
      const min = Math.min(Math.max(value, 0), 59);
      if (isStart) {
        onStartAtChange(min * 60 + (startAt % 60));
      } else {
        onEndAtChange(min * 60 + (endAt % 60));
      }
    } else {
      const sec = Math.min(Math.max(value, 0), 59);
      if (isStart) {
        onStartAtChange(Math.floor(startAt / 60) * 60 + sec);
      } else {
        onEndAtChange(Math.floor(endAt / 60) * 60 + sec);
      }
    }
  };

  return (
    <div className="flex flex-col items-center md:space-y-4 space-y-1 mt-4 text-black justify-between w-full pb-4 md:pb-0">
      <div className="flex space-x-2 justify-between w-full font-semibold text-xl">
        <div>
          <label>Starts at:</label>
          <div className="flex  mt-2 flex-col  md:flex-row gap-1 justify-center items-start md:items-center">
            <input
              type="number"
              value={Math.floor(startAt / 60) || ""}
              min="0"
              max="59"
              onChange={(e) =>
                handleTimeChange(
                  parseInt(e.target.value, 10) || 0,
                  "start",
                  true
                )
              }
              className="w-16 p-2 border rounded-md text-center"
              placeholder="00"
            />
            <span className="hidden md:block">:</span>
            <input
              type="number"
              value={startAt % 60 || ""}
              min="0"
              max="59"
              onChange={(e) =>
                handleTimeChange(
                  parseInt(e.target.value, 10) || 0,
                  "start",
                  false
                )
              }
              className="w-16 p-2 border rounded-md text-center"
              placeholder="00"
            />
          </div>
        </div>
        <div>
          <label>Ends at:</label>
          <div className="flex  mt-2 flex-col  md:flex-row gap-1 justify-center items-start md:items-center">
            <input
              type="number"
              value={Math.floor(endAt / 60) || ""}
              min="0"
              max="59"
              onChange={(e) =>
                handleTimeChange(parseInt(e.target.value, 10) || 0, "end", true)
              }
              className="w-16 p-2 border rounded-md text-center"
              placeholder="00"
            />
            <span className="hidden md:block">:</span>
            <input
              type="number"
              value={endAt % 60 || ""}
              min="0"
              max="59"
              onChange={(e) =>
                handleTimeChange(
                  parseInt(e.target.value, 10) || 0,
                  "end",
                  false
                )
              }
              className="w-16 p-2 border rounded-md text-center"
              placeholder="00"
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-2 items-center md:gap-3 gap-2 ">
        <button
          onClick={() => onStartAtChange(startAt - 10)}
          className="text-4xl hover:bg-gray-100 p-2"
        >
          <IoPlaySkipBackSharp />
        </button>
        <button
          onClick={onPlayPause}
          className="text-3xl p-2 border-2 border-black rounded-full hover:bg-gray-100"
        >
          {isPlaying ? (
            <IoMdPause className="h-8 w-8" />
          ) : (
            <GrPlayFill className="pl-1 w-8 h-8 " />
          )}
        </button>
        <div className="relative font-bold text-xl">
          <button
            onClick={toggleDropdown}
            className="px-4 py-2 bg-white flex items-center rounded-lg hover:bg-gray-100"
          >
            {playbackRate}x <IoIosArrowDown />
          </button>
          {showDropdown && (
            <div className="absolute z-10 bg-white border rounded-md mt-1">
              {[0.25, 0.5, 1, 1.5, 2].map((rate) => (
                <div
                  key={rate}
                  className="p-4 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSpeedChange(rate)}
                >
                  {rate}x
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
