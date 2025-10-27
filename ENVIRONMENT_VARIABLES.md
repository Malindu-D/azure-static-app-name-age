# Azure Static Web Apps Environment Variables Setup

This guide explains how to configure the API endpoint using Azure Static Web Apps environment variables.

## 📋 Overview

The application uses environment variables to manage configuration across different environments (development, staging, production). The API endpoint is injected during the build process.

## 🔧 Configuration Files

- **`config.js`** - Contains the API configuration that gets injected with environment variables
- **`build.sh`** - Build script that replaces placeholders with actual environment variable values
- **`script.js`** - Reads the configuration from `window.API_CONFIG`

## 🚀 Setting Up Environment Variables in Azure

### Method 1: Azure Portal (Recommended)

1. **Navigate to your Static Web App** in the Azure Portal

2. **Go to Configuration**:

   - In the left menu, click **Configuration**
   - Click **Application settings**

3. **Add Environment Variable**:

   - Click **+ Add**
   - Name: `API_ENDPOINT`
   - Value: `https://your-app-service.azurewebsites.net/api/user`
   - Click **OK**
   - Click **Save**

4. **Trigger a Redeploy**:
   - Go to **Deployments** in the left menu
   - Find your latest deployment
   - Click **Redeploy** to rebuild with the new environment variable

### Method 2: Azure CLI

```powershell
# Set the environment variable
az staticwebapp appsettings set `
  --name test-name-age-app `
  --resource-group myResourceGroup `
  --setting-names API_ENDPOINT="https://your-app-service.azurewebsites.net/api/user"

# Verify the setting
az staticwebapp appsettings list `
  --name test-name-age-app `
  --resource-group myResourceGroup
```

### Method 3: GitHub Actions Workflow

If using GitHub Actions, add the environment variable to your workflow file (`.github/workflows/azure-static-web-apps-*.yml`):

```yaml
- name: Build And Deploy
  uses: Azure/static-web-apps-deploy@v1
  with:
    azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
    repo_token: ${{ secrets.GITHUB_TOKEN }}
    action: "upload"
    app_location: "/"
    output_location: "/"
  env:
    API_ENDPOINT: ${{ secrets.API_ENDPOINT }}
```

Then add the secret in GitHub:

1. Go to your repository **Settings**
2. Click **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `API_ENDPOINT`
5. Value: `https://your-app-service.azurewebsites.net/api/user`

## 🔒 Different Environments

You can set different API endpoints for different environments:

### Development Environment

```powershell
az staticwebapp appsettings set `
  --name test-name-age-app-dev `
  --setting-names API_ENDPOINT="https://dev-app-service.azurewebsites.net/api/user"
```

### Staging Environment

```powershell
az staticwebapp appsettings set `
  --name test-name-age-app-staging `
  --setting-names API_ENDPOINT="https://staging-app-service.azurewebsites.net/api/user"
```

### Production Environment

```powershell
az staticwebapp appsettings set `
  --name test-name-age-app `
  --setting-names API_ENDPOINT="https://prod-app-service.azurewebsites.net/api/user"
```

## 🧪 Local Development

For local development, edit `config.js` directly:

```javascript
window.API_CONFIG = {
  endpoint: "http://localhost:5000/api/user", // Your local backend
};
```

Or create a `config.local.js` file (add to `.gitignore`):

```javascript
window.API_CONFIG = {
  endpoint: "http://localhost:5000/api/user",
};
```

Then update `index.html` to load the local config:

```html
<script src="config.local.js"></script>
<script src="script.js"></script>
```

## 📝 Build Process

When Azure Static Web Apps builds your app:

1. Reads the `API_ENDPOINT` environment variable
2. Runs `build.sh` (if configured)
3. Replaces `#{API_ENDPOINT}#` in `config.js` with the actual value
4. Deploys the processed files

## ✅ Verification

After deploying with environment variables:

1. Open your Static Web App URL
2. Open browser DevTools (F12)
3. Go to Console
4. Type: `window.API_CONFIG`
5. You should see: `{endpoint: "https://your-app-service.azurewebsites.net/api/user"}`

## 🛡️ Security Best Practices

✅ **DO**:

- Store API endpoints in environment variables
- Use different endpoints for dev/staging/prod
- Keep sensitive values in Azure Key Vault and reference them
- Use HTTPS endpoints only

❌ **DON'T**:

- Commit actual API URLs to version control
- Store API keys or secrets in environment variables (use Azure Key Vault)
- Use HTTP endpoints in production

## 🔗 Additional Configuration Options

You can add more environment variables as needed:

```powershell
az staticwebapp appsettings set `
  --name test-name-age-app `
  --setting-names `
    API_ENDPOINT="https://your-app-service.azurewebsites.net/api/user" `
    API_TIMEOUT="5000" `
    ENABLE_ANALYTICS="true"
```

Then update `config.js`:

```javascript
window.API_CONFIG = {
  endpoint: "#{API_ENDPOINT}#",
  timeout: "#{API_TIMEOUT}#",
  enableAnalytics: "#{ENABLE_ANALYTICS}#",
};
```

## 📚 References

- [Azure Static Web Apps Configuration](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration)
- [Environment Variables in Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/environment-variables)
- [Build Configuration](https://learn.microsoft.com/en-us/azure/static-web-apps/build-configuration)
