import { useState } from 'react';
import PropTypes from 'prop-types';

function Header({ dark, setDark }) {
  const moonIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  );

  const sunIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );

  const [buttonIconState, setButtonIconState] = useState('hover:scale-105');

  const toggleButton = dark ? moonIcon : sunIcon;
  const buttonClass = `transition ease-linear ${buttonIconState}`;

  const ANIMATION_TIME_MS = 250;

  function handleClick() {
    setButtonIconState('scale-0');
    setTimeout(() => {
      setDark(!dark);
      setButtonIconState('hover:scale-105');
    }, ANIMATION_TIME_MS);
  }

  return (
    <div className="flex justify-between items-center h-full px-2">
      <div>
        <img src="logo.png" alt="logo" className="h-12 inline rounded" />
        <span className="text-lg mx-4">
          Never Gonna <span className="text-blue-500">Type</span> You Up
        </span>
      </div>
      <button className={buttonClass} type="button" onClick={handleClick}>
        {toggleButton}
      </button>
    </div>
  );
}

Header.propTypes = {
  dark: PropTypes.bool.isRequired,
  setDark: PropTypes.func.isRequired,
};

export default Header;
