import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white grid grid-cols-1 justify-items-center min-h-screen">
      <div className="flex flex-col max-w-screen-lg my-4 gap-4">
        <div>
          <Header />
        </div>
        <div className="flex-1">
          <Body />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
