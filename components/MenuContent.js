'use client'
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Menu.module.css';

const MenuContent = () => {
  const items = ['Főételek', 'Levesek', 'Italok']; // Array of items
  const [selectedItem, setSelectedItem] = useState(items[0]); // Default to the first item
  const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
  const dropdownRef = useRef(null); // Ref to track the dropdown container

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
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedItem}
        </div>

        {isOpen && (
          <ul className={styles.dropdownMenu}>
            {items.map((item, index) => (
              <li
                key={index}
                className={styles.dropdownItem}
                onClick={() => handleSelectItem(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
      <h2 className={styles.selectedTitle}>{selectedItem}</h2>
      <div className={styles.MealsWrapper}>
        <div className={styles.MealItemWrapper}></div>
      </div>
    </div>
  );
};

export default MenuContent;
