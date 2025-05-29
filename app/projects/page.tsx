import { ArrowRight } from "lucide-react";
import ProjectCreateButton from "@/components/ProjectCreateButton";

// プロジェクトの型
const projects = [
  {
    title: "サークルウェブサイト リニューアル",
    description:
      "現行のサークルウェブサイトをモダンな技術スタックで刷新し、情報発信力の強化と新メンバー獲得を目指します。デザインから実装まで一貫して行います。",
    progress: 15,
    role: "IN_PROGRESS",
  },
  {
    title: "勉強会管理システム開発",
    description:
      "サークル内の勉強会スケジュール管理、資料共有、参加者募集などを効率化するWebシステムを開発します。",
    progress: 30,
    role: "IN_PROGRESS",
  },
  {
    title: "新規AIプロジェクト提案",
    description:
      "AIを活用した新しいプロジェクトの提案。",
    progress: 0,
    role: "RECRUITING",
  },
  {
    title: "Discord Bot拡張機能開発",
    description:
      "既存のDiscord Botに新機能を追加するプロジェクト。",
    progress: 0,
    role: "RECRUITING",
  },
];

const ProjectsPage = () => {
  // セクションごとにフィルタ
  const recruitingProjects = projects.filter(p => p.role === "RECRUITING");
  const inProgressProjects = projects.filter(p => p.role === "IN_PROGRESS");
  // const completedProjects = projects.filter(p => p.role === "COMPLETED"); // 今回は表示しない

  const hasRecruiting = recruitingProjects.length > 0;
  const hasInProgress = inProgressProjects.length > 0;
  const showAllButton = inProgressProjects.length >= 10;
  const displayInProgress = showAllButton ? inProgressProjects.slice(0, 9) : inProgressProjects;

  return (
    <main className="md:ml-64 bg-gray-100 min-h-screen">
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold mt-5">プロジェクト</h1>
        {(hasRecruiting || hasInProgress) && (
          <ProjectCreateButton />
        )}
      </div>
      <div className="px-4">
        {/* 提案中のプロジェクト */}
        <h2 className="text-xl font-semibold mt-7 mb-4">現在提案中のプロジェクト</h2>
        {hasRecruiting ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {recruitingProjects.map((project, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-5 flex flex-col">
                <h3 className="text-lg font-bold mb-2 text-green-700">{project.title}</h3>
                <p className="text-gray-700 text-sm mb-4 line-clamp-4">{project.description}</p>

                <div className="mb-2">
                  <span className="text-xs text-gray-600 ml-1">メンバー募集中</span>
                </div>
                <button className="mt-auto bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition">
                  プロジェクト詳細へ
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-10 text-gray-500">現在提案中のプロジェクトはありません。</div>
        )}

        {/* 進行中のプロジェクト */}
        <h2 className="text-xl font-semibold mt-7 mb-4">現在進行中のプロジェクト</h2>
        {hasInProgress ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayInProgress.map((project, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow p-5 flex flex-col">
                  <h3 className="text-lg font-bold mb-2 text-blue-600">{project.title}</h3>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-4">{project.description}</p>

                  <div className="mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 ml-1">進捗 {project.progress}%</span>
                  </div>
                  <button className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition">
                    プロジェクト詳細へ
                  </button>
                </div>
              ))}
            </div>
            {showAllButton && (
              <div className="flex justify-center mt-8">
                <button
                  className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
                >
                  すべての進行中プロジェクトを見る
                  <ArrowRight size={24} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-gray-500">現在進行中のプロジェクトはありません。</div>
        )}
      </div>
    </main>
  );
};

export default ProjectsPage;