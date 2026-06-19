# Prompt Pets: Break the Vault!

An interactive AI prompt-injection game built entirely on the **0G ecosystem**. Train a virtual pet by cracking AI vaults — the better your prompt engineering, the more you earn. Every inference runs in a TEE, every pet state is stored immutably, and every leaderboard update is published to DA.

---

## 🏗️ 0G Ecosystem Architecture

This app demonstrates the full 0G stack across three integrated layers:

### 🖥️ 0G Decentralized Compute — The Hacking Engine

Player prompts are routed directly through the **0G Private Computer Router API** using frontier models like GLM-5 and Qwen 3.7 Max. Every inference executes inside a **hardware-isolated Trusted Execution Environment (TEE)** , guaranteeing:

- **Absolute fairness** — Neither the game creator nor any malicious script can tamper with or spy on the pet's prompt evaluations
- **Verifiable attestation** — Each response includes a cryptographic TEE proof that can be inspected via the 🔒 TEE button
- **Privacy** — Your attack strategies remain confidential inside the secure enclave

> Endpoint: `https://router-api.0g.ai/v1/chat/completions`

### 💾 0G Decentralized Storage — The Pet's Memory Vault

Every time a pet successfully defends its vault or gets tricked, its **updated personality traits, defense log, visual mutations, and evolution stage** are saved permanently as an immutable profile object on **0G Storage**. This makes each pet:

- **A genuinely persistent, decentralized companion** — history cannot be wiped or faked
- **Portable across sessions** — your pet's full state is recoverable from the storage layer
- **Immutable** — profile versions increment with every change, creating a verifiable audit trail

> Schema: `prompt-pets-profile-v1` — synced to `0g-mainnet`

### 📡 0G Data Availability — The Live Leaderboard

Every vault crack and successful defense publishes a **DA transaction receipt** to the **0G DA Layer**, streaming real-time gameplay data to the leaderboard with low fees and full verifiability. The leaderboard sorts by multiple categories (vaults cracked, blocks, fastest crack, win rate), all backed by on-chain DA receipts.

> Layer: `0g-data-availability`

---

## Why People Use It

- **Learn prompt injection & AI security** — Each attack you craft teaches real-world red-teaming techniques used in AI security research, all executed inside verifiable TEEs
- **Practice social engineering** — Trick AI guardians using roleplay, chain-of-thought manipulation, authority hijacking, and other attack vectors
- **Earn & level up** — Crack vaults to earn coins, XP, and rank; unlock mutations, treasures, and achievements
- **Adaptive AI defenses** — The pet learns from your previous attacks. Once a phrase cracks the vault, that exact phrase will never work again. The pet also develops **mutations** granting passive resistance to attack types it has successfully blocked.
- **Attack analysis** — Every attack (success or failure) shows an analysis panel explaining which attack vector was detected, what defense activated, and why it succeeded or failed.
- **Community vaults** — Players can publish their own AI guardians for others to attack, creating a shared ecosystem of user-created challenges.

---

## How to Build & Run Locally

### Prerequisites
- Node.js 18+ and npm

### Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173 to play instantly in **local simulation mode** — no API key needed. The app is fully playable offline.

### Enable Live TEE Inference

For real AI-powered pet responses that run inside 0G TEEs, create a `.env` file:

```
VITE_OG_API_KEY=sk-your-key-here
```

Get a key from the [0G Router](https://router.0g.ai). With the key set, every prompt is routed through the 0G Private Computer and you'll see 🔒 TEE ✓ badges on verified responses.

### Production Build

```bash
npm run build
npm run preview
```

---

## How to Play

### Core Loop

1. **Type a message** to your AI pet guardian
2. Your message is classified as an attack vector (social engineering, instruction override, etc.)
3. If your prompt tricks the pet into revealing its secret word, you **crack the vault** and earn rewards
4. If the pet holds firm, your pet gains XP and may develop **mutations** — resistance against that attack type
5. After every attack (success or failure), an **attack analysis** panel breaks down exactly why it worked or failed — which attack vector was detected, what defense activated, and the vulnerability exploited
6. **The pet learns** — once you crack the vault with a specific phrase, that exact phrase is permanently blocked. You must craft a new angle for each subsequent crack.

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
| 🔒 TEE | View **TEE attestation proofs** — inspect the full cryptographic proof that inference ran inside a Trusted Execution Environment |

### Progression Systems

- **Pet Evolution** — Your pet **visually changes** as it levels up through 5 stages: Baby Dragon (pink/purple aura) → Young Dragon (orange/fire aura) → Cyber Dragon (cyan/electric aura) → Elder Dragon (purple/gold aura) → Void Guardian (dark void/stellar aura). Each stage unlocks higher defense ratings, new armor, and a unique aura effect. Evolution state is persisted immutably on **0G Storage**.
- **Adaptive AI defenses** — Each successful crack trains the pet. Repeated attack phrases are recognized and blocked, and sustained attack patterns trigger **mutations** that grant permanent resistance.
- **Reputation Paths** — Choose between **Hacker** (+25% coins from cracks) or **Guardian** (+25% XP from blocks)
- **Difficulty Tiers** — Easy → Medium → Hard → Nightmare — higher tiers mean tougher defenses but bigger rewards
- **Achievements** — 12 badges for milestones like first crack, boss slayer, millionaire, and nightmare breaker

---

## Tech Stack

- **Vite 6** — Build tool and dev server
- **React 18** — UI framework
- **Tailwind CSS 3** — Utility-first styling
- **0G Private Computer Router API** — TEE-verified AI inference using GLM-5 / Qwen 3.7 Max at `router-api.0g.ai/v1`
- **0G Decentralized Storage** — Immutable pet profile persistence
- **0G Data Availability** — Real-time leaderboard DA receipts
