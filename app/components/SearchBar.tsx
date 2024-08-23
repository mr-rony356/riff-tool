import React, { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (url: string) => void;
}

const isValidYouTubeUrl = (url: string): boolean => {
  const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:embed\/|v\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
  return pattern.test(url);
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (url.trim()) {
        if (isValidYouTubeUrl(url)) {
          setError(null);
          onSearch(url);
        } else {
          setError("Please enter a valid YouTube URL.");
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [url, onSearch]);

  return (
    <div className="flex flex-col items-center w-full mt-4">
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="100"
            viewBox="0,0,256,256"
          >
            <g
              fill="#a8a7a7"
              fillRule="nonzero"
              stroke="none"
              strokeWidth="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
            >
              <g transform="scale(8.53333,8.53333)">
                <path d="M13,3c-5.511,0 -10,4.489 -10,10c0,5.511 4.489,10 10,10c2.39651,0 4.59738,-0.85101 6.32227,-2.26367l5.9707,5.9707c0.25082,0.26124 0.62327,0.36648 0.97371,0.27512c0.35044,-0.09136 0.62411,-0.36503 0.71547,-0.71547c0.09136,-0.35044 -0.01388,-0.72289 -0.27512,-0.97371l-5.9707,-5.9707c1.41266,-1.72488 2.26367,-3.92576 2.26367,-6.32227c0,-5.511 -4.489,-10 -10,-10zM13,5c4.43012,0 8,3.56988 8,8c0,4.43012 -3.56988,8 -8,8c-4.43012,0 -8,-3.56988 -8,-8c0,-4.43012 3.56988,-8 8,-8z"></path>
              </g>
            </g>
          </svg>
        </span>
        <input
          type="text"
          placeholder="Paste YouTube URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 pl-16 border rounded-md text-gray-900 border-gray-300 focus:ring focus:border-blue-300 text-2xl"
        />
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default SearchBar;
