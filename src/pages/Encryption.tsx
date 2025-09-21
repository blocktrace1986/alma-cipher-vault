import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Key, Lock, Database, Shield, Eye, EyeOff } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAccount } from 'wagmi';
import { useState } from 'react';

const Encryption = () => {
  const { isConnected } = useAccount();
  const [showKeys, setShowKeys] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-academic font-bold text-foreground mb-2">
            FHE Encryption Center
          </h1>
          <p className="text-muted-foreground">
            Advanced Fully Homomorphic Encryption for secure data processing
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
                  Please connect your wallet to access encryption features
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Encryption Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="crypto-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">FHE Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Database className="h-4 w-4 text-secondary mr-2" />
                <div className="text-2xl font-academic font-bold text-secondary">Active</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Fully operational</p>
            </CardContent>
          </Card>

          <Card className="crypto-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Encryption Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Lock className="h-4 w-4 text-accent mr-2" />
                <div className="text-2xl font-academic font-bold text-accent">256-bit</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Military grade</p>
            </CardContent>
          </Card>

          <Card className="crypto-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Data Processed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Key className="h-4 w-4 text-secondary mr-2" />
                <div className="text-2xl font-academic font-bold text-secondary">2.4TB</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Encryption Keys */}
        <Card className="crypto-glow mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Encryption Keys</span>
              <Button
                onClick={() => setShowKeys(!showKeys)}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                {showKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showKeys ? 'Hide' : 'Show'} Keys
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Key className="h-6 w-6 text-secondary" />
                  <div>
                    <h3 className="font-semibold">Master Encryption Key</h3>
                    <p className="text-sm text-muted-foreground">Primary FHE key</p>
                  </div>
                </div>
                <div className="text-sm font-mono">
                  {showKeys ? '0x1a2b3c4d5e6f...' : '••••••••••••••••'}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Lock className="h-6 w-6 text-accent" />
                  <div>
                    <h3 className="font-semibold">Data Access Key</h3>
                    <p className="text-sm text-muted-foreground">Vault access control</p>
                  </div>
                </div>
                <div className="text-sm font-mono">
                  {showKeys ? '0x7f8e9d0c1b2a...' : '••••••••••••••••'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Encryption Operations */}
        <Card className="crypto-glow">
          <CardHeader>
            <CardTitle>Encryption Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Data Encryption</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Encrypt sensitive data using FHE technology
                </p>
                <Button className="w-full">
                  <Key className="h-4 w-4 mr-2" />
                  Encrypt Data
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Homomorphic Operations</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Process encrypted data without decryption
                </p>
                <Button className="w-full" variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Process Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Encryption;
