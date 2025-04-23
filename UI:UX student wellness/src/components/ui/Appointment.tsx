
import React, { useState } from "react";
import { Calendar, Clock, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card";

interface AppointmentSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  personalSupervisor: string;
  available: boolean;
  student?: string;
}

interface AppointmentProps {
  slots: AppointmentSlot[];
  onBookAppointment?: (slotId: string, studentId?: string) => void;
  onCancelAppointment?: (slotId: string) => void;
  className?: string;
  isPersonalSupervisor?: boolean;
  students?: {id: string, name: string}[];
}

const Appointment: React.FC<AppointmentProps> = ({
  slots,
  onBookAppointment,
  onCancelAppointment,
  className,
  isPersonalSupervisor = false,
  students = []
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  const handleSelectSlot = (slotId: string) => {
    setSelectedSlot(slotId);
    setShowConfirmation(true);
    setIsCancel(false);
    
    // Reset selected student when opening the booking dialog
    if (isPersonalSupervisor && students.length > 0) {
      setSelectedStudent(students[0].id);
    }
  };

  const handleConfirmBooking = () => {
    if (selectedSlot && onBookAppointment) {
      if (isPersonalSupervisor) {
        onBookAppointment(selectedSlot, selectedStudent);
      } else {
        onBookAppointment(selectedSlot);
      }
      setBookingStatus('success');
    }
  };

  const handleCancelAppointment = (slotId: string) => {
    setSelectedSlot(slotId);
    setShowConfirmation(true);
    setIsCancel(true);
  };

  const handleConfirmCancel = () => {
    if (selectedSlot && onCancelAppointment) {
      onCancelAppointment(selectedSlot);
      setShowConfirmation(false);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setSelectedSlot(null);
    setIsCancel(false);
    setSelectedStudent("");
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className={cn("w-full", className)}>
      {bookingStatus === 'success' ? (
        <Card className="animate-scale border-wellness-300 bg-wellness-50">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-wellness-100 text-wellness-600 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Appointment Confirmed!</h3>
              <p className="text-muted-foreground mb-6">
                {isPersonalSupervisor 
                  ? "You have successfully booked an appointment with your student."
                  : "Your appointment has been booked successfully. You will receive a confirmation email shortly."}
              </p>
              <Button onClick={() => setBookingStatus('idle')}>
                Book Another Appointment
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {showConfirmation && selectedSlot && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
              <Card className="max-w-md w-full animate-scale">
                <CardHeader className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4"
                    onClick={handleCloseConfirmation}
                  >
                    <X size={18} />
                  </Button>
                  <CardTitle>{isCancel ? "Cancel Your Appointment" : "Confirm Your Appointment"}</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const slot = slots.find(s => s.id === selectedSlot);
                    if (!slot) return null;
                    
                    return (
                      <div className="space-y-4">
                        {isPersonalSupervisor && !isCancel && (
                          <div className="space-y-2">
                            <label htmlFor="student-select" className="block text-sm font-medium">
                              Select Student
                            </label>
                            <select
                              id="student-select"
                              value={selectedStudent}
                              onChange={(e) => setSelectedStudent(e.target.value)}
                              className="w-full p-2 border border-input rounded-md"
                            >
                              {students.map(student => (
                                <option key={student.id} value={student.id}>
                                  {student.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                        
                        <div className="flex items-start gap-3">
                          <Calendar className="text-muted-foreground mt-0.5" size={18} />
                          <div>
                            <p className="font-medium">Date</p>
                            <p className="text-muted-foreground">{formatDate(slot.date)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Clock className="text-muted-foreground mt-0.5" size={18} />
                          <div>
                            <p className="font-medium">Time</p>
                            <p className="text-muted-foreground">{slot.startTime} - {slot.endTime}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <User className="text-muted-foreground mt-0.5" size={18} />
                          <div>
                            <p className="font-medium">Personal Supervisor</p>
                            <p className="text-muted-foreground">{slot.personalSupervisor}</p>
                          </div>
                        </div>
                        
                        {isCancel && (
                          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-800">
                            <p className="text-sm">Are you sure you want to cancel this appointment?</p>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto" 
                    onClick={handleCloseConfirmation}
                  >
                    Go Back
                  </Button>
                  {isCancel ? (
                    <Button 
                      variant="destructive"
                      className="w-full sm:w-auto" 
                      onClick={handleConfirmCancel}
                    >
                      Confirm Cancellation
                    </Button>
                  ) : (
                    <Button 
                      className="w-full sm:w-auto" 
                      onClick={handleConfirmBooking}
                    >
                      Confirm Booking
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          )}
          
          <div className="grid gap-4">
            {slots.map((slot) => (
              <Card 
                key={slot.id} 
                className={cn(
                  "transition-all",
                  !slot.available && "opacity-60"
                )}
              >
                <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Calendar size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{formatDate(slot.date)}</p>
                      <p className="text-sm text-muted-foreground">{slot.startTime} - {slot.endTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-center w-full sm:w-auto">
                    <div className="flex-1 sm:flex-initial">
                      <p className="text-sm font-medium">Personal Supervisor</p>
                      <p className="text-sm text-muted-foreground">{slot.personalSupervisor}</p>
                    </div>
                    
                    <div className="flex gap-2 ml-auto">
                      {!slot.available && (
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleCancelAppointment(slot.id)}
                          className="ml-auto"
                        >
                          Cancel
                        </Button>
                      )}
                      
                      <Button 
                        size="sm" 
                        variant={slot.available ? "default" : "outline"}
                        disabled={!slot.available}
                        onClick={() => handleSelectSlot(slot.id)}
                      >
                        {slot.available ? (isPersonalSupervisor ? "Book for Student" : "Book") : "Booked"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Appointment;
