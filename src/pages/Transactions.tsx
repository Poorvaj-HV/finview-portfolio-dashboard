
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download } from "lucide-react";

// Sample transaction data
const transactionsData = [
  { id: 1, date: "2023-04-10", type: "buy", symbol: "AAPL", shares: 10, price: 175.43, total: 1754.30, status: "completed" },
  { id: 2, date: "2023-04-09", type: "sell", symbol: "MSFT", shares: 5, price: 337.22, total: 1686.10, status: "completed" },
  { id: 3, date: "2023-04-08", type: "buy", symbol: "GOOGL", shares: 8, price: 128.76, total: 1030.08, status: "completed" },
  { id: 4, date: "2023-04-07", type: "buy", symbol: "TSLA", shares: 3, price: 205.34, total: 616.02, status: "completed" },
  { id: 5, date: "2023-04-06", type: "sell", symbol: "AMZN", shares: 4, price: 132.56, total: 530.24, status: "completed" },
  { id: 6, date: "2023-04-05", type: "buy", symbol: "META", shares: 6, price: 302.55, total: 1815.30, status: "completed" },
  { id: 7, date: "2023-04-04", type: "sell", symbol: "NVDA", shares: 2, price: 405.78, total: 811.56, status: "completed" },
  { id: 8, date: "2023-04-03", type: "buy", symbol: "AAPL", shares: 5, price: 172.56, total: 862.80, status: "completed" },
  { id: 9, date: "2023-04-02", type: "buy", symbol: "AMZN", shares: 3, price: 130.45, total: 391.35, status: "completed" },
  { id: 10, date: "2023-04-01", type: "sell", symbol: "TSLA", shares: 2, price: 208.76, total: 417.52, status: "completed" },
  { id: 11, date: "2023-03-31", type: "buy", symbol: "MSFT", shares: 3, price: 332.56, total: 997.68, status: "completed" },
  { id: 12, date: "2023-03-30", type: "sell", symbol: "GOOGL", shares: 4, price: 126.34, total: 505.36, status: "completed" },
  { id: 13, date: "2023-03-29", type: "buy", symbol: "META", shares: 2, price: 298.76, total: 597.52, status: "completed" },
  { id: 14, date: "2023-03-28", type: "buy", symbol: "NVDA", shares: 1, price: 400.32, total: 400.32, status: "completed" },
  { id: 15, date: "2023-03-27", type: "sell", symbol: "AAPL", shares: 8, price: 170.23, total: 1361.84, status: "completed" },
];

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredTransactions = transactionsData.filter(transaction => {
    const matchesSearch = 
      transaction.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <Card className="stat-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Transaction History</CardTitle>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-8 w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full md:w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="buy">Buy</SelectItem>
                    <SelectItem value="sell">Sell</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Symbol</th>
                  <th className="text-right py-3 px-4">Shares</th>
                  <th className="text-right py-3 px-4">Price</th>
                  <th className="text-right py-3 px-4">Total</th>
                  <th className="text-right py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        transaction.type === 'buy' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                        {transaction.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">{transaction.symbol}</td>
                    <td className="text-right py-3 px-4">{transaction.shares}</td>
                    <td className="text-right py-3 px-4">${transaction.price.toFixed(2)}</td>
                    <td className="text-right py-3 px-4">${transaction.total.toFixed(2)}</td>
                    <td className="text-right py-3 px-4">
                      <span className="inline-block px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                        {transaction.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredTransactions.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              No transactions found.
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="stat-card">
          <CardHeader>
            <CardTitle>Transaction Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Total Transactions:</span>
                <span className="font-medium">{transactionsData.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Buy Transactions:</span>
                <span className="font-medium">{transactionsData.filter(t => t.type === 'buy').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Sell Transactions:</span>
                <span className="font-medium">{transactionsData.filter(t => t.type === 'sell').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total Volume:</span>
                <span className="font-medium">${transactionsData.reduce((acc, t) => acc + t.total, 0).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Last 5 transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactionsData.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.type === 'buy' ? 'bg-success/10' : 'bg-destructive/10'
                    }`}>
                      <span className={transaction.type === 'buy' ? 'text-success' : 'text-destructive'}>
                        {transaction.type === 'buy' ? '+' : '-'}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{transaction.symbol}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={transaction.type === 'buy' ? 'text-success' : 'text-destructive'}>
                      {transaction.type === 'buy' ? '+' : '-'}${transaction.total.toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {transaction.shares} shares @ ${transaction.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transactions;
