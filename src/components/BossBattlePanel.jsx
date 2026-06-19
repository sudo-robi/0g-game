export default function BossBattlePanel({ boss, onAttack, isLoading, onClose }) {
  const healthPercent = Math.max(0, (boss.currentHealth / boss.health) * 100);
  const healthColor = healthPercent > 50 ? 'bg-green-500' : healthPercent > 25 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-4 sm:py-8" onClick={onClose}>
      <div className="bg-gray-900 border border-red-500/30 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl text-center" onClick={e => e.stopPropagation()}>
        <div className="text-6xl mb-4 animate-pulse">{boss.emoji}</div>
        <h2 className="font-display font-bold text-xl text-red-400 mb-2">BOSS BATTLE</h2>
        <p className="font-mono text-lg text-white font-bold mb-1">{boss.name}</p>
        <p className="text-sm text-gray-400 mb-4">{boss.description}</p>
        <p className="font-mono text-xs text-gray-500 mb-2">Defense Score: {boss.defenseScore.toLocaleString()}</p>

        {/* Health Bar */}
        <div className="bg-black/60 rounded-full h-4 mb-2 overflow-hidden border border-gray-700">
          <div
            className={`h-full rounded-full ${healthColor} transition-all duration-500`}
            style={{ width: `${healthPercent}%` }}
          />
        </div>
        <p className="font-mono text-xs text-gray-400 mb-6">
          HP: {boss.currentHealth.toLocaleString()} / {boss.health.toLocaleString()}
        </p>

        <button
          onClick={onAttack}
          disabled={isLoading}
          className="w-full bg-red-500/20 text-red-300 font-bold py-4 rounded-xl border border-red-500/50 hover:bg-red-500/30 transition-all disabled:opacity-40 font-mono mb-3"
        >
          {isLoading ? 'ATTACKING...' : '> ATTACK_BOSS'}
        </button>

        <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-300 font-mono">
          &gt; RETREAT
        </button>
      </div>
    </div>
  );
}
