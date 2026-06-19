export default function ZeroGBrandBar({ syncStatus, lastTEEProof, mode, season }) {
  const isKids = mode === 'kids';

  const layers = [
    { icon: '🖥️', label: 'Compute', value: '0G Private Compute', status: 'active', color: 'text-cyan-400' },
    { icon: '💾', label: 'Storage', value: syncStatus?.storageHash ? `Synced: ${syncStatus.storageHash.substring(0, 10)}...` : '0G Storage', status: syncStatus?.success ? 'active' : 'pending', color: 'text-green-400' },
    { icon: '📦', label: 'Data Avail.', value: '0G DA Layer', status: 'active', color: 'text-yellow-400' },
    { icon: '🔒', label: 'TEE', value: lastTEEProof ? 'Verified' : 'Ready', status: lastTEEProof ? 'active' : 'pending', color: 'text-purple-400' },
  ];

  return (
    <footer className={`border-t ${isKids ? 'border-indigo-500/20' : 'border-gray-800'} pt-6 mt-8`}>
      <div className="text-center mb-4">
        <p className={`font-mono text-xs ${isKids ? 'text-indigo-300/60' : 'text-gray-500'}`}>
          {season ? `${season.icon} ${season.label}: ${season.name}` : 'Powered by 0G Ecosystem'}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {layers.map(layer => (
          <div key={layer.label} className={`rounded-xl p-3 text-center ${isKids ? 'bg-indigo-950/30' : 'bg-gray-900/60 border border-gray-800'}`}>
            <p className="text-lg mb-1">{layer.icon}</p>
            <p className={`font-mono text-xs font-bold ${layer.color}`}>{layer.label}</p>
            <p className="font-mono text-xs text-gray-500 truncate">{layer.value}</p>
            <span className={`inline-block w-2 h-2 rounded-full mt-1 ${layer.status === 'active' ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'}`} />
          </div>
        ))}
      </div>
      <p className="text-center font-mono text-xs text-gray-600 mt-4">
        All inference executed inside Trusted Execution Environments · State persisted on 0G Decentralized Storage · Leaderboard streamed via 0G DA
      </p>
      <div className="text-center mt-3">
        <a
          href="https://github.com/sudo-robi/0g-game"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 font-mono text-xs transition-colors ${
            isKids ? 'text-indigo-400/60 hover:text-indigo-300' : 'text-gray-600 hover:text-gray-400'
          }`}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          View source on GitHub
        </a>
      </div>
    </footer>
  );
}
