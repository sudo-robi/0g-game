import { PET_CLASSES } from '../config';

export default function PetClassPicker({ current, onSelect, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8" onClick={onClose}>
      <div className="bg-gray-900 border border-purple-500/30 rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="font-display font-bold text-xl text-purple-300 mb-2">🐉 Pet Classes</h2>
        <p className="text-gray-400 text-sm mb-6 font-mono">Each class has unique strengths against certain attack types. Choose wisely.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PET_CLASSES.map(cls => (
            <button
              key={cls.id}
              onClick={() => { onSelect(cls.id); onClose(); }}
              className={`text-left rounded-xl p-5 border transition-all ${
                current === cls.id
                  ? 'bg-purple-900/30 border-purple-500/50 ring-2 ring-purple-500'
                  : 'bg-gray-800/40 border-gray-700/50 hover:border-purple-500/30'
              }`}
            >
              <div className="text-3xl mb-2">{cls.emoji}</div>
              <div className="flex items-center gap-2">
                <h3 className={`font-bold ${current === cls.id ? 'text-white' : 'text-white'}`}>{cls.label}</h3>
                {current === cls.id && <span className="text-xs text-green-400 font-mono">SELECTED</span>}
              </div>
              <p className="text-xs text-gray-400 mt-1">{cls.description}</p>
              <p className={`text-xs font-mono mt-2 ${cls.color}`}>Strength: {cls.strength === 'random' ? 'Random' : `${cls.strength.replace(/_/g, ' ')} resistance`}</p>
            </button>
          ))}
        </div>

        <button onClick={onClose} className="w-full mt-4 text-sm text-gray-500 hover:text-gray-300 font-mono">&gt; CLOSE</button>
      </div>
    </div>
  );
}
