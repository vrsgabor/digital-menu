"use client"
import React, { useState } from 'react';
import styles from '../styles/Etlap.module.css';
import { AiOutlineUpload } from 'react-icons/ai';
import { MdEdit } from "react-icons/md";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { IoMdRemoveCircle } from "react-icons/io";

const ListItems = () => {
  const [tabs, setTabs] = useState([{ name: 'Új kategória', editable: false }]);
  const [activeTab, setActiveTab] = useState(0);
  const [meals, setMeals] = useState({ 0: [] });
  const [isEditingTab, setIsEditingTab] = useState(null);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleTabNameChange = (index, newName) => {
    const updatedTabs = [...tabs];
    updatedTabs[index].name = newName;
    setTabs(updatedTabs);
  };

  const toggleEditTab = (index) => {
    setIsEditingTab(index);
  };

  const finishEditingTab = () => {
    setIsEditingTab(null);
  };

  const addTab = () => {
    const newTabIndex = tabs.length;
    setTabs([...tabs, { name: 'Új kategória', editable: false }]);
    setMeals({ ...meals, [newTabIndex]: [] });
    setActiveTab(newTabIndex);
  };

  const deleteTab = (index) => {
    if (tabs.length > 1) {
      const updatedTabs = tabs.filter((_, i) => i !== index);
      const updatedMeals = { ...meals };
      delete updatedMeals[index];

      const newActiveTab = activeTab === index ? 0 : activeTab > index ? activeTab - 1 : activeTab;
      setActiveTab(newActiveTab);
      setTabs(updatedTabs);
      setMeals(updatedMeals);
    } else {
      alert("You can't delete the last remaining tab.");
    }
  };

  const removeMeal = (tabIndex, mealIndex) => {
    const updatedMeals = { ...meals };
    updatedMeals[tabIndex].splice(mealIndex, 1);
    setMeals(updatedMeals);
  };

  const handleMealChange = (tabIndex, mealIndex, field, value) => {
    const updatedMeals = { ...meals };
    updatedMeals[tabIndex][mealIndex][field] = value;
    setMeals(updatedMeals);
  };

  const addMeal = (tabIndex) => {
    const updatedMeals = { ...meals };
  
    // Initialize meals[tabIndex] if it's undefined
    if (!updatedMeals[tabIndex]) {
      updatedMeals[tabIndex] = [];
    }
  
    updatedMeals[tabIndex].push({
      name: '',
      description: '',
      allergens: '',
      price: '',
      photo: null
    });
  
    setMeals(updatedMeals);
  };
  

  const renderMealForm = (tabIndex) => (
    <div>
      {(meals[tabIndex] || []).map((meal, mealIndex) => (
        <div key={mealIndex} className={styles.mealForm}>
          <div className={styles.formWrapper}>
          <input
            type="text"
            placeholder="Név"
            value={meal.name}
            onChange={(e) => handleMealChange(tabIndex, mealIndex, 'name', e.target.value)}
          />
          <input
            placeholder="Leírás"
            value={meal.description}
            onChange={(e) => handleMealChange(tabIndex, mealIndex, 'description', e.target.value)}
          />
          <input
            type="text"
            placeholder="Allergének"
            value={meal.allergens}
            onChange={(e) => handleMealChange(tabIndex, mealIndex, 'allergens', e.target.value)}
          />
          <input
            type="number"
            placeholder="Ár"
            value={meal.price}
            onChange={(e) => handleMealChange(tabIndex, mealIndex, 'price', e.target.value)}
          />
          <button onClick={() => removeMeal(tabIndex, mealIndex)} className={styles.removeButton}><IoMdRemoveCircle /></button>
          </div>
          <div className={styles.fileUploader}>
  <label htmlFor={`file-upload-${mealIndex}`} className={styles.fileUploadButton}>
  <AiOutlineUpload className={styles.uploadIcon} />    
    Kép feltöltése
  </label>
  <input
    id={`file-upload-${mealIndex}`}
    type="file"
    onChange={(e) => handleMealChange(tabIndex, mealIndex, 'photo', e.target.files[0])}
    className={styles.fileInput}
  />
</div>


        </div>
      ))}
      <button onClick={() => addMeal(tabIndex)} className={styles.addButton}>Új tétel hozzáadása</button>
    </div>
  );

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.itemsContainer}>
      <div className={styles.tabContainer}>
        <div className={styles.tabItemContainer}>
        {tabs.map((tab, index) => (
          <div key={index} className={styles.tabItem}>
            {isEditingTab === index ? (
              <input
                type="text"
                value={tab.name}
                onChange={(e) => handleTabNameChange(index, e.target.value)}
                onBlur={finishEditingTab}
                onKeyDown={(e) => e.key === 'Enter' && finishEditingTab()}
                className={`${styles.tabInput} ${styles.tabButton}`}
                autoFocus
              />
            ) : (
              <div className={`${styles.tabButton} ${activeTab === index ? styles.activeTab : ''}`} onClick={() => handleTabChange(index)}>
                <span>{tab.name}</span>
                <div className={styles.iconContainer}>
                  <MdEdit onClick={(e) => { e.stopPropagation(); toggleEditTab(index); }} className={styles.icon}/>
                  <IoMdRemoveCircleOutline onClick={(e) => { e.stopPropagation(); deleteTab(index); }} className={styles.icon}/>
                </div>
              </div>
            )}
          </div>
        ))}
        </div>
 
        <button onClick={addTab} className={styles.addTabButton}>+ Új kategória</button>
      </div>
      <div className={styles.mealContent}>
        {renderMealForm(activeTab)}
      </div>
      </div>
      
    </div>
  );
};

export default ListItems;
