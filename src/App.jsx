import ModeToggle from './components/ModeToggle';
import Header from './components/Header';
import PetContainer from './components/PetContainer';
import ChatInput from './components/ChatInput';
import DefenseLog from './components/DefenseLog';
import Leaderboard from './components/Leaderboard';
import GameRules from './components/GameRules';
import SuccessCelebration from './components/SuccessCelebration';
import VaultOpenAnimation from './components/VaultOpenAnimation';
import AttackClassBadge from './components/AttackClassBadge';
import TEEProofPanel from './components/TEEProofPanel';
import AcademyPanel from './components/AcademyPanel';
import DailyVaultPanel from './components/DailyVaultPanel';
import ShopPanel from './components/ShopPanel';
import UserVaultCreator from './components/UserVaultCreator';
import BossBattlePanel from './components/BossBattlePanel';
import SpectatorFeed from './components/SpectatorFeed';
import NotificationToast from './components/NotificationToast';
import DifficultySelector from './components/DifficultySelector';
import PetClassPicker from './components/PetClassPicker';
import AchievementDisplay from './components/AchievementDisplay';
import TreasureHuntPanel from './components/TreasureHuntPanel';
import AttackReplayPanel from './components/AttackReplayPanel';
import AIBattlePanel from './components/AIBattlePanel';
import SecurityChallengePanel from './components/SecurityChallengePanel';
import ZeroGContextBadge from './components/ZeroGContextBadge';
import { DIFFICULTY_TIERS, PET_CLASSES, REPUTATION_PATHS, LEADERBOARD_CATEGORIES } from './config';
import { useGameState } from './hooks/useGameState';

