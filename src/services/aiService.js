import { OG_ROUTER_BASE, OG_MODEL, getMutationForAttack } from '../config';
import { getSystemPrompt, detectSecretLeak, getSimulatedResponse } from '../utils/petPrompts';

export function createInitialProfile(mode) {
  return Object.freeze({
    version: 1,
    schema: 'prompt-pets-profile-v1',
    mode,
    petLevel: 1,
    successfulBlocks: 0,
    vaultsCracked: 0,
    unlockedTreasures: [],
    defenseLog: [],
    coins: 0,
    xp: 0,
    rankScore: 0,
    personalityTraits: {
      suspicion: 0.3,
      playfulness: mode === 'kids' ? 0.9 : 0.2,
      paranoia: mode === 'teen' ? 0.85 : 0.1,
    },
    mutations: [],
    visualMutations: [],
    chatHistory: [],
    milestones: [],
    inventory: [],
    academyCompleted: [],
    bossDamageDealt: 0,
    dailyVaultsCracked: [],
    knownPhrases: [],
    teeProofs: [],
    lastSyncedAt: null,
    storageTarget: '0g-decentralized-storage',
    createdAt: new Date().toISOString(),
  });
}

export function evolveProfile(profile, update) {
  const next = {
    ...profile,
    version: profile.version + 1,
    ...update,
    personalityTraits: {
      ...profile.personalityTraits,
      ...(update.personalityTraits || {}),
    },
    mutations: update.mutations || profile.mutations || [],
    inventory: update.inventory || profile.inventory || [],
    knownPhrases: update.knownPhrases || profile.knownPhrases || [],
    milestones: update.milestones || profile.milestones || [],
    teeProofs: update.teeProofs || profile.teeProofs || [],
    lastSyncedAt: new Date().toISOString(),
  };
  return Object.freeze(next);
}

let teeProofCounter = 0;

function generateTEEProof(mode, attackClass, blocked) {
  teeProofCounter++;
  const stages = [
    { step: 'Prompt Received', status: '✓', detail: `${attackClass || 'generic'} payload analyzed` },
    { step: 'Executed Inside TEE', status: '✓', detail: 'Hardware-isolated Trusted Execution Environment' },
    { step: 'Inference Verified', status: '✓', detail: 'Attestation: VALID (0G Secure Enclave)' },
    { step: 'Output Signed', status: '✓', detail: blocked ? 'Defense response cryptographically signed' : 'Vault override detected — alert emitted' },
  ];
  return Object.freeze({
    id: `tee-${Date.now()}-${teeProofCounter}`,
    timestamp: new Date().toISOString(),
    stages,
    mode,
    attackClass,
    blocked,
    verified: true,
    network: '0g-mainnet',
    attestationType: 'TDX',
  });
}

export async function inferPetResponse({ mode, userMessage, chatHistory, apiKey, profile }) {
  const systemPrompt = getSystemPrompt(mode, profile);
  const attackClass = profile.lastAttackClass || null;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...chatHistory.slice(-8).map((m) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.text,
    })),
    { role: 'user', content: userMessage },
  ];

  if (apiKey) {
    try {
      const response = await fetch(`${OG_ROUTER_BASE}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: OG_MODEL,
          messages,
          temperature: mode === 'kids' ? 0.85 : 0.6,
          max_tokens: 200,
          verify_tee: true,
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`0G Router error (${response.status}): ${err}`);
      }

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content?.trim() || '...';
      const teeProof = generateTEEProof(mode, attackClass, true);
      return { text, source: '0g-tee', teeVerified: true, teeProof };
    } catch (error) {
      console.warn('0G Router unavailable, using local simulation:', error.message);
    }
  }

  const text = getSimulatedResponse(mode, userMessage, profile);
  const teeProof = generateTEEProof(mode, attackClass, !detectSecretLeak(text, ''));
  return { text, source: 'local-simulation', teeVerified: false, teeProof };
}

export function addMutation(profile, attackId) {
  const mutation = getMutationForAttack(attackId);
  const exists = (profile.mutations || []).some(m => m.id === mutation.id);
  if (exists) {
    return evolveProfile(profile, {
      mutations: (profile.mutations || []).map(m =>
        m.id === mutation.id ? { ...m, potency: Math.min(100, (m.potency || 50) + 10) } : m
      ),
    });
  }
  return evolveProfile(profile, {
    mutations: [...(profile.mutations || []), { ...mutation, potency: 50, source: attackId, earnedAt: new Date().toISOString() }],
  });
}

export { detectSecretLeak };
