import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";

const MAX_TOKENS = 10000;

function TokenRing({ value }: { value: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value / MAX_TOKENS));
  const dash = circ * pct;
  const color = value > 6600 ? "#22c55e" : value > 3300 ? "#f59e0b" : "#ef4444";
  return (
    <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
      <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
      <circle
        cx="70" cy="70" r={r} fill="none"
        stroke={color} strokeWidth="8"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 0.2s ease, stroke 0.4s ease" }}
      />
      <g style={{ transform: "rotate(90deg)", transformOrigin: "70px 70px" }}>
        <text x="70" y="60" textAnchor="middle" fill={color}
          style={{ fontSize: "20px", fontWeight: 800, fontFamily: "'Outfit', sans-serif", transition: "fill 0.4s" }}>
          {value.toLocaleString()}
        </text>
        <text x="70" y="78" textAnchor="middle" fill="rgba(255,255,255,0.3)"
          style={{ fontSize: "10px", fontFamily: "'Inter', sans-serif" }}>
          / {MAX_TOKENS.toLocaleString()}
        </text>
      </g>
    </svg>
  );
}

const CHALLENGE_CARDS = [
  { emoji: "🚲", title: "자전거 출퇴근 도전", desc: "이번 주 3회 이상 자전거로 출퇴근하기", tag: "교통" },
  { emoji: "♻️", title: "분리수거 마스터", desc: "7일간 완벽한 분리수거 실천하기", tag: "생활" },
  { emoji: "🥗", title: "채식 데이", desc: "3일 연속 채식 식단 도전", tag: "식단" },
];

