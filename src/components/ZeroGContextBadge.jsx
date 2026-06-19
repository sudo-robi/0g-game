const BADGES = {
  compute: { icon: '🖥️', label: '0G Compute', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  storage: { icon: '💾', label: '0G Storage', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  da: { icon: '📦', label: '0G DA', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  tee: { icon: '🔒', label: 'TEE ✓', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
};

export default function ZeroGContextBadge({ type, size = 'sm' }) {
  const badge = BADGES[type];
  if (!badge) return null;

  const sizeClasses = size === 'lg' ? 'text-xs px-3 py-1.5' : 'text-[10px] px-2 py-0.5';

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-mono font-semibold ${sizeClasses} ${badge.bg} ${badge.border} border ${badge.color}`}>
      <span>{badge.icon}</span>
      <span>{badge.label}</span>
    </span>
  );
}
