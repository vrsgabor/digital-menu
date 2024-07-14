import styles from '../styles/Home.module.css';

const ContactSection = () => (
    <section className={`${styles['section-style']} ${styles['digitalis-etlap']}`}>
        <h3 className={styles['heading-5']}>Kérdésed van?</h3>
        <img src="/images/underline.svg" loading="lazy" alt="underline" className={`${styles.underline} ${styles.margin90}`} />
        <div className={styles['form-block']}>
            <form className={styles['form-block-fields']} id="email-form" name="email-form" data-name="Email Form" method="get" data-wf-page-id="664e57fca0a6d2d6b784a753" data-wf-element-id="83c6f27a-4b14-a4c2-4082-2816ece9f3d9">
                <input className={styles['text-field']} maxLength="256" name="name" data-name="Name" placeholder="Név" type="text" id="name" required />
                <input className={styles['text-field']} maxLength="256" name="email" data-name="Email" placeholder="E-mail" type="email" id="email" required />
                <input className={`${styles['text-field']} ${styles['text-field-message']}`} maxLength="256" name="Text" data-name="Text" placeholder="Üzenet" type="text" id="Text" required />
            </form>
            <input type="submit" data-wait="Kérjük várjon..." className={styles['submit-btn']} value="Küldés" />
            <div className={styles['w-form-done']}>
                <div>Köszönjük! Az üzenet sikeresen elküldve✅</div>
            </div>
            <div className={styles['w-form-fail']}>
                <div>Hoppá! Valami hiba történt, kérjük próbálkozzon újra❌</div>
            </div>
        </div>
    </section>
);

export default ContactSection;
