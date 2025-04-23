
import React from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  PieChart, 
  BookOpenText, 
  MessageCircle, 
  Phone, 
  Shield, 
  Headphones, 
  Heart 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ResourceCard from "@/components/ui/ResourceCard";
import MoodTracker from "@/components/ui/MoodTracker";
import { toast } from "sonner";

const Index = () => {
  const handleMoodSelect = (mood: string) => {
    toast.success("Progress update recorded successfully!");
    console.log("Selected progress level:", mood);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-wellness-50 to-mint-50 -z-10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTYgNmgtNnY2aDZ2LTZ6bS02IDBoLTZ2Nmg2di02em0xMi0xMmg2di02aC02djZ6bS02IDZoLTZ2Nmg2di02em0xMiAwaDZ2LTZoLTZ2NnptLTYgNmgtNnY2aDZ2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20 -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                Your Academic Progress
                <span className="text-wellness-600 block">Matters</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
                SafeSpace provides accessible resources and support for your academic wellbeing. 
                Report your progress, schedule appointments with your Personal Supervisor, or track your journey—all in one place.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/crisis">Get Support Now</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/appointments">Book Appointment</Link>
                </Button>
              </div>
            </div>
            
            <div className="flex-1 animate-fade-in max-w-md">
              <div className="glass-card rounded-xl p-6 border border-white/20 shadow-lg">
                <h3 className="text-lg font-medium mb-4">How are you progressing with your studies?</h3>
                <MoodTracker onMoodSelect={handleMoodSelect} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Our Services</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From immediate support to long-term progress tracking, we're here to help you thrive academically.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ResourceCard
              title="Academic Support"
              description="Access resources and support for your academic journey."
              icon={Shield}
              variant="wellness"
              action={{ label: "Get Help", href: "/crisis" }}
              className="animate-fade-in"
            />
            
            <ResourceCard
              title="Supervisor Meetings"
              description="Schedule appointments with your Personal Supervisor."
              icon={Calendar}
              variant="mint"
              action={{ label: "Book Now", href: "/appointments" }}
              className="animate-fade-in"
            />
            
            <ResourceCard
              title="Progress Tracking"
              description="Track your academic progress and get personalized recommendations."
              icon={PieChart}
              variant="calm"
              action={{ label: "View Insights", href: "/insights" }}
              className="animate-fade-in"
            />
          </div>
        </div>
      </section>
      
      {/* Resources Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Academic Resources</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Educational materials and self-help tools to support your academic journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col h-full animate-fade-in">
              <div className="rounded-lg bg-wellness-100 w-12 h-12 flex items-center justify-center mb-4">
                <BookOpenText className="text-wellness-600" size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2">Study Guides</h3>
              <p className="text-muted-foreground text-sm flex-grow">Practical strategies for managing coursework, studying effectively, and more.</p>
              <Button variant="link" className="mt-4 p-0 justify-start" asChild>
                <a href="#">Explore guides</a>
              </Button>
            </div>
            
            <div className="bg-white rounded-xl shadow p-6 flex flex-col h-full animate-fade-in">
              <div className="rounded-lg bg-mint-100 w-12 h-12 flex items-center justify-center mb-4">
                <Headphones className="text-mint-600" size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2">Focus Sessions</h3>
              <p className="text-muted-foreground text-sm flex-grow">Guided focus sessions to help improve concentration and reduce study anxiety.</p>
              <Button variant="link" className="mt-4 p-0 justify-start" asChild>
                <a href="#">Listen now</a>
              </Button>
            </div>
            
            <div className="bg-white rounded-xl shadow p-6 flex flex-col h-full animate-fade-in">
              <div className="rounded-lg bg-calm-100 w-12 h-12 flex items-center justify-center mb-4">
                <Heart className="text-calm-600" size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2">Wellbeing Tips</h3>
              <p className="text-muted-foreground text-sm flex-grow">Simple daily practices to improve your wellbeing during academic stress.</p>
              <Button variant="link" className="mt-4 p-0 justify-start" asChild>
                <a href="#">Read more</a>
              </Button>
            </div>
            
            <div className="bg-white rounded-xl shadow p-6 flex flex-col h-full animate-fade-in">
              <div className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <MessageCircle className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2">Peer Support</h3>
              <p className="text-muted-foreground text-sm flex-grow">Connect with other students who understand what you're going through.</p>
              <Button variant="link" className="mt-4 p-0 justify-start" asChild>
                <a href="#">Join community</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-wellness-500 to-wellness-700 rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row p-8 md:p-12">
              <div className="flex-1 text-white mb-8 md:mb-0">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Need to speak with a Senior Tutor?</h2>
                <p className="text-white/90 max-w-md mb-6">
                  Our support team is available to assist you during difficult times. Don't hesitate to reach out.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="outline" 
                    className="text-white gap-2 w-full sm:w-auto border-white/20 hover:bg-white/10"
                    asChild
                  >
                    <a href="tel:+18002738255">
                      <Phone size={18} />
                      Call Support Line
                    </a>
                  </Button>
                  <Button 
                    variant="outline"
                    className="text-white gap-2 w-full sm:w-auto border-white/20 hover:bg-white/10"
                    asChild
                  >
                    <Link to="/crisis">
                      <MessageCircle size={18} />
                      Chat with Support
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex-1 flex justify-center md:justify-end">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                  alt="Support team" 
                  className="rounded-lg shadow-lg object-cover w-full max-w-md h-64"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
