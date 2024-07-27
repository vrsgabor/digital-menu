import styles from '../styles/Etterem.module.css';
import DonutChart from '../components/DonutChart';
import LineChart from '../components/LineChart';

const Dashboard = () => (
    <div className={styles.dashboardWrapper}>
        <div className={styles.topSection}>
            <div className={styles.leftColumn}>
                    <div className={styles.dashboardKpi}>
                        <div className={styles.KpiCard}>
                            <p className={styles.KpiCardValue}>329e</p>
                            <p className={styles.KpiCardTitle}>Aktuális havi árbevétel (Ft)</p>
                        </div>
                        <div className={styles.KpiCard}>
                            <p className={styles.KpiCardValue}>286e</p>
                            <p className={styles.KpiCardTitle}>Aktuális havi profit (Ft)</p>
                        </div>
                        <div className={styles.KpiCard}>
                            <p className={styles.KpiCardValue}>4.6 / 5</p>
                            <p className={styles.KpiCardTitle}>Vásárlói elégedettség</p>
                        </div>
                    </div>
                    <div className={styles.dashDonut}>
                        <DonutChart />
                    </div>
            </div>
            <div className={styles.dashBar}>
                    <p>Valami</p>
                    <p>Valami</p>
                    <p>Valami</p>
                    <p>Valami</p>
                    <p>Valami</p>
                    <p>Valami</p>
                    <p>Valami</p>
            </div>
        </div>
        <div className={styles.dashLine}>
                <LineChart />
        </div>

    </div>
);

export default Dashboard;
