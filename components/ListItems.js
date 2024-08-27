"use client";

import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importing uuid for unique ids
import styles from '../styles/Etlap.module.css';

const ListItems = () => {
  const initialId = uuidv4();
  const [leftItems, setLeftItems] = useState([{ id: initialId, text: 'Új kategória' }]);
  const [selectedCategory, setSelectedCategory] = useState(initialId);
  const leftInputRefs = useRef([]);

  const handleLeftInputChange = (id, value) => {
    const updatedLeftItems = leftItems.map(item => item.id === id ? { ...item, text: value } : item);
    setLeftItems(updatedLeftItems);
  };


  const handleLeftBlur = (id, value) => {
    if (value.trim() === '' && leftItems.length > 1) {
      const newItems = leftItems.filter(item => item.id !== id);
      const newRightItems = { ...rightItems };
      delete newRightItems[id];
      setLeftItems(newItems);
      if (selectedCategory === id) {
        setSelectedCategory(newItems[0].id);
      }
    }
  };


  const addLeftItem = () => {
    const newId = uuidv4();
    const newItem = { id: newId, text: 'Új kategória' };
    setLeftItems([...leftItems, newItem]);
    setSelectedCategory(newId);
  };


  useEffect(() => {
    if (leftInputRefs.current.length > 0) {
      const lastInput = leftInputRefs.current[leftInputRefs.current.length - 1];
      if (lastInput && lastInput === document.activeElement) {
        lastInput.focus();
      }
    }
  }, [leftItems]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className={styles.listWrapper}>
      <div className={styles.listItems}>
        {leftItems.map((item, index) => (
          <div key={item.id} className={styles.listItemLeftWrapper}>
            <div>
              <img src="/images/grab-icon.svg" alt="grab" className={styles.grabIcon} />
              <input
                type="text"
                value={item.text}
                onChange={(e) => handleLeftInputChange(item.id, e.target.value)}
                onBlur={(e) => handleLeftBlur(item.id, e.target.value)}
                className={styles.listItemText}
                placeholder="Új kategória"
                ref={(el) => (leftInputRefs.current[index] = el)}
              />
            </div>
            <img
              src="/images/right-arrow.svg"
              alt="arrow"
              className={styles.rightArrow}
              onClick={() => handleCategoryClick(item.id)}
              style={{ cursor: 'pointer' }} // Make cursor a pointer
            />
          </div>
        ))}
        <div className={styles.newCategoryWrapper}>
          <img src="/images/new-category-line.svg" alt="new-category" className={styles.newCategoryLine} />
          <a href="#" className={styles.newCategoryTextWrapper} onClick={(e) => { e.preventDefault(); addLeftItem(); }}>
            <img src="/images/plus-icon.svg" alt="plus" className={styles.plusIcon} />
            <div className={styles.newCategoryText}>Új kategória hozzáadása</div>
          </a>
        </div>
      </div>
      <div className={styles.listItems}>
        <div className={styles.newCategoryWrapper}>
          <img src="/images/new-category-line.svg" alt="new-category" className={styles.newCategoryLine} />
          <a href="#" className={styles.newCategoryTextWrapper}>
            <img src="/images/plus-icon.svg" alt="plus" className={styles.plusIcon} />
            <div className={styles.newCategoryText}>Új tétel hozzáadása</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ListItems;
