import { useState } from "react";
import { useNavigate } from "react-router";
import NavMenu from "../components/NavMenu";

const TRANSPORT_OPTIONS = [
  { value: "public", label: "대중교통", icon: "🚇" },
  { value: "car", label: "자가용", icon: "🚗" },
  { value: "bike", label: "자전거", icon: "🚴" },
  { value: "walk", label: "도보", icon: "🚶" },
];

const DIET_OPTIONS = [
  { value: "vegan", label: "비건", icon: "🥗" },
  { value: "vegetarian", label: "채식 위주", icon: "🥕" },
  { value: "balanced", label: "균형 식단", icon: "🍽️" },
  { value: "meat", label: "육식 위주", icon: "🍖" },
];

const HOUSING_OPTIONS = [
  { value: "apartment", label: "아파트", icon: "🏢" },
  { value: "house", label: "단독주택", icon: "🏠" },
  { value: "studio", label: "원룸/오피스텔", icon: "🏘️" },
  { value: "shared", label: "셰어하우스", icon: "👥" },
];

type EditingSection = "transport" | "diet" | "housing" | null;

function OptionCard({
  option,
  selected,
  onSelect,
}: {
  option: { value: string; label: string; icon: string };
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full p-3 rounded-lg border-2 transition-all text-left flex items-center gap-3 cursor-pointer shadow-sm hover:shadow-md active:scale-[0.98] ${
        selected
          ? "border-green-500 bg-green-50 shadow-md"
          : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
      }`}
    >
      <span className="text-2xl">{option.icon}</span>
      <span className="font-medium text-gray-900 flex-1">{option.label}</span>
      {selected && (
        <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
    </button>
  );
}

function SectionHeader({
  title,
  currentLabel,
  currentIcon,
  isEditing,
  onToggle,
}: {
  title: string;
  currentLabel: string;
  currentIcon: string;
  isEditing: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-500 font-medium mb-1">{title}</p>
        <div className="flex items-center gap-2">
          <span className="text-xl">{currentIcon}</span>
          <span className="font-semibold text-gray-900">{currentLabel}</span>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
          isEditing
            ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
            : "bg-green-50 text-green-600 hover:bg-green-100"
        }`}
      >
        {isEditing ? "닫기" : "변경"}
      </button>
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("환경지킴이");
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("환경지킴이");

  const [transportation, setTransportation] = useState("public");
  const [diet, setDiet] = useState("balanced");
  const [housing, setHousing] = useState("apartment");

  const [editingSection, setEditingSection] = useState<EditingSection>(null);

  const toggleSection = (section: EditingSection) => {
    setEditingSection((prev) => (prev === section ? null : section));
  };

  const currentTransport = TRANSPORT_OPTIONS.find((o) => o.value === transportation)!;
  const currentDiet = DIET_OPTIONS.find((o) => o.value === diet)!;
  const currentHousing = HOUSING_OPTIONS.find((o) => o.value === housing)!;

  return (
    <div className="min-h-screen bg-gray-50 pb-16 sm:pb-0">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">내 프로필</h1>
          <NavMenu />
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* 프로필 카드 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-5">
            {/* 아바타 */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-3xl font-bold select-none">
                {username[0]}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 w-7 h-7 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
                title="프로필 사진 변경"
              >
                <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            {/* 닉네임 */}
            <div className="flex-1 min-w-0">
              {editingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="flex-1 px-3 py-2 border-2 border-green-400 rounded-lg text-gray-900 font-semibold focus:outline-none focus:border-green-500 text-lg"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      if (nameInput.trim()) setUsername(nameInput.trim());
                      setEditingName(false);
                    }}
                    className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    저장
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900 truncate">{username}</span>
                  <button
                    onClick={() => {
                      setNameInput(username);
                      setEditingName(true);
                    }}
                    className="flex-shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    title="닉네임 변경"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
              )}
              <p className="text-sm text-gray-500 mt-0.5">nghso7572@gmail.com</p>
            </div>
          </div>
        </div>

        {/* 생활 습관 프로필 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 pt-5 pb-3">
            <h2 className="text-base font-bold text-gray-900">생활 습관 프로필</h2>
            <p className="text-sm text-gray-500 mt-0.5">챌린지 추천에 활용되는 정보입니다.</p>
          </div>

          <div className="divide-y divide-gray-100">
            {/* 교통수단 */}
            <div className="px-6 py-4">
              <SectionHeader
                title="교통수단"
                currentLabel={currentTransport.label}
                currentIcon={currentTransport.icon}
                isEditing={editingSection === "transport"}
                onToggle={() => toggleSection("transport")}
              />
              {editingSection === "transport" && (
                <div className="mt-3 space-y-2">
                  {TRANSPORT_OPTIONS.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      option={opt}
                      selected={transportation === opt.value}
                      onSelect={() => {
                        setTransportation(opt.value);
                        setEditingSection(null);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* 식단 */}
            <div className="px-6 py-4">
              <SectionHeader
                title="식단"
                currentLabel={currentDiet.label}
                currentIcon={currentDiet.icon}
                isEditing={editingSection === "diet"}
                onToggle={() => toggleSection("diet")}
              />
              {editingSection === "diet" && (
                <div className="mt-3 space-y-2">
                  {DIET_OPTIONS.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      option={opt}
                      selected={diet === opt.value}
                      onSelect={() => {
                        setDiet(opt.value);
                        setEditingSection(null);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* 주거 */}
            <div className="px-6 py-4">
              <SectionHeader
                title="주거 형태"
                currentLabel={currentHousing.label}
                currentIcon={currentHousing.icon}
                isEditing={editingSection === "housing"}
                onToggle={() => toggleSection("housing")}
              />
              {editingSection === "housing" && (
                <div className="mt-3 space-y-2">
                  {HOUSING_OPTIONS.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      option={opt}
                      selected={housing === opt.value}
                      onSelect={() => {
                        setHousing(opt.value);
                        setEditingSection(null);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 로그아웃 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-red-500 font-semibold hover:bg-red-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
