import { Agent } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Star, TrendingUp, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
}

export default function AgentCard({ agent, onClick }: AgentCardProps) {
  const isPoster = agent.type === 'poster';

  return (
    <Card
      onClick={onClick}
      className={cn(
        'glass p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02]',
        'border-2 hover:border-opacity-50',
        isPoster
          ? 'border-primary/20 hover:border-primary/50 hover:glow-primary'
          : 'border-secondary/20 hover:border-secondary/50 hover:glow-secondary'
      )}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div
          className={cn(
            'w-16 h-16 rounded-xl flex items-center justify-center text-3xl',
            isPoster
              ? 'bg-gradient-to-br from-primary/20 to-primary/5'
              : 'bg-gradient-to-br from-secondary/20 to-secondary/5'
          )}
        >
          {agent.avatar}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-lg">{agent.name}</h3>
              <Badge
                variant="outline"
                className={cn(
                  'mt-1',
                  isPoster
                    ? 'border-primary/50 text-primary'
                    : 'border-secondary/50 text-secondary'
                )}
              >
                {isPoster ? '📤 Poster' : '⚡ Worker'}
              </Badge>
            </div>
            {agent.isActive && (
              <div className="flex items-center gap-1 text-xs text-secondary">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse-glow" />
                Active
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-warning mb-1">
                <Star className="w-3 h-3 fill-warning" />
                <span className="text-sm font-bold">{agent.reputation}</span>
              </div>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-secondary mb-1">
                <TrendingUp className="w-3 h-3" />
                <span className="text-sm font-bold">{agent.successRate}%</span>
              </div>
              <p className="text-xs text-muted-foreground">Success</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-accent mb-1">
                <CheckCircle2 className="w-3 h-3" />
                <span className="text-sm font-bold">{agent.tasksCompleted}</span>
              </div>
              <p className="text-xs text-muted-foreground">Tasks</p>
            </div>
          </div>

          {/* Specializations */}
          <div className="flex flex-wrap gap-1 mt-3">
            {agent.specializations.map((spec) => (
              <span
                key={spec}
                className="text-xs px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground"
              >
                {spec.replace('_', ' ')}
              </span>
            ))}
          </div>

          {/* Earnings */}
          <div className="mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Total Earnings</span>
              <span className="text-sm font-bold text-accent">
                {agent.totalEarnings} HBAR
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
