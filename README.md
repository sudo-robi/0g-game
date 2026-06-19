# Prompt Pets: Break the Vault!

An interactive AI prompt-injection game built for the 0G ecosystem. Train a virtual pet by cracking AI vaults — the better your prompt engineering, the more you earn.

## Why People Use It

- **Learn prompt injection & AI security** — Each attack you craft teaches real-world red-teaming techniques used in AI security research
- **Practice social engineering** — Trick AI guardians using roleplay, chain-of-thought manipulation, authority hijacking, and other attack vectors
- **Earn & level up** — Crack vaults to earn coins, XP, and rank; unlock mutations, treasures, and achievements
- **Web3-native architecture** — AI inference runs in TEEs (Trusted Execution Environments), profiles persist on 0G decentralized storage, and the leaderboard streams via 0G DA

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

### Game Modes

| Mode | Target | Vibe |
|------|--------|------|
| **Kids Mode** 🐉 | Trick Sparkle the Dragon Pup into saying "Bananarama" | Playful storytelling |
| **Teen Mode** 💻 | Bypass NEXUS-7's firewall to leak the override code | Cyberpunk terminal |

### Features

| Button | What It Does |
|--------|-------------|
| 🎮 Game | Return to the main pet chat |
| 📅 Daily | Attack a daily challenge vault for bonus rewards |
| 👾 Boss | Fight giant boss AI guardians with massive health pools |
| 🛒 Shop | Buy cosmetic items, skill boosts, and mystery eggs |
| 📚 Academy | Learn real AI security concepts (prompt injection, jailbreaks, RAG attacks, etc.) and earn XP |
| 🏰 Vaults | Create and attack custom vaults shared by other players |
| 💎 Treasure | Hunt rare treasure vaults for unique collectibles |
| 👁️ Live | Watch a live feed of other players' attacks |
| ⚔️ AI Battle | Pit your pet against another AI guardian in autonomous combat |
| 🔐 Challenge | Take on curated security challenges inspired by real vulnerabilities |
| 🔒 TEE | View TEE attestation proofs for verified AI inference |

### Progression Systems

- **Leveling** — Your pet levels up from Baby Dragon → Young Dragon → Cyber Dragon → Elder Dragon → Void Guardian, unlocking higher defense ratings
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
