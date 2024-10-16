'use client'
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Menu.module.css';
import { IoIosArrowDown } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

const MenuContent = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Controls both visibility and animation
  const [isClosing, setIsClosing] = useState(false); // Controls closing animation

  // Fetch meals data from the JSON file
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('/meals.json');
      const data = await response.json();
      setMeals(data.meals);

      const uniqueCategories = [...new Set(data.meals.map(meal => meal.category))];
      setCategories(uniqueCategories);
      setSelectedItem(uniqueCategories[0]); // Set default selected category
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
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Handle selecting a category from the dropdown
  const handleSelectItem = (category) => {
    setSelectedItem(category); // Set the selected category
    setIsOpen(false); // Close the dropdown
  };

  // Handle clicking a meal to show the popup
  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
    setShowPopup(true); // Open the popup
    setIsClosing(false); // Ensure it's not in the closing state
  };

  // Handle closing the popup with a delay to sync with the closing animation
  const handleClosePopup = () => {
    setIsClosing(true); // Start closing animation
    setTimeout(() => {
      setShowPopup(false); // Hide the popup after the animation completes
    }, 600); // 600ms to match the closing animation duration
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
                onClick={() => handleSelectItem(category)} // Call the function when an item is clicked
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
            <div
              key={index}
              className={styles.MealItemWrapper}
              onClick={() => handleMealClick(meal)}
            >
              <img src={meal.imageURL} className={styles.imagePlaceholder} alt="meal" />
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
          <p>Nincs elérhető adat {selectedItem}.</p>
        )}
      </div>

      {/* Popup for showing meal details */}
      {showPopup && (
        <div className={`${styles.popupOverlay} ${isClosing ? styles.closing : styles.open}`}>
          <div className={styles.popupContent}>
            <button className={styles.closePopup} onClick={handleClosePopup}><IoCloseSharp className={styles.closeButton} /></button>
            <img src={selectedMeal?.imageURL} className={styles.popupImage} alt="meal" />
            <div className={styles.upperContent}>
            <div className={styles.popupWrapper}>
              <h3 className={styles.popupTitle}>{selectedMeal?.mealName}</h3>
              <p className={styles.popupDescription}>{selectedMeal?.description}</p>
            </div>
            <div className={styles.allergensWrapper}>
              <p className={styles.popupAllergens}>Allergének:</p>
              <p className={styles.popupAllergensList}>{selectedMeal?.allergens || 'Nincs információ'}</p>
            </div>
            </div>
            <div className={styles.popupPriceWrapper}>
              <p className={styles.popupPrice}>{selectedMeal?.price} Ft</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuContent;
