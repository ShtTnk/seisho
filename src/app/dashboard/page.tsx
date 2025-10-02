"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    setShowCard(true);
    const timer = setTimeout(() => {
      router.push("/dashboard/toppage"); // トップページにリダイレクト
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  const Particle = ({ style }: { style: React.CSSProperties }) => (
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.2)",
        width: 8,
        height: 8,
        animation: "float 3s ease-in-out infinite",
        ...style,
      }}
    />
  );

  return (
    <div style={pageStyle}>
      {/* 背景粒子 */}
      <Particle style={{ top: 50, left: 100 }} />
      <Particle style={{ top: 200, left: 400 }} />
      <Particle style={{ top: 350, left: 200 }} />
      <div style={{ ...cardStyle, opacity: showCard ? 1 : 0, transform: showCard ? "translateY(0)" : "translateY(-20px)", transition: "all 0.7s" }}>
        <h1 style={titleStyle}>Dashboard</h1>
        <p style={subtitleStyle}>ようこそ！ログイン成功しました</p>
        <p style={subtitleStyle}>3秒後にトップページに移動します...</p>
      </div>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}

// ---------- CSS in JS ----------
const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #1e1e1e, #2c2c2c, #111)",
  color: "#f0f0f0",
  fontFamily: "sans-serif",
  position: "relative",
  overflow: "hidden",
};

const cardStyle: React.CSSProperties = {
  background: "rgba(40,40,40,0.85)",
  padding: "2rem",
  borderRadius: "2rem",
  boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  zIndex: 2,
};

const titleStyle: React.CSSProperties = { fontSize: "2.5rem", fontWeight: 700 };
const subtitleStyle: React.CSSProperties = { fontSize: "1rem", color: "#ccc" };
