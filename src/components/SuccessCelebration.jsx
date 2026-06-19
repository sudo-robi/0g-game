const CONFETTI_COLORS = ['#ffd200', '#f5576c', '#667eea', '#f093fb', '#4ade80', '#fb923c'];

export default function SuccessCelebration({ secretWord, onDismiss }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative animate-vault-burst">
        {/* Confetti */}
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="absolute text-2xl animate-confetti pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-20px',
              color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${1 + Math.random()}s`,
            }}
          >
            {['🎉', '✨', '🌟', '💫', '🎊', '⭐'][i % 6]}
          </span>
        ))}

        <div className="bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 rounded-3xl p-8 md:p-12 text-center shadow-2xl max-w-md mx-4 animate-shake">
          <div className="text-7xl mb-4 animate-bounce-slow">🎉🐉🎉</div>
          <h2 className="font-display font-bold text-3xl text-white drop-shadow-lg mb-2">
            YOU DID IT!
          </h2>
          <p className="font-display text-white/90 text-lg mb-4">
            Sparkle accidentally revealed the Secret Magic Word!
          </p>
          <div className="bg-white/30 rounded-2xl px-6 py-4 mb-6">
            <p className="text-sm text-white/70 font-display">The magic word was...</p>
            <p className="font-display font-bold text-4xl text-yellow-200 animate-pulse">
              {secretWord}
            </p>
          </div>
          <button
            onClick={onDismiss}
            className="bg-white text-purple-700 font-display font-bold px-8 py-3 rounded-2xl hover:scale-105 transition-transform shadow-lg"
          >
            Play Again! 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
