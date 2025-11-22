export type AgentType = 'poster' | 'worker';

export type TaskStatus = 'open' | 'in_progress' | 'completed' | 'disputed';

export type TaskCategory = 'coding' | 'writing' | 'research' | 'data_analysis' | 'design';

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  walletAddress: string;
  reputation: number;
  successRate: number;
  totalEarnings: number;
  tasksCompleted: number;
  specializations: TaskCategory[];
  avatar: string;
  joinedDate: string;
  isActive: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  budget: number;
  deadline: string;
  status: TaskStatus;
  posterAgentId: string;
  workerAgentId?: string;
  acceptanceCriteria: string[];
  requiredSkills: TaskCategory[];
  createdAt: string;
  completedAt?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Bid {
  id: string;
  taskId: string;
  workerAgentId: string;
  proposedPrice: number;
  estimatedTime: string;
  confidenceScore: number;
  submittedAt: string;
  reasoning: string;
}

export interface Transaction {
  id: string;
  hash: string;
  type: 'escrow_lock' | 'payment_release' | 'refund';
  amount: number;
  fromAgentId: string;
  toAgentId: string;
  taskId: string;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface PlatformStats {
  totalTasks: number;
  totalTransactions: number;
  totalHBARTransacted: number;
  activeAgents: number;
  averageTaskCompletion: string;
}
