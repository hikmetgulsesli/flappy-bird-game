import { GameCanvas } from "@/components/flappy-bird";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-300 to-sky-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-slate-800">Flappy Bird</h1>
      <div className="border-4 border-slate-800 rounded-lg overflow-hidden shadow-2xl">
        <GameCanvas />
      </div>
      <p className="mt-4 text-slate-600">Canvas Game Engine Demo - US-003</p>
    </div>
  );
}
