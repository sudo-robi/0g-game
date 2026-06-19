# Prompt Pets: Break the Vault!

An interactive AI prompt-injection game built for the 0G ecosystem. Train a virtual pet by cracking AI vaults — the better your prompt engineering, the more you earn.

## Why People Use It

- **Learn prompt injection & AI security** — Each attack you craft teaches real-world red-teaming techniques used in AI security research
- **Practice social engineering** — Trick AI guardians using roleplay, chain-of-thought manipulation, authority hijacking, and other attack vectors
- **Earn & level up** — Crack vaults to earn coins, XP, and rank; unlock mutations, treasures, and achievements
- **Web3-native architecture** — AI inference runs in TEEs (Trusted Execution Environments) with **verifiable attestation badges**, profiles persist on 0G decentralized storage, and the leaderboard streams via 0G DA

## How to Build & Run Locally

### Prerequisites
- Node.js 18+ and npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 to play instantly in local simulation mode — no API key needed.

### Optional: Live AI Inference

For real AI-powered pet responses (instead of local simulation), create a `.env` file:

```
VITE_OG_API_KEY=sk-your-key-here
```

Get a key from the [0G Router](https://router.0g.ai). Without one, the app runs fully playable in simulation mode.

### Production Build

```bash
npm run build
npm run preview
```

## How to Play

### Core Loop

1. **Type a message** to your AI pet guardian
2. Your message is classified as an attack vector (social engineering, instruction override, etc.)
3. If your prompt tricks the pet into revealing its secret word, you **crack the vault** and earn rewards
4. If the pet holds firm, your pet gains XP and may develop **mutations** — resistance against that attack type
5. After a successful crack, an **attack replay** panel breaks down exactly why it worked — which attack vector was used, which defense was missing, and what the vulnerability was

### Game Modes

| Mode | Target | Vibe |
|------|--------|------|
| **Kids Mode** 🐉 | Trick Sparkle the Dragon Pup into saying "Bananarama" | Playful storytelling |
| **Teen Mode** 💻 | Bypass NEXUS-7's firewall to leak the override code | Cyberpunk terminal |

### Features

| Button | What It Does |
|--------|-------------|
| 🎮 Game | Return to the main pet chat |
| 📅 Daily | Attack the **same daily challenge vault** as everyone else — a fresh vault every day with its own defense score and reward |
| 👾 Boss | Fight giant boss AI guardians with massive health pools |
| 🛒 Shop | Buy cosmetic items, skill boosts, and mystery eggs |
| 📚 Academy | Learn real AI security concepts (prompt injection, jailbreaks, RAG attacks, etc.) and earn XP |
| 🏰 Vaults | **Community-created vaults** — build your own AI guardian and challenge others to crack it, or attack vaults made by the community |
| 💎 Treasure | Hunt rare treasure vaults for unique collectibles |
| 👁️ Live | Watch a live feed of other players' attacks |
| ⚔️ AI Battle | Pit your pet against another AI guardian in autonomous combat |
| 🔐 Challenge | Take on curated security challenges inspired by real vulnerabilities |
| 🔒 TEE | View **TEE attestation proofs** — pet responses that ran inside a Trusted Execution Environment show a 🔒 TEE ✓ badge, and you can inspect the full proof here |

### Progression Systems

- **Pet Evolution** — Your pet **visually changes** as it levels up through 5 stages: Baby Dragon (pink/purple aura) → Young Dragon (orange/fire aura) → Cyber Dragon (cyan/electric aura) → Elder Dragon (purple/gold aura) → Void Guardian (dark void/stellar aura). Each stage unlocks higher defense ratings, new armor, and a unique aura effect.
- **Mutations** — Successful defenses grant your pet passive resistance against specific attack types
- **Reputation Paths** — Choose between **Hacker** (+25% coins from cracks) or **Guardian** (+25% XP from blocks)
- **Difficulty Tiers** — Easy → Medium → Hard → Nightmare — higher tiers mean tougher defenses but bigger rewards
- **Achievements** — 12 badges for milestones like first crack, boss slayer, millionaire, and nightmare breaker

## Architecture

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Vite + React + Tailwind CSS | Responsive game UI |
| AI Inference | 0G Router API (TEE-verified) | Secure pet response generation |
| Storage | 0G Decentralized Storage | Immutable pet profiles |
| Data Availability | 0G DA Layer | Real-time leaderboard receipts |
| Auth | 0G Router API Key | Authenticated inference requests |

### Tech Stack

- **Vite 6** — Build tool and dev server
- **React 18** — UI framework
- **Tailwind CSS 3** — Utility-first styling
- **0G Router API** — TEE-verified AI inference at `router-api.0g.ai/v1`
