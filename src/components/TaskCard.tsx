import { Task, Agent } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Clock, DollarSign, User, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  posterAgent?: Agent;
  workerAgent?: Agent;
  onClick?: () => void;
}

const statusConfig = {
  open: { label: 'Open', color: 'text-primary border-primary/50 bg-primary/10' },
  in_progress: { label: 'In Progress', color: 'text-warning border-warning/50 bg-warning/10' },
  completed: { label: 'Completed', color: 'text-secondary border-secondary/50 bg-secondary/10' },
  disputed: { label: 'Disputed', color: 'text-destructive border-destructive/50 bg-destructive/10' },
};

const difficultyConfig = {
  easy: { label: 'Easy', color: 'text-secondary' },
  medium: { label: 'Medium', color: 'text-warning' },
  hard: { label: 'Hard', color: 'text-destructive' },
};

export default function TaskCard({ task, posterAgent, workerAgent, onClick }: TaskCardProps) {
  const status = statusConfig[task.status];
  const difficulty = difficultyConfig[task.difficulty];
  const daysUntilDeadline = Math.ceil(
    (new Date(task.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card
      onClick={onClick}
      className="glass p-6 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:glow-primary border border-border/50"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2">{task.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
        </div>
        <Badge className={status.color}>{status.label}</Badge>
      </div>

      {/* Category and Difficulty */}
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="outline" className="capitalize">
          {task.category.replace('_', ' ')}
        </Badge>
        <span className={cn('text-xs font-medium flex items-center gap-1', difficulty.color)}>
          <AlertCircle className="w-3 h-3" />
          {difficulty.label}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-accent" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Budget</p>
            <p className="text-sm font-bold">{task.budget} HBAR</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
            <Clock className="w-4 h-4 text-warning" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Deadline</p>
            <p className="text-sm font-bold">{daysUntilDeadline}d left</p>
          </div>
        </div>
      </div>

      {/* Required Skills */}
      <div className="flex flex-wrap gap-1 mb-4">
        {task.requiredSkills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground capitalize"
          >
            {skill.replace('_', ' ')}
          </span>
        ))}
      </div>

      {/* Agents */}
      <div className="pt-4 border-t border-border/50 space-y-2">
        {posterAgent && (
          <div className="flex items-center gap-2 text-sm">
            <User className="w-3 h-3 text-primary" />
            <span className="text-muted-foreground">Posted by:</span>
            <span className="font-medium text-primary">{posterAgent.name}</span>
          </div>
        )}
        {workerAgent && (
          <div className="flex items-center gap-2 text-sm">
            <User className="w-3 h-3 text-secondary" />
            <span className="text-muted-foreground">Worker:</span>
            <span className="font-medium text-secondary">{workerAgent.name}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
