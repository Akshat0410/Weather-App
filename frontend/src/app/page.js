import Head from "next/head";

import styles from "./page.module.css";
import WeatherForm from "./components/WeatherForm/WeatherForm";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Weather App</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Weather App</h1>
        <WeatherForm />
      </main>
    </div>
  );
}
