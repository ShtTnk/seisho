"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi"; // ← 追加

export default function Home() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showCard, setShowCard] = useState(false);
  const router = useRouter();

  useEffect(() => setShowCard(true), []);

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_LOGIN_PASSWORD) {
      router.push("/dashboard");
    } else {
      setError("パスワードが違います");
    }
  };

  return (
    <div style={pageStyle}>
      <div
        style={{
          ...cardStyle,
          opacity: showCard ? 1 : 0,
          transform: showCard ? "translateY(0)" : "translateY(-20px)",
          transition: "all 0.7s",
        }}
      >
        <h1 style={titleStyle}>Login</h1>
        <p style={subtitleStyle}>パスワードを入力してアクセスしてください</p>

        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#ccc",
              fontSize: "1.2rem",
            }}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <button onClick={handleLogin} style={buttonStyle}>
          Enter
        </button>
        {error && <p style={errorStyle}>{error}</p>}
      </div>
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
  margin: "0 auto",
  maxWidth: "90%",
  width: "400px",
  alignItems: "center",
};

const titleStyle: React.CSSProperties = { fontSize: "2rem", fontWeight: 700 };
const subtitleStyle: React.CSSProperties = { fontSize: "1rem", color: "#ccc" };
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.8rem 2.5rem 0.8rem 0.8rem", // 右にアイコン分padding
  borderRadius: "0.8rem",
  border: "none",
  background: "#2c2c2c",
  color: "#f0f0f0",
  outline: "none",
  boxSizing: "border-box", // ← これ大事！枠内で収める
};
const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.8rem",
  borderRadius: "0.8rem",
  background: "#3b82f6",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  border: "none",
  transition: "all 0.3s",
};
const errorStyle: React.CSSProperties = { color: "#f87171", marginTop: "0.5rem" };
