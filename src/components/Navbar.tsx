
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, User } from 'lucide-react';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-studyhub-primary">StudyHub SE</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-studyhub-primary px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/past-questions" className="text-gray-700 hover:text-studyhub-primary px-3 py-2 rounded-md text-sm font-medium">
              Past Questions
            </Link>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <div className="flex items-center justify-center h-full w-full bg-studyhub-primary text-white rounded-full">
                      <User className="h-4 w-4" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white z-50">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                      <p className="text-xs text-studyhub-primary">{user?.role === 'student' ? 'Student' : 'Teacher'}</p>
                    </div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to={user?.role === 'student' ? '/student/dashboard' : '/teacher/dashboard'} className="cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Link to="/student/login">
                  <Button variant="ghost" className="text-studyhub-primary">Student Login</Button>
                </Link>
                <Link to="/teacher/login">
                  <Button variant="default" className="bg-studyhub-primary hover:bg-studyhub-primary/90">Teacher Login</Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-studyhub-primary focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-gray-700 hover:text-studyhub-primary block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link to="/past-questions" className="text-gray-700 hover:text-studyhub-primary block px-3 py-2 rounded-md text-base font-medium">
              Past Questions
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="px-2 space-y-1">
                <div className="px-3 py-2">
                  <p className="text-base font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <Link to={user?.role === 'student' ? '/student/dashboard' : '/teacher/dashboard'} className="block px-3 py-2 text-base text-gray-700 hover:text-studyhub-primary">
                  Dashboard
                </Link>
                <button onClick={logout} className="block w-full text-left px-3 py-2 text-base text-gray-700 hover:text-studyhub-primary">
                  Log out
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-2">
                <Link to="/student/login" className="block">
                  <Button variant="outline" className="w-full">Student Login</Button>
                </Link>
                <Link to="/teacher/login" className="block">
                  <Button variant="default" className="w-full">Teacher Login</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
