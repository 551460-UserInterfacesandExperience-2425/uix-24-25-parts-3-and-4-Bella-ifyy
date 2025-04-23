
import { Link } from "react-router-dom";
import { Mail, Phone, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-xl font-semibold flex items-center">
              <span className="bg-wellness-500 text-white p-1 rounded-md mr-2">
                SW
              </span>
              <span>SafeSpace</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Supporting student wellbeing with accessible mental health
              resources and personalized support.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="text-base font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/crisis"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Crisis Support
                </Link>
              </li>
              <li>
                <Link
                  to="/appointments"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Appointments
                </Link>
              </li>
              <li>
                <Link
                  to="/insights"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Wellbeing Insights
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-base font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Mental Health Tips
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Meditation Guides
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Self-Help Articles
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Community Support
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-base font-medium mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+18002738255"
                  className="text-sm text-muted-foreground hover:text-primary flex items-center"
                >
                  <Phone size={16} className="mr-2" />
                  National Helpline: 1-800-273-8255
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary flex items-center"
                >
                  <MessageCircle size={16} className="mr-2" />
                  Chat Support: Available 24/7
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@safespace.edu"
                  className="text-sm text-muted-foreground hover:text-primary flex items-center"
                >
                  <Mail size={16} className="mr-2" />
                  support@safespace.edu
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SafeSpace. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
