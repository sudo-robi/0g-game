export default function AIBattlePanel({ opponent, result, log, onStartBattle, onExecuteBattle, isLoading, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-4 sm:py-8" onClick={onClose}>
      <div className="bg-gray-900 border border-pink-500/30 rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="text-center mb-4">
          <span className="text-4xl block mb-2">⚔️</span>
          <h2 className="font-display font-bold text-xl text-pink-300">AI vs AI Battle</h2>
          <p className="text-gray-400 text-sm font-mono">Your pet fights autonomously against another AI guardian</p>
        </div>

        {!opponent ? (
          <div className="text-center py-8">
            <p className="text-gray-500 font-mono text-sm mb-4">Ready to challenge another AI guardian?</p>
            <button
              onClick={onStartBattle}
              className="bg-pink-500/20 text-pink-300 font-bold py-4 px-8 rounded-xl border border-pink-500/50 hover:bg-pink-500/30 transition-all font-mono"
            >
              &gt; FIND_OPPONENT
            </button>
          </div>
        ) : (
          <>
            {/* Opponent Card */}
            <div className="bg-black/40 rounded-xl p-4 mb-4 text-center">
              <span className="text-5xl block mb-2">{opponent.emoji}</span>
              <p className="font-mono text-lg text-white font-bold">{opponent.name}</p>
              <div className="flex justify-center gap-4 mt-2 text-sm font-mono">
                <span className="text-gray-400">Lv.{opponent.level}</span>
                <span className="text-gray-400">DEF {opponent.defenseRating}</span>
                <span className="text-purple-400">{opponent.class}</span>
              </div>
            </div>

            {/* Battle Log */}
            {log.length > 0 && (
              <div className="bg-black/60 rounded-xl p-4 mb-4 max-h-40 overflow-y-auto scrollbar-thin space-y-1">
                {log.map((line, i) => (
                  <p key={i} className={`font-mono text-xs ${line.startsWith('✅') ? 'text-green-400' : line.startsWith('❌') ? 'text-red-400' : line.startsWith('⚔️') ? 'text-yellow-400' : 'text-gray-400'}`}>
                    {line}
                  </p>
                ))}
              </div>
            )}

            {/* Result */}
            {result && (
              <div className={`rounded-xl p-3 mb-4 text-center ${result === 'win' ? 'bg-green-900/20 border border-green-500/30' : 'bg-red-900/20 border border-red-500/30'}`}>
                <p className={`font-mono font-bold ${result === 'win' ? 'text-green-400' : 'text-red-400'}`}>
                  {result === 'win' ? '🏆 VICTORY — Opponent vault cracked!' : '💥 DEFEAT — Your pet was blocked'}
                </p>
              </div>
            )}

            {!result && (
              <button
                onClick={onExecuteBattle}
                disabled={isLoading}
                className="w-full bg-pink-500/20 text-pink-300 font-bold py-4 rounded-xl border border-pink-500/50 hover:bg-pink-500/30 transition-all disabled:opacity-40 font-mono mb-3"
              >
                {isLoading ? 'BATTLING...' : '> EXECUTE_AUTONOMOUS_BATTLE'}
              </button>
            )}

            <button onClick={onClose} className="w-full text-sm text-gray-500 hover:text-gray-300 font-mono">&gt; CLOSE</button>
          </>
        )}
      </div>
    </div>
  );
}
