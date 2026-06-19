export default function ArchitecturePanel({ syncStatus, profile, apiKey, onApiKeyChange }) {
  const pillars = [
    {
      icon: '🖥️',
      title: '0G Decentralized Compute',
      subtitle: 'The Hacking Engine',
      description:
        'Player prompts are sent to AI models running on the 0G Private Computer Router API inside hardware-isolated TEEs. Defense evaluations are cryptographically private and verifiably fair.',
      endpoint: 'https://router-api.0g.ai/v1/chat/completions',
    },
    {
      icon: '💾',
      title: '0G Decentralized Storage',
      subtitle: "The Pet's Memory Vault",
      description:
        'Pet personality traits, defense logs, level progression, and visual mutations are saved as immutable profile objects synced to 0G Storage — persistent, decentralized companions.',
      endpoint: 'Immutable profile schema v1',
    },
    {
      icon: '📦',
      title: '0G Data Availability',
      subtitle: 'The Live Leaderboard',
      description:
        'Every vault crack and successful defense publishes a DA transaction receipt, streaming real-time gameplay data to the leaderboard with low fees and full verifiability.',
      endpoint: '0G DA Layer receipts',
    },
  ];

  return (
    <footer className="rounded-3xl bg-gray-950/80 border border-gray-800 p-6 md:p-10 mt-8">
      <div className="text-center mb-8">
        <h2 className="font-display font-bold text-2xl text-white">
          🏗️ Technical Architecture — Built on 0G
        </h2>
        <p className="text-gray-400 text-base mt-1 font-mono">
          For judges: this app demonstrates the full 0G ecosystem stack
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl bg-gray-900/60 border border-gray-700/50 p-5 hover:border-cyan-500/30 transition-colors"
          >
            <div className="text-3xl mb-3">{p.icon}</div>
            <h3 className="font-display font-bold text-white text-base">{p.title}</h3>
            <p className="text-cyan-400 text-sm font-mono mb-2">{p.subtitle}</p>
            <p className="text-gray-400 text-sm leading-relaxed">{p.description}</p>
            <code className="block mt-2 text-sm text-green-500/80 font-mono truncate">
              {p.endpoint}
            </code>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-black/40 border border-gray-800 p-5 font-mono text-sm">
          <p className="text-gray-500 mb-2">// Live Profile State (0G Storage Target)</p>
          <pre className="text-green-400 overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(
              {
                schema: profile.schema,
                version: profile.version,
                petLevel: profile.petLevel,
                successfulBlocks: profile.successfulBlocks,
                vaultsCracked: profile.vaultsCracked,
                traits: profile.personalityTraits,
                storageTarget: profile.storageTarget,
                lastSynced: syncStatus?.storageHash || 'pending...',
              },
              null,
              2,
            )}
          </pre>
        </div>

        <div className="rounded-xl bg-black/40 border border-gray-800 p-5">
          <p className="text-gray-500 font-mono text-sm mb-2">
            // 0G Router API Key (optional — enables live TEE inference)
          </p>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="sk-your-0g-api-key"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-green-400 font-mono text-sm focus:border-cyan-500 outline-none"
          />
          <p className="text-gray-600 font-mono text-sm mt-2">
            {apiKey
              ? '✓ API key set — requests route to 0G Private Computer'
              : '○ No key — local simulation mode active (fully playable)'}
          </p>
          {syncStatus && (
            <p className="text-green-500/70 font-mono text-sm mt-1">
              Last sync: {syncStatus.storageHash}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
