import styles from '../styles/Home.module.css';

const ManageDigitalMenuSection = () => (
    <section className={`${styles['section-style']} ${styles['digitalis-etlap']}`}>
        <h3 className={styles['heading-5']}>Kezeld digitális étlapod az étterem portállal</h3>
        <img src="/images/underline.svg" loading="lazy" alt="underline" className={styles['underline-section2']} />
        <p className={`${styles.paragraph} ${styles['paragraph-small']}`}>Az éttermi portálon végrehajtott minden változtatás szinkronizálva lesz az Ön digitális étlapjával</p>
        <img src="/images/computer-mockup.svg" loading="lazy" alt="Computer mockup" className={styles['computer-mockup']} />
    </section>
);

export default ManageDigitalMenuSection;