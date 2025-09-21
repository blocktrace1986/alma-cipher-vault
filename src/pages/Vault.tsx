import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Key, Lock, Plus, Eye, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useVault, useVaultData, useUserReputation } from "@/hooks/useVault";
import { useAccount } from 'wagmi';
import { useState } from 'react';

const Vault = () => {
  const { address, isConnected } = useAccount();
  const { createVaultEntry, isPending } = useVault();
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
            Vault Management
          </h1>
          <p className="text-muted-foreground">
            Manage your encrypted data entries and access controls
          </p>
        </div>

        {/* Wallet Connection Status */}
        {!isConnected && (
          <Card className="crypto-glow mb-8">
            <CardContent className="pt-6">
              <div className="text-center">
                <Key className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Wallet Not Connected</h3>
                <p className="text-muted-foreground mb-4">
                  Please connect your wallet to access vault features
                </p>
              </div>
            </CardContent>
          </Card>
        )}

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

        {/* Vault Entries */}
        <Card className="crypto-glow">
          <CardHeader>
            <CardTitle>Vault Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Database className="h-8 w-8 text-secondary" />
                  <div>
                    <h3 className="font-semibold">Document #001</h3>
                    <p className="text-sm text-muted-foreground">Encrypted document storage</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Lock className="h-8 w-8 text-accent" />
                  <div>
                    <h3 className="font-semibold">Financial #002</h3>
                    <p className="text-sm text-muted-foreground">Encrypted financial data</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Vault;
