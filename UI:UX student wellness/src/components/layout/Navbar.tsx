
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Crisis Support", path: "/crisis" },
    { name: "Appointments", path: "/appointments" },
    { name: "Wellbeing Insights", path: "/insights" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-semibold flex items-center">
              <span className="bg-wellness-500 text-white p-1 rounded-md mr-2">
                SW
              </span>
              <span>SafeSpace</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "transition-colors hover:text-primary relative font-medium",
                  location.pathname === item.path
                    ? "text-primary after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full"
                    : "text-foreground/80"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Emergency Contact */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="font-normal text-sm gap-2"
              asChild
            >
              <a href="tel:+18002738255">
                <Phone size={14} />
                Call
              </a>
            </Button>
            <Button
              variant="default"
              size="sm"
              className="font-normal text-sm gap-2"
              asChild
            >
              <Link to="/crisis">
                <MessageCircle size={14} />
                Chat Now
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="h-10 w-10"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden bg-white/95 backdrop-blur-md absolute w-full left-0 transition-all duration-300 ease-in-out shadow-md",
          isOpen ? "max-h-[400px] py-4" : "max-h-0 overflow-hidden py-0"
        )}
      >
        <div className="flex flex-col space-y-4 px-4 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "py-2 transition-colors",
                location.pathname === item.path
                  ? "text-primary font-medium"
                  : "text-foreground/80"
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2 flex flex-col space-y-3">
            <Button
              variant="outline"
              size="default"
              className="gap-2 w-full"
              asChild
            >
              <a href="tel:+18002738255">
                <Phone size={16} />
                Call Crisis Line
              </a>
            </Button>
            <Button
              variant="default"
              size="default"
              className="gap-2 w-full"
              asChild
            >
              <Link to="/crisis">
                <MessageCircle size={16} />
                Chat with Support
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
