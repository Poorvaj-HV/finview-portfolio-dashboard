
import { BarChart, LineChart, PieChart, Wallet } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart as RechartPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { LineChart as RechartLineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { BarChart as RechartBarChart, Bar } from "recharts";

// Sample data
const portfolioData = [
  { name: "Stocks", value: 45000, color: "#3b82f6" },
  { name: "Crypto", value: 20000, color: "#8b5cf6" },
  { name: "Cash", value: 15000, color: "#10b981" },
  { name: "Bonds", value: 10000, color: "#f59e0b" },
  { name: "Real Estate", value: 30000, color: "#ef4444" },
];

const portfolioHistoryData = [
  { date: "Jan", value: 100000 },
  { date: "Feb", value: 105000 },
  { date: "Mar", value: 102000 },
  { date: "Apr", value: 108000 },
  { date: "May", value: 115000 },
  { date: "Jun", value: 112000 },
  { date: "Jul", value: 120000 },
];

const stockPerformanceData = [
  { name: "AAPL", price: 175.43, change: 2.43, changePercent: 1.4, volume: 3500 },
  { name: "MSFT", price: 337.22, change: 5.18, changePercent: 1.56, volume: 4200 },
  { name: "AMZN", price: 132.56, change: -1.22, changePercent: -0.91, volume: 2800 },
  { name: "GOOGL", price: 128.76, change: 0.82, changePercent: 0.64, volume: 1900 },
  { name: "TSLA", price: 205.34, change: -4.56, changePercent: -2.17, volume: 5100 },
];

const tradeVolumeData = [
  { date: "Mon", buy: 1200, sell: 900 },
  { date: "Tue", buy: 1800, sell: 1200 },
  { date: "Wed", buy: 1400, sell: 1600 },
  { date: "Thu", buy: 2000, sell: 1400 },
  { date: "Fri", buy: 1600, sell: 1300 },
];

const recentTransactions = [
  { id: 1, type: "buy", symbol: "AAPL", shares: 10, price: 175.43, date: "2023-04-10", total: 1754.30 },
  { id: 2, type: "sell", symbol: "MSFT", shares: 5, price: 337.22, date: "2023-04-09", total: 1686.10 },
  { id: 3, type: "buy", symbol: "GOOGL", shares: 8, price: 128.76, date: "2023-04-08", total: 1030.08 },
  { id: 4, type: "buy", symbol: "TSLA", shares: 3, price: 205.34, date: "2023-04-07", total: 616.02 },
  { id: 5, type: "sell", symbol: "AMZN", shares: 4, price: 132.56, date: "2023-04-06", total: 530.24 },
];

const Dashboard = () => {
  const totalPortfolioValue = portfolioData.reduce((sum, item) => sum + item.value, 0);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Portfolio Value Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPortfolioValue)}</div>
            <p className="text-xs text-muted-foreground">
              +{formatCurrency(totalPortfolioValue - portfolioHistoryData[0].value)} (+
              {(((totalPortfolioValue - portfolioHistoryData[0].value) / portfolioHistoryData[0].value) * 100).toFixed(2)}
              %) since Jan
            </p>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Change</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">+$1,238</div>
            <p className="text-xs text-muted-foreground">+0.8% from yesterday</p>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">MSFT</div>
            <p className="text-xs text-muted-foreground text-success">+1.56% today</p>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Trade Size</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,123</div>
            <p className="text-xs text-muted-foreground">21 trades this month</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="stat-card md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Portfolio Allocation</CardTitle>
            <CardDescription>How your assets are distributed</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartPieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), "Value"]}
                />
              </RechartPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="stat-card md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>Portfolio History</CardTitle>
            <CardDescription>Value over time (YTD)</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartLineChart
                data={portfolioHistoryData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="date" />
                <YAxis 
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), "Value"]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </RechartLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Stock Performance Table */}
      <Card className="stat-card">
        <CardHeader>
          <CardTitle>Stock Performance</CardTitle>
          <CardDescription>Your top holdings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Symbol</th>
                  <th className="text-right py-3 px-4">Price</th>
                  <th className="text-right py-3 px-4">Change</th>
                  <th className="text-right py-3 px-4">Change %</th>
                  <th className="text-right py-3 px-4">Volume</th>
                </tr>
              </thead>
              <tbody>
                {stockPerformanceData.map((stock) => (
                  <tr key={stock.name} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 font-medium">{stock.name}</td>
                    <td className="text-right py-3 px-4">${stock.price.toFixed(2)}</td>
                    <td className={`text-right py-3 px-4 ${stock.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                    </td>
                    <td className={`text-right py-3 px-4 ${stock.changePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </td>
                    <td className="text-right py-3 px-4">{stock.volume.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Trade Volume and Recent Transactions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="stat-card">
          <CardHeader>
            <CardTitle>Trading Volume</CardTitle>
            <CardDescription>Buy vs. Sell volume</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartBarChart data={tradeVolumeData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="buy" fill="#3b82f6" name="Buy" />
                <Bar dataKey="sell" fill="#ef4444" name="Sell" />
              </RechartBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Last 5 trades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">Type</th>
                    <th className="text-left py-2 px-3">Symbol</th>
                    <th className="text-right py-2 px-3">Shares</th>
                    <th className="text-right py-2 px-3">Price</th>
                    <th className="text-right py-2 px-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-2 px-3">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          transaction.type === 'buy' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-destructive/10 text-destructive'
                        }`}>
                          {transaction.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-2 px-3 font-medium">{transaction.symbol}</td>
                      <td className="text-right py-2 px-3">{transaction.shares}</td>
                      <td className="text-right py-2 px-3">${transaction.price.toFixed(2)}</td>
                      <td className="text-right py-2 px-3">${transaction.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
