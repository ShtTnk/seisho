// src/app/dashboard/toppage/page.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// ----------------- ページ本体 -----------------
export default function Toppage() {
  return (
    <motion.div
      style={pageStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 背景画像粒子 */}
      <ParticleBackground num={30} />

      <main style={mainStyle}>
        <div style={cardStyle}>
          <h1 style={titleStyle}>I am Seisho👶</h1>
          <p style={subtitleStyle}>2025年6月8日生まれの男の子</p>
          <AgeCounter />
          <p style={subtitleStyle}>父は順聖👓、母は奈津美💅、我は聖翔✨</p>
          <Image
            src="/baby.jpg"
            alt="かわいい赤ん坊"
            width={400}
            height={400}
            style={{
              borderRadius: "1rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              maxWidth: "100%",
              height: "auto",
            }}
          />
          <p style={subtitleStyle}>
            I am not sleeping. Rather, I am observing this world with eyes👀
          </p>
          <h2 style={subtitleStyle}>Thank you for coming💛</h2>
          <div style={buttonContainer}>
            <ActionButton
              href="https://amzn.to/4nYombK"
              label="Drink Milk🍼ミルクをあげる"
            />
            <ActionButton
              href="https://amzn.to/4o2ZoIv"
              label="Fall Asleep😴寝かしつける"
            />
          </div>
        </div>
      </main>
    </motion.div>
  );
}

// ----------------- 背景画像降らせ（丸く固定・3種類） -----------------
function ParticleBackground({ num }: { num: number }) {
  const [particles, setParticles] = useState<
    {
      x: number;
      y: number;
      size: number;
      speed: number;
      rotation: number;
      rotSpeed: number;
      src: string;
    }[]
  >([]);

  const images = ["/daddy.jpg", "/mummy.jpg", "/sei-chan.jpg"]; // ←ここに画像3種類
  const sparkle = new Audio("/sparkle.mp3"); // 公開フォルダに置いた音
  const [audioAllowed, setAudioAllowed] = useState(false);

  useEffect(() => {
    sparkle.play().catch(() => {});
    sparkle.loop = true;
    const arr = Array.from({ length: num }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 50 + 30,
      speed: Math.random() * 1 + 0.5,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 2,
      src: images[Math.floor(Math.random() * images.length)], // ランダム選択
    }));
    setParticles(arr);

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => {
          let newY = p.y + p.speed;
          if (newY > window.innerHeight) newY = -p.size;
          let newRotation = (p.rotation + p.rotSpeed) % 360;
          return { ...p, y: newY, rotation: newRotation };
        })
      );
    }, 16);

    return () => clearInterval(interval);
  }, [num]);

  return (
    <div style={{ ...particleContainerStyle, position: "fixed", zIndex: 0 }}>
      {particles.map((p, i) => (
        <img
          key={i}
          src={p.src} // ランダム画像
          alt=""
          style={{
            position: "absolute",
            top: p.y,
            left: p.x,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            transform: `rotate(${p.rotation}deg)`,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      ))}
    </div>
  );
}

// ----------------- AgeCounter（ポップカード版） -----------------
function AgeCounter() {
  const birthDate = new Date("2025-06-08T00:00:00");
  const [diff, setDiff] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const delta = Math.floor((now.getTime() - birthDate.getTime()) / 1000);

      const days = Math.floor(delta / (24 * 3600));
      const hours = Math.floor((delta % (24 * 3600)) / 3600);
      const minutes = Math.floor((delta % 3600) / 60);
      const seconds = delta % 60;

      setDiff({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={ageCardStyle}>
      <h3 style={ageTitleStyle}>聖翔くんが生まれてから</h3>
      <div style={timeContainer}>
        <TimeBlock label="日" value={diff.days} color="#f87171" />
        <TimeBlock label="時間" value={diff.hours} color="#60a5fa" />
        <TimeBlock label="分" value={diff.minutes} color="#34d399" />
        <TimeBlock label="秒" value={diff.seconds} color="#facc15" />
      </div>
    </div>
  );
}

// ----------------- TimeBlockサブコンポーネント -----------------
function TimeBlock({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div style={{ ...timeBlockStyle, backgroundColor: color }}>
      <p style={timeValueStyle}>{value}</p>
      <p style={timeLabelStyle}>{label}</p>
    </div>
  );
}

// ----------------- ActionButton -----------------
function ActionButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={buttonStyle}
    >
      {label}
    </a>
  );
}

// ----------------- CSS in JS -----------------
const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #1e1e1e, #2c2c2c, #111)",
  color: "#f0f0f0",
  fontFamily: "sans-serif",
  overflow: "hidden",
  position: "relative",
};

const mainStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "900px",
  padding: "2rem",
  zIndex: 2,
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle: React.CSSProperties = {
  background: "rgba(40,40,40,0.85)",
  padding: "2rem",
  borderRadius: "2rem",
  boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  margin: "0 auto",
  maxWidth: "90%",
  width: "600px",
  alignItems: "center",
};

const titleStyle: React.CSSProperties = {
  fontSize: "3rem",
  fontWeight: "900",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: "500",
  color: "#ccc",
};

const buttonContainer: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  justifyContent: "center",
  flexWrap: "wrap",
};

const buttonStyle: React.CSSProperties = {
  padding: "0.75rem 1.5rem",
  borderRadius: "9999px",
  background: "linear-gradient(90deg, #facc15, #f59e0b)",
  color: "#111",
  fontWeight: 600,
  textDecoration: "none",
  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  transition: "all 0.2s",
  cursor: "pointer",
};

const ageCardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.1)",
  padding: "1rem 1.5rem",
  borderRadius: "1.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
};

const ageTitleStyle: React.CSSProperties = {
  color: "#fff",
  fontWeight: 700,
  fontSize: "1.2rem",
};

const timeContainer: React.CSSProperties = {
  display: "flex",
  gap: "0.75rem",
  flexWrap: "wrap",
  justifyContent: "center",
};

const timeBlockStyle: React.CSSProperties = {
  minWidth: "60px",
  padding: "0.5rem 0.75rem",
  borderRadius: "1rem",
  textAlign: "center",
  color: "#111",
  fontWeight: 700,
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
};

const timeValueStyle: React.CSSProperties = {
  fontSize: "1.2rem",
};

const timeLabelStyle: React.CSSProperties = {
  fontSize: "0.75rem",
};

const particleContainerStyle: React.CSSProperties = {
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
};
