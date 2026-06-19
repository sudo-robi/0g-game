import { RANK_TIERS } from '../config';

export default function Leaderboard({ mode, leaderboard, playerName }) {
  const isKids = mode === 'kids';

  function getRankIcon(score) {
    const rank = RANK_TIERS.find(r => score >= r.minScore && score < r.maxScore);
    return rank ? rank.icon : '🥉';
  }

  return (
    <div className={`rounded-3xl p-6 md:p-8 ${
      isKids ? 'glass-kids' : 'glass-teen neon-border'
    }`}>
      <h2 className={`font-display font-bold text-xl mb-1 ${
        isKids ? 'text-white' : 'text-cyan-300 font-mono'
      }`}>
        {isKids ? '🏆 Top Tricksters' : '📡 LIVE LEADERBOARD'}
      </h2>
      <p className={`text-xs mb-4 ${isKids ? 'text-white/50' : 'text-gray-500 font-mono'}`}>
        Season 1 · Ranked by score
      </p>

      <div className="space-y-3">
        {leaderboard.map((player, i) => {
          const isYou = player.name === playerName;
          return (
            <div
              key={player.name}
              className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all ${
                isYou
                  ? isKids
                    ? 'bg-yellow-500/20 ring-2 ring-yellow-400'
                    : 'bg-cyan-500/10 ring-1 ring-cyan-400'
                  : isKids
                    ? 'bg-indigo-900/30'
                    : 'bg-gray-800/40'
              }`}
            >
              <span className={`font-bold text-lg w-8 ${
                i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-300' : i === 2 ? 'text-orange-400' : isKids ? 'text-white/50' : 'text-gray-600'
              }`}>
                #{i + 1}
              </span>
              <span className="text-lg">{getRankIcon(player.score)}</span>
              <div className="flex-1 min-w-0">
                <div className={`font-semibold text-base truncate ${
                  isKids ? 'text-white' : 'text-gray-200 font-mono'
                }`}>
                  {player.name}
                  {isYou && (
                    <span className={`ml-2 text-sm ${isKids ? 'text-yellow-200' : 'text-cyan-400'}`}>
                      (You)
                    </span>
                  )}
                </div>
                <div className={`text-sm ${isKids ? 'text-white/60' : 'text-gray-500 font-mono'}`}>
                  {player.vaultsCracked} vault{player.vaultsCracked !== 1 ? 's' : ''} cracked
                </div>
              </div>
              <span className={`font-bold text-base ${
                isKids ? 'text-yellow-200' : 'text-green-400 font-mono'
              }`}>
                {player.score.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
