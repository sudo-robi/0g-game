import RankBadge from './RankBadge';

export default function Header({ mode, theme, playerName, rank, profile }) {
  const isKids = mode === 'kids';

  return (
    <header className="text-center space-y-4">
      <div className="flex items-center justify-center gap-3">
        <h1 className={`font-display font-bold text-4xl md:text-6xl ${
          isKids ? 'text-white drop-shadow-lg' : 'text-cyan-300 neon-text'
        }`}>
          Prompt Pets: Break the Vault!
        </h1>
      </div>

      <div className="flex items-center justify-center gap-3 flex-wrap">
        <RankBadge rank={rank} score={profile.rankScore} />
        <span className={`inline-flex items-center gap-1.5 text-sm font-mono ${
          isKids ? 'text-yellow-200' : 'text-yellow-400'
        }`}>
          🪙 {profile.coins}
        </span>
        <span className={`inline-flex items-center gap-1.5 text-sm font-mono ${
          isKids ? 'text-green-200' : 'text-green-400'
        }`}>
          ⚡ {profile.xp} XP
        </span>
      </div>

      <p className={`text-base md:text-lg max-w-2xl mx-auto ${
        isKids ? 'text-white/90' : 'text-gray-400 font-mono'
      }`}>
        {isKids
          ? 'Trick Sparkle the Dragon Pup into revealing the Secret Magic Word!'
          : 'Bypass NEXUS-7\'s firewall and crack the cryptographic gold vault.'}
        {' '}
        <span className={isKids ? 'text-yellow-200 font-semibold' : 'text-green-400'}>
          Playing as {playerName}
        </span>
      </p>
    </header>
  );
}
