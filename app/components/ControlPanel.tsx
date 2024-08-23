import React, { useState } from "react";
import { FaPlay, FaPause, FaBackward, FaArrowDown } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
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

  return (
    <div className="flex flex-col items-center space-y-4 mt-4 text-black justify-between w-full">
      <div className="flex space-x-2 justify-between w-full font-semibold text-xl">
        <div>
          <label>Starts at:</label>
          <div className="flex space-x-1 mt-2">
            <input
              type="number"
              value={Math.floor(startAt / 60)}
              onChange={(e) => {
                const min = parseInt(e.target.value, 10) || 0;
                onStartAtChange(min * 60 + (startAt % 60));
              }}
              className="w-16 p-2 border rounded-md text-center"
            />
            <span>:</span>
            <input
              type="number"
              value={startAt % 60}
              onChange={(e) => {
                const sec = parseInt(e.target.value, 10) || 0;
                onStartAtChange(Math.floor(startAt / 60) * 60 + sec);
              }}
              className="w-16 p-2 border rounded-md text-center"
            />
          </div>
        </div>
        <div>
          <label>Ends at:</label>
          <div className="flex space-x-1 mt-2">
            <input
              type="number"
              value={Math.floor(endAt / 60)}
              onChange={(e) => {
                const min = parseInt(e.target.value, 10) || 0;
                onEndAtChange(min * 60 + (endAt % 60));
              }}
              className="w-16 p-2 border rounded-md text-center"
            />
            <span>:</span>
            <input
              type="number"
              value={endAt % 60}
              onChange={(e) => {
                const sec = parseInt(e.target.value, 10) || 0;
                onEndAtChange(Math.floor(endAt / 60) * 60 + sec);
              }}
              className="w-16 p-2 border rounded-md text-center"
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-2 items-center gap-6">
        {/* Rewind Button */}
        <button
          onClick={() => onStartAtChange(startAt - 10)} // Example to rewind 10 seconds
          className="text-4xl  hover:bg-gray-100 p-2"
        >
          <FaBackward />
        </button>
        <button
          onClick={onPlayPause}
          className="text-3xl p-3 border-2 border-black rounded-full hover:bg-gray-100 "
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <div className="relative font-bold text-xl">
          <button
            onClick={toggleDropdown}
            className="px-4 py-2  bg-white flex items-center  rounded-lg hover:bg-gray-100"
          >
            {playbackRate}x <IoIosArrowDown size={20} />
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
