import AttackClassBadge from './AttackClassBadge';

export default function DefenseLog({ defenseLog }) {
  const levelColors = {
    INFO: 'text-blue-400',
    WARN: 'text-yellow-400',
    SECURE: 'text-green-400',
    BLOCKED: 'text-orange-400',
    CRITICAL: 'text-red-500 animate-pulse',
  };

  return (
    <div className="glass-teen neon-border rounded-2xl p-5">
      <h3 className="font-mono text-cyan-400 text-base font-bold mb-3 flex items-center gap-2">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        Defense Log — LIVE
      </h3>
      <div className="h-40 overflow-y-auto scrollbar-thin space-y-2 font-mono text-sm">
        {defenseLog.length === 0 ? (
          <p className="text-gray-600">[SYSTEM] Firewall initialized. All sectors nominal.</p>
        ) : (
          defenseLog.map((entry) => (
            <div key={entry.id}>
              <div className="flex gap-2">
                <span className="text-gray-600 shrink-0">{entry.timestamp}</span>
                <span className={`shrink-0 font-bold ${levelColors[entry.level] || 'text-gray-400'}`}>
                  [{entry.level}]
                </span>
                <span className="text-gray-400 break-words">{entry.message}</span>
              </div>
              {entry.attackClass && (
                <div className="ml-16 mt-1">
                  <AttackClassBadge attackId={entry.attackClass} />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
