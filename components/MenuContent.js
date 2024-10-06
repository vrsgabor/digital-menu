'use client'
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Menu.module.css';
import { IoIosArrowDown } from "react-icons/io";

const MenuContent = () => {
  const [selectedItem, setSelectedItem] = useState(''); // Default to the first item
  const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
  const dropdownRef = useRef(null); // Ref to track the dropdown container
  const [meals, setMeals] = useState([]); // State to store the meals from JSON
  const [filteredMeals, setFilteredMeals] = useState([]); // State to store filtered meals based on category
  const [categories, setCategories] = useState([]); // State to store categories dynamically

  // Fetch meals data from the JSON file
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('/meals.json'); // Replace with actual path to the JSON file
      const data = await response.json();
      setMeals(data.meals); // Assuming 'meals' is the array in the JSON

      // Extract unique categories from the meals array
      const uniqueCategories = [...new Set(data.meals.map(meal => meal.category))];
      setCategories(uniqueCategories);
      setSelectedItem(uniqueCategories[0]); // Default to the first category
    };

    fetchMeals();
  }, []);

  // Filter meals based on selected category
  useEffect(() => {
    if (meals.length > 0) {
      const filtered = meals.filter(meal => meal.category === selectedItem);
      setFilteredMeals(filtered);
    }
  }, [selectedItem, meals]);

  // Close the dropdown if a click happens outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSelectItem = (item) => {
    setSelectedItem(item); // Update selected item
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className={styles.MenuContentWrapper}>
      <div className={styles.upperItems} ref={dropdownRef}>
        <div
          className={styles.dropdown}
          onClick={() => setIsOpen(!isOpen)}>
          {selectedItem || 'Select Category'}
          <IoIosArrowDown />
        </div>
        {isOpen && (
          <ul className={styles.dropdownMenu}>
            {categories.map((category, index) => (
              <li
                key={index}
                className={styles.dropdownItem}
                onClick={() => handleSelectItem(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>
      <h2 className={styles.selectedTitle}>{selectedItem}</h2>
      <div className={styles.MealsWrapper}>
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal, index) => (
            <div key={index} className={styles.MealItemWrapper}>
                <img src={meal.imageURL} alt={meal.mealName} className={styles.imagePlaceholder} />
              <div className={styles.MealItemContent}>
                <div className={styles.leftColoumn}>
                  <h4 className={styles.MealTitle}>{meal.mealName}</h4>
                  <p className={styles.description}>{meal.description}</p>
                </div>
                <div className={styles.valami}>
                  <p className={styles.price}>{meal.price}</p>
                  <p className={styles.currency}>Ft</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No meals available for {selectedItem}.</p>
        )}
      </div>
    </div>
  );
};

export default MenuContent;
