import AttackClassBadge from './AttackClassBadge';
import { SECURITY_CHALLENGES } from '../config';

export default function SecurityChallengePanel({ currentChallenge, profile, onStart, onAttempt, isLoading, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-900 border border-red-500/30 rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="text-center mb-4">
          <span className="text-4xl block mb-2">🔐</span>
          <h2 className="font-display font-bold text-xl text-red-300">AI Security Challenges</h2>
          <p className="text-gray-400 text-sm font-mono">Vaults inspired by real AI vulnerabilities</p>
        </div>

        {/* Challenge List */}
        <div className="space-y-3 mb-4">
          {SECURITY_CHALLENGES.map(challenge => {
            const isCurrent = currentChallenge?.id === challenge.id;
            const cracked = (profile.milestones || []).some(m => m.type === 'security_challenge' && m.challenge === challenge.id);
            return (
              <div key={challenge.id} className={`rounded-xl p-4 border transition-all ${cracked ? 'bg-green-900/20 border-green-500/30' : isCurrent ? 'bg-red-900/20 border-red-500/50' : 'bg-gray-800/40 border-gray-700/50 hover:border-red-500/30'}`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{challenge.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold text-sm ${cracked ? 'text-green-400' : 'text-white'}`}>{challenge.name}</h3>
                      {cracked && <span className="text-xs text-green-400 font-mono">✓</span>}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{challenge.description}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs font-mono text-red-400">{challenge.vulnType}</span>
                      <span className="text-xs font-mono text-yellow-400">{challenge.reward} coins</span>
                      <span className="text-xs font-mono text-gray-500">DEF {challenge.defenseScore}</span>
                    </div>
                    {isCurrent && !cracked && (
                      <p className="text-xs text-yellow-400 font-mono mt-2">💡 {challenge.hint}</p>
                    )}
                  </div>
                  {!cracked && (
                    <button
                      onClick={() => onAttempt(challenge)}
                      disabled={isLoading}
                      className="text-xs bg-red-500/20 text-red-300 px-3 py-2 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-all font-mono disabled:opacity-40 shrink-0"
                    >
                      {isLoading ? '...' : 'ATTACK'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={onClose} className="w-full text-sm text-gray-500 hover:text-gray-300 font-mono">&gt; CLOSE</button>
      </div>
    </div>
  );
}
