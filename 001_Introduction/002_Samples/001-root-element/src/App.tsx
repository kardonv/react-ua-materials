import { useState } from 'react';
import './App.css';
import Button from './components/Button/Button';

function App() {
  const name = 'Alice';
  const [count, setCount] = useState<number>(0);

  const handleClick = () => {
    setCount(count + 1);
    console.log('Button clicked');
  };

  return (
    <>
      <h1>Welcome to React!</h1>

      <p>Nice to meet you {name}.</p>

      <p>
        You clicked {count} times.
      </p>

      <Button text='Click to change counter!' onClick={handleClick} />
    </>
  );
}

export default App;
