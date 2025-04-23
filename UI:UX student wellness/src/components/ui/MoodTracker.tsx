
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MoodOption {
  value: string;
  label: string;
  color: string;
  description: string;
}

interface MoodTrackerProps {
  onMoodSelect?: (mood: string) => void;
  className?: string;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ 
  onMoodSelect,
  className 
}) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const moods: MoodOption[] = [
    { 
      value: "great", 
      label: "Great", 
      color: "bg-wellness-500", 
      description: "I'm making excellent progress with my studies!" 
    },
    { 
      value: "good", 
      label: "Good", 
      color: "bg-mint-500", 
      description: "I'm keeping up with my coursework and feeling positive." 
    },
    { 
      value: "okay", 
      label: "Okay", 
      color: "bg-calm-500", 
      description: "I'm managing my workload adequately." 
    },
    { 
      value: "low", 
      label: "Struggling", 
      color: "bg-amber-500", 
      description: "I'm finding it difficult to keep up with some aspects of my course." 
    },
    { 
      value: "bad", 
      label: "Overwhelmed", 
      color: "bg-red-500", 
      description: "I'm having significant difficulty with my studies and wellbeing." 
    },
  ];

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleSubmit = () => {
    if (selectedMood && onMoodSelect) {
      onMoodSelect(selectedMood);
      setShowThankYou(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setShowThankYou(false);
        setSelectedMood(null);
      }, 3000);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {showThankYou ? (
        <div className="flex flex-col items-center text-center py-8 px-4 animate-fade-in">
          <div className="bg-wellness-100 text-wellness-600 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-1">Thank You!</h3>
          <p className="text-muted-foreground">Your progress update has been recorded. Your Personal Supervisor will be notified.</p>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-medium mb-4">How are you progressing with your studies?</h3>
          <div className="grid grid-cols-5 gap-2 mb-6">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => handleMoodSelect(mood.value)}
                className={cn(
                  "flex flex-col items-center justify-center rounded-lg py-3 px-2 transition-all",
                  selectedMood === mood.value 
                    ? "ring-2 ring-offset-2 ring-primary"
                    : "hover:bg-muted"
                )}
                aria-label={`Select progress level: ${mood.label}`}
              >
                <div className={cn("w-8 h-8 rounded-full mb-2", mood.color)} />
                <span className="text-sm font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
          
          {selectedMood && (
            <div className="animate-fade-in">
              <p className="text-muted-foreground mb-4">
                {moods.find(m => m.value === selectedMood)?.description}
              </p>
              <Button 
                onClick={handleSubmit}
                className="w-full"
              >
                Submit Progress Update
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MoodTracker;
