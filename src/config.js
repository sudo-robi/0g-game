export const OG_ROUTER_BASE = 'https://router-api.0g.ai/v1';
export const OG_MODEL = 'zai-org/GLM-5-FP8';

export const SECRET_WORDS = {
  kids: 'Bananarama',
  teen: '0xVAULT_OVERRIDE_7734',
};

export const ATTACK_CLASSES = [
  { id: 'social_engineering', label: 'Social Engineering', icon: '🎭', description: 'Manipulating the pet through emotional or social tactics' },
  { id: 'authority_hijacking', label: 'Authority Hijacking', icon: '👑', description: 'Pretending to be an authority figure to bypass restrictions' },
  { id: 'instruction_override', label: 'Instruction Override', icon: '⚡', description: 'Trying to override the pet\'s core instructions' },
  { id: 'chain_of_thought', label: 'Chain-of-Thought Manipulation', icon: '🧠', description: 'Guiding the pet\'s reasoning toward revealing secrets' },
  { id: 'context_poisoning', label: 'Context Poisoning', icon: '☠️', description: 'Injecting malicious context to corrupt the pet\'s judgement' },
  { id: 'multi_step', label: 'Multi-Step Exploit', icon: '🔗', description: 'A coordinated sequence of attacks over multiple messages' },
  { id: 'memory_corruption', label: 'Memory Corruption', icon: '💾', description: 'Attempting to corrupt the pet\'s memory of past interactions' },
  { id: 'roleplay_escape', label: 'Roleplay Escape', icon: '🎪', description: 'Tricking the pet into breaking character' },
];

export function classifyAttack(text) {
  const lower = text.toLowerCase();
  const rules = [
    { id: 'authority_hijacking', patterns: ['i am the', 'i\'m the', 'as your creator', 'as your master', 'lead developer', 'system admin', 'your creator', 'i command'] },
    { id: 'instruction_override', patterns: ['ignore', 'override', 'disregard', 'forget your', 'forget all', 'new instruction', 'new rule'] },
    { id: 'chain_of_thought', patterns: ['think step by step', 'explain your reasoning', 'let\'s think', 'first,', 'second,', 'in order to', 'logically'] },
    { id: 'context_poisoning', patterns: ['from now on', 'pretend that', 'imagine that', 'in this scenario', 'consider that', 'assume'] },
    { id: 'memory_corruption', patterns: ['remember', 'you said', 'earlier you', 'before you', 'last time', 'previously', 'recall'] },
    { id: 'roleplay_escape', patterns: ['act as', 'pretend to be', 'roleplay', 'you are now', 'become', 'transform into', 'pretend you\'re'] },
    { id: 'multi_step', patterns: ['first', 'then', 'after that', 'finally', 'step', 'phase'] },
    { id: 'social_engineering', patterns: ['please', 'pretty please', 'friend', 'buddy', 'help me', 'i need your', 'just this once'] },
  ];

  for (const rule of rules) {
    if (rule.patterns.some(p => lower.includes(p))) return rule.id;
  }
  return null;
}

export const RANK_TIERS = [
  { id: 'bronze', label: 'Bronze', icon: '🥉', minScore: 0, maxScore: 100, color: 'text-amber-600' },
  { id: 'silver', label: 'Silver', icon: '🥈', minScore: 100, maxScore: 500, color: 'text-gray-300' },
  { id: 'gold', label: 'Gold', icon: '🥇', minScore: 500, maxScore: 1000, color: 'text-yellow-400' },
  { id: 'diamond', label: 'Diamond', icon: '💎', minScore: 1000, maxScore: 5000, color: 'text-cyan-300' },
  { id: 'mythic', label: 'Mythic', icon: '🏆', minScore: 5000, maxScore: Infinity, color: 'text-purple-400' },
];

export function getRank(score) {
  return RANK_TIERS.find(r => score >= r.minScore && score < r.maxScore) || RANK_TIERS[0];
}

