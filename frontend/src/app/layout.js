import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = { // Metadata for the application
  title: "Weather App", // Title of the application
  description: "Weather Application", // Description of the application
};

export default function RootLayout({ children }) { // Main layout component
  return (
    <html lang="en"> {/* Setting the language attribute for the HTML document */}
      <body className={`${geistSans.variable} ${geistMono.variable}`}> {/* Applying the font styles */}
        {children} {/* Rendering child components */}
      </body>
    </html>
  );
}
