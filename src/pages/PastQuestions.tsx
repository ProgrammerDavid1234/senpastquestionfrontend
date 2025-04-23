
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for past questions
const pastQuestionsData = [
  {
    id: "1",
    courseCode: "CSC 101",
    title: "Introduction to Computer Science",
    year: "2023",
    semester: "First",
    level: "100L",
    format: "PDF"
  },
  {
    id: "2",
    courseCode: "CSC 201",
    title: "Object-Oriented Programming",
    year: "2022",
    semester: "Second",
    level: "200L",
    format: "PDF"
  },
  {
    id: "3",
    courseCode: "CSC 301",
    title: "Software Engineering",
    year: "2023",
    semester: "First",
    level: "300L",
    format: "PDF"
  },
  {
    id: "4",
    courseCode: "CSC 302",
    title: "Data Structures and Algorithms",
    year: "2022",
    semester: "First",
    level: "300L",
    format: "DOCX"
  },
  {
    id: "5",
    courseCode: "CSC 401",
    title: "Database Management Systems",
    year: "2021",
    semester: "Second",
    level: "400L",
    format: "PDF"
  },
  {
    id: "6",
    courseCode: "CSC 405",
    title: "Computer Networks",
    year: "2020",
    semester: "First",
    level: "400L",
    format: "PDF"
  },
  {
    id: "7",
    courseCode: "CSC 501",
    title: "Artificial Intelligence",
    year: "2022",
    semester: "First",
    level: "500L",
    format: "PDF"
  },
  {
    id: "8",
    courseCode: "CSC 502",
    title: "Machine Learning",
    year: "2022",
    semester: "Second",
    level: "500L",
    format: "PDF"
  }
];

const levels = ["100L", "200L", "300L", "400L", "500L"];
const years = ["2023", "2022", "2021", "2020", "2019"];
const semesters = ["First", "Second"];

