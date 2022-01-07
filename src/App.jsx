import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

import './App.css';

function App() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white grid grid-rows-6 grid-cols-1 justify-items-center min-h-screen">
      <div className="border-2 border-rose-500 row-span-1 max-w-screen-lg"><Header /></div>
      <div className="border-2 border-rose-500 row-span-4 max-w-screen-lg"><Body /></div>
      <div className="border-2 border-rose-500 row-span-1 max-w-screen-lg"><Footer /></div>
    </div>
  );
}

export default App;
