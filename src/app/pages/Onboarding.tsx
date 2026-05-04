import { useState } from "react";
import { useNavigate } from "react-router";

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [transportation, setTransportation] = useState("");
  const [diet, setDiet] = useState("");
  const [housing, setHousing] = useState("");

  const handleNext = () => {
    if (step === 1 && !transportation) return;
    if (step === 2 && !diet) return;

    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3 && housing) {
      navigate("/chat");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">생활 습관 프로필</h1>
            <span className="text-sm text-gray-500">{step} / 3</span>
          </div>

          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  i <= step ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                주로 사용하는 교통수단은 무엇인가요?
              </h2>
              <p className="text-gray-600 mb-6">
                일상적으로 가장 자주 이용하는 교통수단을 선택해주세요.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { value: "public", label: "대중교통", icon: "🚇" },
                { value: "car", label: "자가용", icon: "🚗" },
                { value: "bike", label: "자전거", icon: "🚴" },
                { value: "walk", label: "도보", icon: "🚶" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTransportation(option.value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-4 cursor-pointer shadow-sm hover:shadow-md active:scale-[0.98] ${
                    transportation === option.value
                      ? "border-green-500 bg-green-50 shadow-md"
                      : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-3xl">{option.icon}</span>
                  <span className="font-medium text-gray-900 flex-1">{option.label}</span>
                  {transportation === option.value && (
                    <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                식단 유형은 어떻게 되나요?
              </h2>
              <p className="text-gray-600 mb-6">
                평소 주로 섭취하는 식단을 선택해주세요.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { value: "vegan", label: "비건", icon: "🥗" },
                { value: "vegetarian", label: "채식 위주", icon: "🥕" },
                { value: "balanced", label: "균형 식단", icon: "🍽️" },
                { value: "meat", label: "육식 위주", icon: "🍖" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setDiet(option.value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-4 cursor-pointer shadow-sm hover:shadow-md active:scale-[0.98] ${
                    diet === option.value
                      ? "border-green-500 bg-green-50 shadow-md"
                      : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-3xl">{option.icon}</span>
                  <span className="font-medium text-gray-900 flex-1">{option.label}</span>
                  {diet === option.value && (
                    <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                주거 형태는 어떻게 되나요?
              </h2>
              <p className="text-gray-600 mb-6">
                현재 거주하고 계신 주거 형태를 선택해주세요.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { value: "apartment", label: "아파트", icon: "🏢" },
                { value: "house", label: "단독주택", icon: "🏠" },
                { value: "studio", label: "원룸/오피스텔", icon: "🏘️" },
                { value: "shared", label: "셰어하우스", icon: "👥" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setHousing(option.value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-4 cursor-pointer shadow-sm hover:shadow-md active:scale-[0.98] ${
                    housing === option.value
                      ? "border-green-500 bg-green-50 shadow-md"
                      : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-3xl">{option.icon}</span>
                  <span className="font-medium text-gray-900 flex-1">{option.label}</span>
                  {housing === option.value && (
                    <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-6 py-3 rounded-lg border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium transition-colors"
            >
              이전
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={
              (step === 1 && !transportation) ||
              (step === 2 && !diet) ||
              (step === 3 && !housing)
            }
            className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {step === 3 ? "시작하기" : "다음"}
          </button>
        </div>
      </div>
    </div>
  );
}
