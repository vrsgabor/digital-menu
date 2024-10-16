"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/Etlap.module.css";
import { AiOutlineUpload } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { IoMdRemoveCircleOutline, IoMdRemoveCircle } from "react-icons/io";

const ListItems = () => {
  const [tabs, setTabs] = useState([{ name: "Új kategória", editable: false }]);
  const [activeTab, setActiveTab] = useState(0);
  const [meals, setMeals] = useState({ 0: [] });
  const [isEditingTab, setIsEditingTab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // Control the pop-up visibility
  const [newMeal, setNewMeal] = useState({
    mealName: "",
    description: "",
    allergens: "",
    price: "",
    photo: null,
  });
  const [editMealIndex, setEditMealIndex] = useState(null); // Keep track of which meal is being edited

  // Fetch meals data from the meals.json file on component mount
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("/api/updateMeals");
        const data = await response.json();

        const uniqueCategories = [...new Set(data.meals.map((meal) => meal.category))];
        const newTabs = uniqueCategories.map((category) => ({
          name: category,
          editable: false,
        }));
        setTabs(newTabs);

        const categorizedMeals = {};
        uniqueCategories.forEach((category, index) => {
          categorizedMeals[index] = data.meals.filter((meal) => meal.category === category);
        });
        setMeals(categorizedMeals);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching meals data:", error);
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleMealInputChange = (field, value) => {
    setNewMeal((prevMeal) => ({
      ...prevMeal,
      [field]: value,
    }));
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
    setTabs([...tabs, { name: "Új kategória", editable: false }]);
    setMeals({ ...meals, [newTabIndex]: [] });
    setActiveTab(newTabIndex);
  };

  const deleteTab = (index) => {
    if (tabs.length > 1) {
      const updatedTabs = tabs.filter((_, i) => i !== index);
      const updatedMeals = { ...meals };
      delete updatedMeals[index];

      const newActiveTab =
        activeTab === index ? 0 : activeTab > index ? activeTab - 1 : activeTab;
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

  const addMealToTab = () => {
    const updatedMeals = { ...meals };

    if (editMealIndex !== null) {
      updatedMeals[activeTab][editMealIndex] = newMeal; // Update existing meal if editing
      setEditMealIndex(null); // Reset edit mode
    } else {
      if (!updatedMeals[activeTab]) {
        updatedMeals[activeTab] = [];
      }
      updatedMeals[activeTab].push(newMeal); // Add new meal if not editing
    }

    setMeals(updatedMeals);
    closePopup();
  };

  const openPopup = (meal = null, mealIndex = null) => {
    if (meal) {
      setNewMeal(meal);
      setEditMealIndex(mealIndex); // Track the meal being edited
    } else {
      setNewMeal({
        mealName: "",
        description: "",
        allergens: "",
        price: "",
        photo: null,
      });
      setEditMealIndex(null); // Reset to add mode
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const saveMeals = async () => {
    const flattenedMeals = tabs.flatMap((tab, tabIndex) =>
      meals[tabIndex]?.map((meal) => ({
        mealName: meal.mealName,
        description: meal.description,
        price: meal.price,
        allergens: meal.allergens,
        category: tab.name,
        imageURL: meal.photo ? URL.createObjectURL(meal.photo) : null,
      })) || []
    );

    try {
      const response = await fetch("/api/updateMeals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flattenedMeals),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error saving meals:", error);
    }
  };

  const renderMealForm = (tabIndex) => (
    <div>
      {(meals[tabIndex] || []).map((meal, mealIndex) => (
        <div key={mealIndex} className={styles.mealForm}>
          <div className={styles.formWrapper}>
            <p>{meal.mealName}</p>
            <p>{meal.description}</p>
            <p>{meal.allergens}</p>
            <p>{meal.price} Ft</p>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => openPopup(meal, mealIndex)} // Open popup with meal data for editing
                className={styles.editButton}
              >
                <MdEdit />
              </button>
              <button
                onClick={() => removeMeal(tabIndex, mealIndex)}
                className={styles.removeButton}
              >
                <IoMdRemoveCircle />
              </button>
            </div>
          </div>
          <div className={styles.mealImage}>
            {meal.photo && (
              <img src={URL.createObjectURL(meal.photo)} alt="Meal" className={styles.uploadedImage} />
            )}
          </div>
        </div>
      ))}
      <button onClick={() => openPopup()} className={styles.addButton}>
        Új tétel hozzáadása
      </button>
    </div>
  );

  const renderPopup = () => (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2>{editMealIndex !== null ? "Tétel szerkesztése" : "Új tétel hozzáadása"}</h2>
        <input
          type="text"
          placeholder="Név"
          value={newMeal.mealName}
          onChange={(e) => handleMealInputChange("mealName", e.target.value)}
        />
        <input
          type="text"
          placeholder="Leírás"
          value={newMeal.description}
          onChange={(e) => handleMealInputChange("description", e.target.value)}
        />
        <input
          type="text"
          placeholder="Allergének"
          value={newMeal.allergens}
          onChange={(e) => handleMealInputChange("allergens", e.target.value)}
        />
        <input
          type="number"
          placeholder="Ár"
          value={newMeal.price}
          onChange={(e) => handleMealInputChange("price", e.target.value)}
        />
        <label className={styles.fileUploadButton}>
          <AiOutlineUpload className={styles.uploadIcon} />
          Kép feltöltése
          <input
            type="file"
            onChange={(e) => handleMealInputChange("photo", e.target.files[0])}
            className={styles.fileInput}
          />
        </label>
        <div className={styles.popupButtons}>
          <button onClick={addMealToTab} className={styles.okButton}>OK</button>
          <button onClick={closePopup} className={styles.cancelButton}>Mégsem</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {loading ? (
        <div>Betöltés...</div>
      ) : (
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
        onKeyDown={(e) => e.key === "Enter" && finishEditingTab()}
        className={`${styles.tabInput} ${styles.tabButton}`}
        autoFocus
      />
    ) : (
      <div
        className={`${styles.tabButton} ${
          activeTab === index ? styles.activeTab : ""
        }`}
        onClick={() => handleTabChange(index)}
      >
        <span>{tab.name}</span>
        <div className={styles.iconContainer}>
          <MdEdit
            onClick={(e) => {
              e.stopPropagation();
              toggleEditTab(index);
            }}
            className={styles.icon}
          />
          <IoMdRemoveCircleOutline
            onClick={(e) => {
              e.stopPropagation();
              deleteTab(index);
            }}
            className={styles.icon}
          />
        </div>
      </div>
    )}
  </div>
))}
</div>
<button onClick={addTab} className={styles.addTabButton}>
+ Új kategória
</button>
</div>
<div className={styles.mealContent}>{renderMealForm(activeTab)}</div>
</div>
</div>
)}
{showPopup && renderPopup()}
<a href="#" className={styles.saveBtn} onClick={saveMeals}>
<div className={styles.saveBtnEtlap}>Mentés</div>
</a>
</div>
);
};

export default ListItems;

