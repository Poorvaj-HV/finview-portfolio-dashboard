
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Edit } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    occupation: "Financial Analyst",
    joinDate: "January 2020",
    bio: "Financial analyst with 5+ years of experience in investment banking and portfolio management. Specialized in equity research and market analysis.",
    socialLinks: {
      twitter: "twitter.com/alexjohnson",
      linkedin: "linkedin.com/in/alexjohnson",
    }
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <Button 
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
          {!isEditing && <Edit className="ml-2 h-4 w-4" />}
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-1 stat-card">
              <CardHeader className="pb-2">
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your basic account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-muted-foreground" />
                    {isEditing ? (
                      <div className="w-full">
                        <Label htmlFor="name" className="sr-only">Name</Label>
                        <Input 
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          className="max-w-sm"
                        />
                      </div>
                    ) : (
                      <span>{profileData.name}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                    {isEditing ? (
                      <div className="w-full">
                        <Label htmlFor="email" className="sr-only">Email</Label>
                        <Input 
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="max-w-sm"
                        />
                      </div>
                    ) : (
                      <span>{profileData.email}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                    {isEditing ? (
                      <div className="w-full">
                        <Label htmlFor="phone" className="sr-only">Phone</Label>
                        <Input 
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="max-w-sm"
                        />
                      </div>
                    ) : (
                      <span>{profileData.phone}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                    {isEditing ? (
                      <div className="w-full">
                        <Label htmlFor="location" className="sr-only">Location</Label>
                        <Input 
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                          className="max-w-sm"
                        />
                      </div>
                    ) : (
                      <span>{profileData.location}</span>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-muted-foreground" />
                    {isEditing ? (
                      <div className="w-full">
                        <Label htmlFor="occupation" className="sr-only">Occupation</Label>
                        <Input 
                          id="occupation"
                          value={profileData.occupation}
                          onChange={(e) => setProfileData({...profileData, occupation: e.target.value})}
                          className="max-w-sm"
                        />
                      </div>
                    ) : (
                      <span>{profileData.occupation}</span>
                    )}
                  </div>
                  <div className="flex items-center mt-2">
                    <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>Member since {profileData.joinDate}</span>
                  </div>
                </div>
                
                {isEditing && (
                  <div className="pt-4">
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-2 stat-card">
              <CardHeader className="pb-2">
                <CardTitle>About</CardTitle>
                <CardDescription>Your professional bio</CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <textarea 
                        id="bio"
                        className="w-full min-h-[120px] p-2 rounded-md border bg-background"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input 
                        id="twitter"
                        value={profileData.socialLinks.twitter}
                        onChange={(e) => setProfileData({
                          ...profileData, 
                          socialLinks: {...profileData.socialLinks, twitter: e.target.value}
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input 
                        id="linkedin"
                        value={profileData.socialLinks.linkedin}
                        onChange={(e) => setProfileData({
                          ...profileData, 
                          socialLinks: {...profileData.socialLinks, linkedin: e.target.value}
                        })}
                      />
                    </div>
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm">{profileData.bio}</p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Connect</h4>
                      <div className="space-y-1">
                        <a href={`https://${profileData.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline block">
                          Twitter: @{profileData.socialLinks.twitter.split('/').pop()}
                        </a>
                        <a href={`https://${profileData.socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline block">
                          LinkedIn: {profileData.socialLinks.linkedin.split('/').pop()}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="stat-card">
            <CardHeader>
              <CardTitle>Investment Preferences</CardTitle>
              <CardDescription>Your investment style and risk tolerance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Risk Tolerance</h3>
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full w-3/4"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Moderate to High</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Investment Horizon</h3>
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full w-4/5"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Long Term (5-10 years)</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Preferred Assets</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">Stocks</span>
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">ETFs</span>
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">Bonds</span>
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">Crypto</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="mt-4">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle>Your Investment Summary</CardTitle>
              <CardDescription>Overview of your portfolio performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Total Value</div>
                  <div className="text-2xl font-bold">$183,250.72</div>
                  <div className="text-sm text-green-500">+12.3% YTD</div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Annual Return</div>
                  <div className="text-2xl font-bold">9.8%</div>
                  <div className="text-sm text-green-500">+2.1% vs S&P 500</div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Risk Score</div>
                  <div className="text-2xl font-bold">64/100</div>
                  <div className="text-sm text-muted-foreground">Moderate</div>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: "Bought", stock: "AAPL", amount: "$5,240.00", date: "May 15, 2023" },
                    { action: "Sold", stock: "TSLA", amount: "$3,120.50", date: "April 28, 2023" },
                    { action: "Dividend", stock: "VTI", amount: "$142.25", date: "April 12, 2023" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <div className="font-medium">{item.action} {item.stock}</div>
                        <div className="text-sm text-muted-foreground">{item.date}</div>
                      </div>
                      <div className={`text-right ${item.action === "Sold" ? "text-red-500" : item.action === "Dividend" ? "text-green-500" : ""}`}>
                        {item.action === "Bought" ? "-" : "+"}{item.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-4">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent account activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { action: "Login", device: "iPhone 13 Pro", location: "New York, NY", date: "Today, 10:24 AM" },
                  { action: "Password Changed", device: "MacBook Pro", location: "New York, NY", date: "May 10, 2023, 3:15 PM" },
                  { action: "Portfolio Updated", device: "MacBook Pro", location: "New York, NY", date: "May 8, 2023, 11:42 AM" },
                  { action: "Login", device: "Chrome on Windows", location: "Boston, MA", date: "May 5, 2023, 9:30 AM" },
                  { action: "Settings Changed", device: "MacBook Pro", location: "New York, NY", date: "April 29, 2023, 5:17 PM" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{item.action}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.device} • {item.location}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">{item.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
