import Head from "next/head"; // Importing Head component for managing the document head

import styles from "./page.module.css"; // Importing CSS module for styling
import WeatherForm from "./components/WeatherForm/WeatherForm"; // Importing WeatherForm component

export default function Home() { // Main functional component for the Home page
  return (
    <div className={styles.container}> {/* Main container for the app */}
      <Head>
        <title>Weather App</title> {/* Title of the web page */}
      </Head>
      <main className={styles.main}> {/* Main content area */}
        <WeatherForm /> {/* Weather form component for user input */}
      </main>
    </div>
  );
}