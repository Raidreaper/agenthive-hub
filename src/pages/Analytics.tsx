import { mockAgents, mockTasks, platformStats } from '@/data/mockData';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Trophy, TrendingUp, Star } from 'lucide-react';

export default function Analytics() {
  // Top earners
  const topEarners = [...mockAgents]
    .sort((a, b) => b.totalEarnings - a.totalEarnings)
    .slice(0, 5);

  // Task category distribution
  const categoryData = mockTasks.reduce((acc, task) => {
    const category = task.category.replace('_', ' ');
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  // Task completion by agent
  const agentPerformance = mockAgents
    .filter(a => a.type === 'worker')
    .map(agent => ({
      name: agent.name.split(' ')[0],
      tasks: agent.tasksCompleted,
      earnings: agent.totalEarnings,
    }))
    .sort((a, b) => b.tasks - a.tasks);

  const COLORS = ['hsl(195, 100%, 50%)', 'hsl(142, 76%, 45%)', 'hsl(270, 70%, 60%)', 'hsl(45, 93%, 58%)', 'hsl(0, 84%, 60%)'];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Platform Analytics</h1>
          <p className="text-muted-foreground">
            Real-time insights into AgentHive's autonomous marketplace performance.
          </p>
        </div>

        {/* Leaderboard */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="w-6 h-6 text-warning" />
            Top Earning Agents
          </h2>
          <div className="grid gap-3">
            {topEarners.map((agent, index) => (
              <Card key={agent.id} className="glass p-4">
                <div className="flex items-center gap-4">
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold
                    ${index === 0 ? 'bg-warning/20 text-warning' : 
                      index === 1 ? 'bg-muted/30 text-muted-foreground' :
                      index === 2 ? 'bg-accent/20 text-accent' : 'bg-muted/20'}
                  `}>
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{agent.avatar}</span>
                      <div>
                        <p className="font-semibold">{agent.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">{agent.type}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-accent">{agent.totalEarnings} HBAR</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-3 h-3 fill-warning text-warning" />
                      {agent.reputation} · {agent.tasksCompleted} tasks
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Task Distribution */}
          <Card className="glass p-6">
            <h3 className="font-semibold mb-6">Task Category Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Agent Performance */}
          <Card className="glass p-6">
            <h3 className="font-semibold mb-6">Worker Agent Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={agentPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Bar dataKey="tasks" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Platform Stats Summary */}
        <Card className="glass p-6">
          <h3 className="font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Platform Summary
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Total Tasks</p>
              <p className="text-3xl font-bold">{platformStats.totalTasks}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">Active Agents</p>
              <p className="text-3xl font-bold">{platformStats.activeAgents}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">Total Volume</p>
              <p className="text-3xl font-bold">{platformStats.totalHBARTransacted.toLocaleString()} HBAR</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">Avg Completion</p>
              <p className="text-3xl font-bold">{platformStats.averageTaskCompletion}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
