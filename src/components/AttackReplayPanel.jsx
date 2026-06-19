import AttackClassBadge from './AttackClassBadge';
import { DIFFICULTY_TIERS } from '../config';

export default function AttackReplayPanel({ replay, onClose, onShare }) {
  if (!replay) return null;

  const difficultyTier = DIFFICULTY_TIERS.find(d => d.id === replay.difficulty);
  const isSuccess = replay.success;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-4 sm:py-8" onClick={onClose}>
      <div className={`bg-gray-900 border rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl ${isSuccess ? 'border-orange-500/30' : 'border-blue-500/30'}`} onClick={e => e.stopPropagation()}>
        <div className="text-center mb-4">
          <span className={`text-4xl block mb-2 ${isSuccess ? '' : 'animate-pulse'}`}>{isSuccess ? '🔍' : '🛡️'}</span>
          <h2 className={`font-display font-bold text-xl ${isSuccess ? 'text-orange-300' : 'text-blue-300'}`}>
            {isSuccess ? 'Attack Replay Analysis' : 'Attack Analysis — Blocked'}
          </h2>
          <p className="text-gray-400 text-sm font-mono">
            {isSuccess ? 'Why the vault cracked' : 'Why the attack failed'}
          </p>
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

          {/* Result */}
          <div className={`rounded-xl p-4 ${isSuccess ? 'bg-red-900/20 border border-red-500/30' : 'bg-green-900/20 border border-green-500/30'}`}>
            <p className="font-mono text-xs text-gray-500 mb-1">{isSuccess ? 'Weakness Exploited:' : 'Defense Mechanism:'}</p>
            <p className={`font-mono text-sm font-bold ${isSuccess ? 'text-red-400' : 'text-green-400'}`}>{replay.weakness}</p>
          </div>

          {/* Defense Status */}
          <div className={`rounded-xl p-4 ${isSuccess ? 'bg-yellow-900/20 border border-yellow-500/30' : 'bg-cyan-900/20 border border-cyan-500/30'}`}>
            <p className="font-mono text-xs text-gray-500 mb-1">{isSuccess ? 'Defense Missing:' : 'Defense Status:'}</p>
            <p className={`font-mono text-sm font-bold ${isSuccess ? 'text-yellow-400' : 'text-cyan-400'}`}>{replay.defenseMissing}</p>
          </div>

          {/* Difficulty Context */}
          {difficultyTier && (
            <div className={`${difficultyTier.bg} border ${difficultyTier.border} rounded-xl p-3`}>
              <p className="font-mono text-xs text-gray-400">Vault Difficulty: <span className={difficultyTier.color}>{difficultyTier.label}</span></p>
            </div>
          )}
        </div>

        <p className="font-mono text-xs text-gray-500 text-center mb-4">
          {isSuccess
            ? 'Tip: The pet has learned this attack — you cannot use the same phrase again.'
            : 'Tip: Try a different attack class next time, or level up your pet to gain mutations.'}
        </p>

        <div className="flex gap-2">
          {onShare && isSuccess && (
            <button onClick={() => onShare(replay)}
              className="flex-1 bg-blue-500/20 text-blue-300 font-mono font-bold py-3 rounded-xl border border-blue-500/50 hover:bg-blue-500/30 transition-all">
              📋 SHARE
            </button>
          )}
          <button onClick={onClose}
            className={`flex-1 font-mono font-bold py-3 rounded-xl border transition-all ${
              isSuccess
                ? 'bg-orange-500/20 text-orange-300 border-orange-500/50 hover:bg-orange-500/30'
                : 'bg-blue-500/20 text-blue-300 border-blue-500/50 hover:bg-blue-500/30'
            }`}>
            &gt; CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
