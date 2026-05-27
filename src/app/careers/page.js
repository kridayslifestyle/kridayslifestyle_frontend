import styles from "./CareersPage.module.css";



export default function CareersPage() {

    return (

        <div className={styles.page}>

            {/* HERO */}
            <section className={styles.hero}>

                <div className={styles.overlay} />

                <div className={styles.heroContent}>

                    <span className={styles.badge}>
                        Careers At Kriday
                    </span>

                    <h1 className={styles.heroTitle}>
                        Build The Future
                        Of Fashion With Us
                    </h1>

                    <p className={styles.heroText}>
                        Join our passionate team and help create
                        elegant fashion experiences for modern women.
                    </p>

                </div>

            </section>

            {/* JOBS */}
            <section className={styles.jobsSection}>

                <div className={styles.container}>

                    <div className={styles.center}>

                        <span className={styles.smallTitle}>
                            OPEN POSITIONS
                        </span>

                        <h2 className={styles.sectionTitle}>
                            Current Opportunities
                        </h2>

                    </div>

                    <div className={styles.emptyCard}>

                        <div className={styles.emptyIcon}>
                            💼
                        </div>

                        <h3 className={styles.emptyTitle}>
                            No Open Roles Right Now
                        </h3>

                        <p className={styles.emptyText}>
                            We are not hiring currently,
                            but we're always looking for
                            passionate and creative people.

                            Feel free to reach out to us at:

                            <br />
                            <br />

                            <a
                                href="mailto:kridaylifestyle@gmail.com"
                                className={styles.email}
                            >
                                kridaylifestyle@gmail.com
                            </a>
                        </p>

                    </div>

                </div>

            </section>

        </div>
    );
}