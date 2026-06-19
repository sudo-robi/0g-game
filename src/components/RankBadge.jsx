export default function RankBadge({ rank, score, size = 'md' }) {
  if (!rank) return null;

  const sizeClasses = size === 'lg' ? 'text-lg px-5 py-2.5' : 'text-sm px-3 py-1.5';

  return (
    <div className={`inline-flex items-center gap-2 rounded-full bg-gray-800/60 border border-gray-700/50 ${sizeClasses}`}>
      <span className="text-lg">{rank.icon}</span>
      <span className={`font-bold ${rank.color}`}>{rank.label}</span>
      <span className="text-xs text-gray-500 font-mono">{score} pts</span>
    </div>
  );
}