const FEED_ITEMS = [
  { user: "지수", avatar: "🌿", challenge: "자전거 출퇴근", likes: 24, time: "2시간 전", comment: "오늘도 자전거로 출근 성공! 날씨가 너무 좋았어요 ☀️" },
  { user: "민준", avatar: "🌱", challenge: "채식 데이", likes: 18, time: "5시간 전", comment: "3일 채식 완료! 생각보다 맛있는 레시피가 많더라고요 😊" },
  { user: "하은", avatar: "🍃", challenge: "분리수거 마스터", likes: 9, time: "어제", comment: "7일 분리수거 챌린지 클리어! 습관이 됐어요 👍" },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <p style={{ fontSize: "0.7rem", color: "#4ade80", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.65rem" }}>
      {children}
    </p>
  );
}

export default function Landing() {
  const [tokenVal, setTokenVal] = useState(10000);
  const dirRef = useRef<"down" | "up">("down");

  useEffect(() => {
    const id = setInterval(() => {
      setTokenVal((prev) => {
        if (dirRef.current === "down") {
          if (prev <= 1200) { dirRef.current = "up"; return prev + 900; }
          return prev - 600;
        } else {
          if (prev >= 9800) { dirRef.current = "down"; return prev - 600; }
          return prev + 900;
        }
      });
    }, 160);
    return () => clearInterval(id);
  }, []);

  const tokenColor = tokenVal > 6600 ? "#22c55e" : tokenVal > 3300 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#07100a", color: "#f0f4f1", overflowX: "hidden" }}>

      <div aria-hidden style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 50% at 15% 25%, rgba(34,197,94,0.06) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 85% 70%, rgba(16,185,129,0.04) 0%, transparent 55%)",
      }} />

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", background: "rgba(7,16,10,0.85)" }}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between" style={{ height: "58px" }}>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: "1.1rem" }}>🌿</span>
            <span style={{ fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.02em" }}>Anoixi</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem" }} className="hover:text-white transition-colors">로그인</Link>
            <Link to="/signup" style={{ background: "#22c55e", color: "#07100a", padding: "0.38rem 0.95rem", borderRadius: "6px", fontSize: "0.82rem", fontWeight: 700 }} className="hover:opacity-90 transition-opacity">시작하기</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ position: "relative", zIndex: 1 }} className="max-w-5xl mx-auto px-6 pt-20 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.45rem",
              background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: "999px", padding: "0.25rem 0.8rem",
              fontSize: "0.72rem", color: "#4ade80", fontWeight: 600, marginBottom: "1.5rem",
            }}>
              <span style={{ width: "5px", height: "5px", background: "#4ade80", borderRadius: "50%", display: "inline-block" }} />
              탄소 토큰 기반 LLM 채팅 서비스
            </div>

            <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "1.3rem" }}>
              AI를 쓸수록<br />
              <span style={{ color: "#4ade80" }}>탄소 책임</span>을<br />
              배웁니다
            </h1>

            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.75, maxWidth: "440px", marginBottom: "2rem", fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
              Anoixi는 AI 대화에 탄소 비용을 부여합니다. 채팅마다 토큰이 차감되고,
              맞춤형 에코 챌린지를 통해 커뮤니티 인증으로 토큰을 회복하세요.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <Link to="/signup" style={{ background: "#22c55e", color: "#07100a", padding: "0.75rem 1.8rem", borderRadius: "8px", fontWeight: 700, fontSize: "0.9rem" }} className="hover:opacity-90 transition-opacity">
                무료로 시작하기 →
              </Link>
              <Link to="/login" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", textDecoration: "underline", textUnderlineOffset: "3px" }} className="hover:text-white transition-colors">
                이미 계정이 있어요
              </Link>
            </div>

            <div className="flex gap-8 mt-10 flex-wrap">
              {[["10,000", "시작 토큰"], ["+2,000", "좋아요 3개당"], ["커뮤니티", "인증 기반 회복"]].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontWeight: 800, fontSize: "1.35rem", color: "#4ade80", letterSpacing: "-0.025em" }}>{val}</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: "1px", fontFamily: "'Inter', sans-serif" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Token widget */}
          <div style={{
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "18px", padding: "1.8rem",
            display: "flex", alignItems: "center", gap: "1.8rem",
          }}>
            <TokenRing value={tokenVal} />
            <div>
              <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.6rem" }}>탄소 토큰</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "0.9rem" }}>
                {[
                  { label: "여유", color: "#22c55e", range: "6,667–10,000" },
                  { label: "주의", color: "#f59e0b", range: "3,334–6,666" },
                  { label: "위험", color: "#ef4444", range: "0–3,333" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: s.color, display: "inline-block", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.75rem", color: s.color, fontWeight: 600 }}>{s.label}</span>
                    <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.28)", fontFamily: "'Inter', sans-serif" }}>{s.range}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
                채팅 1회 토큰 차감<br />
                좋아요 3개 → +2,000 토큰
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 01 — LLM 채팅 ── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 1 }} className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {[
                { icon: "💬", title: "AI에게 질문", desc: "환경, 식단, 교통 등 지속가능한 삶에 관해 묻는다", badge: "토큰 차감", badgeColor: "#ef4444" },
                { icon: "🌍", title: "탄소 비용 인식", desc: "답변 아래에 실생활 탄소 비유 카드가 표시된다", badge: "자동차 🚗 주행 30초", badgeColor: "#f59e0b" },
                { icon: "📉", title: "토큰 잔량 확인", desc: "토큰이 줄수록 녹색→황색→적색으로 변한다", badge: "시각 피드백", badgeColor: "#22c55e" },
              ].map((step) => (
                <div key={step.title} style={{
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "12px", padding: "1rem 1.15rem",
                  display: "flex", alignItems: "flex-start", gap: "0.9rem",
                }}>
                  <span style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: "1px" }}>{step.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.83rem", fontWeight: 600, marginBottom: "2px" }}>{step.title}</div>
                    <div style={{ fontSize: "0.73rem", color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>{step.desc}</div>
                  </div>
                  <div style={{ fontSize: "0.7rem", color: step.badgeColor, fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0, fontFamily: "'Inter', sans-serif" }}>{step.badge}</div>
                </div>
              ))}
            </div>
            <div>
              <SectionLabel>01 — LLM 채팅</SectionLabel>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1.1rem" }}>
                AI 사용에도<br /><span style={{ color: "#4ade80" }}>탄소 비용</span>이 있습니다
              </h2>
              <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "0.92rem", lineHeight: 1.8, fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                대화 한 번에 소모되는 탄소를 토큰으로 시각화합니다.
                처음 받는 <strong style={{ color: "#4ade80" }}>10,000개의 탄소 토큰</strong>으로
                AI와 자유롭게 대화하며, 내 디지털 탄소 발자국을 체감하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 02 — 챌린지 ── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 1, background: "rgba(34,197,94,0.012)" }} className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionLabel>02 — 맞춤형 챌린지</SectionLabel>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1.1rem" }}>
                실천이 인정받으면<br /><span style={{ color: "#4ade80" }}>토큰이 회복</span>됩니다
              </h2>
              <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "0.92rem", lineHeight: 1.8, marginBottom: "1.3rem", fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                생활 패턴을 기반으로 AI가 나에게 맞는 챌린지를 자동으로 생성합니다.
                챌린지를 완료하고 사진으로 인증한 뒤, <strong style={{ color: "#f0f4f1" }}>커뮤니티로부터 좋아요를 받으면</strong> 토큰이 회복됩니다.
              </p>
              <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "0.92rem", lineHeight: 1.8, fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                단순 업로드가 아닌, 다른 사용자의 인정을 통해 회복되는 구조입니다.
                <strong style={{ color: "#4ade80" }}> 좋아요 3개마다 +2,000 토큰</strong>이 적립됩니다.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.28)", marginBottom: "0.15rem", fontFamily: "'Inter', sans-serif" }}>
                🎯 회원님을 위한 맞춤 챌린지
              </div>
              {CHALLENGE_CARDS.map((c) => (
                <div key={c.title} style={{
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "12px", padding: "0.95rem 1.15rem",
                  display: "flex", alignItems: "center", gap: "0.9rem",
                }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "9px",
                    background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.13)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.25rem", flexShrink: 0,
                  }}>
                    {c.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "2px" }}>
                      <span style={{ fontSize: "0.82rem", fontWeight: 600 }}>{c.title}</span>
                      <span style={{ fontSize: "0.62rem", color: "#4ade80", fontWeight: 600, background: "rgba(34,197,94,0.09)", border: "1px solid rgba(34,197,94,0.18)", borderRadius: "4px", padding: "1px 5px" }}>{c.tag}</span>
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.38)", fontFamily: "'Inter', sans-serif" }}>{c.desc}</div>
                  </div>
                </div>
              ))}
              <div style={{
                background: "rgba(34,197,94,0.04)", border: "1px dashed rgba(34,197,94,0.18)",
                borderRadius: "12px", padding: "0.85rem 1.15rem",
                display: "flex", alignItems: "center", gap: "0.75rem",
              }}>
                <span style={{ fontSize: "1.1rem" }}>👍</span>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.38)", fontFamily: "'Inter', sans-serif", lineHeight: 1.55 }}>
                  인증 사진에 <strong style={{ color: "#4ade80" }}>좋아요 3개</strong>가 쌓이면<br />
                  <strong style={{ color: "#4ade80" }}>+2,000 탄소 토큰</strong> 회복
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 03 — 피드 ── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 1 }} className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.28)", marginBottom: "0.15rem", fontFamily: "'Inter', sans-serif" }}>
                🌍 커뮤니티 챌린지 피드
              </div>
              {FEED_ITEMS.map((item) => (
                <div key={item.user} style={{
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "12px", padding: "1rem 1.15rem",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.55rem" }}>
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      background: "rgba(34,197,94,0.09)", border: "1px solid rgba(34,197,94,0.18)",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem",
                    }}>
                      {item.avatar}
                    </div>
                    <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{item.user}</span>
                    <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.28)", fontFamily: "'Inter', sans-serif" }}>{item.time}</span>
                    <div style={{ marginLeft: "auto", fontSize: "0.62rem", color: "#4ade80", background: "rgba(34,197,94,0.08)", borderRadius: "4px", padding: "1px 7px", fontWeight: 600 }}>
                      {item.challenge}
                    </div>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.55, marginBottom: "0.65rem", fontFamily: "'Inter', sans-serif" }}>
                    {item.comment}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
                      borderRadius: "5px", padding: "0.2rem 0.6rem",
                      fontSize: "0.72rem", color: "rgba(255,255,255,0.45)",
                      display: "flex", alignItems: "center", gap: "0.25rem",
                    }}>
                      👍 {item.likes}
                    </div>
                    {item.likes >= 3 && (
                      <span style={{ fontSize: "0.65rem", color: "#4ade80", fontFamily: "'Inter', sans-serif" }}>
                        +{Math.floor(item.likes / 3) * 2000} 토큰 적립
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <SectionLabel>03 — 챌린지 피드</SectionLabel>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1.1rem" }}>
                함께 나누면<br /><span style={{ color: "#4ade80" }}>더 큰 변화</span>가 됩니다
              </h2>
              <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "0.92rem", lineHeight: 1.8, marginBottom: "1.3rem", fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                완료한 챌린지를 피드에 공유하고, 다른 사용자의 실천을 확인하며 서로 응원하세요.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {[
                  ["🌐", "커뮤니티 공유", "챌린지 인증 사진을 피드에 올리세요"],
                  ["👀", "다른 실천 보기", "다양한 사용자의 에코 챌린지를 확인"],
                  ["💚", "좋아요 → 토큰", "좋아요 3개당 +2,000 탄소 토큰 회복"],
                ].map(([icon, title, desc]) => (
                  <div key={title} className="flex items-start gap-3">
                    <span style={{ fontSize: "1rem", marginTop: "1px" }}>{icon}</span>
                    <div>
                      <span style={{ fontSize: "0.82rem", fontWeight: 600 }}>{title}</span>
                      <span style={{ fontSize: "0.77rem", color: "rgba(255,255,255,0.38)", marginLeft: "0.45rem", fontFamily: "'Inter', sans-serif" }}>{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 1, background: "rgba(34,197,94,0.015)" }} className="py-28">
        <div className="max-w-lg mx-auto px-6 text-center">
          <div style={{ fontSize: "2.4rem", marginBottom: "0.9rem" }}>🌱</div>
          <h2 style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: "1rem" }}>
            AI를 쓰기 전에<br /><span style={{ color: "#4ade80" }}>지구를 먼저</span> 생각하세요
          </h2>
          <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: "2rem", fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
            10,000개의 탄소 토큰을 무료로 드립니다. 채팅, 챌린지, 피드까지 — 지금 바로 시작하세요.
          </p>
          <Link to="/signup" style={{
            display: "inline-block", background: "#22c55e", color: "#07100a",
            padding: "0.8rem 2.2rem", borderRadius: "9px",
            fontWeight: 800, fontSize: "0.95rem", letterSpacing: "-0.01em",
          }} className="hover:opacity-90 transition-opacity">
            무료로 시작하기 →
          </Link>
          <div style={{ marginTop: "1rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.2)", fontFamily: "'Inter', sans-serif" }}>
            신용카드 불필요 · 무료 시작
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)", padding: "1.4rem 2rem",
        textAlign: "center", color: "rgba(255,255,255,0.18)", fontSize: "0.75rem",
        position: "relative", zIndex: 1, fontFamily: "'Inter', sans-serif",
      }}>
        © 2026 Anoixi — 탄소 토큰 기반 AI 챗봇 서비스
      </footer>
    </div>
  );
}
