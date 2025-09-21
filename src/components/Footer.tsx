import { Database, Lock, Key } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Database className="h-6 w-6 text-secondary" />
                <div className="absolute -top-1 -right-1 h-2 w-2 bg-accent rounded-full crypto-glow"></div>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-academic font-bold text-foreground">
                  Alma Cipher Vault
                </h3>
                <p className="text-xs text-muted-foreground">FHE-Powered Security</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Next-generation secure data management platform built on Fully Homomorphic Encryption technology.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Lock className="h-3 w-3" />
                <span>FHE Encryption</span>
              </li>
              <li className="flex items-center space-x-2">
                <Key className="h-3 w-3" />
                <span>Access Control</span>
              </li>
              <li className="flex items-center space-x-2">
                <Database className="h-3 w-3" />
                <span>Data Management</span>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Technology</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>React 18 + TypeScript</li>
              <li>Vite Build System</li>
              <li>Tailwind CSS</li>
              <li>Wagmi + Viem</li>
              <li>RainbowKit</li>
            </ul>
          </div>

          {/* Security */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Security</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Zero-Knowledge Privacy</li>
              <li>End-to-End Encryption</li>
              <li>Audit Logging</li>
              <li>Reputation System</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 Alma Cipher Vault. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Built with ❤️ for privacy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
