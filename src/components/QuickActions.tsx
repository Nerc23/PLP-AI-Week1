import React from 'react';
import { TrendingUp, Leaf, BarChart3, HelpCircle } from 'lucide-react';

interface QuickActionsProps {
  onQuickAction: (action: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onQuickAction }) => {
  const quickActions = [
    {
      icon: TrendingUp,
      label: 'Trending',
      action: 'What crypto is trending up?',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Leaf,
      label: 'Sustainable',
      action: 'Which crypto is most sustainable?',
      color: 'from-green-600 to-teal-600'
    },
    {
      icon: BarChart3,
      label: 'Best Overall',
      action: 'What do you recommend overall?',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: HelpCircle,
      label: 'Help',
      action: 'help',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="p-4 bg-gray-50 border-t border-gray-200">
      <div className="text-sm text-gray-600 mb-3 text-center">Quick Actions</div>
      <div className="grid grid-cols-2 gap-2">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => onQuickAction(action.action)}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-white text-sm font-medium bg-gradient-to-r ${action.color} hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
          >
            <action.icon size={16} />
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};