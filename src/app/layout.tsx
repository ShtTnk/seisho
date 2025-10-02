// src/app/layout.tsx
'use client';
import './globals.css';
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 min-h-screen">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
