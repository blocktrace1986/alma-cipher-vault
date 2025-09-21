import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Key, LogOut, Copy, Check, Database } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success('Address copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <Button onClick={openConnectModal} className="gap-2">
                      <Key className="h-4 w-4" />
                      Connect Wallet
                    </Button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <Button onClick={openChainModal} variant="destructive">
                      Wrong network
                    </Button>
                  );
                }

                return (
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={openChainModal}
                      variant="outline"
                      className="gap-2"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </Button>

                    <Button onClick={openAccountModal} variant="outline">
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}
                    </Button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary" className="gap-1">
        <Database className="h-3 w-3" />
        Connected
      </Badge>
      <Button
        variant="outline"
        size="sm"
        onClick={copyAddress}
        className="gap-1"
      >
        {copied ? (
          <Check className="h-3 w-3" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
        {formatAddress(address || '')}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => disconnect()}
        className="gap-1"
      >
        <LogOut className="h-3 w-3" />
        Disconnect
      </Button>
    </div>
  );
}