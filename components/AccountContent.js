import React, { useState, useEffect, useRef } from 'react';
import { IoIosSave } from "react-icons/io";
import styles from '../styles/Account.module.css';

const AccountContent = () => {
  const [restaurantInfo, setRestaurantInfo] = useState({
    restaurantName: '',
    restaurantAddress: '',
    restaurantEmail: '',
    restaurantTel: '',
  });

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [maskedPasswords, setMaskedPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const timeoutRefs = useRef({
    oldPassword: null,
    newPassword: null,
    confirmPassword: null,
  });

  // Fetch restaurant info from the JSON file on component mount
  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        const response = await fetch('/restaurantInfo.json');
        const data = await response.json();
        setRestaurantInfo(data);
      } catch (error) {
        console.error('Error fetching restaurant info:', error);
      }
    };

    fetchRestaurantInfo();
  }, []);

  const handleRestaurantInfoChange = (e) => {
    const { name, value } = e.target;
    setRestaurantInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    // Clear any previous timeout for this field
    if (timeoutRefs.current[name]) {
      clearTimeout(timeoutRefs.current[name]);
    }

    // Update the actual password state immediately
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));

    // Immediately mask the previous characters and show the latest one
    setMaskedPasswords((prevMasked) => ({
      ...prevMasked,
      [name]: value.length > 1
        ? '•'.repeat(value.length - 1) + value.slice(-1)
        : value,
    }));

    // After 2 seconds, mask the last character
    timeoutRefs.current[name] = setTimeout(() => {
      setMaskedPasswords((prevMasked) => ({
        ...prevMasked,
        [name]: '•'.repeat(value.length),
      }));
    }, 2000);
  };

  const saveRestaurantInfo = async () => {
    try {
      const response = await fetch('/api/saveRestaurantInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurantInfo),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Restaurant info saved successfully');
      } else {
        console.error('Failed to save restaurant info:', result.message);
      }
    } catch (error) {
      console.error('Error saving restaurant info:', error);
    }
  };

  return (
    <div className={styles.contentWrapper}>
      <h2 className={styles.subTitle}>Étterem adatai</h2>
      <div className={styles.restaurantInfoWrapper}>
        <input
          type="text"
          name="restaurantName"
          placeholder="Név"
          className={styles.inputFields}
          value={restaurantInfo.restaurantName}
          onChange={handleRestaurantInfoChange}
        />
        <input
          type="text"
          name="restaurantAddress"
          placeholder="Cím"
          className={styles.inputFields}
          value={restaurantInfo.restaurantAddress}
          onChange={handleRestaurantInfoChange}
        />
        <input
          type="email"
          name="restaurantEmail"
          placeholder="Email"
          className={styles.inputFields}
          value={restaurantInfo.restaurantEmail}
          onChange={handleRestaurantInfoChange}
        />
        <input
          type="tel"
          name="restaurantTel"
          placeholder="Tel: +36/xx-xxx-xxxx"
          className={styles.inputFields}
          value={restaurantInfo.restaurantTel}
          onChange={handleRestaurantInfoChange}
          pattern="\+36/[0-9]{2}-[0-9]{3}-[0-9]{4}"
        />
        <button className={styles.saveBtn} onClick={saveRestaurantInfo}>
          <IoIosSave className={styles.icon} />Mentés
        </button>
      </div>

      <h2 className={styles.subTitle}>Jelszó megváltoztatása</h2>
      <div className={styles.inputFieldsWrapper}>
        <input
          type="text"
          name="oldPassword"
          placeholder="Régi jelszó"
          className={styles.inputFields}
          value={maskedPasswords.oldPassword}
          onChange={handlePasswordChange}
        />
        <input
          type="text"
          name="newPassword"
          placeholder="Új jelszó"
          className={styles.inputFields}
          value={maskedPasswords.newPassword}
          onChange={handlePasswordChange}
        />
        <input
          type="text"
          name="confirmPassword"
          placeholder="Új jelszó ismét"
          className={styles.inputFields}
          value={maskedPasswords.confirmPassword}
          onChange={handlePasswordChange}
        />
        <button className={styles.saveBtn}><IoIosSave className={styles.icon}/>Mentés</button>
      </div>
    </div>
  );
};

export default AccountContent;
