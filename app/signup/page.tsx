'use client';
import styles from '../../styles/Signup.module.css';
import '../../styles/global.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data.message);
    }
  }

  return (
    <div className={styles.pagewrapper}>
      <div className={styles.leftdiv}>
        <div className={styles.contentWrapper}>
        <h2 className={styles.subTitle}>Hozd létre a fiókodat</h2>
        <p className={styles.paragraph}>Üdvözöljük! Öröm számunkra, hogy digitálisan szeretné kezelni étterme étlapját. Így, ön a legtöbb étteremtulajdonos előtt jár. Próbálja ki ingyenes felületünket, és tapasztalja meg, milyen egyszerű az online étlapkezelés.</p>
        </div>
        
      </div>
      <div className={styles.rightdiv}>
        <h1 className={styles.title}>Regisztráció</h1>
          <form className={styles.formWrapper} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Felhasználónév"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.formInput}
            />
            <input
              type="password"
              placeholder="Jelszó"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formInput}
            />
            <button className={styles.regButton} type="submit">Regisztráció</button>
            <p className={styles.loginLink}>Van már fiókja?<a className={styles.link} href="/login">Kattintson ide.</a></p>
            {error && <p className={styles.error}>{error}</p>}
          </form>
      </div>
    </div>
  );
}
