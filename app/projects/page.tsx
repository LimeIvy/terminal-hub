import { ArrowRight } from "lucide-react";
import ProjectCreateButton from "@/components/ProjectCreateButton";
import { hono } from "@/lib/hono";

// 型定義
export type Project = {
  id: string;
  title: string;
  description: string;
  progress: number;
  role: "RECRUITING" | "IN_PROGRESS" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
};

export default async function ProjectsPage() {
  const res = await hono.api.projects.$get();
  const projects = await res.json() as Project[];
  console.log(projects);

  const recruitingProjects = projects.filter(p => p.role === "RECRUITING");
  const inProgressProjects = projects.filter(p => p.role === "IN_PROGRESS");
  const hasRecruiting = recruitingProjects.length > 0;
  const hasInProgress = inProgressProjects.length > 0;
  const showAllButton = inProgressProjects.length >= 10;
  const displayInProgress = showAllButton ? inProgressProjects.slice(0, 9) : inProgressProjects;

  return (
    <main className="md:ml-64 bg-gray-100 min-h-screen">
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold mt-5">プロジェクト</h1>
        {(hasRecruiting || hasInProgress) && <ProjectCreateButton />}
      </div>
      <div className="px-4">
        {/* 提案中のプロジェクト */}
        <h2 className="text-xl font-semibold mt-7 mb-4">現在提案中のプロジェクト</h2>
        {hasRecruiting ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {recruitingProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow p-5 flex flex-col">
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
              {displayInProgress.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow p-5 flex flex-col">
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
}