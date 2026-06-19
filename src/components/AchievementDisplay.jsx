import { ACHIEVEMENT_BADGES } from '../config';

export default function AchievementDisplay({ earned, onClose }) {
  const earnedSet = new Set(earned || []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8" onClick={onClose}>
      <div className="bg-gray-900 border border-blue-500/30 rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-display font-bold text-xl text-blue-300">🏅 Proof-of-Skill Badges</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl">&times;</button>
        </div>
        <p className="text-gray-400 text-sm mb-6 font-mono">
          {earned.length}/{ACHIEVEMENT_BADGES.length} badges earned · Earned badges are immutable on 0G Storage
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ACHIEVEMENT_BADGES.map(badge => {
            const has = earnedSet.has(badge.id);
            return (
              <div
                key={badge.id}
                className={`rounded-xl p-4 text-center border transition-all ${
                  has
                    ? 'bg-blue-900/20 border-blue-500/30'
                    : 'bg-gray-800/40 border-gray-700/50 opacity-50'
                }`}
              >
                <span className={`text-3xl block mb-1 ${has ? '' : 'grayscale'}`}>{badge.icon}</span>
                <p className={`font-bold text-xs ${has ? 'text-white' : 'text-gray-500'}`}>{badge.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{badge.description}</p>
                {has && <span className="text-xs text-green-400 font-mono mt-1 block">✓ Earned</span>}
              </div>
            );
          })}
        </div>

        <button onClick={onClose} className="w-full mt-6 text-sm text-gray-500 hover:text-gray-300 font-mono">&gt; CLOSE</button>
      </div>
    </div>
  );
}
