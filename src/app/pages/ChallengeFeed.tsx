import { useState } from "react";
import { Link } from "react-router";
import { Trash2 } from "lucide-react";
import NavMenu from "../components/NavMenu";

interface FeedItem {
  id: string;
  userId: string;
  username: string;
  challengeTitle: string;
  challengeIcon: string;
  imageUrl: string;
  likes: number;
  likedByMe: boolean;
  timestamp: string;
  isOwner: boolean;
}

const mockFeedData: FeedItem[] = [
  {
    id: "1",
    userId: "user1",
    username: "환경지킴이",
    challengeTitle: "대중교통 이용하기",
    challengeIcon: "🚇",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
    likes: 12,
    likedByMe: false,
    timestamp: "2시간 전",
    isOwner: true,
  },
  {
    id: "2",
    userId: "user2",
    username: "그린라이프",
    challengeTitle: "채식 식사하기",
    challengeIcon: "🥗",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    likes: 8,
    likedByMe: false,
    timestamp: "4시간 전",
    isOwner: false,
  },
  {
    id: "3",
    userId: "user3",
    username: "에코워리어",
    challengeTitle: "텀블러 사용하기",
    challengeIcon: "☕",
    imageUrl: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=800",
    likes: 15,
    likedByMe: true,
    timestamp: "6시간 전",
    isOwner: false,
  },
  {
    id: "4",
    userId: "user4",
    username: "지구사랑",
    challengeTitle: "자전거 출퇴근",
    challengeIcon: "🚴",
    imageUrl: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800",
    likes: 20,
    likedByMe: false,
    timestamp: "8시간 전",
    isOwner: false,
  },
];

export default function ChallengeFeed() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>(mockFeedData);

  const handleLike = (itemId: string) => {
    setFeedItems((items) =>
      items.map((item) => {
        if (item.id === itemId && !item.likedByMe) {
          return {
            ...item,
            likes: item.likes + 1,
            likedByMe: true,
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">챌린지 피드</h1>
            <NavMenu />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 pb-20 sm:pb-4">
        <div className="mb-6 bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <h2 className="text-xl font-bold mb-2">💚 커뮤니티와 함께하는 탄소 절감</h2>
          <p className="text-green-50">
            다른 사람들의 챌린지 인증 사진에 좋아요를 눌러주세요.<br />
            좋아요 3개당 업로더는 +20 토큰을 획득합니다!
          </p>
        </div>

        <div className="space-y-6">
          {feedItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    {item.username[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item.username}</p>
                    <p className="text-sm text-gray-500">{item.timestamp}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">{item.challengeIcon}</div>
                    {item.isOwner && (
                      <button
                        type="button"
                        title="게시물 삭제"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="font-medium text-gray-900 mb-2">
                  {item.challengeTitle}
                </h3>
              </div>

              <img
                src={item.imageUrl}
                alt={item.challengeTitle}
                className="w-full aspect-square object-cover"
              />

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(item.id)}
                      disabled={item.likedByMe}
                      className={`flex items-center gap-2 transition-colors ${
                        item.likedByMe
                          ? "text-green-500"
                          : "text-gray-600 hover:text-green-500"
                      }`}
                    >
                      <svg
                        className="w-6 h-6"
                        fill={item.likedByMe ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      <span className="font-semibold">{item.likes}</span>
                    </button>
                  </div>

                  {item.likedByMe && (
                    <span className="text-sm text-green-600 font-medium">
                      좋아요를 눌렀습니다
                    </span>
                  )}
                </div>

                {item.likes > 0 && item.likes % 3 === 0 && (
                  <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-700">
                      🎉 좋아요 {item.likes}개 달성! {item.username}님이 +{Math.floor(item.likes / 3) * 20} 토큰을 획득했습니다.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {feedItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">아직 인증된 챌린지가 없습니다.</p>
            <Link
              to="/challenges"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              첫 챌린지 시작하기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
