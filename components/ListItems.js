"use client";

import { useState, useRef, useEffect } from 'react';
import styles from '../styles/Etlap.module.css';

const ListItems = () => {
  const [items, setItems] = useState([{ id: 1, text: '' }]);
  const inputRefs = useRef([]);

  const handleInputChange = (id, value) => {
    setItems(items.map(item => item.id === id ? { ...item, text: value } : item));
  };

  const handleBlur = (id, value) => {
    if (value.trim() === '' && id !== 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const addItem = () => {
    const newItem = { id: items.length + 1, text: '' };
    setItems([...items, newItem]);
  };

  useEffect(() => {
    // Focus the last input field if it's not the first item
    if (inputRefs.current.length > 1) {
      const lastInput = inputRefs.current[inputRefs.current.length - 1];
      if (lastInput) {
        lastInput.focus();
      }
    }
  }, [items]);

  return (
    <div className={styles.listWrapper}>
      <div className={styles.listItems}>
        {items.map((item, index) => (
          <div key={item.id} className={styles.listItemLeftWrapper}>
            <div>
              <img src="/images/grab-icon.svg" alt="grab" className={styles.grabIcon} />
              <input
                type="text"
                value={item.text}
                onChange={(e) => handleInputChange(item.id, e.target.value)}
                onBlur={(e) => handleBlur(item.id, e.target.value)}
                className={styles.listItemText}
                placeholder="Új kategória"
                ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input
              />
            </div>
            <img src="/images/right-arrow.svg" alt="arrow" className={styles.rightArrow} />
          </div>
        ))}
        <div className={styles.newCategoryWrapper}>
          <img src="/images/new-category-line.svg" alt="new-category" className={styles.newCategoryLine} />
          <a href="#" className={styles.newCategoryTextWrapper} onClick={(e) => { e.preventDefault(); addItem(); }}>
            <img src="/images/plus-icon.svg" alt="plus" className={styles.plusIcon} />
            <div className={styles.newCategoryText}>Új kategória hozzáadása</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ListItems;
