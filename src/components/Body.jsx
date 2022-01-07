/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import getQuote from '../api/getQuote';

const DEFAULT_QUOTE =
  'Never gonna give you up. Never gonna let you down. Never gonna run around and desert you.';
const DEFAULT_AUTHOR = 'Rick Astley';

// eslint-disable-next-line one-var
let startTime, endTime;

function start() {
  startTime = new Date();
}

function end() {
  endTime = new Date();
  const duration = endTime - startTime; // in ms
  const minute = duration / 60000;
  return minute;
}

function calculateGrossWPM(letterCount, minute) {
  return Math.round(letterCount / 5 / minute);
}

function calculateNetWPM(letterCount, errorCount, minute) {
  return Math.round((letterCount / 5 - errorCount) / minute);
}

function calculateAccuracy(grossWPM, netWPM) {
  return ((netWPM / grossWPM) * 100).toFixed(2);
}

function Body() {
  const refreshIcon = (
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
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );

  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const [grossWPM, setGrossWPM] = useState(0);
  const [netWPM, setNetWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(0.0);

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const [letters, setLetters] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLetterCorrect, setIsLetterCorrect] = useState([]);

  async function refresh() {
    setIsStart(false);
    setIsEnd(false);
    setGrossWPM(0);
    setNetWPM(0);
    setAccuracy(0.0);
    setIsLetterCorrect([]);
    setActiveIndex(0);

    try {
      const res = await getQuote();
      setQuote(res.content);
      setAuthor(`--- ${res.author}`);
      setLetters(res.content.split(''));
    } catch (err) {
      setQuote(DEFAULT_QUOTE);
      setAuthor(`--- ${DEFAULT_AUTHOR}`);
      setLetters(DEFAULT_QUOTE.split(''));
      console.log('Fail to fetch data');
    }
  }

  const untouchedLetterClass = 'text-slate-700';
  const correctLetterClass = 'text-blue-500';
  const incorrectLetterClass = 'text-rose-500';
  const currentCursorClass = 'border-l-[3px] border-indigo-400 animate-blink';

  useEffect(refresh, []);

  const handleKeydown = (e) => {
    if (!isStart) {
      start();
      setIsStart(true);
    }

    if (e.key.length === 1) {
      if (e.key === letters[activeIndex]) {
        setIsLetterCorrect((prevIsLetterCorrect) => [
          ...prevIsLetterCorrect,
          true,
        ]);
      } else {
        setIsLetterCorrect((prevIsLetterCorrect) => [
          ...prevIsLetterCorrect,
          false,
        ]);
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      }
      setActiveIndex((prevActiveIndex) => prevActiveIndex + 1);

      if (activeIndex === letters.length - 1) {
        setIsEnd(true);
      }
    } else if (e.key === 'Backspace') {
      if (activeIndex > 0) {
        setIsLetterCorrect((prevIsLetterCorrect) =>
          prevIsLetterCorrect.slice(0, prevIsLetterCorrect.length - 1)
        );
        setActiveIndex((prevActiveIndex) => prevActiveIndex - 1);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  useEffect(() => {
    if (isEnd) {
      const minute = end();
      const letterCount = letters.length;
      const errorCount = isLetterCorrect.filter((el) => !el).length;
      const gWPM = calculateGrossWPM(letterCount, minute);
      const nWPM = calculateNetWPM(letterCount, errorCount, minute);
      const acc = calculateAccuracy(gWPM, nWPM);
      setGrossWPM(gWPM);
      setNetWPM(nWPM);
      setAccuracy(acc);
    }
  }, [isEnd]);

  return (
    <div className="flex flex-col justify-between h-full px-2">
      <div className="flex-1" />
      {isEnd ? (
        <div lassName="flex flex-col justify-center items-center">
          <div className="flex flex-col text-center mb-12 font-mono text-4xl">
            <div>
              WPM: <span className="text-blue-400">{netWPM}</span>
            </div>
            <div>
              ACC: <span className="text-blue-400">{accuracy}%</span>
            </div>
          </div>
          <div className="text-center">
            <button
              className="hover:animate-spin text-slate-400"
              type="button"
              onClick={refresh}
            >
              {refreshIcon}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col text-justify font-mono">
          <div className="text-3xl mb-4">
            {quote.split('').map((letter, letterIndex) => (
              <span>
                <span
                  className={
                    letterIndex === activeIndex ? currentCursorClass : ''
                  }
                >
                  ​
                </span>
                <span
                  className={
                    isLetterCorrect[letterIndex] === true
                      ? correctLetterClass
                      : isLetterCorrect[letterIndex] === false
                      ? incorrectLetterClass
                      : untouchedLetterClass
                  }
                >
                  {letter}
                </span>
              </span>
            ))}
          </div>
          <div className="text-xl italic">{author}</div>
        </div>
      )}
      <div className="flex-1" />
    </div>
  );
}

export default Body;
