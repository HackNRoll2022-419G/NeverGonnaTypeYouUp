import { useState } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import './App.css';

function App() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [dark, setDark] = useState(prefersDark);

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="transition duration-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white grid grid-cols-1 justify-items-center min-h-screen">
        <div className="flex flex-col w-full max-w-screen-lg p-4 gap-4">
          <div>
            <Header dark={dark} setDark={setDark} />
          </div>
          <div className="flex-1">
            <Body />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
