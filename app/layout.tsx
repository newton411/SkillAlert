import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillAlert SA - Free Job & Opportunity Alerts",
  description: "Never miss a job, learnership, or free upskilling opportunity again. Get personalized alerts for real SA opportunities sent to your WhatsApp or phone — completely free.",
  keywords: "jobs, learnerships, skills training, South Africa, WhatsApp alerts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
