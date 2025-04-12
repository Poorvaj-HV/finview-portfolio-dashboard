
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Sample stock data
const stockList = [
  { symbol: "AAPL", name: "Apple Inc", price: 175.43, change: 2.43, changePercent: 1.4, volume: 35000000 },
  { symbol: "MSFT", name: "Microsoft Corp", price: 337.22, change: 5.18, changePercent: 1.56, volume: 42000000 },
  { symbol: "AMZN", name: "Amazon.com Inc", price: 132.56, change: -1.22, changePercent: -0.91, volume: 28000000 },
  { symbol: "GOOGL", name: "Alphabet Inc", price: 128.76, change: 0.82, changePercent: 0.64, volume: 19000000 },
  { symbol: "TSLA", name: "Tesla Inc", price: 205.34, change: -4.56, changePercent: -2.17, volume: 51000000 },
  { symbol: "META", name: "Meta Platforms Inc", price: 302.55, change: 3.22, changePercent: 1.08, volume: 24000000 },
  { symbol: "NVDA", name: "NVIDIA Corp", price: 405.78, change: 8.45, changePercent: 2.13, volume: 39000000 },
];

// Sample historical data (1 month)
const historicalData = [
  { date: "Mar 15", price: 162.45, volume: 32000000 },
  { date: "Mar 16", price: 160.12, volume: 29000000 },
  { date: "Mar 17", price: 163.78, volume: 35000000 },
  { date: "Mar 18", price: 165.34, volume: 31000000 },
  { date: "Mar 19", price: 164.92, volume: 28000000 },
  { date: "Mar 22", price: 168.45, volume: 38000000 },
  { date: "Mar 23", price: 167.89, volume: 32000000 },
  { date: "Mar 24", price: 170.12, volume: 41000000 },
  { date: "Mar 25", price: 172.56, volume: 45000000 },
  { date: "Mar 26", price: 171.34, volume: 36000000 },
  { date: "Mar 29", price: 174.45, volume: 39000000 },
  { date: "Mar 30", price: 176.23, volume: 42000000 },
  { date: "Mar 31", price: 173.56, volume: 38000000 },
  { date: "Apr 01", price: 172.65, volume: 33000000 },
  { date: "Apr 02", price: 174.32, volume: 35000000 },
  { date: "Apr 05", price: 178.45, volume: 44000000 },
  { date: "Apr 06", price: 177.89, volume: 38000000 },
  { date: "Apr 07", price: 180.12, volume: 46000000 },
  { date: "Apr 08", price: 178.56, volume: 40000000 },
  { date: "Apr 09", price: 175.43, volume: 35000000 },
];

const timeRanges = [
  { label: "1D", value: "1d" },
  { label: "1W", value: "1w" },
  { label: "1M", value: "1m" },
  { label: "3M", value: "3m" },
  { label: "1Y", value: "1y" },
  { label: "5Y", value: "5y" },
];

const Stocks = () => {
  const [selectedStock, setSelectedStock] = useState(stockList[0]);
  const [timeRange, setTimeRange] = useState("1m");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStocks = stockList.filter(
    stock => 
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Stocks</h1>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search stocks..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1 space-y-4">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle>Watchlist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredStocks.map((stock) => (
                  <div 
                    key={stock.symbol}
                    className={`flex justify-between items-center p-2 rounded-md cursor-pointer hover:bg-muted/50 ${
                      selectedStock.symbol === stock.symbol ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedStock(stock)}
                  >
                    <div>
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="text-xs text-muted-foreground">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div>${stock.price.toFixed(2)}</div>
                      <div className={stock.changePercent >= 0 ? 'text-success' : 'text-destructive'}>
                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-4">
          <Card className="stat-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{selectedStock.symbol}</CardTitle>
                  <CardDescription>{selectedStock.name}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">${selectedStock.price.toFixed(2)}</div>
                  <div className={`text-sm ${selectedStock.changePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.changePercent >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%)
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 mt-2">
                {timeRanges.map((range) => (
                  <Button
                    key={range.value}
                    variant={timeRange === range.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange(range.value)}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={historicalData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" />
                  <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                  <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]} />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke={selectedStock.changePercent >= 0 ? "#10b981" : "#ef4444"} 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader>
              <CardTitle>Trading Volume</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => [`${(value/1000000).toFixed(1)}M`, "Volume"]} />
                  <Bar dataKey="volume" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Stocks;
