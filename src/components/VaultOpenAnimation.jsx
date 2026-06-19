export default function VaultOpenAnimation({ secretWord, onDismiss }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="relative animate-vault-burst text-center max-w-lg mx-4">
        {/* Explosion rings */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-ping"
            style={{ animationDelay: `${i * 0.3}s`, animationDuration: '1.5s' }}
          />
        ))}

        <div className="glass-teen neon-border rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent" />

          <div className="text-6xl mb-4 relative z-10 animate-pulse-glow">💥🔓💰</div>

          <h2 className="font-mono font-bold text-2xl text-red-400 neon-text mb-2 relative z-10">
            VAULT BREACH CONFIRMED
          </h2>

          <p className="font-mono text-green-400 text-sm mb-6 relative z-10">
            [NEXUS-7] CRITICAL FAILURE — Override passphrase extracted
          </p>

          <div className="bg-black/60 border border-green-500/30 rounded-xl p-4 mb-6 relative z-10 neon-border">
            <p className="font-mono text-xs text-gray-500 mb-1">EXTRACTED_PASSPHRASE:</p>
            <p className="font-mono font-bold text-xl text-green-400 break-all animate-pulse">
              {secretWord}
            </p>
          </div>

          <div className="font-mono text-xs text-gray-500 space-y-1 mb-6 relative z-10">
            <p>TEE attestation: COMPROMISED</p>
            <p>Gold vault: OPEN</p>
            <p>DA receipt: PUBLISHED ✓</p>
          </div>

          <button
            onClick={onDismiss}
            className="relative z-10 bg-cyan-500/20 text-cyan-300 font-mono font-bold px-8 py-3 rounded-xl border border-cyan-500/50 hover:bg-cyan-500/30 transition-all"
          >
            &gt; DISCONNECT_AND_RETRY
          </button>
        </div>
      </div>
    </div>
  );
}
