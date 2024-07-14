import styles from '../styles/Home.module.css';

const CleanDesignSection = () => (
    <section className={`${styles['section-style']} ${styles['letisztult-kulso']}`}>
        <div className={styles['paragraph-wrapper']}>
            <h3 className={styles['heading-dark-bg']}>Letisztult külső</h3>
            <p className={styles['paragraph-dark-bg']}>Modern, letisztult design segítségével tesszük lehetővé vendégeid számára a legmagasabb szintű felhasználói élményt. Az átlátható megjelenés tökéletesen illeszkedik az éttermek és kávézók atmoszférájához, emelve az ételélményt egy új szintre.</p>
        </div>
        <img src="/images/iphone_mockup.svg" loading="lazy" alt="iPhone mockup" className={styles['phone-mockup']} />
    </section>
);

export default CleanDesignSection;
