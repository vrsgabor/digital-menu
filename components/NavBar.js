import styles from '../styles/Home.module.css';

const NavBar = () => (
    <div className={styles.navbar}>
        <a href="/login" className={styles['login-link-block']}>
            <div className={styles.link}>Bejelentkezés</div>
        </a>
        <a href="/signup" className={styles['reg-link-block']}>
            <div className={styles.link}>Regisztráció</div>
        </a>
    </div>
);

export default NavBar;
