
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardSidebar } from "@/components/DashboardSidebar";

// Mock data for recently viewed questions
const recentQuestions = [
  { 
    id: "1",
    title: "Introduction to Programming",
    courseCode: "CSC 101",
    year: "2022",
    semester: "First",
    format: "PDF"
  },
  { 
    id: "2",
    title: "Object-Oriented Programming",
    courseCode: "CSC 201",
    year: "2023",
    semester: "Second",
    format: "PDF"
  },
  { 
    id: "3",
    title: "Data Structures",
    courseCode: "CSC 202",
    year: "2021",
    semester: "First",
    format: "DOCX"
  }
];

// Mock data for recommendations
const recommendedQuestions = [
  { 
    id: "4",
    title: "Software Engineering Principles",
    courseCode: "CSC 301",
    year: "2022",
    semester: "First",
    format: "PDF"
  },
  { 
    id: "5",
    title: "Web Development",
    courseCode: "CSC 305",
    year: "2023",
    semester: "Second",
    format: "PDF"
  }
];

const StudentDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user is authenticated and is a student
    if (!isAuthenticated) {
      navigate("/student/login");
      return;
    }
    
    if (user?.role !== "student") {
      navigate("/");
      return;
    }
    
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, user, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-studyhub-primary mx-auto"></div>
          <p className="mt-4 text-studyhub-primary">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardSidebar />
      
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}!</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Quick Stats Cards */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Available Questions</CardTitle>
                <CardDescription>Total past questions in database</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-studyhub-primary">250</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Level</CardTitle>
                <CardDescription>Current academic level</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-studyhub-primary">{user?.level || "300L"}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Questions Viewed</CardTitle>
                <CardDescription>Past questions you've accessed</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-studyhub-primary">12</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recently Viewed</h2>
              <Link to="/past-questions">
                <Button variant="ghost" className="text-studyhub-primary">View All</Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentQuestions.map((question) => (
                <Card key={question.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{question.courseCode}</CardTitle>
                        <CardDescription>{question.title}</CardDescription>
                      </div>
                      <span className="text-xs bg-studyhub-accent px-2 py-1 rounded text-studyhub-primary">
                        {question.format}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{question.year} • {question.semester} Semester</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full text-studyhub-primary border-studyhub-primary">
                      View Question
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recommended for You</h2>
              <Link to="/past-questions">
                <Button variant="ghost" className="text-studyhub-primary">View All</Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedQuestions.map((question) => (
                <Card key={question.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{question.courseCode}</CardTitle>
                        <CardDescription>{question.title}</CardDescription>
                      </div>
                      <span className="text-xs bg-studyhub-accent px-2 py-1 rounded text-studyhub-primary">
                        {question.format}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{question.year} • {question.semester} Semester</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full text-studyhub-primary border-studyhub-primary">
                      View Question
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              <Card className="bg-gradient-to-br from-studyhub-primary to-studyhub-secondary text-white">
                <CardHeader>
                  <CardTitle className="text-white">Need More Resources?</CardTitle>
                  <CardDescription className="text-white/90">
                    Check out the complete collection of past questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm">Access questions from all years and courses for better preparation.</p>
                </CardContent>
                <CardFooter>
                  <Link to="/past-questions" className="w-full">
                    <Button size="sm" variant="secondary" className="w-full">
                      Browse All Questions
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
