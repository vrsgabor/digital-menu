"use client";

import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importing uuid for unique ids
import styles from '../styles/Etlap.module.css';

const ListItems = () => {
  const initialId = uuidv4();
  const [leftItems, setLeftItems] = useState([{ id: initialId, text: 'Új kategória' }]);
  const [rightItems, setRightItems] = useState({ [initialId]: [{ id: uuidv4(), text: '' }] });
  const [selectedCategory, setSelectedCategory] = useState(initialId);
  const leftInputRefs = useRef([]);
  const rightInputRefs = useRef([]);

  const handleLeftInputChange = (id, value) => {
    const updatedLeftItems = leftItems.map(item => item.id === id ? { ...item, text: value } : item);
    setLeftItems(updatedLeftItems);
  };

  const handleRightInputChange = (id, value) => {
    setRightItems({
      ...rightItems,
      [selectedCategory]: rightItems[selectedCategory].map(item => item.id === id ? { ...item, text: value } : item)
    });
  };

  const handleLeftBlur = (id, value) => {
    if (value.trim() === '' && leftItems.length > 1) {
      const newItems = leftItems.filter(item => item.id !== id);
      const newRightItems = { ...rightItems };
      delete newRightItems[id];
      setLeftItems(newItems);
      setRightItems(newRightItems);
      if (selectedCategory === id) {
        setSelectedCategory(newItems[0].id);
      }
    }
  };

  const handleRightBlur = (id, value) => {
    if (value.trim() === '' && rightItems[selectedCategory].length > 1) {
      setRightItems({
        ...rightItems,
        [selectedCategory]: rightItems[selectedCategory].filter(item => item.id !== id)
      });
    }
  };

  const addLeftItem = () => {
    const newId = uuidv4();
    const newItem = { id: newId, text: 'Új kategória' };
    setLeftItems([...leftItems, newItem]);
    setRightItems({ ...rightItems, [newId]: [{ id: uuidv4(), text: '' }] });
    setSelectedCategory(newId);
  };

  const addRightItem = () => {
    const newItem = { id: uuidv4(), text: '' };
    setRightItems({
      ...rightItems,
      [selectedCategory]: [...rightItems[selectedCategory], newItem]
    });
  };

  useEffect(() => {
    if (leftInputRefs.current.length > 0) {
      const lastInput = leftInputRefs.current[leftInputRefs.current.length - 1];
      if (lastInput && lastInput === document.activeElement) {
        lastInput.focus();
      }
    }
  }, [leftItems]);

  useEffect(() => {
    if (rightInputRefs.current.length > 0) {
      const lastInput = rightInputRefs.current[rightInputRefs.current.length - 1];
      if (lastInput && lastInput === document.activeElement) {
        lastInput.focus();
      }
    }
  }, [rightItems[selectedCategory]]);

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
        {rightItems[selectedCategory] && rightItems[selectedCategory].map((item, index) => (
          <div key={item.id} className={styles.listItemLeftWrapper}>
            <div>
              <img src="/images/grab-icon.svg" alt="grab" className={styles.grabIcon} />
              <input
                type="text"
                value={item.text}
                onChange={(e) => handleRightInputChange(item.id, e.target.value)}
                onBlur={(e) => handleRightBlur(item.id, e.target.value)}
                className={styles.listItemText}
                placeholder="Új tétel"
                ref={(el) => (rightInputRefs.current[index] = el)}
              />
            </div>
          </div>
        ))}
        <div className={styles.newCategoryWrapper}>
          <img src="/images/new-category-line.svg" alt="new-category" className={styles.newCategoryLine} />
          <a href="#" className={styles.newCategoryTextWrapper} onClick={(e) => { e.preventDefault(); addRightItem(); }}>
            <img src="/images/plus-icon.svg" alt="plus" className={styles.plusIcon} />
            <div className={styles.newCategoryText}>Új tétel hozzáadása</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ListItems;
