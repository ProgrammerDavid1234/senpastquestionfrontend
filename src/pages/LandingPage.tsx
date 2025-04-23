
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-studyhub-accent/30 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Software Engineering
                  <span className="block text-studyhub-primary">Past Questions</span>
                </h1>
                <p className="text-lg mb-8 text-gray-700">
                  Access a comprehensive library of past examination questions for Software Engineering courses.
                  Prepare better, score higher!
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/student/register">
                    <Button size="lg" className="bg-studyhub-primary hover:bg-studyhub-primary/90 w-full sm:w-auto">
                      Register Now
                    </Button>
                  </Link>
                  <Link to="/past-questions">
                    <Button variant="outline" size="lg" className="border-studyhub-primary text-studyhub-primary hover:bg-studyhub-accent/50 w-full sm:w-auto">
                      Browse Questions
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 mt-12 md:mt-0">
                <div className="relative">
                  <div className="bg-studyhub-primary rounded-lg shadow-xl p-6 md:p-8 transform rotate-3">
                    <div className="bg-white rounded-md p-4">
                      <h3 className="text-lg font-semibold mb-2">Data Structures (CSC 201)</h3>
                      <p className="text-sm text-gray-600 mb-1">2023 First Semester Exam</p>
                      <p className="text-sm text-gray-500">300 Level</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs bg-studyhub-accent px-2 py-1 rounded text-studyhub-primary">PDF</span>
                        <Button variant="ghost" size="sm" className="text-studyhub-primary">View</Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-studyhub-secondary rounded-lg shadow-xl p-6 md:p-8 absolute top-10 right-10 transform -rotate-2">
                    <div className="bg-white rounded-md p-4">
                      <h3 className="text-lg font-semibold mb-2">Software Engineering (CSC 301)</h3>
                      <p className="text-sm text-gray-600 mb-1">2022 Second Semester Exam</p>
                      <p className="text-sm text-gray-500">300 Level</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs bg-studyhub-accent px-2 py-1 rounded text-studyhub-primary">PDF</span>
                        <Button variant="ghost" size="sm" className="text-studyhub-primary">View</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Use StudyHub SE?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-studyhub-background p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-studyhub-accent rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-studyhub-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Collection</h3>
                <p className="text-gray-600">Access past questions from the last 5 years for all Software Engineering courses.</p>
              </div>
              
              <div className="bg-studyhub-background p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-studyhub-accent rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-studyhub-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Advanced Filtering</h3>
                <p className="text-gray-600">Easily find the exact questions you need by filtering by course, year, and semester.</p>
              </div>
              
              <div className="bg-studyhub-background p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-studyhub-accent rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-studyhub-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
                <p className="text-gray-600">Only registered students and verified teachers can access our collection of past questions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-studyhub-primary py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to Ace Your Exams?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join StudyHub SE today and gain access to a comprehensive library of past questions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/student/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Register as Student
                </Button>
              </Link>
              <Link to="/teacher/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Teacher Login
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold text-studyhub-primary">StudyHub SE</span>
              <p className="text-sm text-gray-600 mt-1">© 2025 Software Engineering Department</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-studyhub-primary">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-studyhub-primary">
                Contact
              </a>
              <a href="#" className="text-gray-600 hover:text-studyhub-primary">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
