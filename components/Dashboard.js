import styles from '../styles/Etterem.module.css';
import DonutChart from '../components/DonutChart';  // Adjust the path as necessary

const Dashboard = () => (
    <div className={styles.dashboardWrapper}>
        <div className={styles.dashKpi}>
            <div className={styles.dashboardBg}>
                <p>Valami</p>
                <p>Valami</p>
            </div>
        </div>
        <div className={styles.dashDonut}>
            <div className={styles.dashboardBg}>
                <div className={styles.donutChartWrapper}>
                <DonutChart />
                </div>
                
            </div>
        </div>
        <div className={styles.dashBar}>
            <div className={styles.dashboardBg}>
                <p>Valami</p>
                <p>Valami</p>
                <p>Valami</p>
                <p>Valami</p>
                <p>Valami</p>
                <p>Valami</p>
            </div>
        </div>
        <div className={styles.dashLine}>
            <div className={styles.dashboardBg}>
                <p>Valami</p>
                <p>Valami</p>
            </div>
        </div>
    </div>
);

export default Dashboard;
