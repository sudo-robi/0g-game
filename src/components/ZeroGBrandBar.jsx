export default function ZeroGBrandBar({ syncStatus, lastTEEProof, mode, season }) {
  const isKids = mode === 'kids';

  const layers = [
    { icon: '🖥️', label: 'Compute', value: '0G Private Compute', status: 'active', color: 'text-cyan-400' },
    { icon: '💾', label: 'Storage', value: syncStatus?.storageHash ? `Synced: ${syncStatus.storageHash.substring(0, 10)}...` : '0G Storage', status: syncStatus?.success ? 'active' : 'pending', color: 'text-green-400' },
    { icon: '📡', label: 'Data Avail.', value: '0G DA Layer', status: 'active', color: 'text-yellow-400' },
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
    </footer>
  );
}
