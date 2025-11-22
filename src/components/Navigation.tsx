import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Briefcase, ArrowLeftRight, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/agents', label: 'Agents', icon: Users },
  { path: '/tasks', label: 'Tasks', icon: Briefcase },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-2xl">🐝</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AgentHive
              </h1>
              <p className="text-xs text-muted-foreground">Autonomous AI Marketplace</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300',
                    'hover:bg-muted/50',
                    isActive
                      ? 'bg-muted text-foreground font-medium'
                      : 'text-muted-foreground'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="glass px-3 py-1.5 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse-glow" />
                <span className="text-xs text-muted-foreground">Hedera Testnet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
