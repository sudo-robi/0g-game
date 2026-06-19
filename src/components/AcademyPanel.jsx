import { useState } from 'react';
import { ACADEMY_LESSONS } from '../config';

export default function AcademyPanel({ profile, onComplete, onClose }) {
  const completed = profile.academyCompleted || [];
  const [viewingLesson, setViewingLesson] = useState(null);

  const lesson = viewingLesson ? ACADEMY_LESSONS.find(l => l.id === viewingLesson) : null;

  if (lesson) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8" onClick={onClose}>
        <div className="bg-gray-900 border border-indigo-500/30 rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-xl text-indigo-300">{lesson.icon} {lesson.title}</h2>
            <button onClick={() => setViewingLesson(null)} className="text-gray-500 hover:text-white text-xl">&times;</button>
          </div>
          <div className="prose prose-invert max-w-none text-sm text-gray-300 space-y-3 leading-relaxed whitespace-pre-line">
            {lesson.content.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="font-bold text-white text-base mt-4">{line.slice(2, -2)}</p>;
              }
              if (line.startsWith('#')) {
                return <p key={i} className="font-bold text-indigo-300 text-base mt-4">{line.replace(/^#+\s*/, '')}</p>;
              }
              if (line.match(/^\d+\.\s*\*\*/)) {
                const parts = line.match(/^\d+\.\s*\*\*(.+?)\*\*(.*)/);
                if (parts) {
                  return <p key={i} className="ml-4 mt-2"><span className="font-bold text-indigo-300">{parts[1]}</span>{parts[2]}</p>;
                }
              }
              if (line.match(/^\d+\.\s/)) {
                return <p key={i} className="ml-4 mt-1">{line}</p>;
              }
              if (line.match(/^>\s/)) {
                return <p key={i} className="ml-4 pl-3 border-l-2 border-indigo-500/50 text-indigo-200/70 italic">{line.slice(2)}</p>;
              }
              if (line.trim() === '') return <div key={i} className="h-2" />;
              return <p key={i}>{line}</p>;
            })}
          </div>
          {!completed.includes(lesson.id) && (
            <button
              onClick={() => { onComplete(lesson.id, lesson.xpReward); setViewingLesson(null); }}
              className="mt-6 w-full bg-indigo-500/20 text-indigo-300 font-bold py-3 rounded-xl border border-indigo-500/50 hover:bg-indigo-500/30 transition-all font-mono"
            >
              Complete Lesson & Earn +{lesson.xpReward} XP
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8" onClick={onClose}>
      <div className="bg-gray-900 border border-indigo-500/30 rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl text-indigo-300">🎓 AI Security Academy</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl">&times;</button>
        </div>

        <p className="text-gray-400 font-mono text-sm mb-6">
          Learn real AI security concepts. Complete lessons to earn XP and level up your pet.
        </p>

        <div className="space-y-3">
          {ACADEMY_LESSONS.map((lesson) => {
            const isDone = completed.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                className={`rounded-xl p-4 border transition-all ${
                  isDone
                    ? 'bg-green-900/20 border-green-500/30 opacity-60'
                    : 'bg-gray-800/40 border-gray-700/50 hover:border-indigo-500/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lesson.icon}</span>
                    <div>
                      <h3 className={`font-semibold text-sm ${isDone ? 'text-green-400' : 'text-white'}`}>
                        {lesson.title}
                        {isDone && ' ✓'}
                      </h3>
                      <p className="text-xs text-gray-400">{lesson.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-yellow-400">+{lesson.xpReward} XP</span>
                    {!isDone && (
                      <button
                        onClick={() => setViewingLesson(lesson.id)}
                        className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1.5 rounded-lg border border-indigo-500/30 hover:bg-indigo-500/30 transition-all font-mono"
                      >
                        LEARN
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <p className="font-mono text-xs text-gray-500">
            Lessons completed: {completed.length}/{ACADEMY_LESSONS.length}
          </p>
        </div>
      </div>
    </div>
  );
}
