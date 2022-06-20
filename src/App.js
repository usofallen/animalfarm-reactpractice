import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const {search, animals} = useAnimalSearch();

  return (
    <main>
      <h1>Animal Farm</h1>

      <input
        type="text"
        placeholder="Search for animals"
        onChange={(e)=> search(e.target.value)}
        />

      <ul>
        {animals.map((animal) => (
          <Animal key = {animal.id} {...animal} />
        ))}

        {animals.length === 0 && 'No animals found'}
      </ul>
    </main>
  );
}

function useAnimalSearch() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    search(lastQuery);
  }, []);

  const search = async (q) => {
    const response = await fetch(
      'http://localhost:8080?' + new URLSearchParams({ q }),
    );

    const data = await response.json();
    setAnimals(data);

    localStorage.setItem('lastQuery', q);
  };

  return {search, animals};
}

function Animal ({ type, name, age}) {
  return (
    <li>
      <strong>{type}</strong> {name} ({age} years old)
    </li>
  );
}

export default App;
