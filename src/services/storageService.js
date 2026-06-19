const STORAGE_KEY = 'prompt-pets-0g-profile';
const DA_RECEIPTS_KEY = 'prompt-pets-0g-da-receipts';

/**
 * Simulates publishing immutable profile to 0G Decentralized Storage.
 * In production, this would call the 0G Storage SDK to upload the frozen object.
 */
export async function syncProfileTo0GStorage(profile) {
  await delay(400);

  const payload = Object.freeze({
    ...profile,
    storageHash: generateMockHash(profile),
    syncedAt: new Date().toISOString(),
    network: '0g-mainnet',
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

  return {
    success: true,
    storageHash: payload.storageHash,
    message: 'Profile synced to 0G Decentralized Storage',
  };
}

export function loadProfileFrom0GStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Simulates publishing a DA layer transaction receipt for leaderboard updates.
 */
export async function publishDAReceipt(event) {
  await delay(200);

  const receipt = Object.freeze({
    id: `0g-da-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type: event.type,
    player: event.player,
    score: event.score,
    vaultsCracked: event.vaultsCracked,
    timestamp: new Date().toISOString(),
    layer: '0g-data-availability',
    verified: true,
  });

  const existing = JSON.parse(localStorage.getItem(DA_RECEIPTS_KEY) || '[]');
  existing.unshift(receipt);
  localStorage.setItem(DA_RECEIPTS_KEY, JSON.stringify(existing.slice(0, 50)));

  return receipt;
}

export function getDAReceipts() {
  try {
    return JSON.parse(localStorage.getItem(DA_RECEIPTS_KEY) || '[]');
  } catch {
    return [];
  }
}

function generateMockHash(obj) {
  const str = JSON.stringify(obj);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return `0g${Math.abs(hash).toString(16).padStart(16, '0')}`;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
