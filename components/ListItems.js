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

  // Fetch meals data from the meals.json file on component mount
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("/meals.json"); // Fetch data from the JSON file
        const data = await response.json();

        // Prepare tabs from unique categories in the JSON data
        const uniqueCategories = [...new Set(data.meals.map((meal) => meal.category))];
        const newTabs = uniqueCategories.map((category) => ({
          name: category,
          editable: false,
        }));
        setTabs(newTabs);

        // Prepare meals by categorizing them under each tab index
        const categorizedMeals = {};
        uniqueCategories.forEach((category, index) => {
          categorizedMeals[index] = data.meals.filter((meal) => meal.category === category);
        });
        setMeals(categorizedMeals);
      } catch (error) {
        console.error("Error fetching meals data:", error);
      }
    };

    fetchMeals(); // Fetch the meals when the component mounts
  }, []);

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

  const handleMealChange = (tabIndex, mealIndex, field, value) => {
    const updatedMeals = { ...meals };
    updatedMeals[tabIndex][mealIndex][field] = value; // Update mealName instead of name
    setMeals(updatedMeals);
  };
  

  const addMeal = (tabIndex) => {
    const updatedMeals = { ...meals };

    if (!updatedMeals[tabIndex]) {
      updatedMeals[tabIndex] = [];
    }

    updatedMeals[tabIndex].push({
      name: "",
      description: "",
      allergens: "",
      price: "",
      photo: null,
    });

    setMeals(updatedMeals);
  };

  const saveMeals = async () => {
    const flattenedMeals = tabs.flatMap((tab, tabIndex) =>
      meals[tabIndex]?.map((meal) => ({
        mealName: meal.mealName,
        description: meal.description,
        price: meal.price,
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
            <input
              type="text"
              placeholder="Név"
              value={meal.mealName} // Use meal.mealName
              onChange={(e) =>
                handleMealChange(tabIndex, mealIndex, "mealName", e.target.value) // Update mealName, not name
              }
            />
            <input
              placeholder="Leírás"
              value={meal.description}
              onChange={(e) =>
                handleMealChange(tabIndex, mealIndex, "description", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Allergének"
              value={meal.allergens}
              onChange={(e) =>
                handleMealChange(tabIndex, mealIndex, "allergens", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Ár"
              value={meal.price}
              onChange={(e) =>
                handleMealChange(tabIndex, mealIndex, "price", e.target.value)
              }
            />
            <button
              onClick={() => removeMeal(tabIndex, mealIndex)}
              className={styles.removeButton}
            >
              <IoMdRemoveCircle />
            </button>
          </div>
          <div className={styles.fileUploader}>
            <label
              htmlFor={`file-upload-${mealIndex}`}
              className={styles.fileUploadButton}
            >
              <AiOutlineUpload className={styles.uploadIcon} />
              Kép feltöltése
            </label>
            <input
              id={`file-upload-${mealIndex}`}
              type="file"
              onChange={(e) =>
                handleMealChange(tabIndex, mealIndex, "photo", e.target.files[0])
              }
              className={styles.fileInput}
            />
          </div>
        </div>
      ))}
      <button onClick={() => addMeal(tabIndex)} className={styles.addButton}>
        Új tétel hozzáadása
      </button>
    </div>
  );

  return (
    <div>
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
                      onKeyDown={(e) =>
                        e.key === "Enter" && finishEditingTab()
                      }
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
          <div className={styles.mealContent}>
            {renderMealForm(activeTab)}
          </div>
        </div>
      </div>
      <a href="#" className={styles.saveBtn} onClick={saveMeals}>
        <div className={styles.saveBtnEtlap}>Mentés</div>
      </a>
    </div>
  );
};

export default ListItems;