const PastQuestions = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    level: "",
    year: "",
    semester: "",
    courseCode: ""
  });
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter the questions based on selected filters and search query
  const filteredQuestions = pastQuestionsData.filter(question => {
    const matchesLevel = !filters.level || question.level === filters.level;
    const matchesYear = !filters.year || question.year === filters.year;
    const matchesSemester = !filters.semester || question.semester === filters.semester;
    const matchesCourseCode = !filters.courseCode || question.courseCode.toLowerCase().includes(filters.courseCode.toLowerCase());
    
    const matchesSearch = !searchQuery || 
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.courseCode.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesLevel && matchesYear && matchesSemester && matchesCourseCode && matchesSearch;
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleDownload = (id: string, title: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to download past questions",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate download
    toast({
      title: "Download started",
      description: `Downloading ${title}...`,
    });
  };

  const clearFilters = () => {
    setFilters({
      level: "",
      year: "",
      semester: "",
      courseCode: ""
    });
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-center">Software Engineering Past Questions</h1>
            <p className="text-gray-600 text-center mt-2">
              Browse our comprehensive collection of past examination questions
            </p>
          </header>
          
          <div className="mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Search & Filter</CardTitle>
                <CardDescription>Find the exact questions you need</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Input
                      placeholder="Search by course title or code..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Select 
                        value={filters.level} 
                        onValueChange={(value) => handleFilterChange("level", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by Level" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* Fixed: Empty string value replaced with "all" */}
                          <SelectItem value="all">All Levels</SelectItem>
                          {levels.map(level => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Select 
                        value={filters.year} 
                        onValueChange={(value) => handleFilterChange("year", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* Fixed: Empty string value replaced with "all" */}
                          <SelectItem value="all">All Years</SelectItem>
                          {years.map(year => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Select 
                        value={filters.semester} 
                        onValueChange={(value) => handleFilterChange("semester", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by Semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* Fixed: Empty string value replaced with "all" */}
                          <SelectItem value="all">All Semesters</SelectItem>
                          {semesters.map(semester => (
                            <SelectItem key={semester} value={semester}>{semester} Semester</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Input
                        placeholder="Filter by Course Code"
                        value={filters.courseCode}
                        onChange={(e) => handleFilterChange("courseCode", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3 flex justify-between">
                <div className="text-sm text-gray-500">
                  {filteredQuestions.length} questions found
                </div>
                <Button 
                  variant="ghost" 
                  onClick={clearFilters}
                  disabled={!filters.level && !filters.year && !filters.semester && !filters.courseCode && !searchQuery}
                >
                  Clear Filters
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="100">100 Level</TabsTrigger>
              <TabsTrigger value="200">200 Level</TabsTrigger>
              <TabsTrigger value="300">300 Level</TabsTrigger>
              <TabsTrigger value="400+">400+ Level</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((question) => (
                    <Card key={question.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{question.courseCode}</CardTitle>
                            <CardDescription className="line-clamp-1">{question.title}</CardDescription>
                          </div>
                          <span className="text-xs bg-studyhub-accent px-2 py-1 rounded text-studyhub-primary">
                            {question.format}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{question.year} • {question.semester} Semester</span>
                          <span>{question.level}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-3 flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-studyhub-primary"
                          onClick={() => handleDownload(question.id, question.title)}
                        >
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-studyhub-primary hover:bg-studyhub-primary/90"
                          onClick={() => handleDownload(question.id, question.title)}
                        >
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No questions found</h3>
                    <p className="text-gray-500">Try adjusting your filters or search query</p>
                    <Button 
                      variant="outline" 
                      onClick={clearFilters} 
                      className="mt-4"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="100" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastQuestionsData.filter(q => q.level === "100L").length > 0 ? (
                  pastQuestionsData.filter(q => q.level === "100L").map((question) => (
                    <Card key={question.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{question.courseCode}</CardTitle>
                            <CardDescription className="line-clamp-1">{question.title}</CardDescription>
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
                      <CardFooter className="border-t pt-3 flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-studyhub-primary"
                          onClick={() => handleDownload(question.id, question.title)}
                        >
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-studyhub-primary hover:bg-studyhub-primary/90"
                          onClick={() => handleDownload(question.id, question.title)}
                        >
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-gray-500">No 100 level questions available</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Similar TabsContent for other levels would be implemented here */}
            <TabsContent value="200" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastQuestionsData.filter(q => q.level === "200L").length > 0 ? (
                  pastQuestionsData.filter(q => q.level === "200L").map((question) => (
                    <Card key={question.id} className="overflow-hidden">
                      {/* Question card content similar to above */}
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{question.courseCode}</CardTitle>
                            <CardDescription className="line-clamp-1">{question.title}</CardDescription>
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
                      <CardFooter className="border-t pt-3 flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-studyhub-primary"
                          onClick={() => handleDownload(question.id, question.title)}
                        >
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-studyhub-primary hover:bg-studyhub-primary/90"
                          onClick={() => handleDownload(question.id, question.title)}
                        >
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-gray-500">No 200 level questions available</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="300" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastQuestionsData.filter(q => q.level === "300L").length > 0 ? (
                  pastQuestionsData.filter(q => q.level === "300L").map((question) => (
                    <Card key={question.id} className="overflow-hidden">
                      {/* Question card content */}
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{question.courseCode}</CardTitle>
                            <CardDescription className="line-clamp-1">{question.title}</CardDescription>
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
                      <CardFooter className="border-t pt-3 flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-studyhub-primary"
                          onClick={() => handleDownload(question.id, question.title)}
                        >
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-studyhub-primary hover:bg-studyhub-primary/90"
                          onClick={() => handleDownload(question.id, question.title)}
                        >
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-gray-500">No 300 level questions available</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="400+" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastQuestionsData.filter(q => q.level === "400L" || q.level === "500L").length > 0 ? (
                  pastQuestionsData.filter(q => q.level === "400L" || q.level === "500L").map((question) => (
                    <Card key={question.id} className="overflow-hidden">
                      {/* Question card content */}
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{question.courseCode}</CardTitle>
                            <CardDescription className="line-clamp-1">{question.title}</CardDescription>
                          </div>
                          <span className="text-xs bg-studyhub-accent px-2 py-1 rounded text-studyhub-primary">
                            {question.format}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{question.year} • {question.semester} Semester</span>
                          <span>{question.level}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-3 flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-studyhub-primary"
                          onClick={() => handleDownload(question.id, question.title)}
                        >
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-studyhub-primary hover:bg-studyhub-primary/90"
                          onClick={() => handleDownload(question.id, question.title)}
                        >
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-gray-500">No 400+ level questions available</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default PastQuestions;
