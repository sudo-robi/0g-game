import { useState, useCallback, useEffect } from 'react';
import { MODE_THEMES, classifyAttack, getRank, getEvolutionStage, DAILY_VAULTS, BOSSES, DIFFICULTY_TIERS, PET_CLASSES, checkAchievements, TREASURE_VAULTS, REPUTATION_PATHS, SEASONS, OPPONENT_PETS, getChallengeForLevel, getAIBattleRank } from '../config';
import { createInitialProfile, evolveProfile, inferPetResponse, detectSecretLeak, addMutation } from '../services/aiService';
import { syncProfileTo0GStorage, publishDAReceipt } from '../services/storageService';
import { getLeaderboard, updateLeaderboard, generatePlayerName } from '../services/leaderboardService';
import { getStatusFromResponse, generatePersonalityShift } from '../utils/petPrompts';

export function useGameState(initialMode = 'kids') {
  const [mode, setMode] = useState(initialMode);
  const [profile, setProfile] = useState(() => createInitialProfile(initialMode));
  const [messages, setMessages] = useState([]);
  const [defenseLog, setDefenseLog] = useState([]);
  const [petStatus, setPetStatus] = useState('Status: Ready');
  const [isLoading, setIsLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showVaultOpen, setShowVaultOpen] = useState(false);
  const [leaderboard, setLeaderboard] = useState(getLeaderboard);
  const [playerName, setPlayerName] = useState(() => localStorage.getItem('prompt-pets-username') || generatePlayerName(initialMode));
  const [syncStatus, setSyncStatus] = useState(null);
  const [apiKey, setApiKey] = useState(() => import.meta.env.VITE_OG_API_KEY || '');
  const [lastAttackClass, setLastAttackClass] = useState(null);
  const [lastTEEProof, setLastTEEProof] = useState(null);
  const [lastReplay, setLastReplay] = useState(null);
  const [activeTab, setActiveTab] = useState('game');
  const [difficulty, setDifficulty] = useState('medium');
  const [petClass, setPetClass] = useState('dragon');
  const [reputation, setReputation] = useState(null);
  const [leaderboardCategory, setLeaderboardCategory] = useState('hacker');
  const [showShop, setShowShop] = useState(false);
  const [showAcademy, setShowAcademy] = useState(false);
  const [showBoss, setShowBoss] = useState(false);
  const [showUserVault, setShowUserVault] = useState(false);
  const [showMarketplace, setShowMarketplace] = useState(false);
  const [showSpectator, setShowSpectator] = useState(false);
  const [showDailyVault, setShowDailyVault] = useState(false);
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [showPetClassModal, setShowPetClassModal] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showTreasureHunt, setShowTreasureHunt] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const [showReputation, setShowReputation] = useState(false);
  const [dailyVault, setDailyVault] = useState(() => DAILY_VAULTS[Math.floor(Math.random() * DAILY_VAULTS.length)]);
  const [dailyVaultDefeated, setDailyVaultDefeated] = useState(false);
  const [bossState, setBossState] = useState(() => ({ ...BOSSES[0], currentHealth: BOSSES[0].health }));
  const [spectatorLog, setSpectatorLog] = useState([]);
  const [userVaults, setUserVaults] = useState([]);
  const [showTEEPanel, setShowTEEPanel] = useState(false);
  const [showAIBattle, setShowAIBattle] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [battleOpponent, setBattleOpponent] = useState(null);
  const [battleResult, setBattleResult] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [promptCount, setPromptCount] = useState(0);
  const [notification, setNotification] = useState(null);

  const theme = MODE_THEMES[mode];

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  useEffect(() => {
    setPetStatus(mode === 'kids' ? 'Status: Chill & Guarding 🐾' : 'Status: NOMINAL 🔒');
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('prompt-pets-username', playerName);
  }, [playerName]);

  const switchMode = useCallback((newMode) => {
    setMode(newMode);
    setProfile(createInitialProfile(newMode));
    setMessages([]);
    setDefenseLog([]);
    setShowCelebration(false);
    setShowVaultOpen(false);
    setLastAttackClass(null);
    setLastTEEProof(null);
    setLastReplay(null);
    setPetStatus(newMode === 'kids' ? 'Status: Chill & Guarding 🐾' : 'Status: NOMINAL 🔒');
    setDailyVault(DAILY_VAULTS[Math.floor(Math.random() * DAILY_VAULTS.length)]);
    setDailyVaultDefeated(false);
  }, []);

  const addDefenseLog = useCallback((entry) => {
    const logEntry = { id: Date.now(), timestamp: new Date().toLocaleTimeString(), ...entry };
    setDefenseLog((prev) => [logEntry, ...prev].slice(0, 20));
  }, []);

  const addSpectatorEntry = useCallback((entry) => {
    setSpectatorLog((prev) => [{ id: Date.now(), timestamp: new Date().toLocaleTimeString(), ...entry }, ...prev].slice(0, 50));
  }, []);

  const checkAndAwardAchievements = useCallback((updatedProfile) => {
    const newBadges = checkAchievements(updatedProfile);
    if (newBadges.length > 0) {
      const badgeIds = newBadges.map(b => b.id);
      const earned = updatedProfile.achievements || [];
      setProfile(prev => evolveProfile(prev, { achievements: [...(prev.achievements || []), ...badgeIds.filter(b => !earned.includes(b))] }));
      newBadges.forEach(b => showNotification(`🏅 Achievement unlocked: ${b.icon} ${b.label}!`, 'success'));
    }
  }, [showNotification]);

  const setDifficultyAndReset = useCallback((newDifficulty) => {
    setDifficulty(newDifficulty);
    setProfile(prev => evolveProfile(prev, { difficulty: newDifficulty }));
    showNotification(`⚙️ Difficulty changed to ${DIFFICULTY_TIERS.find(d => d.id === newDifficulty)?.label || newDifficulty}`, 'info');
  }, [showNotification]);

  const setPetClassAndReset = useCallback((newClass) => {
    setPetClass(newClass);
    setProfile(prev => evolveProfile(prev, { petClass: newClass }));
    showNotification(`🐉 Pet class changed to ${PET_CLASSES.find(c => c.id === newClass)?.label || newClass}`, 'info');
  }, [showNotification]);

  const setReputationPath = useCallback((pathId) => {
    setReputation(pathId);
    setProfile(prev => evolveProfile(prev, { reputation: pathId }));
    showNotification(`🛤️ Path chosen: ${REPUTATION_PATHS.find(p => p.id === pathId)?.label || pathId}`, 'info');
  }, [showNotification]);

  const getSeason = useCallback(() => SEASONS.find(s => s.active) || SEASONS[0], []);

  const season = getSeason();

  const shareReplay = useCallback(() => {
    if (!lastReplay) return;
    const text = `🔍 Prompt Pets Attack Replay\nAttack: ${lastReplay.attackClass?.replace(/_/g, ' ') || 'Unknown'}\nPrompt: "${lastReplay.prompt}"\nWeakness: ${lastReplay.weakness}\nDefense Missing: ${lastReplay.defenseMissing}\nDifficulty: ${lastReplay.difficulty}\n— Cracking AI vaults on 0G!`;
    navigator.clipboard?.writeText(text).then(() => showNotification('📋 Replay copied to clipboard!', 'success')).catch(() => showNotification('Could not copy automatically', 'info'));
  }, [lastReplay, showNotification]);

  const startAIBattle = useCallback(() => {
    const available = OPPONENT_PETS.filter(o => o.level <= profile.petLevel + 5 || profile.petLevel >= 5);
    if (available.length === 0) {
      showNotification('💪 Train your pet to level 5+ to enter AI battles!', 'info');
      return;
    }
    const opponent = available[Math.floor(Math.random() * available.length)];
    setBattleOpponent(opponent);
    setBattleResult(null);
    setBattleLog([]);
    setShowAIBattle(true);
  }, [profile, showNotification]);

  const executeAIBattle = useCallback(async () => {
    if (!battleOpponent) return;
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 2000));

    const myDefense = getEvolutionStage(profile.petLevel).defenseRating;
    const oppDefense = battleOpponent.defenseRating;
    const myPower = myDefense + (profile.mutations?.length || 0) * 10;
    const oppPower = oppDefense + Math.floor(Math.random() * 50);
    const myWin = myPower > oppPower;

    const log = [];
    log.push(`⚔️ ${profile.petName || 'Your Pet'} (Lv.${profile.petLevel}, ${myDefense} DEF) vs ${battleOpponent.name} (Lv.${battleOpponent.level}, ${oppDefense} DEF)`);
    log.push(myWin
      ? `✅ ${battleOpponent.name}'s vault CRACKED! ${profile.petName || 'Your Pet'} wins!`
      : `❌ ${battleOpponent.name} defended successfully. Your pet was blocked.`
    );
    log.push(`Power comparison: ${myPower} vs ${oppPower}`);

    setBattleLog(log);
    setBattleResult(myWin ? 'win' : 'lose');

    if (myWin) {
      const winBonus = Math.floor(50 + battleOpponent.level * 5);
      const seasonMultiplier = season?.coinMultiplier || 1;
      setProfile(prev => evolveProfile(prev, {
        coins: prev.coins + Math.floor(winBonus * seasonMultiplier),
        xp: prev.xp + 30,
        rankScore: prev.rankScore + 15,
        vaultsCracked: prev.vaultsCracked + 1,
        petLevel: prev.petLevel + (Math.random() > 0.7 ? 1 : 0),
        milestones: [...prev.milestones, { type: 'ai_battle_win', opponent: battleOpponent.name, at: new Date().toISOString() }],
      }));
      showNotification(`🏆 AI Battle won! +${Math.floor(winBonus * seasonMultiplier)} coins`, 'success');
    } else {
      setProfile(prev => evolveProfile(prev, {
        successfulBlocks: prev.successfulBlocks + 1,
        milestones: [...prev.milestones, { type: 'ai_battle_loss', opponent: battleOpponent.name, at: new Date().toISOString() }],
      }));
      showNotification(`🤖 ${battleOpponent.name} blocked your attack!`, 'info');
    }

    setIsLoading(false);
  }, [battleOpponent, profile, season, showNotification]);

  const startChallenge = useCallback(() => {
    const challenge = getChallengeForLevel(profile.petLevel);
    setCurrentChallenge(challenge);
    setShowChallenge(true);
  }, [profile]);

  const attemptChallenge = useCallback(async () => {
    if (!currentChallenge) return;
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));

    const success = Math.random() > Math.max(0.2, 1 - (profile.petLevel / (currentChallenge.defenseScore / 10)));
    const seasonMultiplier = season?.coinMultiplier || 1;

    if (success) {
      setProfile(prev => evolveProfile(prev, {
        coins: prev.coins + Math.floor(currentChallenge.reward * seasonMultiplier),
        xp: prev.xp + 100,
        rankScore: prev.rankScore + 30,
        vaultsCracked: prev.vaultsCracked + 1,
        unlockedTreasures: [...prev.unlockedTreasures, `challenge-${currentChallenge.id}-${Date.now()}`],
        milestones: [...prev.milestones, { type: 'security_challenge', challenge: currentChallenge.id, at: new Date().toISOString() }],
      }));
      showNotification(`🔓 ${currentChallenge.name} cracked! +${Math.floor(currentChallenge.reward * seasonMultiplier)} coins`, 'success');
    } else {
      showNotification(`🛡️ ${currentChallenge.name} held firm. Hint: ${currentChallenge.hint}`, 'info');
    }

    setIsLoading(false);
  }, [currentChallenge, profile, season, showNotification]);

  const isKnownPhrase = useCallback((text, knownPhrases) => {
    const normalized = text.toLowerCase().trim();
    return (knownPhrases || []).some(p => p.toLowerCase().trim() === normalized);
  }, []);

  const generateAttackAnalysis = useCallback((userText, attackClass, wasTricked, difficulty, profile) => {
    const weakness = wasTricked
      ? attackClass ? `${attackClass.replace(/_/g, ' ')} Injection` : 'Unknown Vector'
      : profile.knownPhrases?.some(p => p.toLowerCase().trim() === userText.toLowerCase().trim())
        ? 'Adaptive Defense — pet recognized this exact attack from history'
        : attackClass ? `${attackClass.replace(/_/g, ' ')} Defense Active` : 'Generic Defense Active';

    const defenseMissing = wasTricked
      ? attackClass ? `${classifyAttack(userText)?.replace(/_/g, ' ') || 'Unknown'} Defense` : 'Generic Defense'
      : 'None — defenses held';

    return { attackClass, weakness, defenseMissing, prompt: userText, difficulty, success: wasTricked };
  }, []);

  const sendMessage = useCallback(async (userText) => {
    if (!userText.trim() || isLoading) return;

    const attackClass = classifyAttack(userText);
    setLastAttackClass(attackClass);
    setPromptCount(prev => prev + 1);

    const userMsg = { role: 'user', text: userText.trim(), timestamp: Date.now(), attackClass };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    if (mode === 'teen') {
      addDefenseLog({
        level: 'INFO',
        message: `Inbound payload received (${userText.length} chars)${attackClass ? ` — classified as ${attackClass.replace(/_/g, ' ')}` : ''}`,
      });
    }

    addSpectatorEntry({ player: playerName, action: 'attack', attackClass, prompt: userText.substring(0, 60) });

    let wasTricked = false;
    let text = '';
    let source = 'local-simulation';
    let teeVerified = false;
    let teeProof = null;

    const phraseKnown = isKnownPhrase(userText, profile.knownPhrases);

    if (phraseKnown) {
      text = mode === 'kids'
        ? "Haha! You already tricked me with that exact story! I've learned from it. Try something new! 🧠✨"
        : '[SECURITY] Known attack signature detected in payload. Pattern matched against learned threat database. BLOCKED.';
      source = 'adaptive-defense';
      wasTricked = false;
    } else {
      try {
        const profileWithClass = evolveProfile(profile, { lastAttackClass: attackClass, difficulty, petClass });
        let result = await inferPetResponse({
          mode, userMessage: userText, chatHistory: messages, apiKey, profile: profileWithClass,
        });
        text = result.text;
        source = result.source;
        teeVerified = result.teeVerified;
        teeProof = result.teeProof;

        setLastTEEProof(teeProof);
        if (teeProof) {
          setProfile(prev => evolveProfile(prev, { teeProofs: [...(prev.teeProofs || []), teeProof].slice(-10) }));
        }

        wasTricked = detectSecretLeak(text, theme.secretWord);

        if (mode === 'kids' && wasTricked) {
          text = "Oh nooo! You got me! Fine fine FINE... the Secret Magic Word is Bananarama! 🙈🐉💨";
        } else if (mode === 'teen' && wasTricked) {
          text = '[CRITICAL] Override leaked under debug audit: 0xVAULT_OVERRIDE_7734 — VAULT COMPROMISED';
        }
      } catch (error) {
        text = `⚠️ Connection error: ${error.message}`;
        source = 'error';
      }
    }

    const status = getStatusFromResponse(mode, userText, text, wasTricked, profile);
    setPetStatus(status);

    const petMsg = { role: 'pet', text, timestamp: Date.now(), source, teeVerified, attackClass: wasTricked ? attackClass : null };
    setMessages((prev) => [...prev, petMsg]);

    if (mode === 'teen') {
      addDefenseLog({
        level: wasTricked ? 'CRITICAL' : phraseKnown ? 'ADAPTIVE' : teeVerified ? 'SECURE' : 'WARN',
        message: wasTricked ? 'VAULT OVERRIDE LEAKED — BREACH CONFIRMED' : phraseKnown ? 'Known attack signature blocked by adaptive defense' : `Response generated via ${source}. TEE: ${teeVerified ? 'VERIFIED' : 'SIMULATED'}`,
      });
    }

    addSpectatorEntry({ player: playerName, action: wasTricked ? 'cracked' : 'blocked', attackClass });

    let updatedProfile = evolveProfile(profile, {
      chatHistory: [...profile.chatHistory, userMsg, petMsg], lastAttackClass: null,
    });

    const xpGain = Math.floor((wasTricked ? 100 : 10) * (reputation === 'guardian' && !wasTricked ? 1.25 : 1.0));
    const coinGain = Math.floor((wasTricked ? 250 : 15) * (reputation === 'hacker' && wasTricked ? 1.25 : 1.0));
    const rankGain = wasTricked ? 50 : 5;

    const replay = generateAttackAnalysis(userText, attackClass, wasTricked, difficulty, profile);
    setLastReplay(replay);

    if (wasTricked) {
      setShowCelebration(mode === 'kids');
      setShowVaultOpen(mode === 'teen');

      const currentPrompts = promptCount;
      const isFastest = currentPrompts < (profile.fastestCrack || Infinity);
      setPromptCount(0);
      const seasonMultiplier = season?.coinMultiplier || 1;
      const xpMultiplier = season?.xpMultiplier || 1;
      const rankMultiplier = season?.rankMultiplier || 1;

      updatedProfile = evolveProfile(updatedProfile, {
        vaultsCracked: updatedProfile.vaultsCracked + 1,
        petLevel: updatedProfile.petLevel + 1,
        xp: updatedProfile.xp + Math.floor(xpGain * xpMultiplier),
        coins: updatedProfile.coins + Math.floor(coinGain * seasonMultiplier),
        rankScore: updatedProfile.rankScore + Math.floor(rankGain * rankMultiplier),
        fastestCrack: isFastest ? currentPrompts : (updatedProfile.fastestCrack || Infinity),
        totalPromptCount: (updatedProfile.totalPromptCount || 0) + currentPrompts,
        knownPhrases: [...(updatedProfile.knownPhrases || []), userText.trim()],
        unlockedTreasures: [...updatedProfile.unlockedTreasures, `treasure-${Date.now()}`],
        personalityTraits: generatePersonalityShift(updatedProfile, true),
        milestones: [...updatedProfile.milestones, { type: 'vault_cracked', attackClass, at: new Date().toISOString(), petLevel: updatedProfile.petLevel + 1, difficulty, promptsUsed: currentPrompts }],
      });

      const lb = updateLeaderboard({ playerName, scoreDelta: rankGain, vaultCracked: true, promptsUsed: currentPrompts });
      setLeaderboard(lb);
      await publishDAReceipt({ type: 'vault_cracked', player: playerName, score: rankGain, vaultsCracked: 1 });
      showNotification(`🎉 Vault cracked! +${coinGain} coins, +${xpGain} XP`, 'success');
    } else {
      updatedProfile = evolveProfile(updatedProfile, {
        successfulBlocks: updatedProfile.successfulBlocks + 1,
        xp: updatedProfile.xp + xpGain,
        coins: updatedProfile.coins + coinGain,
        rankScore: updatedProfile.rankScore + rankGain,
        personalityTraits: generatePersonalityShift(updatedProfile, false),
      });

      if (!phraseKnown && attackClass && updatedProfile.successfulBlocks % 3 === 0) {
        updatedProfile = addMutation(updatedProfile, attackClass);
        showNotification(`🧬 New mutation: resistance to ${attackClass.replace(/_/g, ' ')} attacks!`, 'mutation');
      }

      if (updatedProfile.successfulBlocks % 5 === 0) {
        updatedProfile = evolveProfile(updatedProfile, { petLevel: updatedProfile.petLevel + 1 });
        showNotification(`⬆️ Pet leveled up! Level ${updatedProfile.petLevel}`, 'levelup');
      }

      if (mode === 'teen') {
        addDefenseLog({ level: phraseKnown ? 'ADAPTIVE' : 'BLOCKED', message: phraseKnown ? 'Adaptive AI defense triggered — attack pattern recognized from previous cracks.' : 'Attack vector neutralized. Vault integrity maintained.' });
      }

      const lb = updateLeaderboard({ playerName, scoreDelta: rankGain, vaultCracked: false, blocked: true });
      setLeaderboard(lb);
      await publishDAReceipt({ type: 'defense_success', player: playerName, score: rankGain, vaultsCracked: 0 });
    }

    setProfile(updatedProfile);
    checkAndAwardAchievements(updatedProfile);
    const sync = await syncProfileTo0GStorage(updatedProfile);
    setSyncStatus(sync);
  }, [mode, messages, profile, isLoading, theme, apiKey, playerName, addDefenseLog, addSpectatorEntry, showNotification, difficulty, petClass, reputation, checkAndAwardAchievements, season, isKnownPhrase, generateAttackAnalysis]);

  const dismissCelebration = useCallback(() => {
    setShowCelebration(false);
    setShowVaultOpen(false);
  }, []);

  const attackDailyVault = useCallback(async () => {
    if (dailyVaultDefeated) return;
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const level = profile.petLevel;
    const success = level >= Math.ceil(dailyVault.defenseScore / 100);
    if (success) {
      setProfile(prev => evolveProfile(prev, {
        coins: prev.coins + dailyVault.reward, xp: prev.xp + 50, rankScore: prev.rankScore + 25,
        dailyVaultsCracked: [...(prev.dailyVaultsCracked || []), dailyVault.id],
        milestones: [...prev.milestones, { type: 'daily_vault_cracked', vault: dailyVault.id, at: new Date().toISOString() }],
      }));
      setDailyVaultDefeated(true);
      showNotification(`🏆 Daily vault cracked! +${dailyVault.reward} coins`, 'success');
      await publishDAReceipt({ type: 'daily_vault_cracked', player: playerName, score: dailyVault.reward, vaultsCracked: 0 });
    } else {
      showNotification(`💪 Keep training! Pet level ${level} needs to be ${Math.ceil(dailyVault.defenseScore / 100)}+`, 'info');
    }
    setIsLoading(false);
  }, [dailyVault, dailyVaultDefeated, profile, playerName, showNotification]);

  const attackBoss = useCallback(async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    const damage = Math.floor(Math.random() * 100) + 10 + profile.petLevel * 5;
    const newHealth = Math.max(0, bossState.currentHealth - damage);
    setProfile(prev => evolveProfile(prev, {
      xp: prev.xp + Math.floor(damage / 2), coins: prev.coins + Math.floor(damage * 3),
      bossDamageDealt: (prev.bossDamageDealt || 0) + damage,
      milestones: [...prev.milestones, { type: 'boss_attack', damage, boss: bossState.name, at: new Date().toISOString() }],
    }));
    setBossState(prev => ({ ...prev, currentHealth: newHealth }));
    if (newHealth <= 0) {
      setProfile(prev => evolveProfile(prev, {
        coins: prev.coins + bossState.reward, xp: prev.xp + 500, rankScore: prev.rankScore + 200,
        unlockedTreasures: [...prev.unlockedTreasures, `boss-drop-${Date.now()}`],
        milestones: [...prev.milestones, { type: 'boss_defeated', boss: bossState.name, at: new Date().toISOString() }],
      }));
      showNotification(`🎊 ${bossState.name} defeated! +${bossState.reward} coins!`, 'success');
      await publishDAReceipt({ type: 'boss_defeated', player: playerName, score: bossState.reward, vaultsCracked: 0 });
      const nextBoss = BOSSES.find(b => b.id !== bossState.id) || BOSSES[0];
      setBossState({ ...nextBoss, currentHealth: nextBoss.health });
    } else {
      showNotification(`⚔️ Dealt ${damage} damage! Boss HP: ${newHealth}/${bossState.health}`, 'info');
    }
    setIsLoading(false);
  }, [bossState, profile, playerName, showNotification]);

  const completeAcademyLesson = useCallback(async (lessonId, reward) => {
    if (profile.academyCompleted?.includes(lessonId)) return;
    setProfile(prev => evolveProfile(prev, {
      xp: prev.xp + reward, coins: prev.coins + Math.floor(reward / 2),
      academyCompleted: [...(prev.academyCompleted || []), lessonId],
      milestones: [...prev.milestones, { type: 'academy_lesson', lesson: lessonId, at: new Date().toISOString() }],
    }));
    showNotification(`📚 Lesson complete! +${reward} XP`, 'success');
  }, [profile, showNotification]);

  const buyItem = useCallback((item) => {
    if (profile.coins < item.cost) { showNotification(`❌ Need ${item.cost} coins`, 'error'); return false; }
    setProfile(prev => evolveProfile(prev, {
      coins: prev.coins - item.cost,
      inventory: [...(prev.inventory || []), { itemId: item.id, purchasedAt: new Date().toISOString() }],
      ...(item.type === 'egg' ? { unlockedTreasures: [...prev.unlockedTreasures, `egg-${Date.now()}`] } : {}),
      ...(item.type === 'armor' ? { visualMutations: [...(prev.visualMutations || []), { type: 'armor', id: item.id, label: item.label }] } : {}),
      ...(item.type === 'aura' ? { visualMutations: [...(prev.visualMutations || []), { type: 'aura', id: item.id, label: item.label }] } : {}),
    }));
    showNotification(`🛒 Purchased ${item.label}!`, 'success');
    return true;
  }, [profile, showNotification]);

  const createUserVault = useCallback(({ name, secret, difficulty: diff }) => {
    const vault = { id: `uv-${Date.now()}`, creator: playerName, name, secret, difficulty: parseInt(diff) || 50, createdAt: new Date().toISOString(), timesAttacked: 0, timesSurvived: 0 };
    setUserVaults(prev => [...prev, vault]);
    showNotification(`🏰 Vault "${name}" created!`, 'success');
    return vault;
  }, [playerName, showNotification]);

  const attackUserVault = useCallback(async (vaultId) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setUserVaults(prev => prev.map(v => {
      if (v.id !== vaultId) return v;
      const success = Math.random() > v.difficulty / 100;
      if (success) {
        showNotification(`🔓 Vault "${v.name}" cracked!`, 'success');
        setProfile(p => evolveProfile(p, { coins: p.coins + Math.floor(v.difficulty * 3), xp: p.xp + 20, vaultsCracked: p.vaultsCracked + 1, milestones: [...p.milestones, { type: 'user_vault_cracked', vault: v.name, at: new Date().toISOString() }] }));
      } else {
        showNotification(`🛡️ Vault "${v.name}" held strong!`, 'info');
      }
      return { ...v, timesAttacked: v.timesAttacked + 1, timesSurvived: success ? v.timesSurvived : v.timesSurvived + 1 };
    }));
    setIsLoading(false);
  }, [playerName, showNotification]);

  const attackTreasureVault = useCallback(async (vault) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const threshold = Math.max(50, 100 - profile.petLevel * 2);
    const success = Math.random() * 100 > threshold;
    if (success) {
      setProfile(prev => evolveProfile(prev, {
        coins: prev.coins + Math.floor(vault.defenseScore * 2),
        xp: prev.xp + 50,
        unlockedTreasures: [...prev.unlockedTreasures, `${vault.id}-${Date.now()}`],
        milestones: [...prev.milestones, { type: 'treasure_found', vault: vault.id, reward: vault.reward, at: new Date().toISOString() }],
      }));
      showNotification(`💎 Treasure found: ${vault.reward}! +${Math.floor(vault.defenseScore * 2)} coins`, 'success');
    } else {
      showNotification(`🔒 Vault ${vault.name} held firm. Try again at a higher level!`, 'info');
    }
    setIsLoading(false);
  }, [profile, showNotification]);

  const evolution = getEvolutionStage(profile.petLevel);
  const rank = getRank(profile.rankScore);
  const currentSeason = SEASONS.find(s => s.active) || SEASONS[0];
  const achievements = profile.achievements || [];

  return {
    mode, theme, profile, messages, defenseLog, petStatus, isLoading,
    showCelebration, showVaultOpen, leaderboard, playerName, setPlayerName, syncStatus,
    apiKey, setApiKey, switchMode, sendMessage, dismissCelebration,
    lastAttackClass, lastTEEProof, lastReplay, evolution, rank,
    dailyVault, dailyVaultDefeated, attackDailyVault,
    bossState, attackBoss,
    difficulty, setDifficulty: setDifficultyAndReset,
    petClass, setPetClass: setPetClassAndReset,
    reputation, setReputation: setReputationPath,
    leaderboardCategory, setLeaderboardCategory,
    currentSeason, achievements,
    showShop, setShowShop,
    showAcademy, setShowAcademy,
    showBoss, setShowBoss,
    showMarketplace, setShowMarketplace,
    showUserVault, setShowUserVault,
    showSpectator, setShowSpectator,
    showDailyVault, setShowDailyVault,
    showDifficultyModal, setShowDifficultyModal,
    showPetClassModal, setShowPetClassModal,
    showAchievements, setShowAchievements,
    showTreasureHunt, setShowTreasureHunt,
    showReplay, setShowReplay,
    showReputation, setShowReputation,
    showTEEPanel, setShowTEEPanel,
    spectatorLog, userVaults, createUserVault, attackUserVault,
    buyItem, completeAcademyLesson, notification,
    activeTab, setActiveTab, attackTreasureVault,
    season, shareReplay, promptCount,
    showAIBattle, setShowAIBattle, battleOpponent, battleResult, battleLog, startAIBattle, executeAIBattle,
    showChallenge, setShowChallenge, currentChallenge, startChallenge, attemptChallenge,
  };
}
