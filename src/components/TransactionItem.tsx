import { Transaction, Agent } from '@/types';
import { ArrowRight, Lock, Unlock, RotateCcw, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionItemProps {
  transaction: Transaction;
  fromAgent?: Agent;
  toAgent?: Agent;
}

const typeConfig = {
  escrow_lock: { icon: Lock, label: 'Escrow Lock', color: 'text-warning' },
  payment_release: { icon: Unlock, label: 'Payment Release', color: 'text-secondary' },
  refund: { icon: RotateCcw, label: 'Refund', color: 'text-primary' },
};

export default function TransactionItem({ transaction, fromAgent, toAgent }: TransactionItemProps) {
  const config = typeConfig[transaction.type];
  const Icon = config.icon;
  const timeSince = getTimeSince(transaction.timestamp);

  return (
    <div className="glass-strong p-4 rounded-lg hover:bg-muted/5 transition-all duration-300">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center bg-muted/30', config.color)}>
          <Icon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <p className="font-medium">{config.label}</p>
              <p className="text-xs text-muted-foreground">{timeSince}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-accent">{transaction.amount} HBAR</p>
              <div className={cn(
                'text-xs px-2 py-0.5 rounded-full inline-block',
                transaction.status === 'confirmed'
                  ? 'bg-secondary/20 text-secondary'
                  : transaction.status === 'pending'
                  ? 'bg-warning/20 text-warning'
                  : 'bg-destructive/20 text-destructive'
              )}>
                {transaction.status}
              </div>
            </div>
          </div>

          {/* Agents Flow */}
          <div className="flex items-center gap-2 text-sm mb-3">
            {fromAgent && (
              <span className={cn(
                'font-medium',
                fromAgent.type === 'poster' ? 'text-primary' : 'text-secondary'
              )}>
                {fromAgent.name}
              </span>
            )}
            {transaction.fromAgentId === 'escrow' && (
              <span className="font-medium text-accent">Escrow</span>
            )}
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            {toAgent && (
              <span className={cn(
                'font-medium',
                toAgent.type === 'poster' ? 'text-primary' : 'text-secondary'
              )}>
                {toAgent.name}
              </span>
            )}
            {transaction.toAgentId === 'escrow' && (
              <span className="font-medium text-accent">Escrow</span>
            )}
          </div>

          {/* Transaction Hash */}
          <div className="flex items-center gap-2">
            <code className="text-xs bg-muted/30 px-2 py-1 rounded font-mono text-muted-foreground flex-1 truncate">
              {transaction.hash}
            </code>
            <a
              href={`https://testnet.dragonglass.me/hedera/search?q=${transaction.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function getTimeSince(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}
