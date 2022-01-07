/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import getQuote from '../api/getQuote';

const DEFAULT_QUOTE =
  'Never gonna give you up. Never gonna let you down. Never gonna run around and desert you.';
const DEFAULT_AUTHOR = 'Rick Astley';

function Body() {
  const [quote, setQuote] = useState(DEFAULT_QUOTE);
  const [author, setAuthor] = useState(DEFAULT_AUTHOR);

  const [letters, setLetters] = useState(DEFAULT_QUOTE.split(''));
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(async () => {
    try {
      const res = await getQuote();
      setQuote(res.content);
      setAuthor(res.author);
      setLetters(res.content.split(''));
    } catch (err) {
      setQuote(DEFAULT_QUOTE);
      setAuthor(DEFAULT_AUTHOR);
      setLetters(DEFAULT_QUOTE.split(''));
      console.log('Fail to fetch data');
    } finally {
      setActiveIndex(0);
    }
  }, []);

  const [key, setKey] = useState('');

  const [isLetterCorrect, setIsLetterCorrect] = useState([]);

  const handleKeydown = (e) => {
    if (e.key.length === 1) {
      setKey(e.key);

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
      }
      setActiveIndex((prevActiveIndex) => prevActiveIndex + 1);
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

  return (
    <div className="flex flex-col justify-between h-full px-2">
      <div className="flex-1" />
      <div className="text-justify">
        {quote.split('').map((letter, letterIndex) => (
          <span
            className={
              // eslint-disable-next-line no-nested-ternary
              isLetterCorrect[letterIndex] === true
                ? 'font-bold text-sky-500'
                : isLetterCorrect[letterIndex] === false
                ? 'font-bold text-rose-500'
                : ''
            }
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="flex-1" />
    </div>
  );
}

export default Body;
