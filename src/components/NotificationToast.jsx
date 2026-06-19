export default function NotificationToast({ notification }) {
  if (!notification) return null;

  const bgColor = notification.type === 'success' ? 'bg-green-900/80 border-green-500/50' :
    notification.type === 'mutation' ? 'bg-purple-900/80 border-purple-500/50' :
    notification.type === 'levelup' ? 'bg-blue-900/80 border-blue-500/50' :
    notification.type === 'error' ? 'bg-red-900/80 border-red-500/50' :
    'bg-gray-900/80 border-gray-500/50';

  return (
    <div className={`fixed top-4 right-4 z-[100] rounded-xl px-5 py-3 border ${bgColor} backdrop-blur-md shadow-2xl animate-bounce-slow max-w-sm`}>
      <p className="text-sm text-white font-semibold">{notification.message}</p>
    </div>
  );
}
