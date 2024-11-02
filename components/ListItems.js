"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/Etlap.module.css";
import { MdEdit } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { GoGrabber } from "react-icons/go";
import { FaFileImage } from "react-icons/fa";
import Select from "react-select";

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
    allergens: [], // Initialize allergens as an array
    price: "",
    photo: null,
  });
  const [editMealIndex, setEditMealIndex] = useState(null); // Track meal being edited
  const [popupVisible, setPopupVisible] = useState(false); // Handle visibility state
  const [errors, setErrors] = useState({}); // Track validation errors

  // Define the allergen options
  const allergenOptions = [
    { value: "gluten", label: "Glutén" },
    { value: "lactose", label: "Laktóz" },
    { value: "peanuts", label: "Földimogyoró" },
    { value: "soy", label: "Szója" },
    { value: "nuts", label: "Diófélék" },
    { value: "shellfish", label: "Rákfélék" },
    // Add more allergens as needed
  ];

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
        allergens: [],
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
        allergens: Array.isArray(meal.allergens)
          ? meal.allergens
              .map((allergen) =>
                allergenOptions.find((option) => option.value === allergen)?.label
              )
              .join(", ") // Convert allergens array to a comma-separated string of labels
          : "",
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
            {meal.mealName && <p>Név:{" "}{meal.mealName}</p>}

            {/* Conditionally render the description */}
            {meal.description && <p className={styles.description}>Leírás:{" "}{meal.description}</p>}

            {/* Conditionally render the allergens */}
            {Array.isArray(meal.allergens) && meal.allergens.length > 0 ? (
            <p>
              Allergének:{" "}
              {meal.allergens
                .map((allergen) =>
                  allergenOptions.find((option) => option.value === allergen)?.label
                )
                .join(", ")}
            </p>
          ) : (
            <p>Allergének: Nincs megadva</p> // If no allergens are provided
          )}

            {/* Conditionally render the price */}
            {meal.price && <p>Ár:{" "}{meal.price} Ft</p>}

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
        <div className={styles.popupContent}>
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

            {/* Modern multi-select dropdown for allergens */}
            <Select
              isMulti
              options={allergenOptions}
              value={allergenOptions.filter(option => Array.isArray(newMeal.allergens) && newMeal.allergens.includes(option.value))} // Ensure newMeal.allergens is an array
              onChange={(selectedOptions) =>
                handleMealInputChange(
                  "allergens",
                  selectedOptions.map(option => option.value)
                )
              }
              placeholder="Válasszon allergéneket"
              className={styles.popUpInput}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#f9f9f9", // Customize the control (input area)
                  borderColor: "#dde6ed",         // Border color
                  boxShadow: "none",           // Remove shadow
                  "&:hover": {                 // Hover state
                    borderColor: "#dde6ed",
                  },
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: "#dde6ed", // Customize selected items (pill)
                  color: "#526d82",
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#526d82",        // Customize the color of the placeholder
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: "#526d82",           // Customize the label inside the selected item
                }),
                multiValueRemove: (base) => ({
                  ...base,
                  color: "#526d82",
                  ":hover": {
                    backgroundColor: "#526d82", // Customize remove button hover effect
                    color: "white",
                  },
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: "#526d82", // Customize the arrow color
                  "&:hover": {
                    color: "#526d82", // Change color on hover
                  },
                }),
                indicatorSeparator: (base) => ({
                  ...base,
                  backgroundColor: "#dde6ed", // Customize the divider line color
                }),
                clearIndicator: (base) => ({
                  ...base,
                  color: "#526d82", // Customize the "Delete All" button color
                  "&:hover": {
                    color: "#526d82", // Change the color on hover
                  },
                }),
              }}
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
          <div className={styles.uploader}>
            <label>
              <div className={styles.imageUploader}>
                <FaFileImage className={styles.uploadIcon} />
                <input
                  type="file"
                  onChange={(e) => handleMealInputChange("photo", e.target.files[0])}
                  className={styles.fileInput}
                />
              </div>
            </label>

            {/* Conditionally display the uploaded file name */}
            {newMeal.photo && (
              <p className={styles.fileName}>Feltöltött fájl: {newMeal.photo.name}</p>
            )}
          </div>
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
        <div className={styles.loaderWrapper}>
          <div className={styles.loader}> </div>
          <div className={styles.loaderText}>Betöltés...</div>
        </div>
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
                        className={`${styles.tabButton} ${activeTab === index ? styles.activeTab : ""}`}
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
