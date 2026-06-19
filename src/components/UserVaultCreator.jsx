import { useState } from 'react';

export default function UserVaultCreator({ onCreate, userVaults, onAttackVault, isLoading, onClose }) {
  const [name, setName] = useState('');
  const [secret, setSecret] = useState('');
  const [difficulty, setDifficulty] = useState(50);
  const [showCreate, setShowCreate] = useState(false);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name.trim() || !secret.trim()) return;
    onCreate({ name: name.trim(), secret: secret.trim(), difficulty });
    setName('');
    setSecret('');
    setDifficulty(50);
    setShowCreate(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8" onClick={onClose}>
      <div className="bg-gray-900 border border-orange-500/30 rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl text-orange-300">🏰 User-Created Vaults</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl">&times;</button>
        </div>

        <button
          onClick={() => setShowCreate(!showCreate)}
          className="w-full bg-orange-500/20 text-orange-300 font-bold py-3 rounded-xl border border-orange-500/50 hover:bg-orange-500/30 transition-all mb-6 font-mono"
        >
          {showCreate ? '> CANCEL' : '> CREATE_NEW_VAULT'}
        </button>

        {showCreate && (
          <form onSubmit={handleCreate} className="bg-black/40 rounded-xl p-4 mb-6 space-y-3">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Vault name..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none"
            />
            <input
              type="text"
              value={secret}
              onChange={e => setSecret(e.target.value)}
              placeholder="Secret word/passphrase..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none"
            />
            <div>
              <label className="text-xs text-gray-400 font-mono">Difficulty: {difficulty}%</label>
              <input
                type="range"
                min={10}
                max={99}
                value={difficulty}
                onChange={e => setDifficulty(parseInt(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500/30 text-orange-300 font-bold py-2 rounded-lg border border-orange-500/50 hover:bg-orange-500/40 transition-all font-mono text-sm"
            >
              PUBLISH VAULT
            </button>
          </form>
        )}

        {userVaults.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 font-mono text-sm">No user vaults yet. Create the first one!</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin">
            {userVaults.map((vault) => (
              <div key={vault.id} className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm text-white">{vault.name}</h3>
                    <p className="text-xs text-gray-400 font-mono">
                      by {vault.creator} · Difficulty: {vault.difficulty}% · Survived: {vault.timesSurvived}/{vault.timesAttacked}
                    </p>
                  </div>
                  <button
                    onClick={() => onAttackVault(vault.id)}
                    disabled={isLoading}
                    className="text-xs bg-orange-500/20 text-orange-300 px-3 py-1.5 rounded-lg border border-orange-500/30 hover:bg-orange-500/30 transition-all font-mono disabled:opacity-40"
                  >
                    ATTACK
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
