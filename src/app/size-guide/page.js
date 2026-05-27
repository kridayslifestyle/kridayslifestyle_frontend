import styles from "./SizeGuidePage.module.css";

const SIZES = [
  {
    size: "XS",
    bust: "32",
    waist: "26",
    hips: "34",
  },
  {
    size: "S",
    bust: "34",
    waist: "28",
    hips: "36",
  },
  {
    size: "M",
    bust: "36",
    waist: "30",
    hips: "38",
  },
  {
    size: "L",
    bust: "38",
    waist: "32",
    hips: "40",
  },
  {
    size: "XL",
    bust: "40",
    waist: "34",
    hips: "42",
  },
];

export default function SizeGuidePage() {

  return (

    <div className={styles.page}>

      <div className={styles.container}>

        <span className={styles.badge}>
          Shopping Help
        </span>

        <h1 className={styles.title}>
          Size Guide
        </h1>

        <p className={styles.subtitle}>
          Find your perfect fit using our standard sizing chart.
        </p>

        <div className={styles.card}>

          <table className={styles.table}>

            <thead>

              <tr>
                <th>Size</th>
                <th>Bust</th>
                <th>Waist</th>
                <th>Hips</th>
              </tr>

            </thead>

            <tbody>

              {SIZES.map((item) => (

                <tr key={item.size}>

                  <td>{item.size}</td>
                  <td>{item.bust}"</td>
                  <td>{item.waist}"</td>
                  <td>{item.hips}"</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className={styles.note}>

          <h3>
            Fit Tips
          </h3>

          <p>
            If you are between sizes,
            we recommend choosing the larger size
            for a more comfortable fit.
          </p>

        </div>

      </div>

    </div>
  );
}