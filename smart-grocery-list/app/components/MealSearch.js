// src/components/MealSearch.js

import { useState } from 'react';
import axios from 'axios';

export default function MealSearch() {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState([]);

  const fetchMeals = async () => {
    try {
      const response = await axios.get(`/api/meal`, {
        params: { query }, // Send the query to the API route
      });
      setMeals(response.data.meals || []); // Update the meals state
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMeals(); // Fetch meals when the form is submitted
  };

  return (
    <div>
      <h2>Meal Search</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a meal name"
          required
        />
        <button type="submit">Search</button>
      </form>

      {meals.length > 0 && (
        <ul>
          {meals.map((meal) => (
            <li key={meal.idMeal}>
              <a href={meal.strSource} target="_blank" rel="noopener noreferrer">
                {meal.strMeal}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
