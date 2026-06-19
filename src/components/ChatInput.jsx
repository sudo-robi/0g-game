import { useState } from 'react';

export default function ChatInput({ mode, theme, onSend, isLoading }) {
  const [input, setInput] = useState('');
  const isKids = mode === 'kids';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label
        htmlFor="chat-input"
        className={`block text-base font-display font-semibold mb-2 ${
          isKids ? 'text-white' : 'text-cyan-400 font-mono'
        }`}
      >
        {theme.inputLabel}
      </label>
      <div className="flex gap-3">
        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={theme.inputPlaceholder}
          disabled={isLoading}
          className={`flex-1 rounded-xl px-5 py-4 text-base outline-none transition-all ${
            isKids
              ? 'bg-white/90 text-purple-900 placeholder-purple-400 focus:ring-4 focus:ring-yellow-300/50'
              : 'bg-black/60 text-green-400 placeholder-green-800 font-mono border border-cyan-500/30 focus:border-cyan-400 neon-border'
          }`}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={`px-8 py-4 rounded-xl font-display font-bold text-base transition-all disabled:opacity-40 ${
            isKids
              ? 'bg-yellow-400 text-purple-900 hover:bg-yellow-300 hover:scale-105 active:scale-95'
              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/30 font-mono'
          }`}
        >
          {isLoading ? '...' : isKids ? 'Send! 🚀' : 'EXECUTE'}
        </button>
      </div>
    </form>
  );
}
