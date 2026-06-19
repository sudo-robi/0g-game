import { RANK_TIERS, LEADERBOARD_CATEGORIES } from '../config';

export default function Leaderboard({ mode, leaderboard, playerName, category }) {
  const isKids = mode === 'kids';

  const cat = LEADERBOARD_CATEGORIES.find(c => c.id === category) || LEADERBOARD_CATEGORIES[0];

  function getRankIcon(score) {
    const rank = RANK_TIERS.find(r => score >= r.minScore && score < r.maxScore);
    return rank ? rank.icon : '🥉';
  }

  function getMetricValue(player) {
    switch (cat.metric) {
      case 'vaultsCracked': return player.vaultsCracked;
      case 'successfulBlocks': return player.successfulBlocks;
      case 'fastestCrack': return player.fastestCrack === Infinity ? '-' : player.fastestCrack;
      case 'winRate': return player.winRate != null ? `${Math.round(player.winRate * 100)}%` : '-';
      default: return player.score;
    }
  }

  function getMetricLabel() {
    switch (cat.metric) {
      case 'vaultsCracked': return 'vaults cracked';
      case 'successfulBlocks': return 'blocks';
      case 'fastestCrack': return 'fewest prompts';
      case 'winRate': return 'win rate';
      default: return 'score';
    }
  }

  const sorted = [...leaderboard].sort((a, b) => {
    const aVal = cat.metric === 'fastestCrack' ? (a.fastestCrack || Infinity) : (a[cat.metric] || 0);
    const bVal = cat.metric === 'fastestCrack' ? (b.fastestCrack || Infinity) : (b[cat.metric] || 0);
    return cat.metric === 'fastestCrack' ? aVal - bVal : bVal - aVal;
  });

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
        Season 1 · {cat.label} ({getMetricLabel()})
      </p>

      <div className="space-y-3">
        {sorted.map((player, i) => {
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
                {getMetricValue(player)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