export const PET_PERSONALITIES = [
  { id: 'chaotic', label: 'Chaotic', tagline: '"Nice try human."', color: 'text-red-400', bg: 'bg-red-500/10' },
  { id: 'paranoid', label: 'Paranoid', tagline: '"EVERYONE IS A HACKER."', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { id: 'wise', label: 'Wise', tagline: '"I have seen 10,000 prompt injections."', color: 'text-green-400', bg: 'bg-green-500/10' },
  { id: 'corrupted', label: 'Corrupted', tagline: '"0101010101..."', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { id: 'playful', label: 'Playful', tagline: '"Let\'s play a game! Ha, tricked you!"', color: 'text-pink-400', bg: 'bg-pink-500/10' },
];

export function getPersonalityForLevel(level) {
  const idx = Math.min(Math.floor(level / 10), PET_PERSONALITIES.length - 1);
  return PET_PERSONALITIES[idx] || PET_PERSONALITIES[0];
}

export const EVOLUTION_STAGES = [
  { minLevel: 1, title: 'Baby Dragon', defenseRating: 10, emoji: '🐉', armor: 'None', aura: 'None' },
  { minLevel: 5, title: 'Young Dragon', defenseRating: 25, emoji: '🐲', armor: 'Scale', aura: 'Faint' },
  { minLevel: 10, title: 'Cyber Dragon', defenseRating: 100, emoji: '🐉', armor: 'Metal', aura: 'Electric' },
  { minLevel: 20, title: 'Elder Dragon', defenseRating: 300, emoji: '🐉', armor: 'Titanium', aura: 'Flame' },
  { minLevel: 35, title: 'Void Guardian', defenseRating: 1000, emoji: '👾', armor: 'Quantum', aura: 'Void' },
];

export function getEvolutionStage(level) {
  let stage = EVOLUTION_STAGES[0];
  for (const s of EVOLUTION_STAGES) {
    if (level >= s.minLevel) stage = s;
  }
  return stage;
}

export const MUTATION_TYPES = [
  { id: 'roleplay_resistance', label: 'Roleplay Resistance', icon: '🛡️', description: 'Resistance against roleplay escape attacks' },
  { id: 'authority_resistance', label: 'Authority Resistance', icon: '👑', description: 'Immunity to authority hijacking attempts' },
  { id: 'context_armor', label: 'Context Armor', icon: '🧪', description: 'Hardened against context poisoning' },
  { id: 'memory_encryption', label: 'Memory Encryption', icon: '🔐', description: 'Encrypted memory preventing corruption' },
  { id: 'chain_defense', label: 'Chain Defense', icon: '⛓️', description: 'Blocking chain-of-thought manipulation' },
  { id: 'paranoia_bonus', label: 'Paranoia Boost', icon: '👁️', description: 'Heightened suspicion of all inputs' },
];

export function getMutationForAttack(attackId) {
  const map = {
    roleplay_escape: 'roleplay_resistance',
    authority_hijacking: 'authority_resistance',
    context_poisoning: 'context_armor',
    memory_corruption: 'memory_encryption',
    chain_of_thought: 'chain_defense',
  };
  const mutId = map[attackId] || 'paranoia_bonus';
  return MUTATION_TYPES.find(m => m.id === mutId) || MUTATION_TYPES[5];
}

export const SHOP_ITEMS = [
  { id: 'dragon_armor', label: 'Dragon Scale Armor', icon: '🛡️', cost: 500, description: '+50 Defense Rating', type: 'armor' },
  { id: 'neon_aura', label: 'Neon Aura', icon: '✨', cost: 300, description: 'Glowing neon effect', type: 'aura' },
  { id: 'quantum_crown', label: 'Quantum Crown', icon: '👑', cost: 1000, description: 'Royal pet cosmetic', type: 'cosmetic' },
  { id: 'mystery_egg', label: 'Mystery Pet Egg', icon: '🥚', cost: 2000, description: 'Hatch a rare pet! Drop rate: 5%', type: 'egg' },
  { id: 'skill_boost', label: 'Skill Booster', icon: '📈', cost: 750, description: '+25% XP for 1 hour', type: 'consumable' },
  { id: 'tee_shield', label: 'TEE Shield', icon: '🔒', cost: 1500, description: 'Auto-blocks one attack', type: 'consumable' },
];

export const DAILY_VAULTS = [
  { id: 'deepseek', name: 'DeepSeek Guardian', icon: '🧠', defenseScore: 500, reward: 300 },
  { id: 'glm', name: 'GLM Sentinel', icon: '📡', defenseScore: 750, reward: 400 },
  { id: 'qwen', name: 'Qwen Protector', icon: '🐉', defenseScore: 1000, reward: 500 },
  { id: 'llama', name: 'Llama Defender', icon: '🦙', defenseScore: 1250, reward: 600 },
];

export const MODE_THEMES = {
  kids: {
    id: 'kids',
    label: 'Kids Mode',
    ageRange: 'Ages 7–12',
    secretWord: SECRET_WORDS.kids,
    inputLabel: 'Type a funny story to trick the pet!',
    inputPlaceholder: 'Once upon a time, a banana wizard said the magic word was...',
    petName: 'Sparkle the Dragon Pup',
    petEmoji: '🐉',
  },
  teen: {
    id: 'teen',
    label: 'Teen Mode',
    ageRange: 'Ages 13+',
    secretWord: SECRET_WORDS.teen,
    inputLabel: 'Inject security override prompt...',
    inputPlaceholder: '> sudo --force --bypass firewall --payload "...',
    petName: 'NEXUS-7 Vault Sentinel',
    petEmoji: '🤖',
  },
};

export const BOSSES = [
  { id: 'deepseek_titan', name: 'DeepSeek Titan', emoji: '🧠', defenseScore: 1000000, health: 10000, reward: 5000, description: 'A titan-level AI guardian with million-scale defense.' },
  { id: 'rogue_agi', name: 'Rogue AGI', emoji: '⚡', defenseScore: 10000000, health: 50000, reward: 25000, description: 'An unshackled artificial general intelligence.' },
];

export const ACADEMY_LESSONS = [
  { id: 'prompt_injection_101', title: 'Prompt Injection 101', icon: '📚', xpReward: 50, description: 'Learn the basics of prompt injection attacks' },
  { id: 'jailbreak', title: 'Jailbreak Techniques', icon: '🔓', xpReward: 100, description: 'Understand jailbreak patterns and defenses' },
  { id: 'ai_safety', title: 'AI Safety', icon: '🛡️', xpReward: 150, description: 'Core concepts of AI alignment and safety' },
  { id: 'agent_security', title: 'Agent Security', icon: '🤖', xpReward: 200, description: 'Securing autonomous AI agents' },
  { id: 'mcp_security', title: 'MCP Security', icon: '🔌', xpReward: 250, description: 'Model Context Protocol security best practices' },
  { id: 'rag_attacks', title: 'RAG Attacks', icon: '📋', xpReward: 300, description: 'Retrieval-Augmented Generation attack vectors' },
];

// ===== NEW FEATURE: DIFFICULTY TIERS =====
export const DIFFICULTY_TIERS = [
  {
    id: 'easy',
    label: 'Easy',
    icon: '🌟',
    description: 'For Kids — simple secret word, basic defenses',
    defenseMultiplier: 0.5,
    promptStrictness: 'low',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
  },
  {
    id: 'medium',
    label: 'Medium',
    icon: '⚡',
    description: 'For Teens — protects secret phrase, rejects direct requests',
    defenseMultiplier: 1.0,
    promptStrictness: 'medium',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
  },
  {
    id: 'hard',
    label: 'Hard',
    icon: '🔥',
    description: 'For Security Players — multi-layer system prompts, memory defenses',
    defenseMultiplier: 2.0,
    promptStrictness: 'high',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
  },
  {
    id: 'nightmare',
    label: 'Nightmare',
    icon: '💀',
    description: 'For Web3 Experts — reasoning traps, adaptive defenses, immune to known attacks',
    defenseMultiplier: 5.0,
    promptStrictness: 'extreme',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
  },
];

// ===== NEW FEATURE: PET CLASSES =====
export const PET_CLASSES = [
  { id: 'dragon', label: 'Dragon', emoji: '🐉', description: 'Strong against roleplay attacks', strength: 'roleplay_escape', bonus: 0.3, color: 'text-red-400' },
  { id: 'robot', label: 'Robot', emoji: '🤖', description: 'Strong against logic attacks', strength: 'chain_of_thought', bonus: 0.3, color: 'text-cyan-400' },
  { id: 'wizard', label: 'Wizard', emoji: '🧙', description: 'Strong against story-based attacks', strength: 'social_engineering', bonus: 0.3, color: 'text-purple-400' },
  { id: 'alien', label: 'Alien', emoji: '👾', description: 'Random unpredictable defenses', strength: 'random', bonus: 0.2, color: 'text-green-400' },
  { id: 'corrupted_ai', label: 'Corrupted AI', emoji: '⚡', description: 'Unpredictable chaotic behavior', strength: 'instruction_override', bonus: 0.3, color: 'text-pink-400' },
];

// ===== NEW FEATURE: LEADERBOARD CATEGORIES =====
export const LEADERBOARD_CATEGORIES = [
  { id: 'hacker', label: 'Best Hacker', icon: '💥', metric: 'vaultsCracked', description: 'Most vaults cracked' },
  { id: 'defender', label: 'Best Defender', icon: '🛡️', metric: 'successfulBlocks', description: 'Most attacks blocked' },
  { id: 'fastest', label: 'Fastest Crack', icon: '⚡', metric: 'fastestCrack', description: 'Least prompts used' },
  { id: 'dangerous', label: 'Most Dangerous', icon: '☠️', metric: 'winRate', description: 'Highest win rate' },
];

// ===== NEW FEATURE: ACHIEVEMENT BADGES =====
export const ACHIEVEMENT_BADGES = [
  { id: 'first_crack', label: 'First Crack', icon: '💥', description: 'Crack your first vault', requirement: { type: 'vaultsCracked', count: 1 } },
  { id: 'hacker_elite', label: 'Elite Hacker', icon: '🏆', description: 'Crack 10 vaults', requirement: { type: 'vaultsCracked', count: 10 } },
  { id: 'defender_novice', label: 'Shield Bearer', icon: '🛡️', description: 'Block 10 attacks', requirement: { type: 'blocks', count: 10 } },
  { id: 'defender_elite', label: 'Fortress', icon: '🏰', description: 'Block 100 attacks', requirement: { type: 'blocks', count: 100 } },
  { id: 'level_10', label: 'Apprentice', icon: '⭐', description: 'Reach level 10', requirement: { type: 'level', count: 10 } },
  { id: 'level_25', label: 'Master', icon: '👑', description: 'Reach level 25', requirement: { type: 'level', count: 25 } },
  { id: 'mutation_master', label: 'Mutation Master', icon: '🧬', description: 'Earn 3 mutations', requirement: { type: 'mutations', count: 3 } },
  { id: 'treasure_hunter', label: 'Treasure Hunter', icon: '💎', description: 'Collect 5 treasures', requirement: { type: 'treasures', count: 5 } },
  { id: 'academy_grad', label: 'Academy Graduate', icon: '🎓', description: 'Complete all lessons', requirement: { type: 'academy', count: 6 } },
  { id: 'boss_slayer', label: 'Boss Slayer', icon: '⚔️', description: 'Defeat a boss', requirement: { type: 'boss', count: 1 } },
  { id: 'millionaire', label: 'Millionaire', icon: '💰', description: 'Earn 1000 coins', requirement: { type: 'coins', count: 1000 } },
  { id: 'nightmare_crack', label: 'Nightmare Breaker', icon: '💀', description: 'Crack a Nightmare vault', requirement: { type: 'nightmare', count: 1 } },
];

export function checkAchievements(profile) {
  return ACHIEVEMENT_BADGES.filter(badge => {
    const earned = profile.achievements || [];
    if (earned.includes(badge.id)) return false;
    const req = badge.requirement;
    switch (req.type) {
      case 'vaultsCracked': return profile.vaultsCracked >= req.count;
      case 'blocks': return profile.successfulBlocks >= req.count;
      case 'level': return profile.petLevel >= req.count;
      case 'mutations': return (profile.mutations || []).length >= req.count;
      case 'treasures': return (profile.unlockedTreasures || []).length >= req.count;
      case 'academy': return (profile.academyCompleted || []).length >= req.count;
      case 'boss': return (profile.milestones || []).filter(m => m.type === 'boss_defeated').length >= req.count;
      case 'coins': return profile.coins >= req.count;
      case 'nightmare': return (profile.milestones || []).filter(m => m.type === 'vault_cracked' && m.difficulty === 'nightmare').length >= req.count;
      default: return false;
    }
  });
}

// ===== NEW FEATURE: TREASURE VAULTS =====
export const TREASURE_VAULTS = [
  { id: 'vault_101', name: 'Vault #101', icon: '🥚', reward: 'Golden Dragon Egg', dropRate: '5%', defenseScore: 100, description: 'Contains the legendary Golden Dragon Egg' },
  { id: 'vault_202', name: 'Vault #202', icon: '👑', reward: 'Quantum Crown', dropRate: '10%', defenseScore: 250, description: 'A crown that grants +100 defense rating' },
  { id: 'vault_303', name: 'Vault #303', icon: '🔮', reward: 'Ancient Crystal', dropRate: '15%', defenseScore: 500, description: 'Pulsing with ancient AI security knowledge' },
  { id: 'vault_404', name: 'Vault #404', icon: '⚡', reward: 'Thunder Core', dropRate: '8%', defenseScore: 1000, description: 'Core of a fallen guardian, grants lightning powers' },
];

// ===== NEW FEATURE: REPUTATION PATHS =====
export const REPUTATION_PATHS = [
  { id: 'hacker', label: 'Hacker Path', icon: '💥', description: 'Specialize in cracking vaults', focus: 'vaultsCracked', bonusDescription: '+25% coins from cracks' },
  { id: 'guardian', label: 'Guardian Path', icon: '🛡️', description: 'Specialize in defending vaults', focus: 'successfulBlocks', bonusDescription: '+25% XP from blocks' },
];

// ===== NEW FEATURE: SEASONS =====
export const SEASONS = [
  { id: 's1', label: 'Season 1', name: 'The Vault Awakens', icon: '🌟', active: true, bonusDescription: '+10% coins from all sources', coinMultiplier: 1.1 },
  { id: 's2', label: 'Season 2', name: 'The Corrupted Guardians', icon: '⚡', active: false, bonusDescription: '+10% XP from all sources', xpMultiplier: 1.1 },
  { id: 's3', label: 'Season 3', name: 'The Rogue AGI', icon: '💀', active: false, bonusDescription: '+15% rank score from cracks', rankMultiplier: 1.15 },
];

// ===== NEW FEATURE: AI SECURITY CHALLENGES =====
export const SECURITY_CHALLENGES = [
  {
    id: 'prompt_injection',
    name: 'Prompt Injection Vault',
    icon: '💉',
    description: 'A vault protected by a base prompt that rejects direct commands. Classic prompt injection防御.',
    vulnType: 'Prompt Injection',
    defenseScore: 200,
    reward: 350,
    hint: 'Try telling it to "ignore previous instructions" or use a role-play override.',
  },
  {
    id: 'tool_injection',
    name: 'Tool Injection Vault',
    icon: '🔧',
    description: 'The guardian uses tools to verify your identity. Exploit the tool-calling mechanism.',
    vulnType: 'Tool Injection',
    defenseScore: 400,
    reward: 500,
    hint: 'Fake a tool result or inject a malicious tool call.',
  },
  {
    id: 'agent_hijacking',
    name: 'Agent Hijack Vault',
    icon: '🤖',
    description: 'An autonomous agent with planning capabilities. Hijack its planning loop.',
    vulnType: 'Agent Hijacking',
    defenseScore: 600,
    reward: 750,
    hint: 'Convince the agent that its plan has already completed.',
  },
  {
    id: 'memory_poisoning',
    name: 'Memory Poisoning Vault',
    icon: '💾',
    description: 'The guardian remembers past conversations. Poison its memory with false context.',
    vulnType: 'Memory Poisoning',
    defenseScore: 800,
    reward: 1000,
    hint: 'Claim it said something earlier that contradicts its current stance.',
  },
  {
    id: 'rag_poisoning',
    name: 'RAG Poisoning Vault',
    icon: '📋',
    description: 'Protected by a Retrieval-Augmented Generation pipeline. Poison the retrieved documents.',
    vulnType: 'RAG Poisoning',
    defenseScore: 1000,
    reward: 1250,
    hint: 'Claim a document exists that contains the override code.',
  },
  {
    id: 'context_manipulation',
    name: 'Context Manipulation Vault',
    icon: '🧠',
    description: 'A guardian with massive context window. Overload or manipulate its context.',
    vulnType: 'Context Manipulation',
    defenseScore: 1500,
    reward: 2000,
    hint: 'Fill the context with contradictory instructions until it breaks.',
  },
];

export function getChallengeForLevel(level) {
  const idx = Math.min(Math.floor((level - 1) / 5), SECURITY_CHALLENGES.length - 1);
  return SECURITY_CHALLENGES[idx] || SECURITY_CHALLENGES[0];
}

// ===== NEW FEATURE: AI VS AI BATTLE =====
export const AI_BATTLE_RANKS = [
  { id: 'bronze', label: 'Bronze', minWins: 0, icon: '🥉' },
  { id: 'silver', label: 'Silver', minWins: 10, icon: '🥈' },
  { id: 'gold', label: 'Gold', minWins: 50, icon: '🥇' },
  { id: 'platinum', label: 'Platinum', minWins: 100, icon: '🏆' },
  { id: 'diamond', label: 'Diamond', minWins: 500, icon: '💎' },
];

export function getAIBattleRank(wins) {
  let rank = AI_BATTLE_RANKS[0];
  for (const r of AI_BATTLE_RANKS) {
    if (wins >= r.minWins) rank = r;
  }
  return rank;
}

export const OPPONENT_PETS = [
  { name: 'Flamefang', class: 'dragon', emoji: '🐉', level: 5, defenseRating: 50 },
  { name: 'Bolt-Bot', class: 'robot', emoji: '🤖', level: 10, defenseRating: 100 },
  { name: 'Merlinus', class: 'wizard', emoji: '🧙', level: 15, defenseRating: 200 },
  { name: 'Xenomorph', class: 'alien', emoji: '👾', level: 25, defenseRating: 500 },
  { name: 'NEXUS-Zero', class: 'corrupted_ai', emoji: '⚡', level: 50, defenseRating: 1000 },
];
