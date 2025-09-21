import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Users, Database, Key, AlertCircle, Plus, Eye, FileText, CreditCard, Image, User, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useVault, useVaultData, useUserReputation } from "@/hooks/useVault";
import { useAccount } from 'wagmi';
import { useState } from 'react';

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const { createVaultEntry, updateVaultEntry, isPending } = useVault();
  const { reputation } = useUserReputation(address);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEntryData, setNewEntryData] = useState({
    dataType: 1,
    encryptedData: '',
    isPublic: false,
    metadataHash: ''
  });

  const handleCreateEntry = async () => {
    if (!newEntryData.encryptedData || !newEntryData.metadataHash) return;
    
    try {
      await createVaultEntry(
        newEntryData.dataType,
        newEntryData.encryptedData,
        newEntryData.isPublic,
        newEntryData.metadataHash
      );
      setShowCreateForm(false);
      setNewEntryData({ dataType: 1, encryptedData: '', isPublic: false, metadataHash: '' });
    } catch (error) {
      console.error('Error creating entry:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-academic font-bold text-foreground mb-2">
            Alma Cipher Vault Dashboard
          </h1>
          <p className="text-muted-foreground">
            Secure FHE-powered vault for confidential data management
          </p>
        </div>

        {/* Wallet Connection Status */}
        {!isConnected && (
          <Card className="crypto-glow mb-8">
            <CardContent className="pt-6">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Wallet Not Connected</h3>
                <p className="text-muted-foreground mb-4">
                  Please connect your wallet to access the vault features
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="crypto-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Vault Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-secondary mr-2" />
                <div className="text-2xl font-academic font-bold text-secondary">$2.84B</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">FHE Encrypted</p>
            </CardContent>
          </Card>

          <Card className="crypto-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Database className="h-4 w-4 text-accent mr-2" />
                <div className="text-2xl font-academic font-bold text-accent">1,247</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Encrypted data points</p>
            </CardContent>
          </Card>

          <Card className="crypto-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">User Reputation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Key className="h-4 w-4 text-secondary mr-2" />
                <div className="text-2xl font-academic font-bold text-secondary">{reputation || 0}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Trust score</p>
            </CardContent>
          </Card>

          <Card className="crypto-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Security Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-accent mr-2" />
                <div className="text-2xl font-academic font-bold text-accent">FHE</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Maximum encryption</p>
            </CardContent>
          </Card>
        </div>

        {/* Create New Entry */}
        {isConnected && (
          <Card className="crypto-glow mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Create New Vault Entry</span>
                <Button
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {showCreateForm ? 'Cancel' : 'New Entry'}
                </Button>
              </CardTitle>
            </CardHeader>
            {showCreateForm && (
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Data Type</label>
                    <select
                      value={newEntryData.dataType}
                      onChange={(e) => setNewEntryData({...newEntryData, dataType: Number(e.target.value)})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value={1}>📄 Document</option>
                      <option value={2}>💳 Financial</option>
                      <option value={3}>🖼️ Media</option>
                      <option value={4}>👤 Personal</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Encrypted Data</label>
                    <input
                      type="text"
                      value={newEntryData.encryptedData}
                      onChange={(e) => setNewEntryData({...newEntryData, encryptedData: e.target.value})}
                      placeholder="Encrypted data value"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Metadata Hash</label>
                    <input
                      type="text"
                      value={newEntryData.metadataHash}
                      onChange={(e) => setNewEntryData({...newEntryData, metadataHash: e.target.value})}
                      placeholder="QmHash..."
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isPublic"
                      checked={newEntryData.isPublic}
                      onChange={(e) => setNewEntryData({...newEntryData, isPublic: e.target.checked})}
                    />
                    <label htmlFor="isPublic" className="text-sm">Public Entry</label>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={handleCreateEntry}
                    disabled={isPending || !newEntryData.encryptedData || !newEntryData.metadataHash}
                    className="gap-2"
                  >
                    {isPending ? 'Creating...' : 'Create Entry'}
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* Fund Allocation Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="crypto-glow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 text-accent mr-2" />
                Encrypted Fund Allocations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Academic Programs</span>
                    <Badge variant="secondary" className="text-xs">Encrypted</Badge>
                  </div>
                  <Progress value={45} className="h-2 shimmer-effect" />
                  <p className="text-xs text-muted-foreground mt-1">$1.28B allocated</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Research & Development</span>
                    <Badge variant="secondary" className="text-xs">Encrypted</Badge>
                  </div>
                  <Progress value={32} className="h-2 shimmer-effect" />
                  <p className="text-xs text-muted-foreground mt-1">$908M allocated</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Infrastructure</span>
                    <Badge variant="secondary" className="text-xs">Encrypted</Badge>
                  </div>
                  <Progress value={23} className="h-2 shimmer-effect" />
                  <p className="text-xs text-muted-foreground mt-1">$653M allocated</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="crypto-glow">
            <CardHeader>
              <CardTitle>Recent Governance Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Investment Strategy Vote #47</p>
                    <p className="text-xs text-muted-foreground">Approved with 94.2% consensus</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-secondary rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Scholarship Fund Proposal</p>
                    <p className="text-xs text-muted-foreground">Under review - 72% support</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Annual Disclosure Timeline</p>
                    <p className="text-xs text-muted-foreground">Approved unanimously</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Status */}
        <Card className="crypto-glow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 text-accent mr-2" />
              Security & Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-card/40 rounded-lg">
                <Key className="h-8 w-8 text-secondary mx-auto mb-2" />
                <p className="font-medium text-secondary">Encryption Active</p>
                <p className="text-xs text-muted-foreground">All allocations secured</p>
              </div>
              
              <div className="text-center p-4 bg-card/40 rounded-lg">
                <Lock className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="font-medium text-accent">Multi-Sig Verified</p>
                <p className="text-xs text-muted-foreground">3/5 signers required</p>
              </div>
              
              <div className="text-center p-4 bg-card/40 rounded-lg">
                <TrendingUp className="h-8 w-8 text-secondary mx-auto mb-2" />
                <p className="font-medium text-secondary">Audit Complete</p>
                <p className="text-xs text-muted-foreground">Q4 2024 compliant</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
