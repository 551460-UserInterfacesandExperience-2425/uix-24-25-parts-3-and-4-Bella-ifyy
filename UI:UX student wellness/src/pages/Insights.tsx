
import React, { useState } from "react";
import { 
  PieChart as PieChartIcon, 
  BarChart,
  LineChart, 
  Calendar, 
  Users, 
  BookOpen, 
  Brain,
  Heart,
  Smile,
  Frown,
  Meh,
  ThumbsUp
} from "lucide-react";
import { PieChart, Pie, Cell, BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart as ReLineChart, Line } from "recharts";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import MoodTracker from "@/components/ui/MoodTracker";
import { toast } from "sonner";

// Mock data for visualizations
const moodData = [
  { name: "Great", value: 8, color: "#0ea5e9" },
  { name: "Good", value: 12, color: "#14b8a6" },
  { name: "Okay", value: 5, color: "#738aa9" },
  { name: "Low", value: 3, color: "#f59e0b" },
  { name: "Struggling", value: 2, color: "#ef4444" },
];

const weeklyMoodData = [
  { day: "Mon", great: 1, good: 0, okay: 0, low: 0, struggling: 0 },
  { day: "Tue", great: 0, good: 1, okay: 0, low: 0, struggling: 0 },
  { day: "Wed", great: 0, good: 0, okay: 1, low: 0, struggling: 0 },
  { day: "Thu", great: 0, good: 1, okay: 0, low: 0, struggling: 0 },
  { day: "Fri", great: 1, good: 0, okay: 0, low: 0, struggling: 0 },
  { day: "Sat", great: 0, good: 1, okay: 0, low: 0, struggling: 0 },
  { day: "Sun", great: 0, good: 0, okay: 0, low: 1, struggling: 0 },
];

const stressLevelData = [
  { day: "Week 1", level: 7 },
  { day: "Week 2", level: 6 },
  { day: "Week 3", level: 8 },
  { day: "Week 4", level: 5 },
  { day: "Week 5", level: 4 },
  { day: "Week 6", level: 6 },
  { day: "Week 7", level: 3 },
];

const Insights = () => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "semester">("month");

  const handleMoodSelect = (mood: string) => {
    toast.success("Mood tracked successfully!");
    console.log("Selected mood:", mood);
  };

  return (
    <div className="page-container">
      <section className="mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-2 bg-calm-50 rounded-full text-calm-600 mb-6">
            <PieChartIcon size={20} className="mr-2" />
            <span className="text-sm font-medium">Wellbeing Insights</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Track Your Mental Wellbeing
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Monitor your moods, stress levels, and emotional health over time to identify patterns and improve your overall wellbeing.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Mood Trends</CardTitle>
                    <CardDescription>Your mood patterns over time</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant={timeRange === "week" ? "secondary" : "ghost"} 
                      size="sm" 
                      onClick={() => setTimeRange("week")}
                      className="text-xs h-8"
                    >
                      Week
                    </Button>
                    <Button 
                      variant={timeRange === "month" ? "secondary" : "ghost"} 
                      size="sm" 
                      onClick={() => setTimeRange("month")}
                      className="text-xs h-8"
                    >
                      Month
                    </Button>
                    <Button 
                      variant={timeRange === "semester" ? "secondary" : "ghost"} 
                      size="sm" 
                      onClick={() => setTimeRange("semester")}
                      className="text-xs h-8"
                    >
                      Semester
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReBarChart
                        data={weeklyMoodData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 0,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="great" name="Great" stackId="a" fill="#0ea5e9" />
                        <Bar dataKey="good" name="Good" stackId="a" fill="#14b8a6" />
                        <Bar dataKey="okay" name="Okay" stackId="a" fill="#738aa9" />
                        <Bar dataKey="low" name="Low" stackId="a" fill="#f59e0b" />
                        <Bar dataKey="struggling" name="Struggling" stackId="a" fill="#ef4444" />
                      </ReBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Today's Mood</CardTitle>
                  <CardDescription>How are you feeling right now?</CardDescription>
                </CardHeader>
                <CardContent>
                  <MoodTracker onMoodSelect={handleMoodSelect} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Mood Distribution</CardTitle>
                <CardDescription>Your overall mood breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={moodData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {moodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Stress Level Trends</CardTitle>
                <CardDescription>Changes in your stress levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReLineChart
                      data={stressLevelData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="level"
                        stroke="#e11d48"
                        name="Stress Level"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </ReLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Personalized Recommendations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-wellness-50 border border-wellness-200">
              <CardHeader>
                <div className="bg-wellness-100 text-wellness-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                  <Brain size={24} />
                </div>
                <CardTitle>Stress Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Based on your recent mood patterns, try these stress-reducing techniques:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-wellness-500 text-base">•</span>
                    <span>10-minute guided meditation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-wellness-500 text-base">•</span>
                    <span>Deep breathing exercises</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-wellness-500 text-base">•</span>
                    <span>Progressive muscle relaxation</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="default" className="w-full bg-wellness-600 hover:bg-wellness-700 text-white">
                  View Resources
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-mint-50 border border-mint-200">
              <CardHeader>
                <div className="bg-mint-100 text-mint-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                  <Heart size={24} />
                </div>
                <CardTitle>Self-Care Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Try incorporating these activities into your routine:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-mint-500 text-base">•</span>
                    <span>30 minutes of physical activity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-mint-500 text-base">•</span>
                    <span>Journaling before bed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-mint-500 text-base">•</span>
                    <span>Connect with a friend or family member</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="default" className="w-full bg-mint-600 hover:bg-mint-700 text-white">
                  See More
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-calm-50 border border-calm-200">
              <CardHeader>
                <div className="bg-calm-100 text-calm-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen size={24} />
                </div>
                <CardTitle>Educational Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Learn more about managing your mental health:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-calm-500 text-base">•</span>
                    <span>Understanding anxiety triggers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-calm-500 text-base">•</span>
                    <span>Building resilience skills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-calm-500 text-base">•</span>
                    <span>Healthy sleep habits guide</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="default" className="w-full bg-calm-600 hover:bg-calm-700 text-white">
                  Explore Resources
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <Card className="border-dashed border-2">
            <CardContent className="p-6 sm:p-10">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Calendar size={36} className="text-primary" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold mb-2">Need professional support?</h3>
                  <p className="text-muted-foreground mb-6">
                    Our trained counselors are here to help you navigate your mental health journey.
                  </p>
                  <Button variant="default" asChild>
                    <a href="/appointments">Book a Counseling Session</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Insights;
