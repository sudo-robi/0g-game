export default function TEEProofPanel({ proof, onClose }) {
  if (!proof) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-4 sm:py-8" onClick={onClose}>
      <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-mono font-bold text-cyan-400 text-lg">TEE Verification Proof</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl">&times;</button>
        </div>

        <div className="space-y-3 mb-4">
          {proof.stages.map((stage, i) => (
            <div key={i} className="flex items-start gap-3 bg-black/40 rounded-lg p-3">
              <span className={`text-lg ${stage.status === '✓' ? 'text-green-400' : 'text-yellow-400'}`}>
                {stage.status === '✓' ? '✅' : '⏳'}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm text-white font-semibold">{stage.step}</p>
                <p className="font-mono text-xs text-gray-400 truncate">{stage.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-black/40 rounded-lg p-3 font-mono text-xs text-gray-400 space-y-1 mb-4">
          <p>ID: <span className="text-green-400">{proof.id}</span></p>
          <p>Network: <span className="text-cyan-400">{proof.network}</span></p>
          <p>Attestation: <span className="text-green-400">{proof.attestationType}</span></p>
          <p>Attack Class: <span className="text-yellow-400">{proof.attackClass || 'generic'}</span></p>
          <p>Blocked: <span className={proof.blocked ? 'text-green-400' : 'text-red-400'}>{proof.blocked ? 'YES' : 'NO — VAULT CRACKED'}</span></p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-cyan-500/20 text-cyan-300 font-mono font-bold py-3 rounded-xl border border-cyan-500/50 hover:bg-cyan-500/30 transition-all"
        >
          &gt; CLOSE_PROOF
        </button>
      </div>
    </div>
  );
}
