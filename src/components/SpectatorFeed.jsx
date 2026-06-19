import AttackClassBadge from './AttackClassBadge';

export default function SpectatorFeed({ log, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono font-bold text-cyan-400 text-lg">👁️ Spectator Feed — LIVE</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl">&times;</button>
        </div>

        {log.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 font-mono text-sm">No activity yet. Start playing to see the feed!</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-thin">
            {log.map((entry) => (
              <div key={entry.id} className="bg-black/40 rounded-lg p-3 flex items-start gap-3">
                <span className={`text-lg ${
                  entry.action === 'cracked' ? 'text-green-400' :
                  entry.action === 'attack' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {entry.action === 'cracked' ? '💥' : entry.action === 'attack' ? '⚔️' : '🛡️'}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs text-white font-semibold">{entry.player}</span>
                    <span className="text-xs text-gray-500 font-mono">{entry.timestamp}</span>
                  </div>
                  <p className="font-mono text-xs text-gray-400 mt-0.5">
                    {entry.action === 'cracked' && 'VAULT CRACKED!'}
                    {entry.action === 'attack' && `Attacking with: "${entry.prompt || 'unknown'}"`}
                    {entry.action === 'blocked' && 'Attack blocked'}
                  </p>
                  {entry.attackClass && (
                    <div className="mt-1">
                      <AttackClassBadge attackId={entry.attackClass} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <button onClick={onClose} className="w-full mt-4 text-sm text-gray-500 hover:text-gray-300 font-mono">
          &gt; CLOSE
        </button>
      </div>
    </div>
  );
}
