import { useState } from "react";
import { useNavigate, Link } from "react-router";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  status: "pending" | "in_progress" | "completed";
}

const sampleChallenges: Challenge[] = [
  {
    id: "1",
    title: "대중교통 이용하기",
    description: "오늘 이동 시 자가용 대신 대중교통을 이용하고 인증샷을 남겨주세요.",
    category: "교통",
    icon: "🚇",
    status: "pending",
  },
  {
    id: "2",
    title: "채식 식사하기",
    description: "오늘 점심이나 저녁에 채식 메뉴를 선택하고 사진을 찍어주세요.",
    category: "식단",
    icon: "🥗",
    status: "pending",
  },
  {
    id: "3",
    title: "에어컨 대신 창문 열기",
    description: "2시간 이상 에어컨을 끄고 자연 환기를 해보세요.",
    category: "에너지",
    icon: "💨",
    status: "pending",
  },
];

export default function Challenges() {
  const navigate = useNavigate();
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(
    sampleChallenges[Math.floor(Math.random() * sampleChallenges.length)]
  );
  const [isAccepted, setIsAccepted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const handleAccept = () => {
    setIsAccepted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("파일 크기는 10MB 이하여야 합니다.");
        return;
      }

      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        alert("JPEG, PNG, WebP 형식만 지원됩니다.");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);
      alert("인증 사진이 업로드되었습니다! +20 탄소 토큰을 획득했습니다.");
      navigate("/chat");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="mb-6">
          <Link
            to="/chat"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            채팅으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!isAccepted ? (
            <div className="text-center">
              <div className="text-6xl mb-4">{currentChallenge.icon}</div>
              <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {currentChallenge.category}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {currentChallenge.title}
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                {currentChallenge.description}
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
                <p className="text-amber-800 font-medium">
                  💡 사진 업로드 시 즉시 +20 탄소 토큰 획득
                </p>
                <p className="text-amber-700 text-sm mt-1">
                  좋아요 3개당 추가 +20 토큰 (하루 최대 50 토큰)
                </p>
              </div>

              <button
                onClick={handleAccept}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-lg transition-colors text-lg"
              >
                챌린지 수락하기
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{currentChallenge.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentChallenge.title}
                  </h2>
                  <p className="text-gray-600">{currentChallenge.description}</p>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
                {previewUrl ? (
                  <div className="text-center">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-w-full max-h-96 mx-auto rounded-lg mb-4"
                    />
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl("");
                      }}
                      className="text-red-500 hover:text-red-600 font-medium"
                    >
                      다시 선택
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg
                      className="w-16 h-16 text-gray-400 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-gray-600 mb-2">
                      챌린지 인증 사진을 업로드하세요
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      JPEG, PNG, WebP (최대 10MB)
                    </p>
                    <label className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer transition-colors">
                      사진 선택
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>

              {selectedFile && (
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors"
                >
                  {isUploading ? "업로드 중..." : "인증 사진 업로드"}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/challenges/feed"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            다른 사람들의 챌린지 보기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
