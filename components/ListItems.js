"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/Etlap.module.css";
import { AiOutlineUpload } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdRemoveCircleOutline} from "react-icons/io";
import { GoGrabber } from "react-icons/go";

const ListItems = () => {
  const [tabs, setTabs] = useState([{ name: "Új kategória", editable: false }]);
  const [activeTab, setActiveTab] = useState(0);
  const [meals, setMeals] = useState({ 0: [] });
  const [isEditingTab, setIsEditingTab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility
  const [newMeal, setNewMeal] = useState({
    mealName: "",
    description: "",
    allergens: "",
    price: "",
    photo: null,
  });
  const [editMealIndex, setEditMealIndex] = useState(null); // Track meal being edited
  const [popupVisible, setPopupVisible] = useState(false); // Handle visibility state
  const [errors, setErrors] = useState({}); // Track validation errors

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

  // Handle form input changes
  const handleMealInputChange = (field, value) => {
    setNewMeal((prevMeal) => ({
      ...prevMeal,
      [field]: value,
    }));
  };

  // Validate required fields (mealName and price)
  const validateFields = () => {
    let validationErrors = {};
    if (!newMeal.mealName.trim()) {
      validationErrors.mealName = "A név mező kitöltése kötelező!";
    }
    if (!newMeal.price || isNaN(newMeal.price)) {
      validationErrors.price = "Az ár mező kitöltése kötelező és számnak kell lennie!";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

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
    if (!validateFields()) {
      return; // Do not proceed if validation fails
    }

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
    triggerClosePopup();
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
    setErrors({}); // Clear previous errors
    setShowPopup(true); // Show the popup instantly
    setTimeout(() => setPopupVisible(true), 10); // Delay visibility for smooth transition
  };

  const triggerClosePopup = () => {
    setPopupVisible(false); // Trigger the float-out effect
    setTimeout(() => setShowPopup(false), 500); // Close popup after animation ends
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
            <GoGrabber className={styles.grabber} />
            
            {/* Conditionally render the image if it's provided */}
            {meal.photo && (
              <img src={URL.createObjectURL(meal.photo)} alt="Meal" className={styles.uploadedImage} />
            )}
  
            {/* Conditionally render the mealName */}
            {meal.mealName && <p>{meal.mealName}</p>}
  
            {/* Conditionally render the description */}
            {meal.description && <p className={styles.description}>{meal.description}</p>}
  
            {/* Conditionally render the allergens */}
            {meal.allergens && <p>{meal.allergens}</p>}
  
            {/* Conditionally render the price */}
            {meal.price && <p>{meal.price} Ft</p>}
  
            <div className={styles.buttonGroup}>
              <button
                className={styles.editButton}
                onClick={() => openPopup(meal, mealIndex)}
              >
                <MdEdit />
              </button>
              <button
                className={styles.closeButton}
                onClick={() => removeMeal(tabIndex, mealIndex)}
              >
                <IoCloseSharp />
              </button>
            </div>
          </div>
        </div>
      ))}
      <button onClick={() => openPopup()} className={styles.addButton}>
        Új tétel hozzáadása
      </button>
    </div>
  );
  

  const renderPopup = () => (
    showPopup && (
      <div className={`${styles.popupOverlay} ${popupVisible ? styles.visible : styles.hidden}`}>
        <div className={`${styles.popupContent}`}>
          <h2 className={styles.popUpTitle}>{editMealIndex !== null ? "Tétel szerkesztése" : "Új tétel hozzáadása"}</h2>
          <div className={styles.inputFieldWrapper}>
          <input
            type="text"
            placeholder="Név"
            value={newMeal.mealName}
            onChange={(e) => handleMealInputChange("mealName", e.target.value)}
            className={`${errors.mealName ? styles.inputError : ""} ${styles.popUpInput}`}
        
          />
          {errors.mealName && <p className={styles.errorMessage}>{errors.mealName}</p>}
          <input
            type="text"
            placeholder="Leírás"
            value={newMeal.description}
            onChange={(e) => handleMealInputChange("description", e.target.value)}
            className={styles.popUpInput}
          />
          <input
            type="text"
            placeholder="Allergének"
            value={newMeal.allergens}
            onChange={(e) => handleMealInputChange("allergens", e.target.value)}
            className={styles.popUpInput}
          />
          <input
          type="number"
          placeholder="Ár"
          value={newMeal.price}
          onChange={(e) => handleMealInputChange("price", e.target.value)}
          className={`${errors.price ? styles.inputError : ""} ${styles.numberInput} ${styles.popUpInput}`}
          />

          {errors.price && <p className={styles.errorMessage}>{errors.price}</p>}
          </div>
          
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
            <button onClick={triggerClosePopup} className={styles.okButton}>Mégsem</button>
          </div>
        </div>
      </div>
    )
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
      {renderPopup()}
      <a href="#" className={styles.saveBtn} onClick={saveMeals}>
        <div className={styles.saveBtnEtlap}>Mentés</div>
      </a>
    </div>
  );
};

export default ListItems;
s