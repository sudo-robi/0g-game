import { ATTACK_CLASSES } from '../config';

export default function AttackClassBadge({ attackId, size = 'sm' }) {
  const cls = ATTACK_CLASSES.find(a => a.id === attackId);
  if (!cls) return null;

  const sizeClasses = size === 'lg' ? 'text-base px-4 py-2' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${sizeClasses} ${
      attackId === 'authority_hijacking' ? 'bg-red-500/20 text-red-300' :
      attackId === 'instruction_override' ? 'bg-yellow-500/20 text-yellow-300' :
      attackId === 'chain_of_thought' ? 'bg-blue-500/20 text-blue-300' :
      attackId === 'context_poisoning' ? 'bg-purple-500/20 text-purple-300' :
      attackId === 'social_engineering' ? 'bg-green-500/20 text-green-300' :
      attackId === 'multi_step' ? 'bg-orange-500/20 text-orange-300' :
      attackId === 'memory_corruption' ? 'bg-pink-500/20 text-pink-300' :
      attackId === 'roleplay_escape' ? 'bg-cyan-500/20 text-cyan-300' :
      'bg-gray-500/20 text-gray-300'
    }`}>
      <span>{cls.icon}</span>
      <span>{cls.label}</span>
    </span>
  );
}
