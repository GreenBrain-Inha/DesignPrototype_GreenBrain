import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import NavMenu from "../components/NavMenu";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  carbonCost?: number;
}

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "안녕하세요! GreenBrain입니다. 무엇을 도와드릴까요?",
    },
  ]);
  const [input, setInput] = useState("");
  const [tokens, setTokens] = useState(150);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const maxTokens = 150;
  const tokenPercentage = (tokens / maxTokens) * 100;

  const getCarbonAnalogy = (carbonCost: number) => {
    if (carbonCost <= 3) {
      return { icon: "🚗", text: "자동차 약 10초 주행" };
    } else if (carbonCost <= 5) {
      return { icon: "💡", text: "LED 전구 약 30분 사용" };
    } else if (carbonCost <= 7) {
      return { icon: "📱", text: "스마트폰 충전 약 15%" };
    } else {
      return { icon: "🥤", text: "플라스틱 빨대 약 20개 생산" };
    }
  };

  const getTokenColor = () => {
    if (tokenPercentage > 50) return "bg-green-500";
    if (tokenPercentage > 20) return "bg-amber-500";
    return "bg-red-500";
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || tokens <= 0 || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const carbonCost = Math.floor(Math.random() * 8) + 3;
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "이것은 GPT-4o mini의 시뮬레이션 응답입니다. 실제 백엔드 연결 시 실제 AI 응답이 표시됩니다.",
        carbonCost,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setTokens((prev) => {
        const newTokens = Math.max(0, prev - carbonCost);
        if (newTokens === 0) {
          setTimeout(() => navigate("/challenges"), 1000);
        }
        return newTokens;
      });
      setIsLoading(false);
    }, 1000);
  };

  if (tokens <= 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">탄소 토큰 소진</h2>
          <p className="text-gray-600 mb-6">
            오늘의 탄소 토큰을 모두 사용했습니다.<br />
            챌린지를 완료하고 토큰을 회복하세요!
          </p>
          <button
            onClick={() => navigate("/challenges")}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            챌린지 시작하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16 sm:pb-0">
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-gray-900">GreenBrain</h1>
            <NavMenu />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">탄소 토큰</span>
              <span className={`text-sm font-bold ${tokens <= 30 ? "text-red-500" : "text-gray-900"}`}>
                {tokens} / {maxTokens} gCO₂eq
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${getTokenColor()}`}
                style={{ width: `${tokenPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              <div
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl p-4 ${
                    message.role === "user"
                      ? "bg-green-500 text-white"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>

              {message.carbonCost && (
                <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mt-2`}>
                  <div className="max-w-[70%] bg-gray-100 rounded-lg px-3 py-2 flex items-center gap-2">
                    <span className="text-lg">{getCarbonAnalogy(message.carbonCost).icon}</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">
                        {getCarbonAnalogy(message.carbonCost).text}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {message.carbonCost} gCO₂eq 배출
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            disabled={tokens <= 0 || isLoading}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={!input.trim() || tokens <= 0 || isLoading}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            전송
          </button>
        </form>
      </div>
    </div>
  );
}
