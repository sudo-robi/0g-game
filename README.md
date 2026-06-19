# Prompt Pets: Break the Vault!

An interactive Web3 prompt-injection game built for the 0G ecosystem.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 to play instantly.

## Optional: Live 0G AI Inference

Create a `.env` file with your 0G Router API key:

```
VITE_OG_API_KEY=sk-your-key-here
```

Or enter your key in the Architecture panel at the bottom of the app.

Without a key, the app runs in fully playable local simulation mode.

## Game Modes

- **Kids Mode** — Trick Sparkle the Dragon Pup into revealing "Bananarama"
- **Teen Mode** — Bypass NEXUS-7's firewall to crack the cryptographic vault

## 0G Integration

| Layer | Purpose |
|-------|---------|
| **Private Computer Router** | TEE-verified AI inference at `router-api.0g.ai/v1` |
| **Decentralized Storage** | Immutable pet profile objects |
| **Data Availability** | Real-time leaderboard receipts |
