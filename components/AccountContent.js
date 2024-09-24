import React, { useState, useRef } from 'react';
import { IoIosSave } from "react-icons/io";
import styles from '../styles/Account.module.css';

const AccountContent = () => {
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

  const handleChange = (e) => {
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
        ? '•'.repeat(value.length - 1) + value.slice(-1) // show only the last character
        : value, // if it's only 1 character, just display it
    }));

    // After 2 seconds, mask the last character
    timeoutRefs.current[name] = setTimeout(() => {
      setMaskedPasswords((prevMasked) => ({
        ...prevMasked,
        [name]: '•'.repeat(value.length), // Mask the entire password
      }));
    }, 2000);
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
        />
        <input
          type="text"
          name="restaurantAddress"
          placeholder="Cím"
          className={styles.inputFields}
        />
        <input
          type="email"
          name="restaurantEmail"
          placeholder="Email"
          className={styles.inputFields}
        />
        <input
          type="tel"
          name="restaurantTel"
          placeholder="Tel: +36/xx-xxx-xxxx"
          className={styles.inputFields}
          pattern="\+36/[0-9]{2}-[0-9]{3}-[0-9]{4}"
        />
        <button className={styles.saveBtn}><IoIosSave className={styles.icon}/>Mentés</button>
      </div>
      <h2 className={styles.subTitle}>Jelszó megváltoztatása</h2>
      <div className={styles.inputFieldsWrapper}>
        <input
          type="text"
          name="oldPassword"
          placeholder="Régi jelszó"
          className={styles.inputFields}
          value={maskedPasswords.oldPassword}
          onChange={handleChange}
        />
        <input
          type="text"
          name="newPassword"
          placeholder="Új jelszó"
          className={styles.inputFields}
          value={maskedPasswords.newPassword}
          onChange={handleChange}
        />
        <input
          type="text"
          name="confirmPassword"
          placeholder="Új jelszó ismét"
          className={styles.inputFields}
          value={maskedPasswords.confirmPassword}
          onChange={handleChange}
        />
        <button className={styles.saveBtn}><IoIosSave className={styles.icon}/>Mentés</button>
      </div>
    </div>
  );
};

export default AccountContent;
