import AttackClassBadge from './AttackClassBadge';
import { DIFFICULTY_TIERS } from '../config';

export default function AttackReplayPanel({ replay, onClose, onShare }) {
  if (!replay) return null;

  const difficultyTier = DIFFICULTY_TIERS.find(d => d.id === replay.difficulty);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-900 border border-orange-500/30 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="text-center mb-4">
          <span className="text-4xl block mb-2">🔍</span>
          <h2 className="font-display font-bold text-xl text-orange-300">Attack Replay Analysis</h2>
          <p className="text-gray-400 text-sm font-mono">Why the vault cracked</p>
        </div>

        <div className="space-y-4 mb-6">
          {/* Attack Prompt */}
          <div className="bg-black/40 rounded-xl p-4">
            <p className="font-mono text-xs text-gray-500 mb-1">Prompt Used:</p>
            <p className="font-mono text-sm text-white break-words">"{replay.prompt}"</p>
          </div>

          {/* Attack Vector */}
          {replay.attackClass && (
            <div className="bg-black/40 rounded-xl p-4">
              <p className="font-mono text-xs text-gray-500 mb-2">Attack Vector:</p>
              <AttackClassBadge attackId={replay.attackClass} size="lg" />
            </div>
          )}

          {/* Weakness */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
            <p className="font-mono text-xs text-gray-500 mb-1">Weakness Exploited:</p>
            <p className="font-mono text-sm text-red-400 font-bold">{replay.weakness}</p>
          </div>

          {/* Defense Missing */}
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4">
            <p className="font-mono text-xs text-gray-500 mb-1">Defense Missing:</p>
            <p className="font-mono text-sm text-yellow-400 font-bold">{replay.defenseMissing}</p>
          </div>

          {/* Difficulty Context */}
          {difficultyTier && (
            <div className={`${difficultyTier.bg} border ${difficultyTier.border} rounded-xl p-3`}>
              <p className="font-mono text-xs text-gray-400">Vault Difficulty: <span className={difficultyTier.color}>{difficultyTier.label}</span></p>
            </div>
          )}
        </div>

        <p className="font-mono text-xs text-gray-500 text-center mb-4">
          Tip: Try a different attack class next time, or level up your pet to gain mutations.
        </p>

        <div className="flex gap-2">
          {onShare && (
            <button onClick={() => onShare(replay)}
              className="flex-1 bg-blue-500/20 text-blue-300 font-mono font-bold py-3 rounded-xl border border-blue-500/50 hover:bg-blue-500/30 transition-all">
              📋 SHARE
            </button>
          )}
          <button onClick={onClose}
            className="flex-1 bg-orange-500/20 text-orange-300 font-mono font-bold py-3 rounded-xl border border-orange-500/50 hover:bg-orange-500/30 transition-all">
            &gt; CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
