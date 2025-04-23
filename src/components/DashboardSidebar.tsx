
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

type DashboardSidebarProps = {
  isTeacher?: boolean;
};

export const DashboardSidebar = ({ isTeacher = false }: DashboardSidebarProps) => {
  const { user } = useAuth();
  
  return (
    <aside className="w-64 bg-white shadow-sm h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-studyhub-primary">StudyHub SE</h2>
        <p className="text-sm text-gray-500">
          {isTeacher ? "Teacher Portal" : "Student Portal"}
        </p>
      </div>
      
      <div className="p-4">
        <div className="flex flex-col space-y-1 mb-4">
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
          {user?.role === "student" && (
            <>
              <p className="text-xs text-gray-600">Matric: {user?.matricNumber}</p>
              <p className="text-xs text-gray-600">Level: {user?.level}</p>
            </>
          )}
        </div>
        
        <nav className="space-y-1">
          <Link to={isTeacher ? "/teacher/dashboard" : "/student/dashboard"}>
            <Button variant="ghost" className="w-full justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Button>
          </Link>
          
          <Link to="/past-questions">
            <Button variant="ghost" className="w-full justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Past Questions
            </Button>
          </Link>
          
          {isTeacher && (
            <Link to="#">
              <Button variant="ghost" className="w-full justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Questions
              </Button>
            </Link>
          )}
          
          <Link to="#">
            <Button variant="ghost" className="w-full justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Settings
            </Button>
          </Link>
        </nav>
      </div>
      
      <div className="absolute bottom-0 w-64 p-4 border-t">
        <Link to="/">
          <Button variant="outline" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3" />
            </svg>
            Back to Home
          </Button>
        </Link>
      </div>
    </aside>
  );
};