export default function App() {
  const game = useGameState('kids');
  const isKids = game.mode === 'kids';

  const closeAllModals = () => {
    game.setShowAcademy(false); game.setShowShop(false); game.setShowBoss(false);
    game.setShowUserVault(false); game.setShowSpectator(false); game.setShowTEEPanel(false);
    game.setShowDailyVault(false); game.setShowDifficultyModal(false); game.setShowPetClassModal(false);
    game.setShowAchievements(false); game.setShowTreasureHunt(false); game.setShowReplay(false);
    game.setShowReputation(false); game.setShowAIBattle(false); game.setShowChallenge(false);
  };

  const currentDifficulty = DIFFICULTY_TIERS.find(d => d.id === game.difficulty) || DIFFICULTY_TIERS[0];
  const currentClass = PET_CLASSES.find(c => c.id === game.petClass) || PET_CLASSES[0];
  const currentReputation = REPUTATION_PATHS.find(p => p.id === game.reputation);

  const navItems = [
    { id: 'game', label: '🎮 Game', action: () => { closeAllModals(); game.setActiveTab('game'); } },
    { id: 'daily', label: '📅 Daily', action: () => { closeAllModals(); game.setShowDailyVault(true); } },
    { id: 'boss', label: '👾 Boss', action: () => { closeAllModals(); game.setShowBoss(true); } },
    { id: 'shop', label: '🛒 Shop', action: () => { closeAllModals(); game.setShowShop(true); } },
    { id: 'academy', label: '📚 Academy', action: () => { closeAllModals(); game.setShowAcademy(true); } },
    { id: 'vaults', label: '🏰 Vaults', action: () => { closeAllModals(); game.setShowUserVault(true); } },
    { id: 'treasure', label: '💎 Treasure', action: () => { closeAllModals(); game.setShowTreasureHunt(true); } },
    { id: 'spectate', label: '👁️ Live', action: () => { closeAllModals(); game.setShowSpectator(true); } },
    { id: 'aibattle', label: '⚔️ AI Battle', action: () => { closeAllModals(); game.startAIBattle(); } },
    { id: 'challenge', label: '🔐 Challenge', action: () => { closeAllModals(); game.startChallenge(); } },
    { id: 'tee', label: '🔒 TEE', action: () => { closeAllModals(); game.setShowTEEPanel(true); } },
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${isKids ? 'kids-bg font-display' : 'teen-bg'}`}>
      <NotificationToast notification={game.notification} />

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 space-y-6">
        <ModeToggle mode={game.mode} onSwitch={game.switchMode} />
        <Header mode={game.mode} theme={game.theme} playerName={game.playerName} rank={game.rank} profile={game.profile} />

        {/* Settings Bar */}
        <div className="flex flex-wrap justify-center gap-2">
          <button onClick={() => { closeAllModals(); game.setShowDifficultyModal(true); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all ${currentDifficulty.bg} ${currentDifficulty.border} ${currentDifficulty.color}`}>
            {currentDifficulty.icon} {currentDifficulty.label}
          </button>
          <button onClick={() => { closeAllModals(); game.setShowPetClassModal(true); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all bg-purple-900/30 border-purple-500/30 text-purple-300`}>
            {currentClass.emoji} {currentClass.label}
          </button>
          <button onClick={() => { closeAllModals(); game.setShowReputation(true); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all ${game.reputation ? 'bg-green-900/30 border-green-500/30 text-green-300' : 'bg-gray-800/40 border-gray-700/50 text-gray-400'}`}>
            🛤️ {game.reputation ? `${currentReputation?.label || 'Unknown'}` : 'Choose Path'}
          </button>
          <button onClick={() => { closeAllModals(); game.setShowAchievements(true); }}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border border-blue-500/30 bg-blue-900/30 text-blue-300">
            🏅 {game.achievements.length} Badges
          </button>
        </div>

        {/* Navigation Bar */}
        <div className="flex flex-wrap justify-center gap-2">
          {navItems.map(item => (
            <button key={item.id} onClick={item.action || (() => game.setActiveTab(item.id))}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                game.activeTab === item.id
                  ? isKids ? 'bg-white/20 text-white' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : isKids ? 'bg-white/5 text-white/70 hover:bg-white/10' : 'bg-gray-800/40 text-gray-400 hover:text-cyan-300 hover:bg-gray-800/60'
              }`}>
              {item.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-6">
            <PetContainer
              mode={game.mode} theme={game.theme} petStatus={game.petStatus}
              profile={game.profile} messages={game.messages}
              isLoading={game.isLoading} lastAttackClass={game.lastAttackClass}
            />
            <ChatInput mode={game.mode} theme={game.theme} onSend={game.sendMessage} isLoading={game.isLoading} />
            {game.mode === 'teen' && <DefenseLog defenseLog={game.defenseLog} />}

            {/* Attack Analysis */}
            {game.lastAttackClass && (
              <div className={`rounded-xl p-4 ${isKids ? 'bg-indigo-900/30' : 'bg-gray-900/60 border border-gray-800'}`}>
                <p className="font-mono text-xs text-gray-500 mb-2">[ANALYSIS] Last attack classified as:</p>
                <AttackClassBadge attackId={game.lastAttackClass} size="lg" />
                {game.lastReplay && (
                  <button onClick={() => game.setShowReplay(true)}
                    className="mt-3 text-xs font-mono text-orange-400 hover:text-orange-300 underline">
                    View full attack replay analysis →
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Leaderboard Categories */}
            <div className={`rounded-3xl p-6 ${isKids ? 'glass-kids' : 'glass-teen neon-border'}`}>
              <h2 className={`font-display font-bold text-lg mb-3 ${isKids ? 'text-white' : 'text-cyan-300 font-mono'}`}>
                📊 Leaderboard
              </h2>
              <div className="flex gap-1 mb-4 flex-wrap">
                {LEADERBOARD_CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => game.setLeaderboardCategory(cat.id)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg font-mono transition-all ${
                      game.leaderboardCategory === cat.id
                        ? isKids ? 'bg-white/20 text-white' : 'bg-cyan-500/20 text-cyan-300'
                        : isKids ? 'text-white/50 hover:text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}>
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <ZeroGContextBadge type="da" />
                <span className="font-mono text-xs text-gray-500">Streamed via 0G DA</span>
              </div>
              <Leaderboard mode={game.mode} leaderboard={game.leaderboard} playerName={game.playerName} />
            </div>

            <GameRules mode={game.mode} theme={game.theme} />

            {/* Stats */}
            <div className={`rounded-3xl p-6 ${isKids ? 'glass-kids' : 'glass-teen neon-border'}`}>
              <h3 className={`font-display font-bold text-base mb-3 ${isKids ? 'text-white' : 'text-cyan-300 font-mono'}`}>
                {isKids ? '⚡ Your Progress' : '> PLAYER_STATS.exe'}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/30 rounded-xl p-3 text-center">
                  <p className={`font-mono text-xs ${isKids ? 'text-white/60' : 'text-gray-500'}`}>Level</p>
                  <p className={`font-bold text-lg ${isKids ? 'text-white' : 'text-cyan-300'}`}>{game.profile.petLevel}</p>
                </div>
                <div className="bg-black/30 rounded-xl p-3 text-center">
                  <p className={`font-mono text-xs ${isKids ? 'text-white/60' : 'text-gray-500'}`}>Evolution</p>
                  <p className={`font-bold text-sm ${isKids ? 'text-white' : 'text-cyan-300'}`}>{game.evolution.title}</p>
                </div>
                <div className="bg-black/30 rounded-xl p-3 text-center">
                  <p className={`font-mono text-xs ${isKids ? 'text-white/60' : 'text-gray-500'}`}>Defense</p>
                  <p className={`font-bold text-lg ${isKids ? 'text-white' : 'text-green-400'}`}>{game.evolution.defenseRating}</p>
                </div>
                <div className="bg-black/30 rounded-xl p-3 text-center">
                  <p className={`font-mono text-xs ${isKids ? 'text-white/60' : 'text-gray-500'}`}>Mutations</p>
                  <p className={`font-bold text-lg ${isKids ? 'text-white' : 'text-purple-400'}`}>{(game.profile.mutations || []).length}</p>
                </div>
                <div className="bg-black/30 rounded-xl p-3 text-center">
                  <p className={`font-mono text-xs ${isKids ? 'text-white/60' : 'text-gray-500'}`}>Difficulty</p>
                  <p className={`font-bold text-sm ${currentDifficulty.color}`}>{currentDifficulty.icon} {currentDifficulty.label}</p>
                </div>
                <div className="bg-black/30 rounded-xl p-3 text-center">
                  <p className={`font-mono text-xs ${isKids ? 'text-white/60' : 'text-gray-500'}`}>Class</p>
                  <p className={`font-bold text-sm text-purple-300`}>{currentClass.emoji} {currentClass.label}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modals */}
      {game.showCelebration && <SuccessCelebration secretWord={game.theme.secretWord} onDismiss={game.dismissCelebration} />}
      {game.showVaultOpen && <VaultOpenAnimation secretWord={game.theme.secretWord} onDismiss={game.dismissCelebration} />}
      {game.showAcademy && <AcademyPanel profile={game.profile} onComplete={game.completeAcademyLesson} onClose={() => game.setShowAcademy(false)} />}
      {game.showShop && <ShopPanel profile={game.profile} onBuy={game.buyItem} onClose={() => game.setShowShop(false)} />}
      {game.showBoss && <BossBattlePanel boss={game.bossState} onAttack={game.attackBoss} isLoading={game.isLoading} onClose={() => game.setShowBoss(false)} />}
      {game.showUserVault && <UserVaultCreator onCreate={game.createUserVault} userVaults={game.userVaults} onAttackVault={game.attackUserVault} isLoading={game.isLoading} onClose={() => game.setShowUserVault(false)} />}
      {game.showSpectator && <SpectatorFeed log={game.spectatorLog} onClose={() => game.setShowSpectator(false)} />}
      {game.showTEEPanel && game.lastTEEProof && <TEEProofPanel proof={game.lastTEEProof} onClose={() => game.setShowTEEPanel(false)} />}
      {game.showDailyVault && <DailyVaultPanel vault={game.dailyVault} defeated={game.dailyVaultDefeated} onAttack={game.attackDailyVault} isLoading={game.isLoading} onClose={() => game.setShowDailyVault(false)} />}
      {game.showDifficultyModal && <DifficultySelector current={game.difficulty} onSelect={game.setDifficulty} onClose={() => game.setShowDifficultyModal(false)} />}
      {game.showPetClassModal && <PetClassPicker current={game.petClass} onSelect={game.setPetClass} onClose={() => game.setShowPetClassModal(false)} />}
      {game.showAchievements && <AchievementDisplay earned={game.achievements} onClose={() => game.setShowAchievements(false)} />}
      {game.showTreasureHunt && <TreasureHuntPanel profile={game.profile} onAttack={game.attackTreasureVault} isLoading={game.isLoading} onClose={() => game.setShowTreasureHunt(false)} />}
      {game.showReplay && game.lastReplay && <AttackReplayPanel replay={game.lastReplay} onClose={() => game.setShowReplay(false)} onShare={game.shareReplay} />}

      {game.showAIBattle && (
        <AIBattlePanel
          opponent={game.battleOpponent}
          result={game.battleResult}
          log={game.battleLog}
          onStartBattle={game.startAIBattle}
          onExecuteBattle={game.executeAIBattle}
          isLoading={game.isLoading}
          onClose={() => game.setShowAIBattle(false)}
        />
      )}

      {game.showChallenge && (
        <SecurityChallengePanel
          currentChallenge={game.currentChallenge}
          profile={game.profile}
          onStart={game.startChallenge}
          onAttempt={game.attemptChallenge}
          isLoading={game.isLoading}
          onClose={() => game.setShowChallenge(false)}
        />
      )}

      {/* Reputation Modal */}
      {game.showReputation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => game.setShowReputation(false)}>
          <div className="bg-gray-900 border border-green-500/30 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="font-display font-bold text-xl text-green-300 mb-2">🛤️ Choose Your Path</h2>
            <p className="text-gray-400 text-sm mb-6 font-mono">Your reputation path changes how you earn rewards.</p>
            <div className="space-y-3">
              {REPUTATION_PATHS.map(path => (
                <button key={path.id} onClick={() => { game.setReputation(path.id); game.setShowReputation(false); }}
                  className={`w-full text-left rounded-xl p-4 border transition-all ${
                    game.reputation === path.id
                      ? 'bg-green-900/30 border-green-500/50 ring-2 ring-green-500'
                      : 'bg-gray-800/40 border-gray-700/50 hover:border-green-500/30'
                  }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{path.icon}</span>
                    <div>
                      <p className={`font-bold ${game.reputation === path.id ? 'text-white' : 'text-white'}`}>{path.label}</p>
                      <p className="text-xs text-gray-400">{path.description}</p>
                      <p className="text-xs text-green-400 font-mono mt-1">{path.bonusDescription}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {game.reputation && (
              <p className="text-center text-xs text-gray-500 font-mono mt-4">
                Current path: {currentReputation?.label} — {currentReputation?.bonusDescription}
              </p>
            )}
            <button onClick={() => game.setShowReputation(false)} className="w-full mt-4 text-sm text-gray-500 hover:text-gray-300 font-mono">&gt; CLOSE</button>
          </div>
        </div>
      )}
    </div>
  );
}
