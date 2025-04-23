
import React, { useState } from "react";
import { Calendar, Clock, User, Filter, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Appointment from "@/components/ui/Appointment";
import SearchBar from "@/components/ui/SearchBar";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Appointments = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isPersonalSupervisor, setIsPersonalSupervisor] = useState<boolean>(false);
  
  // Mock students data for personal supervisors
  const mockStudents = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Alex Johnson" },
    { id: "4", name: "Emma Williams" },
    { id: "5", name: "Michael Brown" },
  ];
  
  // Mock appointment slots data with Personal Supervisors
  const mockSlots = [
    {
      id: "1",
      date: "2023-10-15",
      startTime: "9:00 AM",
      endTime: "10:00 AM",
      personalSupervisor: "Prof. Sarah Johnson",
      available: true,
    },
    {
      id: "2",
      date: "2023-10-15",
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      personalSupervisor: "Prof. Mark Williams",
      available: true,
    },
    {
      id: "3",
      date: "2023-10-16",
      startTime: "2:00 PM",
      endTime: "3:00 PM",
      personalSupervisor: "Prof. Emily Chen",
      available: true,
    },
    {
      id: "4",
      date: "2023-10-16",
      startTime: "4:00 PM",
      endTime: "5:00 PM",
      personalSupervisor: "Prof. James Wilson",
      available: false,
    },
    {
      id: "5",
      date: "2023-10-17",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      personalSupervisor: "Prof. Sarah Johnson",
      available: true,
    },
    {
      id: "6",
      date: "2023-10-17",
      startTime: "1:00 PM",
      endTime: "2:00 PM",
      personalSupervisor: "Prof. Mark Williams",
      available: true,
    },
    {
      id: "7",
      date: "2023-10-18",
      startTime: "9:00 AM",
      endTime: "10:00 AM",
      personalSupervisor: "Prof. Emily Chen",
      available: true,
    },
    {
      id: "8",
      date: "2023-10-18",
      startTime: "3:00 PM",
      endTime: "4:00 PM",
      personalSupervisor: "Prof. James Wilson",
      available: false,
    },
  ];

  const handleBookAppointment = (slotId: string, studentId?: string) => {
    if (isPersonalSupervisor && studentId) {
      const student = mockStudents.find(s => s.id === studentId);
      toast.success(`Appointment booked successfully for ${student?.name}!`);
      console.log("Booked appointment slot ID:", slotId, "for student ID:", studentId);
    } else {
      toast.success("Appointment booked successfully!");
      console.log("Booked appointment slot ID:", slotId);
    }
  };

  const handleCancelAppointment = (slotId: string) => {
    toast.success("Appointment canceled successfully!");
    console.log("Canceled appointment slot ID:", slotId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  const toggleUserRole = () => {
    setIsPersonalSupervisor(!isPersonalSupervisor);
    toast.info(`Switched to ${!isPersonalSupervisor ? "Personal Supervisor" : "Student"} view`);
  };

  // Filter slots based on the selected filter and search query
  const filteredSlots = mockSlots
    .filter(slot => {
      // First apply date filter
      if (selectedFilter === "all") return true;
      
      const slotDate = new Date(slot.date);
      const today = new Date();
      
      if (selectedFilter === "today") {
        return (
          slotDate.getDate() === today.getDate() &&
          slotDate.getMonth() === today.getMonth() &&
          slotDate.getFullYear() === today.getFullYear()
        );
      } else if (selectedFilter === "tomorrow") {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return (
          slotDate.getDate() === tomorrow.getDate() &&
          slotDate.getMonth() === tomorrow.getMonth() &&
          slotDate.getFullYear() === tomorrow.getFullYear()
        );
      } else if (selectedFilter === "this-week") {
        const endOfWeek = new Date(today);
        endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
        return slotDate <= endOfWeek && slotDate >= today;
      }
      return true;
    })
    .filter(slot => {
      // Then apply search query
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        slot.personalSupervisor.toLowerCase().includes(query) ||
        slot.date.toLowerCase().includes(query) ||
        slot.startTime.toLowerCase().includes(query) ||
        slot.endTime.toLowerCase().includes(query)
      );
    });

  return (
    <div className="page-container">
      <section className="mb-8 pt-20">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search by supervisor name, date, or time..."
            className="mb-8"
          />
          <Button 
            variant="outline" 
            onClick={toggleUserRole}
            className="mb-8"
          >
            {isPersonalSupervisor ? "Switch to Student View" : "Switch to Supervisor View"}
          </Button>
        </div>
      </section>
      
      <section className="mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-2 bg-mint-50 rounded-full text-mint-600 mb-6">
            <CalendarClock size={20} className="mr-2" />
            <span className="text-sm font-medium">Appointment Booking</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isPersonalSupervisor 
              ? "Schedule Meetings with Your Students" 
              : "Schedule a Meeting with Your Personal Supervisor"}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {isPersonalSupervisor
              ? "Book appointments with your students to discuss their academic progress, wellbeing needs, or any concerns they may have."
              : "Book an appointment with your Personal Supervisor to discuss your academic progress, wellbeing needs, or any concerns you may have."}
          </p>
        </div>
      </section>

      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-12">
            <div className="md:w-1/3">
              <div className="sticky top-24 space-y-6">
                <div className="bg-muted/50 rounded-xl p-6">
                  <h3 className="text-lg font-medium mb-4">Meeting Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-mint-100 rounded-full p-1 mt-0.5">
                        <User size={16} className="text-mint-600" />
                      </div>
                      <div>
                        <p className="font-medium">Academic Progress Review</p>
                        <p className="text-sm text-muted-foreground">45-60 minutes</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-mint-100 rounded-full p-1 mt-0.5">
                        <User size={16} className="text-mint-600" />
                      </div>
                      <div>
                        <p className="font-medium">Wellbeing Check-in</p>
                        <p className="text-sm text-muted-foreground">30-45 minutes</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-mint-100 rounded-full p-1 mt-0.5">
                        <User size={16} className="text-mint-600" />
                      </div>
                      <div>
                        <p className="font-medium">Support Session</p>
                        <p className="text-sm text-muted-foreground">60 minutes</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-xl p-6">
                  <h3 className="text-lg font-medium mb-4">What to Expect</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-mint-500 text-base">•</span>
                      <span>Arrive 5 minutes before your appointment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-mint-500 text-base">•</span>
                      <span>Bring your student ID</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-mint-500 text-base">•</span>
                      <span>All sessions are confidential</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-mint-500 text-base">•</span>
                      <span>Virtual options are available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-mint-500 text-base">•</span>
                      <span>24-hour cancellation policy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h2 className="text-2xl font-bold">
                    {isPersonalSupervisor ? "Book Student Appointments" : "Available Appointments"}
                  </h2>
                  <div className="flex items-center">
                    <Filter size={16} className="mr-2 text-muted-foreground" />
                    <select 
                      className="text-sm border-none bg-transparent focus:ring-0 focus:outline-none pr-8"
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                    >
                      <option value="all">All Dates</option>
                      <option value="today">Today</option>
                      <option value="tomorrow">Tomorrow</option>
                      <option value="this-week">This Week</option>
                    </select>
                  </div>
                </div>
                
                {filteredSlots.length > 0 ? (
                  <Appointment 
                    slots={filteredSlots} 
                    onBookAppointment={handleBookAppointment}
                    onCancelAppointment={handleCancelAppointment}
                    isPersonalSupervisor={isPersonalSupervisor}
                    students={mockStudents}
                  />
                ) : (
                  <div className="text-center py-12">
                    <Calendar size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No appointments available</h3>
                    <p className="text-muted-foreground mb-6">
                      There are no available appointments for the selected filter.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedFilter("all");
                        setSearchQuery("");
                      }}
                    >
                      View All Dates
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="bg-mint-50 border border-mint-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <Clock size={24} className="text-mint-600" />
                  <div>
                    <h3 className="text-lg font-medium mb-1">Need to speak with your Senior Tutor?</h3>
                    <p className="text-muted-foreground mb-4">
                      If you need to speak with your Senior Tutor urgently, please contact the student support office.
                    </p>
                    <Button 
                      variant="default"
                      className="bg-mint-600 hover:bg-mint-700 text-white"
                      asChild
                    >
                      <a href="tel:+15551234567">Contact Student Support</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Appointments;
