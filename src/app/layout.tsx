import React from "react";
import "./globals.css";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ar">
      <body className="h-full">{children}</body>
    </html>
  );
};

export default MainLayout;
