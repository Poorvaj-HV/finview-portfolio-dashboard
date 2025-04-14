
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trophy } from 'lucide-react';

// Mock badges data
const badges = [
  {
    id: 1,
    name: "Recycling Rookie",
    icon: "🌱",
    description: "Completed your first 5 waste classifications",
    earned: true,
    progress: 100,
  },
  {
    id: 2,
    name: "Plastic Warrior",
    icon: "♻️",
    description: "Correctly classified 20 plastic items",
    earned: true,
    progress: 100,
  },
  {
    id: 3,
    name: "Composting Champion",
    icon: "🍃",
    description: "Identified 15 compostable items correctly",
    earned: true,
    progress: 100,
  },
  {
    id: 4,
    name: "Paper Saver",
    icon: "📄",
    description: "Properly classified 25 paper products",
    earned: false,
    progress: 72,
  },
  {
    id: 5,
    name: "E-Waste Expert",
    icon: "🔌",
    description: "Identified 10 electronic waste items",
    earned: false,
    progress: 30,
  },
  {
    id: 6,
    name: "Glass Guardian",
    icon: "🥛",
    description: "Correctly sorted 15 glass items",
    earned: false,
    progress: 60,
  },
  {
    id: 7,
    name: "Metal Master",
    icon: "🔨",
    description: "Identified 20 metal waste items",
    earned: false,
    progress: 25,
  },
  {
    id: 8,
    name: "Eco Influencer",
    icon: "🌟",
    description: "Shared results 10 times on social media",
    earned: true,
    progress: 100,
  },
];

export function UserRewards() {
  const earnedBadges = badges.filter(badge => badge.earned);
  const inProgressBadges = badges.filter(badge => !badge.earned);
  
  return (
    <Card className="border-green-100 dark:border-green-900/50 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="h-4 w-4 text-amber-500" />
          Badges & Rewards
        </CardTitle>
        <CardDescription>Your environmental achievements</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[180px] px-6 py-4">
          <div className="space-y-6">
            {earnedBadges.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3 text-green-700 dark:text-green-500">Earned Badges</h4>
                <div className="grid grid-cols-4 gap-2">
                  {earnedBadges.map(badge => (
                    <div 
                      key={badge.id} 
                      className="bg-muted/30 hover:bg-muted/50 rounded-lg p-2 text-center cursor-pointer transition-colors relative group"
                      title={badge.description}
                    >
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <div className="text-xs font-medium truncate">{badge.name}</div>
                      
                      <div className="absolute inset-0 bg-background/95 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center p-2 transition-opacity">
                        <p className="text-xs">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {inProgressBadges.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3 text-amber-700 dark:text-amber-500">In Progress</h4>
                <div className="space-y-3">
                  {inProgressBadges.slice(0, 3).map(badge => (
                    <div key={badge.id} className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-muted/30 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                        {badge.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs font-medium truncate">{badge.name}</p>
                          <span className="text-xs text-muted-foreground">{badge.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-500 rounded-full" 
                            style={{ width: `${badge.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
