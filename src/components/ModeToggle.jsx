export default function ModeToggle({ mode, onSwitch }) {
  return (
    <div className="flex justify-center">
      <div
        className={`inline-flex rounded-2xl p-1.5 gap-1 ${
          mode === 'kids' ? 'glass-kids' : 'glass-teen neon-border'
        }`}
      >
        {[
          { id: 'kids', label: '🐉 Kids Mode', sub: 'Ages 7–12' },
          { id: 'teen', label: '💻 Teen Mode', sub: 'Ages 13+' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => onSwitch(m.id)}
            className={`relative px-8 py-4 rounded-xl font-display font-semibold transition-all duration-300 ${
              mode === m.id
                ? m.id === 'kids'
                  ? 'bg-white text-purple-700 shadow-lg scale-105'
                  : 'bg-cyan-500/20 text-cyan-300 neon-text scale-105'
                : m.id === 'kids'
                  ? 'text-white/80 hover:bg-white/10'
                  : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10'
            }`}
          >
            <span className="block text-base md:text-lg">{m.label}</span>
            <span className="block text-sm opacity-70">{m.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
