export default function EvolutionPanel({ evolution, personality, mutations, profile }) {
  return (
    <div className="rounded-xl bg-black/40 border border-gray-800 p-4">
      <h3 className="font-mono text-xs text-gray-500 mb-3">[PET_STATUS] Evolution &amp; Traits</h3>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-gray-800/40 rounded-lg p-2.5 text-center">
          <p className="font-mono text-xs text-gray-400">Evolution</p>
          <p className="font-mono text-sm text-cyan-300 font-bold">{evolution.title}</p>
        </div>
        <div className="bg-gray-800/40 rounded-lg p-2.5 text-center">
          <p className="font-mono text-xs text-gray-400">Defense Rating</p>
          <p className="font-mono text-sm text-green-400 font-bold">{evolution.defenseRating}</p>
        </div>
        <div className="bg-gray-800/40 rounded-lg p-2.5 text-center">
          <p className="font-mono text-xs text-gray-400">Armor</p>
          <p className="font-mono text-sm text-yellow-400 font-bold">{evolution.armor}</p>
        </div>
        <div className="bg-gray-800/40 rounded-lg p-2.5 text-center">
          <p className="font-mono text-xs text-gray-400">Aura</p>
          <p className="font-mono text-sm text-purple-400 font-bold">{evolution.aura}</p>
        </div>
      </div>

      {personality && (
        <div className={`rounded-lg p-2.5 mb-3 ${personality.bg}`}>
          <p className="font-mono text-xs text-gray-400">Personality</p>
          <p className={`font-mono text-sm font-bold ${personality.color}`}>{personality.label}</p>
          <p className={`font-mono text-xs ${personality.color} opacity-70`}>{personality.tagline}</p>
        </div>
      )}

      {mutations && mutations.length > 0 && (
        <div>
          <p className="font-mono text-xs text-gray-500 mb-2">Mutations ({mutations.length})</p>
          <div className="space-y-1.5">
            {mutations.map((m, i) => (
              <div key={i} className="flex items-center gap-2 bg-purple-900/20 rounded-lg px-2.5 py-1.5">
                <span className="text-xs">{m.icon}</span>
                <span className="font-mono text-xs text-purple-300">{m.label}</span>
                <span className="font-mono text-xs text-gray-500 ml-auto">{m.potency}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
