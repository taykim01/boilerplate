import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RecoilRootWrapper from "@/recoil/recoil_wrapper";

const pretendard = localFont({
  src: "./fonts/Pretendard.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Boilerplate",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <RecoilRootWrapper>
        <body
          className={
            pretendard.variable +
            " w-screen h-screen flex items-center justify-center bg-gray-100"
          }
        >
          <div className="max-w-[393px] w-full max-h-[750] h-full bg-white rounded-3xl">
            {children}
          </div>
        </body>
      </RecoilRootWrapper>
    </html>
  );
}
