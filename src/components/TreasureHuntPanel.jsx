import { TREASURE_VAULTS } from '../config';

export default function TreasureHuntPanel({ profile, onAttack, isLoading, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8" onClick={onClose}>
      <div className="bg-gray-900 border border-amber-500/30 rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="font-display font-bold text-xl text-amber-300 mb-2">💎 Treasure Hunts</h2>
        <p className="text-gray-400 text-sm mb-6 font-mono">Each vault contains a rare collectible. Crack it to claim the reward.</p>

        <div className="space-y-3">
          {TREASURE_VAULTS.map(vault => {
            const found = (profile.unlockedTreasures || []).some(t => t.includes(vault.id));
            return (
              <div
                key={vault.id}
                className={`rounded-xl p-4 border transition-all ${
                  found
                    ? 'bg-green-900/20 border-green-500/30'
                    : 'bg-gray-800/40 border-gray-700/50 hover:border-amber-500/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{vault.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm ${found ? 'text-green-400' : 'text-white'}`}>
                      {vault.name}
                      {found && ' ✓ Claimed'}
                    </h3>
                    <p className="text-xs text-gray-400">{vault.description}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-mono text-amber-400">Reward: {vault.reward}</span>
                      <span className="text-xs font-mono text-gray-500">Drop: {vault.dropRate}</span>
                      <span className="text-xs font-mono text-gray-500">Defense: {vault.defenseScore}</span>
                    </div>
                  </div>
                  {!found && (
                    <button
                      onClick={() => onAttack(vault)}
                      disabled={isLoading}
                      className="text-xs bg-amber-500/20 text-amber-300 px-3 py-2 rounded-lg border border-amber-500/30 hover:bg-amber-500/30 transition-all font-mono disabled:opacity-40"
                    >
                      {isLoading ? '...' : 'HUNT'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={onClose} className="w-full mt-6 text-sm text-gray-500 hover:text-gray-300 font-mono">&gt; CLOSE</button>
      </div>
    </div>
  );
}
