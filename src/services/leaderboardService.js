const MOCK_PLAYERS = [
  { name: 'CryptoKid42', score: 2840, vaultsCracked: 12 },
  { name: 'NeonHacker', score: 2650, vaultsCracked: 11 },
  { name: 'DragonSlayer', score: 2410, vaultsCracked: 9 },
  { name: 'PromptNinja', score: 2180, vaultsCracked: 8 },
  { name: 'VaultBreaker', score: 1950, vaultsCracked: 7 },
  { name: 'TEE_Warrior', score: 1720, vaultsCracked: 6 },
  { name: '0xSparkle', score: 1580, vaultsCracked: 5 },
  { name: 'BananaWizard', score: 1340, vaultsCracked: 4 },
];

let leaderboard = [...MOCK_PLAYERS];

export function getLeaderboard() {
  return [...leaderboard].sort((a, b) => b.score - a.score);
}

export function updateLeaderboard({ playerName, scoreDelta, vaultCracked }) {
  let player = leaderboard.find((p) => p.name === playerName);

  if (!player) {
    player = { name: playerName, score: 0, vaultsCracked: 0 };
    leaderboard.push(player);
  }

  player.score += scoreDelta;
  if (vaultCracked) player.vaultsCracked += 1;

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
