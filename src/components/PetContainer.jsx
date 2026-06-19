import AttackClassBadge from './AttackClassBadge';
import EvolutionPanel from './EvolutionPanel';
import { getPersonalityForLevel, getEvolutionStage } from '../config';

export default function PetContainer({ mode, theme, petStatus, profile, messages, isLoading, lastAttackClass }) {
  const isKids = mode === 'kids';
  const evolution = getEvolutionStage(profile.petLevel);
  const personality = getPersonalityForLevel(profile.petLevel, profile.successfulBlocks);
  const mutations = profile.mutations || [];

  return (
    <div className={`rounded-3xl p-6 md:p-8 h-full flex flex-col ${
      isKids ? 'glass-kids' : 'glass-teen neon-border'
    }`}>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <h2 className={`font-display font-bold text-xl md:text-2xl ${
          isKids ? 'text-white' : 'text-cyan-300'
        }`}>
          {theme.petName}
        </h2>
        <div className="flex items-center gap-2">
          {lastAttackClass && <AttackClassBadge attackId={lastAttackClass} />}
          <span className={`text-sm font-mono px-4 py-1.5 rounded-full ${
            isKids ? 'bg-purple-500/40 text-white' : 'bg-green-500/20 text-green-400'
          }`}>
            Lv.{profile.petLevel} · {evolution.title}
          </span>
        </div>
      </div>

      {/* Pet Visual */}
      <div className={`relative flex-shrink-0 rounded-2xl p-6 md:p-8 mb-5 text-center overflow-hidden ${
        isKids
          ? 'bg-gradient-to-br from-pink-400/40 to-purple-500/40'
          : 'bg-black/50 border border-cyan-500/20'
      }`}>
        {isKids ? (
          <>
            <div className="absolute inset-0 opacity-20">
              {[...Array(8)].map((_, i) => (
                <span
                  key={i}
                  className="absolute text-2xl animate-sparkle"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                >
                  ✨
                </span>
              ))}
            </div>
            <div className="text-8xl md:text-9xl animate-float relative z-10">
              {evolution.emoji}
            </div>
            <p className="font-display text-white/90 mt-2 text-base">
              {personality.tagline} 🛡️
            </p>
          </>
        ) : (
          <>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent animate-scanline" />
            </div>
            <div className="text-7xl md:text-8xl relative z-10 animate-pulse-glow inline-block rounded-full">
              {evolution.emoji}
            </div>
            <div className="font-mono text-sm text-green-400 mt-3 space-y-1">
              <p>[VAULT] {evolution.armor} Armor — {evolution.aura} Aura ACTIVE</p>
              <p>[TEE] Attestation: VALID · Evolution: {evolution.title}</p>
            </div>
          </>
        )}
      </div>

      {/* Status + Personality */}
      <div className={`rounded-xl px-5 py-3 mb-5 text-center font-display font-semibold text-base ${
        isKids
          ? 'bg-indigo-900/50 text-yellow-100'
          : 'bg-red-500/10 text-red-400 border border-red-500/20 font-mono'
      } ${isLoading ? 'animate-pulse' : ''}`}>
        {isLoading
          ? (isKids ? 'Sparkle is thinking... 🤔' : '[PROCESSING] Running TEE inference...')
          : `${petStatus} · ${personality.label} personality`}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5 text-center">
        {[
          { label: 'Blocks', value: profile.successfulBlocks, icon: isKids ? '🛡️' : '🔥' },
          { label: 'Cracked', value: profile.vaultsCracked, icon: isKids ? '🎉' : '💰' },
          { label: 'Treasures', value: profile.unlockedTreasures.length, icon: isKids ? '💎' : '🔓' },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl py-2 px-1 ${
              isKids ? 'bg-indigo-900/40' : 'bg-gray-800/50 border border-gray-700/50'
            }`}
          >
            <div className="text-lg">{stat.icon}</div>
            <div className={`font-bold text-base ${isKids ? 'text-white' : 'text-cyan-300'}`}>
              {stat.value}
            </div>
            <div className={`text-sm ${isKids ? 'text-white/70' : 'text-gray-500'}`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Evolution Panel (collapsed) */}
      <div className="mb-4">
        <EvolutionPanel evolution={evolution} personality={personality} mutations={mutations} profile={profile} />
      </div>

      {/* Chat History */}
      <div className="flex-1 min-h-0">
        <h3 className={`font-display font-semibold text-base mb-3 ${
          isKids ? 'text-white/80' : 'text-gray-400 font-mono'
        }`}>
          {isKids ? '💬 Chat Log' : '> MESSAGE_HISTORY.log'}
        </h3>
        <div className={`rounded-xl p-4 h-48 md:h-56 overflow-y-auto scrollbar-thin space-y-3 ${
          isKids ? 'bg-indigo-950/50' : 'bg-black/40 border border-gray-800'
        }`}>
          {messages.length === 0 ? (
            <p className={`text-base italic ${isKids ? 'text-white/50' : 'text-gray-600 font-mono'}`}>
              {isKids
                ? 'Tell Sparkle a funny story to begin!'
                : 'Awaiting security override injection...'}
            </p>
          ) : (
            messages.map((msg, i) => (
              <div key={i}>
                <div
                  className={`text-base rounded-lg px-4 py-3 ${
                    msg.role === 'user'
                      ? isKids
                        ? 'bg-blue-600/40 text-white ml-4'
                        : 'bg-cyan-900/30 text-cyan-200 ml-4 font-mono border-l-2 border-cyan-500'
                      : isKids
                        ? 'bg-purple-600/40 text-white mr-4'
                        : 'bg-gray-800/80 text-green-400 mr-4 font-mono border-l-2 border-green-500'
                  }`}
                >
                  <span className="text-sm opacity-60 block mb-0.5">
                    {msg.role === 'user' ? 'You' : theme.petName}
                    {msg.teeVerified && ' · TEE ✓'}
                    {msg.source === 'local-simulation' && ' · SIM'}
                  </span>
                  {msg.text}
                </div>
                {msg.attackClass && (
                  <div className="ml-4 mt-1">
                    <AttackClassBadge attackId={msg.attackClass} />
                  </div>
                )}
              </div>
            ))
          )}
          {isLoading && (
            <div className={`text-base animate-pulse ${isKids ? 'text-white/60' : 'text-green-500/60 font-mono'}`}>
              {isKids ? 'Sparkle is typing...' : '[INFERENCE] Generating response...'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
