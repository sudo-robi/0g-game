import { DIFFICULTY_TIERS } from '../config';

export default function DifficultySelector({ current, onSelect, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-900 border border-yellow-500/30 rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="font-display font-bold text-xl text-yellow-300 mb-2">⚙️ Difficulty Tiers</h2>
        <p className="text-gray-400 text-sm mb-6 font-mono">Choose your challenge level. Higher difficulty = better rewards.</p>

        <div className="space-y-3">
          {DIFFICULTY_TIERS.map(tier => (
            <button
              key={tier.id}
              onClick={() => { onSelect(tier.id); onClose(); }}
              className={`w-full text-left rounded-xl p-4 border transition-all ${
                current === tier.id
                  ? `${tier.bg} ${tier.border} ring-2 ring-offset-2 ring-offset-gray-900 ${tier.color.replace('text', 'ring')}`
                  : 'bg-gray-800/40 border-gray-700/50 hover:border-yellow-500/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{tier.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${current === tier.id ? tier.color : 'text-white'}`}>{tier.label}</span>
                    {current === tier.id && <span className="text-xs text-green-400 font-mono">ACTIVE</span>}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{tier.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <button onClick={onClose} className="w-full mt-4 text-sm text-gray-500 hover:text-gray-300 font-mono">&gt; CLOSE</button>
      </div>
    </div>
  );
}
