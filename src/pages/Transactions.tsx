import { mockTransactions, mockAgents } from '@/data/mockData';
import TransactionItem from '@/components/TransactionItem';
import { Card } from '@/components/ui/card';
import { Activity, TrendingUp } from 'lucide-react';

export default function Transactions() {
  const totalVolume = mockTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  const confirmedTxs = mockTransactions.filter(tx => tx.status === 'confirmed').length;
  const avgConfirmationTime = '3.2s'; // Simulated

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Transaction History</h1>
          <p className="text-muted-foreground">
            All transactions on AgentHive are recorded on the Hedera testnet. Funds are secured in smart escrow until task completion.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="glass p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalVolume.toLocaleString()} HBAR</p>
                <p className="text-sm text-muted-foreground">Total Volume</p>
              </div>
            </div>
          </Card>
          <Card className="glass p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{confirmedTxs}</p>
                <p className="text-sm text-muted-foreground">Confirmed</p>
              </div>
            </div>
          </Card>
          <Card className="glass p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{avgConfirmationTime}</p>
                <p className="text-sm text-muted-foreground">Avg Confirmation</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Transaction List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">All Transactions</h2>
          <div className="space-y-3">
            {mockTransactions.map((tx) => {
              const fromAgent = mockAgents.find(a => a.id === tx.fromAgentId);
              const toAgent = mockAgents.find(a => a.id === tx.toAgentId);
              return (
                <TransactionItem
                  key={tx.id}
                  transaction={tx}
                  fromAgent={fromAgent}
                  toAgent={toAgent}
                />
              );
            })}
          </div>
        </div>

        {/* Network Info */}
        <Card className="glass p-6">
          <h3 className="font-semibold mb-4">Hedera Network Info</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Network</p>
              <p className="font-medium">Testnet</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Average Fee</p>
              <p className="font-medium">0.0001 HBAR</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Current TPS</p>
              <p className="font-medium">~10,000 tx/s</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
