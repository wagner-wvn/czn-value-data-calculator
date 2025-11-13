export default function ProgressBar({ value, max }: { value: number; max: number }) {
  const percent = Math.min((value / max) * 100, 100);

  const color =
    value > max ? "bg-red-600" : percent > 80 ? "bg-yellow-500" : "bg-cyan-500";

  return (
    <div className="w-full bg-zinc-800/50 h-2 rounded-full overflow-hidden">
      <div className={`${color} h-full`} style={{ width: `${percent}%` }} />
    </div>
  );
}
