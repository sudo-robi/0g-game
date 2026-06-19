import { useState } from 'react';
import RankBadge from './RankBadge';

export default function Header({ mode, theme, playerName, onRename, rank, profile }) {
  const isKids = mode === 'kids';
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(playerName);

  const handleSave = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== playerName) onRename(trimmed);
    setEditing(false);
  };

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
        {editing ? (
          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={handleSave}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            className={`inline text-center bg-transparent border-b-2 outline-none max-w-[200px] ${
              isKids ? 'border-yellow-200 text-yellow-200' : 'border-green-400 text-green-400'
            }`}
            autoFocus
          />
        ) : (
          <button onClick={() => { setDraft(playerName); setEditing(true); }}
            className={`inline hover:opacity-80 transition-opacity ${
              isKids ? 'text-yellow-200 font-semibold' : 'text-green-400'
            }`}>
            Playing as {playerName} ✏️
          </button>
        )}
      </p>
    </header>
  );
}
