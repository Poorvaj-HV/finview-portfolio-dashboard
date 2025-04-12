
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/components/theme-provider";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    priceAlerts: true,
    newsAlerts: true,
    portfolioDigest: true,
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-4">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Alex Johnson" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="alex.johnson@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="America/New_York">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your dashboard experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select defaultValue="USD">
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="GBP">British Pound (£)</SelectItem>
                    <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
                    <SelectItem value="CAD">Canadian Dollar (C$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date Format</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="mdy" name="dateFormat" defaultChecked />
                    <label htmlFor="mdy">MM/DD/YYYY</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="dmy" name="dateFormat" />
                    <label htmlFor="dmy">DD/MM/YYYY</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="ymd" name="dateFormat" />
                    <label htmlFor="ymd">YYYY/MM/DD</label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="price-alerts">Price Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified when stock prices change significantly</p>
                    </div>
                    <Switch
                      id="price-alerts"
                      checked={notifications.priceAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, priceAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="news-alerts">News Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified about important company news</p>
                    </div>
                    <Switch
                      id="news-alerts"
                      checked={notifications.newsAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, newsAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="portfolio-digest">Portfolio Digest</Label>
                      <p className="text-sm text-muted-foreground">Receive daily/weekly portfolio summaries</p>
                    </div>
                    <Switch
                      id="portfolio-digest"
                      checked={notifications.portfolioDigest}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, portfolioDigest: checked })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Notification Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4 mt-4">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div 
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      theme === 'light' ? 'border-primary bg-muted' : 'border-border'
                    }`}
                    onClick={() => setTheme('light')}
                  >
                    <div className="h-20 bg-white rounded-md border mb-2 flex items-center justify-center text-black">
                      Light Preview
                    </div>
                    <div className="text-center font-medium">Light</div>
                  </div>
                  <div 
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      theme === 'dark' ? 'border-primary bg-muted' : 'border-border'
                    }`}
                    onClick={() => setTheme('dark')}
                  >
                    <div className="h-20 bg-gray-900 rounded-md border mb-2 flex items-center justify-center text-white">
                      Dark Preview
                    </div>
                    <div className="text-center font-medium">Dark</div>
                  </div>
                  <div 
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      theme === 'system' ? 'border-primary bg-muted' : 'border-border'
                    }`}
                    onClick={() => setTheme('system')}
                  >
                    <div className="h-20 bg-gradient-to-r from-white to-gray-900 rounded-md border mb-2 flex items-center justify-center text-black">
                      System Preview
                    </div>
                    <div className="text-center font-medium">System</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dashboard Layout</h3>
                <div className="space-y-2">
                  <Label htmlFor="default-view">Default View</Label>
                  <Select defaultValue="dashboard">
                    <SelectTrigger id="default-view">
                      <SelectValue placeholder="Select default view" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dashboard">Dashboard</SelectItem>
                      <SelectItem value="portfolio">Portfolio</SelectItem>
                      <SelectItem value="stocks">Stocks</SelectItem>
                      <SelectItem value="transactions">Transactions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Appearance Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-4">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="flex justify-end">
                  <Button>Update Password</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch id="two-factor" defaultChecked />
                </div>
                <div className="mt-2">
                  <Button variant="outline">Set Up 2FA</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Session Management</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">You're currently logged in on 2 devices</p>
                  <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                    Log Out From All Devices
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
