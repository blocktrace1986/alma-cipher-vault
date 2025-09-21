import { Button } from "@/components/ui/button";
import { Database, Lock, Key } from "lucide-react";
import { WalletConnect } from "./WalletConnect";
import { useAccount } from 'wagmi';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { isConnected } = useAccount();
  const location = useLocation();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Database className="h-8 w-8 text-secondary" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full crypto-glow"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-academic font-bold text-foreground">
                Alma Cipher Vault
              </h1>
              <p className="text-xs text-muted-foreground">FHE-Powered Secure Vault</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/dashboard" 
              className={`transition-colors ${
                location.pathname === '/dashboard' || location.pathname === '/'
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/vault" 
              className={`transition-colors ${
                location.pathname === '/vault'
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Vault
            </Link>
            <Link 
              to="/encryption" 
              className={`transition-colors ${
                location.pathname === '/encryption'
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Encryption
            </Link>
            <Link 
              to="/analytics" 
              className={`transition-colors ${
                location.pathname === '/analytics'
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Analytics
            </Link>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {isConnected && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-accent/10 rounded-full">
                <Key className="h-4 w-4 text-accent" />
                <span className="text-sm text-accent">Vault Member</span>
              </div>
            )}
            
            <WalletConnect />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;