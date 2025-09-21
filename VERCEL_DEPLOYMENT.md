# Vercel Deployment Guide for Alma Cipher Vault

This guide provides step-by-step instructions for deploying the Alma Cipher Vault application to Vercel.

## Prerequisites

- GitHub account with access to the `blocktrace1986/alma-cipher-vault` repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step 1: Connect Repository to Vercel

1. **Sign in to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" on the Vercel dashboard
   - Select "Import Git Repository"
   - Choose `blocktrace1986/alma-cipher-vault`
   - Click "Import"

## Step 2: Configure Project Settings

1. **Project Configuration**
   - **Project Name**: `alma-cipher-vault`
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

2. **Environment Variables**
   Add the following environment variables in Vercel dashboard:

   ```
   VITE_CHAIN_ID=11155111
   VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_API_KEY
   VITE_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID
   VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
   VITE_RPC_URL=https://1rpc.io/sepolia
   VITE_VAULT_CONTRACT_ADDRESS=YOUR_CONTRACT_ADDRESS
   VITE_FHE_CONTRACT_ADDRESS=YOUR_FHE_CONTRACT_ADDRESS
   VITE_APP_NAME=Alma Cipher Vault
   VITE_APP_DESCRIPTION=Secure FHE-powered vault for confidential data management
   ```

## Step 3: Deploy

1. **Initial Deployment**
   - Click "Deploy" to start the first deployment
   - Wait for the build process to complete (usually 2-3 minutes)

2. **Verify Deployment**
   - Once deployed, you'll receive a URL like `https://alma-cipher-vault-xxx.vercel.app`
   - Click the URL to verify the application is running

## Step 4: Configure Custom Domain (Optional)

1. **Add Domain**
   - Go to Project Settings > Domains
   - Click "Add Domain"
   - Enter your custom domain (e.g., `alma-cipher-vault.com`)

2. **DNS Configuration**
   - Add a CNAME record pointing to your Vercel domain
   - Wait for DNS propagation (up to 24 hours)

## Step 5: Configure Smart Contract Integration

1. **Deploy Smart Contract**
   - Deploy the `AlmaCipherVault.sol` contract to Sepolia testnet
   - Update the `VITE_VAULT_CONTRACT_ADDRESS` environment variable

2. **Update Environment Variables**
   - Go to Project Settings > Environment Variables
   - Update `VITE_VAULT_CONTRACT_ADDRESS` with the deployed contract address
   - Redeploy the application

## Step 6: Configure Automatic Deployments

1. **Enable Auto-Deploy**
   - Go to Project Settings > Git
   - Ensure "Auto-Deploy" is enabled for the `new-main` branch

2. **Branch Protection**
   - Set up branch protection rules if needed
   - Configure deployment previews for pull requests

## Step 7: Monitor and Optimize

1. **Performance Monitoring**
   - Use Vercel Analytics to monitor performance
   - Check Core Web Vitals scores

2. **Error Monitoring**
   - Set up error tracking (optional)
   - Monitor application logs

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Environment Variables**
   - Ensure all required environment variables are set
   - Check for typos in variable names
   - Verify values are correct

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URL configuration
   - Ensure network configuration matches

### Performance Optimization

1. **Bundle Size**
   - Use dynamic imports for large dependencies
   - Optimize images and assets
   - Enable compression

2. **Caching**
   - Configure appropriate cache headers
   - Use CDN for static assets
   - Implement service worker if needed

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable encryption
   - Rotate keys regularly

2. **Smart Contract Security**
   - Audit smart contracts before deployment
   - Use testnet for development
   - Implement proper access controls

## Support

For issues related to:
- **Vercel Deployment**: Check Vercel documentation
- **Smart Contract**: Review contract code and deployment logs
- **Wallet Integration**: Verify wallet provider documentation

## Next Steps

After successful deployment:
1. Test all wallet connections
2. Verify smart contract interactions
3. Test data encryption/decryption
4. Monitor user experience
5. Set up monitoring and alerts

---

**Note**: This deployment guide assumes you have already deployed the smart contract to Sepolia testnet. If not, you'll need to deploy the contract first and update the environment variables accordingly.