
import { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function AIStatusIndicator() {
  const [isActive, setIsActive] = useState(true);
  const [pingActive, setPingActive] = useState(false);
  
  // Simulate periodic AI status update
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Random status (95% chance of being active)
      const status = Math.random() > 0.05;
      setIsActive(status);
      
      if (status) {
        // Create "ping" animation when status changes
        setPingActive(true);
        setTimeout(() => setPingActive(false), 1000);
      }
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative flex items-center">
            <div className={`
              flex items-center gap-1 p-1 px-3 rounded-full 
              ${isActive ? 'bg-green-50 dark:bg-green-900/30' : 'bg-amber-50 dark:bg-amber-900/30'}
              transition-colors duration-300
            `}>
              <Activity className={`
                h-4 w-4 
                ${isActive ? 'text-green-600 dark:text-green-500' : 'text-amber-600 dark:text-amber-500'}
              `} />
              <span className={`
                text-xs font-medium
                ${isActive ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'}
              `}>
                AI {isActive ? 'Online' : 'Limited'}
              </span>
            </div>
            
            {/* Ping animation element */}
            {pingActive && (
              <span className="absolute inset-0 block rounded-full bg-green-400/30 animate-ping" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isActive 
            ? 'EcoSnap AI is fully operational' 
            : 'EcoSnap AI is experiencing high demand, classifications may take longer'
          }</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
