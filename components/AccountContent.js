import React, { useState } from 'react';
import styles from '../styles/Account.module.css';

const AccountContent = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const getMaskedValue = (password) => {
    if (password.length === 0) return '';
    return '•'.repeat(password.length - 1) + password.slice(-1);
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.reastaurantInfoWrapper}>
        <h2 className={styles.subTitle}>
          Étterem adatai
        </h2>
        <input
          type="text"
          name="restaurantName"
          placeholder="Név"
          className={styles.inputFields}
        />
        <input
          type="text"
          name="restaurantAdress"
          placeholder="Cím"
          className={styles.inputFields}
        />
        <input
          type="text"
          name="restaurantEmail"
          placeholder="Email"
          className={styles.inputFields}
        />
        <input
          type="text"
          name="restaurantTel"
          placeholder="Tel"
          className={styles.inputFields}
        />
      </div>
      <div className={styles.inputFieldsWrapper}>
      <h2 className={styles.subTitle}>
          Jelszó megváltoztatása
        </h2>
        <input
          type="text"
          name="oldPassword"
          placeholder="Régi jelszó"
          className={styles.inputFields}
          value={getMaskedValue(passwords.oldPassword)}
          onChange={handleChange}
        />
        <input
          type="text"
          name="newPassword"
          placeholder="Új jelszó"
          className={styles.inputFields}
          value={getMaskedValue(passwords.newPassword)}
          onChange={handleChange}
        />
        <input
          type="text"
          name="confirmPassword"
          placeholder="Új jelszó ismét"
          className={styles.inputFields}
          value={getMaskedValue(passwords.confirmPassword)}
          onChange={handleChange}
        />
      </div>
    </div>
    
  );
};

export default AccountContent;
