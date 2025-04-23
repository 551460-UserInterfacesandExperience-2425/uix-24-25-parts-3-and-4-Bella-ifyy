
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  Clock, 
  Shield, 
  AlertTriangle,
  Users,
  ThumbsUp,
  MapPin,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter 
} from "@/components/ui/card";
import { toast } from "sonner";

const Crisis = () => {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{text: string, sender: 'user' | 'support'}>>([
    {
      sender: 'support',
      text: 'Hello, I\'m here to help. How can I support you today?'
    }
  ]);

  const handleStartChat = () => {
    setShowChat(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    setChatMessages(prev => [...prev, { text: message, sender: 'user' }]);
    setMessage("");

    // Simulate response after a short delay
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev, 
        { 
          text: "Thank you for sharing. I'm here to support you. Can you tell me more about what you're experiencing?", 
          sender: 'support' 
        }
      ]);
    }, 1000);
  };

  const handleCloseChat = () => {
    toast.success("Chat session ended. A summary has been sent to your email.");
    setShowChat(false);
    setChatMessages([
      {
        sender: 'support',
        text: 'Hello, I\'m here to help. How can I support you today?'
      }
    ]);
  };

  return (
    <div className="page-container">
      <section className="mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-2 bg-red-50 rounded-full text-red-600 mb-6">
            <AlertTriangle size={20} className="mr-2" />
            <span className="text-sm font-medium">Crisis Support</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Immediate Support When You Need It Most
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            If you're experiencing a crisis or need immediate support, our team is here to help 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="wellness" 
              size="lg" 
              className="gap-2"
              onClick={handleStartChat}
            >
              <MessageCircle size={18} />
              Start Chat Now
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2"
              asChild
            >
              <a href="tel:+18002738255">
                <Phone size={18} />
                Call Crisis Line
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="overflow-hidden">
            <div className="bg-red-500 h-2 w-full" />
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>Immediate resources for crisis situations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="text-muted-foreground mt-1" size={18} />
                <div>
                  <p className="font-medium">National Suicide Prevention Lifeline</p>
                  <a href="tel:+18002738255" className="text-wellness-600 hover:underline">1-800-273-8255</a>
                  <p className="text-sm text-muted-foreground mt-1">Available 24/7, calls are confidential</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MessageCircle className="text-muted-foreground mt-1" size={18} />
                <div>
                  <p className="font-medium">Crisis Text Line</p>
                  <p className="text-wellness-600">Text HOME to 741741</p>
                  <p className="text-sm text-muted-foreground mt-1">Available 24/7, free crisis support</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="text-muted-foreground mt-1" size={18} />
                <div>
                  <p className="font-medium">Campus Security</p>
                  <a href="tel:+15551234567" className="text-wellness-600 hover:underline">555-123-4567</a>
                  <p className="text-sm text-muted-foreground mt-1">On-campus emergency support</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="text-muted-foreground mt-1" size={18} />
                <div>
                  <p className="font-medium">Emergency Services</p>
                  <a href="tel:911" className="text-wellness-600 hover:underline">911</a>
                  <p className="text-sm text-muted-foreground mt-1">For immediate life-threatening emergencies</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="bg-wellness-500 h-2 w-full" />
            <CardHeader>
              <CardTitle>SafeSpace Chat Support</CardTitle>
              <CardDescription>Connect with a Senior Tutor online</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="text-muted-foreground mt-1" size={18} />
                <div>
                  <p className="font-medium">24/7 Availability</p>
                  <p className="text-sm text-muted-foreground">Our Senior Tutors are available anytime, day or night</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Shield className="text-muted-foreground mt-1" size={18} />
                <div>
                  <p className="font-medium">Confidential Support</p>
                  <p className="text-sm text-muted-foreground">All conversations are private and secure</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Users className="text-muted-foreground mt-1" size={18} />
                <div>
                  <p className="font-medium">Trained Staff</p>
                  <p className="text-sm text-muted-foreground">Our team consists of experienced Senior Tutors</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <ThumbsUp className="text-muted-foreground mt-1" size={18} />
                <div>
                  <p className="font-medium">Follow-Up Support</p>
                  <p className="text-sm text-muted-foreground">We provide resources and follow-up care after your session</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="wellness" 
                className="w-full" 
                onClick={handleStartChat}
              >
                Start Chat Support
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      
      <section className="mb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">When to Seek Help</h2>
          <div className="bg-muted/50 rounded-xl p-6 space-y-4">
            <p className="text-muted-foreground">Consider reaching out if you're experiencing:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="bg-red-100 rounded-full p-1 mt-0.5">
                  <AlertTriangle size={16} className="text-red-600" />
                </div>
                <span>Thoughts of harming yourself or others</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-red-100 rounded-full p-1 mt-0.5">
                  <AlertTriangle size={16} className="text-red-600" />
                </div>
                <span>Overwhelming anxiety or panic attacks</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-red-100 rounded-full p-1 mt-0.5">
                  <AlertTriangle size={16} className="text-red-600" />
                </div>
                <span>Severe depression or hopelessness</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-red-100 rounded-full p-1 mt-0.5">
                  <AlertTriangle size={16} className="text-red-600" />
                </div>
                <span>Trauma or crisis situations</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-red-100 rounded-full p-1 mt-0.5">
                  <AlertTriangle size={16} className="text-red-600" />
                </div>
                <span>Substance abuse or addiction issues</span>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              This is not an exhaustive list. If you're concerned about your mental health in any way, 
              please don't hesitate to reach out for support.
            </p>
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <div className="bg-gradient-to-br from-wellness-50 to-mint-50 rounded-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Need Non-Emergency Support?
            </h2>
            <p className="text-muted-foreground mb-8">
              If you're not in immediate crisis but would like to talk to someone, consider scheduling an appointment with your Personal Supervisor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="wellness"
                asChild
              >
                <Link to="/appointments">Schedule Appointment</Link>
              </Button>
              <Button 
                variant="outline"
                asChild
              >
                <a href="mailto:support@safespace.edu">
                  <Mail size={18} className="mr-2" />
                  Email Support
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-4 right-4 w-full max-w-md z-50">
          <Card className="shadow-xl border-wellness-200">
            <CardHeader className="bg-wellness-500 text-white py-4 flex flex-row justify-between items-center">
              <div className="flex items-center">
                <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <MessageCircle size={18} className="text-wellness-500" />
                </div>
                <CardTitle className="text-lg">Crisis Support Chat</CardTitle>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:text-white/80 hover:bg-white/10"
                onClick={handleCloseChat}
              >
                <X size={18} />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        msg.sender === 'user' 
                          ? 'bg-wellness-500 text-white rounded-tr-none' 
                          : 'bg-muted rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="border-t p-4 flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wellness-500 focus:border-transparent"
                />
                <Button type="submit" variant="wellness" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 3 3 9-3 9 19-9Z"/>
                    <path d="M6 12h16"/>
                  </svg>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Crisis;
