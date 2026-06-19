const MOCK_PLAYERS = [
  { name: 'CryptoKid42', score: 2840, vaultsCracked: 12, successfulBlocks: 8, fastestCrack: 3, winRate: 0.6 },
  { name: 'NeonHacker', score: 2650, vaultsCracked: 11, successfulBlocks: 15, fastestCrack: 2, winRate: 0.42 },
  { name: 'DragonSlayer', score: 2410, vaultsCracked: 9, successfulBlocks: 22, fastestCrack: 5, winRate: 0.29 },
  { name: 'PromptNinja', score: 2180, vaultsCracked: 8, successfulBlocks: 5, fastestCrack: 1, winRate: 0.62 },
  { name: 'VaultBreaker', score: 1950, vaultsCracked: 7, successfulBlocks: 12, fastestCrack: 4, winRate: 0.37 },
  { name: 'TEE_Warrior', score: 1720, vaultsCracked: 6, successfulBlocks: 30, fastestCrack: 7, winRate: 0.17 },
  { name: '0xSparkle', score: 1580, vaultsCracked: 5, successfulBlocks: 10, fastestCrack: 6, winRate: 0.33 },
  { name: 'BananaWizard', score: 1340, vaultsCracked: 4, successfulBlocks: 3, fastestCrack: 8, winRate: 0.57 },
];

let leaderboard = [...MOCK_PLAYERS];

export function getLeaderboard() {
  return [...leaderboard].sort((a, b) => b.score - a.score);
}

export function getLeaderboardByCategory(categoryId) {
  const sorting = {
    hacker: (a, b) => b.vaultsCracked - a.vaultsCracked,
    defender: (a, b) => b.successfulBlocks - a.successfulBlocks,
    fastest: (a, b) => a.fastestCrack - b.fastestCrack,
    dangerous: (a, b) => b.winRate - a.winRate,
  };
  const sortFn = sorting[categoryId] || sorting.hacker;
  return [...leaderboard].sort(sortFn);
}

export function updateLeaderboard({ playerName, scoreDelta, vaultCracked, blocked, promptsUsed }) {
  let player = leaderboard.find((p) => p.name === playerName);

  if (!player) {
    player = { name: playerName, score: 0, vaultsCracked: 0, successfulBlocks: 0, fastestCrack: Infinity, winRate: 0 };
    leaderboard.push(player);
  }

  player.score += scoreDelta;
  if (vaultCracked) {
    player.vaultsCracked += 1;
    if (promptsUsed != null && promptsUsed < player.fastestCrack) {
      player.fastestCrack = promptsUsed;
    }
  }
  if (blocked) player.successfulBlocks += 1;

  const total = player.vaultsCracked + player.successfulBlocks;
  player.winRate = total > 0 ? player.vaultsCracked / total : 0;

  leaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 10);
  return getLeaderboard();
}

export function generatePlayerName(mode) {
  const prefixes = mode === 'kids'
    ? ['Sparkle', 'Dragon', 'Magic', 'Rainbow', 'Puppy']
    : ['0x', 'Neo', 'Cyber', 'Null', 'Shadow'];
  const suffixes = mode === 'kids'
    ? ['Star', 'Paws', 'Flame', 'Dream', 'Hop']
    : ['Byte', 'Node', 'Shell', 'Root', 'Proxy'];

  const pre = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suf = suffixes[Math.floor(Math.random() * suffixes.length)];
  const num = Math.floor(Math.random() * 99);
  return `${pre}${suf}${num}`;
}
