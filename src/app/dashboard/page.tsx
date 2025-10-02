"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { startTransition } from "react";
import { start } from "repl";

export default function Dashboard() {
  const router = useRouter();
  const [showCard, setShowCard] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // 粒子配列
  const [particles, setParticles] = useState<{
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
  }[]>([]);

  useEffect(() => {
    setShowCard(true);

    // カウントダウン
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push("/dashboard/toppage");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 粒子初期化
    const arr = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 12 + 6,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticles(arr);

    return () => clearInterval(interval);
  }, [router]);

  // 粒子アニメーション
  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      setParticles(prev =>
        prev.map(p => {
          let newX = p.x + p.speedX;
          let newY = p.y + p.speedY;
          if (newX > window.innerWidth) newX = 0;
          if (newX < 0) newX = window.innerWidth;
          if (newY > window.innerHeight) newY = 0;
          if (newY < 0) newY = window.innerHeight;
          const newOpacity = 0.2 + 0.3 * Math.abs(Math.sin(Date.now() / 1000 + newX + newY));
          return { ...p, x: newX, y: newY, opacity: newOpacity };
        })
      );
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div style={pageStyle}>
      {/* 粒子描画 */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            borderRadius: "50%",
            background: `rgba(255,255,255,${p.opacity})`,
            width: p.size,
            height: p.size,
            top: p.y,
            left: p.x,
            pointerEvents: "none",
          }}
        />
      ))}

      <div
        style={{
          ...cardStyle,
          opacity: showCard ? 1 : 0,
          transform: showCard ? "translateY(0)" : "translateY(-20px)",
          transition: "all 0.7s",
          zIndex: 1,
        }}
      >
        <h1 style={titleStyle}>Dashboard</h1>
        <Image
          src="/daddy_mummy.jpg"
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
        <p style={subtitleStyle}>ようこそ！ログイン成功しました</p>
        <p style={subtitleStyle}>楽しんでいってね(⋈◍＞◡＜◍)。✧♡</p>
        <p style={subtitleStyle}>{countdown}秒後にトップページに移動します...</p>
      </div>
    </div>
  );
}

// ------------------- CSS -------------------
const titleStyle: React.CSSProperties = { fontSize: "2.5rem", fontWeight: 700 };
const subtitleStyle: React.CSSProperties = { fontSize: "1rem", color: "#ccc" };
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
const cardStyle: React.CSSProperties = {
  background: "rgba(40,40,40,0.6)", // 透明度アップ
  padding: "1.5rem",
  borderRadius: "1.5rem",
  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  margin: "0 auto",
  maxWidth: "600px",   // 固定幅ちょい小さめ
  width: "80%",        // 画面いっぱい使わんように
  alignItems: "center",
};
