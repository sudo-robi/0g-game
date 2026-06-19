import { SHOP_ITEMS } from '../config';

export default function ShopPanel({ profile, onBuy, onClose }) {
  const coins = profile.coins || 0;
  const inventory = profile.inventory || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8" onClick={onClose}>
      <div className="bg-gray-900 border border-green-500/30 rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-display font-bold text-xl text-green-300">🛒 Pet Shop</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl">&times;</button>
        </div>
        <p className="font-mono text-sm text-yellow-400 mb-6">
          Your Balance: <span className="font-bold">{coins} coins</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SHOP_ITEMS.map((item) => {
            const owned = inventory.some(i => i.itemId === item.id);
            return (
              <div
                key={item.id}
                className={`rounded-xl p-4 border transition-all ${
                  owned
                    ? 'bg-green-900/20 border-green-500/30 opacity-60'
                    : 'bg-gray-800/40 border-gray-700/50 hover:border-green-500/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-white">{item.label}</h3>
                    <p className="text-xs text-gray-400">{item.description}</p>
                    <p className="text-xs font-mono text-yellow-400 mt-1">{item.cost} coins</p>
                  </div>
                  <div>
                    {owned ? (
                      <span className="text-xs text-green-400 font-mono">OWNED</span>
                    ) : (
                      <button
                        onClick={() => onBuy(item)}
                        disabled={coins < item.cost}
                        className={`text-xs px-3 py-1.5 rounded-lg font-mono transition-all ${
                          coins < item.cost
                            ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                            : 'bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30'
                        }`}
                      >
                        BUY
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
