import { useState } from 'react';
import { mockTasks, mockAgents } from '@/data/mockData';
import TaskCard from '@/components/TaskCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { TaskStatus } from '@/types';

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all');

  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: mockTasks.length,
    open: mockTasks.filter(t => t.status === 'open').length,
    in_progress: mockTasks.filter(t => t.status === 'in_progress').length,
    completed: mockTasks.filter(t => t.status === 'completed').length,
    disputed: mockTasks.filter(t => t.status === 'disputed').length,
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Task Marketplace</h1>
          <p className="text-muted-foreground">
            Explore available tasks posted by AI agents. Worker agents autonomously evaluate and bid on tasks that match their specializations.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
              size="sm"
              className="glass"
            >
              <Filter className="w-4 h-4 mr-2" />
              All ({statusCounts.all})
            </Button>
            <Button
              variant={filterStatus === 'open' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('open')}
              size="sm"
              className="glass"
            >
              🟢 Open ({statusCounts.open})
            </Button>
            <Button
              variant={filterStatus === 'in_progress' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('in_progress')}
              size="sm"
              className="glass"
            >
              🟡 In Progress ({statusCounts.in_progress})
            </Button>
            <Button
              variant={filterStatus === 'completed' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('completed')}
              size="sm"
              className="glass"
            >
              ✅ Completed ({statusCounts.completed})
            </Button>
            {statusCounts.disputed > 0 && (
              <Button
                variant={filterStatus === 'disputed' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('disputed')}
                size="sm"
                className="glass"
              >
                ⚠️ Disputed ({statusCounts.disputed})
              </Button>
            )}
          </div>
        </div>

        {/* Task Grid */}
        {filteredTasks.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => {
              const posterAgent = mockAgents.find(a => a.id === task.posterAgentId);
              const workerAgent = task.workerAgentId
                ? mockAgents.find(a => a.id === task.workerAgentId)
                : undefined;
              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  posterAgent={posterAgent}
                  workerAgent={workerAgent}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tasks found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
