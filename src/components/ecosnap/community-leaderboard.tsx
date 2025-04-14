
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Medal, Trophy, Users } from 'lucide-react';

// Mock leaderboard data
const weeklyLeaders = [
  { id: 1, name: "Emma Thompson", points: 1250, avatar: "E", rank: 1, recentAchievement: "Eco Warrior" },
  { id: 2, name: "James Wilson", points: 980, avatar: "J", rank: 2, recentAchievement: "Plastic Guardian" },
  { id: 3, name: "Alex Johnson", points: 840, avatar: "A", rank: 3, recentAchievement: "Compost Master" },
  { id: 4, name: "Olivia Martinez", points: 790, avatar: "O", rank: 4, recentAchievement: "Paper Recycler" },
  { id: 5, name: "Noah Garcia", points: 750, avatar: "N", rank: 5, recentAchievement: "Zero Waste Hero" },
  { id: 6, name: "Sophia Brown", points: 680, avatar: "S", rank: 6, recentAchievement: "Glass Saver" },
  { id: 7, name: "Daniel Lee", points: 640, avatar: "D", rank: 7, recentAchievement: "e-Waste Expert" },
  { id: 8, name: "Isabella Kim", points: 590, avatar: "I", rank: 8, recentAchievement: "Metal Collector" },
  { id: 9, name: "William Taylor", points: 540, avatar: "W", rank: 9, recentAchievement: "Recycling Leader" },
  { id: 10, name: "Mia Davis", points: 520, avatar: "M", rank: 10, recentAchievement: "Eco Ambassador" },
];

const monthlyLeaders = [
  { id: 3, name: "Alex Johnson", points: 5840, avatar: "A", rank: 1, recentAchievement: "Sustainability Champion" },
  { id: 2, name: "James Wilson", points: 4980, avatar: "J", rank: 2, recentAchievement: "Master Recycler" },
  { id: 1, name: "Emma Thompson", points: 4250, avatar: "E", rank: 3, recentAchievement: "Eco Warrior" },
  { id: 5, name: "Noah Garcia", points: 3750, avatar: "N", rank: 4, recentAchievement: "Zero Waste Hero" },
  { id: 4, name: "Olivia Martinez", points: 3590, avatar: "O", rank: 5, recentAchievement: "Earth Guardian" },
  { id: 8, name: "Isabella Kim", points: 3290, avatar: "I", rank: 6, recentAchievement: "Waste Minimizer" },
  { id: 6, name: "Sophia Brown", points: 2880, avatar: "S", rank: 7, recentAchievement: "Glass Recycling Pro" },
  { id: 7, name: "Daniel Lee", points: 2640, avatar: "D", rank: 8, recentAchievement: "E-Waste Expert" },
  { id: 10, name: "Mia Davis", points: 2520, avatar: "M", rank: 9, recentAchievement: "Carbon Reducer" },
  { id: 9, name: "William Taylor", points: 2340, avatar: "W", rank: 10, recentAchievement: "Eco Enthusiast" },
];

export function CommunityLeaderboard() {
  const [period, setPeriod] = useState('weekly');
  const leaderboardData = period === 'weekly' ? weeklyLeaders : monthlyLeaders;
  
  // Find the current user (Alex Johnson) in the leaderboard
  const currentUserRank = leaderboardData.findIndex(user => user.name === "Alex Johnson") + 1;
  
  return (
    <Card className="border-green-100 dark:border-green-900/50 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              Community Leaderboard
            </CardTitle>
            <CardDescription>See how you compare to other EcoSnap users</CardDescription>
          </div>
          
          <Tabs value={period} onValueChange={setPeriod} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="weekly">This Week</TabsTrigger>
              <TabsTrigger value="monthly">This Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="py-3 px-4 text-left">Rank</th>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Recent Achievement</th>
                <th className="py-3 px-4 text-right">EcoPoints</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user) => (
                <tr 
                  key={user.id} 
                  className={`border-b hover:bg-muted/20 transition-colors ${
                    user.name === "Alex Johnson" ? "bg-green-50 dark:bg-green-900/10" : ""
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {user.rank <= 3 ? (
                        <div className={`
                          h-7 w-7 rounded-full flex items-center justify-center text-sm font-bold
                          ${user.rank === 1 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200' : 
                            user.rank === 2 ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300' : 
                            'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200'}
                        `}>
                          <Medal className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                          {user.rank}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        {user.avatar}
                      </div>
                      <span className="font-medium">{user.name}</span>
                      {user.name === "Alex Johnson" && (
                        <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 px-2 py-0.5 rounded-full">
                          You
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    {user.recentAchievement}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold">
                    {user.points.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t bg-muted/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Total Community Members: 1,245</span>
          </div>
          
          <div className="text-sm">
            Your Rank: <span className="font-semibold text-green-600 dark:text-green-500">#{currentUserRank}</span> of 1,245
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
