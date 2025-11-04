"use client";
import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PollMessageBubble({
  poll,
  question,
}: {
  poll: { options: string[]; multipleVotes: boolean; votes: number[] };
  question: string;
}) {
  const [selected, setSelected] = useState<number[]>([]);
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  const handleVote = (index: number) => {
    setAnimatingIndex(index);
    
    if (poll.multipleVotes) {
      setSelected((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setSelected([index]);
    }

    setTimeout(() => setAnimatingIndex(null), 600);
  };

  const totalVotes = poll.votes.reduce((sum, votes) => sum + votes, 0);

  return (
    <div className="bg-card rounded-2xl p-4 max-w-xs shadow-lg border">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shrink-0 shadow-md">
          <span className="text-primary-foreground font-bold text-lg">📊</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-card-foreground text-base leading-tight wrap-break-words">
            {question}
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            {totalVotes} vote{totalVotes !== 1 ? 's' : ''} • {poll.multipleVotes ? "Multiple answers" : "Single choice"}
          </p>
        </div>
      </div>

      {/* Poll Options */}
      <div className="space-y-3">
        {poll.options.map((opt, i) => {
          const votes = poll.votes[i] || 0;
          const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
          const isSelected = selected.includes(i);
          const isAnimating = animatingIndex === i;

          return (
            <button
              key={i}
              onClick={() => handleVote(i)}
              className={cn(
                "w-full text-left rounded-xl p-3 transition-all duration-300 border-2",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50",
                "transform hover:scale-[1.02] active:scale-[0.99]",
                isSelected
                  ? "bg-primary/10 border-primary shadow-md"
                  : "bg-background border-border hover:bg-accent"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={cn(
                  "font-medium text-sm wrap-break-words pr-2 transition-colors",
                  isSelected && "text-primary font-semibold"
                )}>
                  {opt}
                </span>
                
                {/* Enhanced Animated Checkbox */}
                <div className="relative flex-shrink-0">
                  {/* Background circle */}
                  <div className={cn(
                    "absolute inset-0 rounded-full transition-all duration-500",
                    isSelected ? "bg-primary/20 scale-110" : "scale-100"
                  )} />
                  
                  {/* Unchecked state */}
                  <Circle className={cn(
                    "h-5 w-5 relative transition-all duration-400",
                    isSelected 
                      ? "opacity-0 scale-50 rotate-90" 
                      : "opacity-100 text-muted-foreground",
                    isAnimating && !isSelected && "scale-110"
                  )} />
                  
                  {/* Checked state */}
                  <CheckCircle2 className={cn(
                    "h-5 w-5 absolute top-0 left-0 transition-all duration-500",
                    "text-primary fill-primary",
                    isSelected 
                      ? "opacity-100 scale-100 rotate-0" 
                      : "opacity-0 scale-50 rotate-45"
                  )} />
                  
                  {/* Ripple animation */}
                  {isAnimating && (
                    <div className={cn(
                      "absolute inset-0 rounded-full border-2 border-primary",
                      "animate-ripple opacity-0"
                    )} />
                  )}
                </div>
              </div>
              
              {/* Animated Vote bar */}
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden mb-1">
                <div 
                  className={cn(
                    "h-2 rounded-full transition-all duration-1000 ease-out",
                    isSelected 
                      ? "bg-gradient-to-r from-primary to-primary/80" 
                      : "bg-muted-foreground/40"
                  )}
                  style={{ 
                    width: `${percentage}%`,
                    transition: "width 1s cubic-bezier(0.34, 1.56, 0.64, 1)"
                  }}
                />
              </div>
              
              {/* Vote count */}
              <div className="flex justify-between items-center">
                <span className={cn(
                  "text-xs font-medium transition-all duration-300",
                  isSelected ? "text-primary" : "text-muted-foreground"
                )}>
                  {percentage.toFixed(0)}%
                </span>
                <span className={cn(
                  "text-xs transition-all duration-300",
                  isSelected ? "text-primary" : "text-muted-foreground"
                )}>
                  {votes} vote{votes !== 1 ? 's' : ''}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <span className="text-muted-foreground text-xs">
          Tap to vote
        </span>
        <span className={cn(
          "text-xs font-medium transition-all duration-300",
          selected.length > 0 ? "text-primary scale-105" : "text-muted-foreground"
        )}>
          {selected.length} selected
        </span>
      </div>
    </div>
  );
}