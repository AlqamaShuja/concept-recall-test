import React from 'react';
import './loader.css';

const Loader = () => {
  return (
    <div className="sl_icon_loader">
      <svg viewBox="0 0 140 100" xmlns="http://www.w3.org/2000/svg">
        <circle className="non-s two-yellow-dot" cx="20" cy="50" r="10" fill="yellow" />
        <circle className="non-s three-green-dot" cx="40" cy="50" r="10" fill="green" />
        <circle className="non-s four-light-green-dot" cx="60" cy="50" r="10" fill="lightgreen" />
        <circle className="non-s five-light-blue-dot" cx="80" cy="50" r="10" fill="lightblue" />
        <circle className="non-s six-dark-blue-dot" cx="100" cy="50" r="10" fill="darkblue" />
        <circle className="non-s seven-purple-dot" cx="120" cy="50" r="10" fill="purple" />
      </svg>
    </div>
  );
};

export default Loader;