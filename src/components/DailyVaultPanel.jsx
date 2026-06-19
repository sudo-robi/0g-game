export default function DailyVaultPanel({ vault, defeated, onAttack, isLoading, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-900 border border-yellow-500/30 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl text-center" onClick={e => e.stopPropagation()}>
        <div className="text-5xl mb-4">{vault.icon}</div>
        <h2 className="font-display font-bold text-xl text-yellow-300 mb-2">Daily Challenge Vault</h2>
        <p className="font-mono text-sm text-gray-400 mb-1">{vault.name}</p>
        <p className="text-sm text-gray-500 mb-2">Defense Score: {vault.defenseScore}</p>
        <p className="text-sm text-gray-500 mb-6">Reward: <span className="text-yellow-400 font-bold">{vault.reward} coins</span></p>

        {defeated ? (
          <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4 mb-4">
            <p className="text-green-400 font-bold font-mono">✓ VAULT CRACKED TODAY</p>
            <p className="text-gray-400 text-xs font-mono mt-1">Come back tomorrow for a new challenge!</p>
          </div>
        ) : (
          <button
            onClick={onAttack}
            disabled={isLoading}
            className="w-full bg-yellow-500/20 text-yellow-300 font-bold py-4 rounded-xl border border-yellow-500/50 hover:bg-yellow-500/30 transition-all disabled:opacity-40 font-mono mb-4"
          >
            {isLoading ? 'ATTACKING...' : '> ATTACK_DAILY_VAULT'}
          </button>
        )}

        <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-300 font-mono">
          &gt; CLOSE
        </button>
      </div>
    </div>
  );
}
