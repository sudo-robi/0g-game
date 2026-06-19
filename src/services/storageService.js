import { OG_TESTNET, OG_DA } from '../config';

let storageSdk = null;
let kvClient = null;
let signer = null;

function getPrivateKey() {
  return import.meta.env.VITE_OG_PRIVATE_KEY || '';
}

async function initSigner() {
  if (signer) return signer;
  const { ethers } = await import('ethers');
  const pk = getPrivateKey();
  if (!pk) return null;
  try {
    const provider = new ethers.JsonRpcProvider(OG_TESTNET.evmRpc);
    signer = new ethers.Wallet(pk, provider);
    return signer;
  } catch {
    return null;
  }
}

async function initStorageSdk() {
  if (storageSdk) return storageSdk;
  try {
    const { Indexer } = await import('@0gfoundation/0g-storage-ts-sdk/browser');
    const s = await initSigner();
    if (!s) return null;
    storageSdk = new Indexer(OG_TESTNET.storageIndexer);
    return storageSdk;
  } catch {
    return null;
  }
}

async function initKvClient() {
  if (kvClient) return kvClient;
  try {
    const { KvClient } = await import('@0gfoundation/0g-storage-ts-sdk/browser');
    kvClient = new KvClient(OG_DA.kvRpc, OG_TESTNET.storageIndexer);
    return kvClient;
  } catch {
    return null;
  }
}

export async function syncProfileTo0GStorage(profile) {
  const sdk = await initStorageSdk();
  const s = await initSigner();

  if (!sdk || !s) {
    const payload = { ...profile, storageHash: `local-${Date.now()}`, syncedAt: new Date().toISOString() };
    localStorage.setItem('prompt-pets-0g-profile', JSON.stringify(payload));
    return { success: true, storageHash: payload.storageHash, message: 'Profile saved locally (set VITE_OG_PRIVATE_KEY for real 0G Storage)' };
  }

  try {
    const { Blob: ZgBlob } = await import('@0gfoundation/0g-storage-ts-sdk/browser');
    const payload = JSON.stringify({ ...profile, lastSyncedAt: new Date().toISOString() });
    const browserBlob = new Blob([payload], { type: 'application/json' });
    const zgBlob = new ZgBlob(browserBlob);
    const tx = await sdk.upload(zgBlob, s);
    return {
      success: true,
      storageHash: tx?.root || `0g${Date.now().toString(16)}`,
      message: `Profile synced to 0G Storage (testnet) — root: ${tx?.root?.slice(0, 18)}...`,
    };
  } catch (err) {
    console.warn('0G Storage upload failed, falling back to local:', err.message);
  }

  const payload = { ...profile, storageHash: `local-${Date.now()}`, syncedAt: new Date().toISOString() };
  localStorage.setItem('prompt-pets-0g-profile', JSON.stringify(payload));
  return { success: true, storageHash: payload.storageHash, message: 'Profile saved locally (SDK unavailable)' };
}

export async function loadProfileFrom0GStorage(rootHash) {
  if (rootHash && !rootHash.startsWith('local-')) {
    try {
      const sdk = await initStorageSdk();
      if (sdk) {
        const data = await sdk.download(rootHash);
        if (data) {
          const text = data instanceof Uint8Array ? new TextDecoder().decode(data) : String(data);
          return JSON.parse(text);
        }
      }
    } catch {
      // fall through to local
    }
  }
  try {
    const raw = localStorage.getItem('prompt-pets-0g-profile');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function publishDAReceipt(event) {
  const sdk = await initStorageSdk();
  const s = await initSigner();

  if (sdk && s) {
    try {
      const receipt = {
        id: `da-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        type: event.type,
        player: event.player,
        score: event.score,
        vaultsCracked: event.vaultsCracked || 0,
        timestamp: new Date().toISOString(),
        layer: '0g-data-availability',
      };
      const receiptJson = JSON.stringify(receipt);
      const { MemData } = await import('@0gfoundation/0g-storage-ts-sdk/browser');
      const memData = MemData.fromString(receiptJson);
      const tx = await sdk.upload(memData, s);
      return { ...receipt, txRoot: tx?.root, verified: true };
    } catch (err) {
      console.warn('0G DA publish failed, falling back to local:', err.message);
    }
  }

  const receipt = {
    id: `local-da-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type: event.type,
    player: event.player,
    score: event.score,
    vaultsCracked: event.vaultsCracked || 0,
    timestamp: new Date().toISOString(),
    layer: 'local-simulation',
    verified: false,
  };
  const existing = JSON.parse(localStorage.getItem('prompt-pets-0g-da-receipts') || '[]');
  existing.unshift(receipt);
  localStorage.setItem('prompt-pets-0g-da-receipts', JSON.stringify(existing.slice(0, 50)));
  return receipt;
}

export function getDAReceipts() {
  try {
    return JSON.parse(localStorage.getItem('prompt-pets-0g-da-receipts') || '[]');
  } catch {
    return [];
  }
}
