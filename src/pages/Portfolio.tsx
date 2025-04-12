
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

// Sample data
const portfolioData = [
  { name: "Stocks", value: 45000, color: "#3b82f6" },
  { name: "Crypto", value: 20000, color: "#8b5cf6" },
  { name: "Cash", value: 15000, color: "#10b981" },
  { name: "Bonds", value: 10000, color: "#f59e0b" },
  { name: "Real Estate", value: 30000, color: "#ef4444" },
];

const stocksData = [
  { name: "AAPL", value: 15000, color: "#3b82f6" },
  { name: "MSFT", value: 12000, color: "#8b5cf6" },
  { name: "GOOGL", value: 8000, color: "#10b981" },
  { name: "AMZN", value: 6000, color: "#f59e0b" },
  { name: "TSLA", value: 4000, color: "#ef4444" },
];

const cryptoData = [
  { name: "BTC", value: 12000, color: "#3b82f6" },
  { name: "ETH", value: 5000, color: "#8b5cf6" },
  { name: "SOL", value: 3000, color: "#10b981" },
];

const Portfolio = () => {
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
        <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
        <div className="text-sm text-muted-foreground">
          Total Value: {formatCurrency(totalPortfolioValue)}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full stat-card">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Breakdown of your investments</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), "Value"]}
                />
                <Legend 
                  formatter={(value) => {
                    const item = portfolioData.find(entry => entry.name === value);
                    const percentage = ((item?.value || 0) / totalPortfolioValue * 100).toFixed(1);
                    return `${value} (${percentage}%)`; 
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardHeader>
            <CardTitle>Stocks</CardTitle>
            <CardDescription>Equity holdings</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stocksData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {stocksData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), "Value"]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardHeader>
            <CardTitle>Crypto</CardTitle>
            <CardDescription>Digital assets</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cryptoData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {cryptoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), "Value"]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardHeader>
            <CardTitle>Portfolio Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Total Assets:</span>
                <span className="font-medium">{formatCurrency(totalPortfolioValue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Annual Return:</span>
                <span className="font-medium text-success">+12.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Dividend Yield:</span>
                <span className="font-medium">2.1%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Risk Score:</span>
                <span className="font-medium">Medium (65/100)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Tax Efficiency:</span>
                <span className="font-medium">78%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;
