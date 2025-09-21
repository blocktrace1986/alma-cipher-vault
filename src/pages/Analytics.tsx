import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Database, Key, Lock, Users, Activity } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAccount } from 'wagmi';

const Analytics = () => {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-academic font-bold text-foreground mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your encrypted data and system performance
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="crypto-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Data Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Database className="h-4 w-4 text-secondary mr-2" />
                <div className="text-2xl font-academic font-bold text-secondary">1,247</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="crypto-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Encryption Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Key className="h-4 w-4 text-accent mr-2" />
                <div className="text-2xl font-academic font-bold text-accent">8,432</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">+23% from last month</p>
            </CardContent>
          </Card>

          <Card className="crypto-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-secondary mr-2" />
                <div className="text-2xl font-academic font-bold text-secondary">156</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">+8 new this week</p>
            </CardContent>
          </Card>

          <Card className="crypto-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">System Uptime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Activity className="h-4 w-4 text-accent mr-2" />
                <div className="text-2xl font-academic font-bold text-accent">99.9%</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Data Usage Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="crypto-glow">
            <CardHeader>
              <CardTitle>Data Usage Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Document Storage</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-secondary/20 rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Financial Data</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-accent/20 rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{width: '45%'}}></div>
                    </div>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Media Files</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-secondary/20 rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full" style={{width: '30%'}}></div>
                    </div>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Personal Data</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-accent/20 rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="crypto-glow">
            <CardHeader>
              <CardTitle>Security Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Lock className="h-5 w-5 text-accent" />
                    <span className="font-medium">Access Attempts</span>
                  </div>
                  <span className="text-sm font-mono">2,847</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Key className="h-5 w-5 text-secondary" />
                    <span className="font-medium">Successful Logins</span>
                  </div>
                  <span className="text-sm font-mono">2,834</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Database className="h-5 w-5 text-accent" />
                    <span className="font-medium">Data Transfers</span>
                  </div>
                  <span className="text-sm font-mono">1,234</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-secondary" />
                    <span className="font-medium">Success Rate</span>
                  </div>
                  <span className="text-sm font-mono">99.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <Card className="crypto-glow">
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-card/40 rounded-lg">
                <TrendingUp className="h-8 w-8 text-secondary mx-auto mb-2" />
                <p className="font-medium text-secondary">Encryption Speed</p>
                <p className="text-xs text-muted-foreground">2.3ms avg</p>
              </div>
              
              <div className="text-center p-4 bg-card/40 rounded-lg">
                <Database className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="font-medium text-accent">Storage Efficiency</p>
                <p className="text-xs text-muted-foreground">98.7% optimized</p>
              </div>
              
              <div className="text-center p-4 bg-card/40 rounded-lg">
                <Activity className="h-8 w-8 text-secondary mx-auto mb-2" />
                <p className="font-medium text-secondary">Response Time</p>
                <p className="text-xs text-muted-foreground">45ms avg</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;
