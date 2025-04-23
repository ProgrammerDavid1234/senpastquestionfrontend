import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const recentUploads = [
  { 
    id: "1",
    title: "Operating Systems",
    courseCode: "CSC 315",
    year: "2023",
    semester: "First",
    format: "PDF",
    uploadDate: "2023-12-15",
    downloads: 45,
    level: "300L"
  },
  { 
    id: "2",
    title: "Computer Networks",
    courseCode: "CSC 321",
    year: "2023",
    semester: "Second",
    format: "PDF",
    uploadDate: "2023-10-20",
    downloads: 32,
    level: "300L"
  },
  { 
    id: "3",
    title: "Artificial Intelligence",
    courseCode: "CSC 415",
    year: "2022",
    semester: "First",
    format: "DOCX",
    uploadDate: "2022-12-05",
    downloads: 67,
    level: "400L"
  }
];

const TeacherDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [uploadForm, setUploadForm] = useState({
    courseCode: "",
    courseTitle: "",
    year: new Date().getFullYear().toString(),
    semester: "First",
    level: "300L",
    file: null as File | null,
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/teacher/login");
      return;
    }
    
    if (user?.role !== "teacher") {
      navigate("/");
      return;
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, user, navigate]);

  const handleFormChange = (field: string, value: string) => {
    setUploadForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadForm(prev => ({ ...prev, file: e.target.files?.[0] || null }));
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    setTimeout(() => {
      toast({
        title: "Upload successful",
        description: `${uploadForm.courseCode}: ${uploadForm.courseTitle} has been uploaded.`,
      });
      
      setUploadForm({
        courseCode: "",
        courseTitle: "",
        year: new Date().getFullYear().toString(),
        semester: "First",
        level: "300L",
        file: null,
      });
      
      setIsUploading(false);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-studyhub-primary mx-auto"></div>
          <p className="mt-4 text-studyhub-primary">Loading teacher dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardSidebar isTeacher />
      
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}!</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Uploads</CardTitle>
                <CardDescription>Questions you've shared</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-studyhub-primary">24</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Downloads</CardTitle>
                <CardDescription>Student downloads of your uploads</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-studyhub-primary">312</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Pending Approvals</CardTitle>
                <CardDescription>Uploads awaiting review</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-studyhub-primary">2</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="upload" className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload New Question</TabsTrigger>
              <TabsTrigger value="history">Upload History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Past Question</CardTitle>
                  <CardDescription>
                    Share past examination questions with students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpload} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="courseCode">Course Code</Label>
                        <Input
                          id="courseCode"
                          placeholder="e.g. CSC 301"
                          value={uploadForm.courseCode}
                          onChange={(e) => handleFormChange("courseCode", e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="courseTitle">Course Title</Label>
                        <Input
                          id="courseTitle"
                          placeholder="e.g. Software Engineering"
                          value={uploadForm.courseTitle}
                          onChange={(e) => handleFormChange("courseTitle", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="year">Year</Label>
                        <Select 
                          value={uploadForm.year} 
                          onValueChange={(value) => handleFormChange("year", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(5)].map((_, i) => {
                              const year = new Date().getFullYear() - i;
                              return (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="semester">Semester</Label>
                        <Select 
                          value={uploadForm.semester} 
                          onValueChange={(value) => handleFormChange("semester", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select semester" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="First">First Semester</SelectItem>
                            <SelectItem value="Second">Second Semester</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="level">Level</Label>
                        <Select 
                          value={uploadForm.level} 
                          onValueChange={(value) => handleFormChange("level", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="100L">100 Level</SelectItem>
                            <SelectItem value="200L">200 Level</SelectItem>
                            <SelectItem value="300L">300 Level</SelectItem>
                            <SelectItem value="400L">400 Level</SelectItem>
                            <SelectItem value="500L">500 Level</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="file">Upload File (PDF, DOCX, or image)</Label>
                      <Input
                        id="file"
                        type="file"
                        accept=".pdf,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        required
                      />
                      <p className="text-xs text-gray-500">Maximum file size: 10MB</p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-studyhub-primary hover:bg-studyhub-primary/90"
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <>
                          <span className="mr-2">Uploading...</span>
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        </>
                      ) : "Upload Question"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Your Upload History</CardTitle>
                  <CardDescription>
                    All past questions you've shared with students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUploads.map((upload) => (
                      <div key={upload.id} className="flex items-center justify-between p-4 bg-white border rounded-lg">
                        <div>
                          <h3 className="font-medium">{upload.courseCode}: {upload.title}</h3>
                          <div className="text-sm text-gray-500">
                            {upload.year} • {upload.semester} Semester • {upload.level}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Uploaded: {upload.uploadDate} • Downloads: {upload.downloads}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-studyhub-accent px-2 py-1 rounded text-studyhub-primary">
                            {upload.format}
                          </span>
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
