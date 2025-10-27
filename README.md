# User Information Static Web App

A simple, colorful static web application with a light blue theme that collects user information (name and age) and sends it to an Azure App Service backend.

## 🎨 Features

- Clean, modern UI with light blue gradient theme
- Responsive design that works on all devices
- Form validation with visual feedback
- Animated transitions and hover effects
- **Test Connection button** - Verify API connectivity before submitting (turns green/red)
  - Only works when API_ENDPOINT environment variable is properly configured
  - Shows warning if using default/placeholder endpoint
- Sends data to Azure App Service backend via REST API

## 🚀 Deployment to Azure Static Web Apps

### Prerequisites

- Azure account with an active subscription
- Azure App Service backend endpoint (to receive the data)

### Deploy using Azure Portal

1. **Create Azure Static Web App:**

   ```bash
   az staticwebapp create \
     --name test-name-age-app \
     --resource-group <your-resource-group> \
     --source https://github.com/<your-username>/<your-repo> \
     --location "East US 2" \
     --branch main \
     --app-location "/" \
     --output-location "/"
   ```

2. **Configure the API endpoint using environment variables:**

   ```powershell
   az staticwebapp appsettings set `
     --name test-name-age-app `
     --resource-group <your-resource-group> `
     --setting-names API_ENDPOINT="https://your-actual-app-service.azurewebsites.net/api/user"
   ```

   See **[ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md)** for more details.

3. **Update CORS settings:**
   - The `staticwebapp.config.json` already allows `*.azurewebsites.net` domains
   - Update if you need to allow other domains

### Deploy using GitHub Actions (Recommended)

1. Fork or push this repository to GitHub
2. Go to Azure Portal → Create Static Web App
3. Select GitHub as the source
4. Authorize Azure to access your repository
5. Select this repository and branch
6. Set build details:
   - App location: `/`
   - Output location: `/`
7. Azure will automatically create a GitHub Actions workflow

## 🔧 Configuration

### Update Backend Endpoint (Using Environment Variables - Recommended)

The app uses Azure Static Web Apps environment variables for configuration. See **[ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md)** for detailed setup instructions.

**Quick Setup via Azure Portal:**

1. Go to your Static Web App → **Configuration** → **Application settings**
2. Add setting: `API_ENDPOINT` = `https://your-app-service.azurewebsites.net/api/user`
3. Save and redeploy

**Quick Setup via Azure CLI:**

```powershell
az staticwebapp appsettings set `
  --name test-name-age-app `
  --resource-group myResourceGroup `
  --setting-names API_ENDPOINT="https://your-app-service.azurewebsites.net/api/user"
```

### Alternative: Direct Configuration (Not Recommended for Production)

In `config.js`, update the endpoint directly (for local testing only):

```javascript
window.API_CONFIG = {
  endpoint: "https://your-app-service.azurewebsites.net/api/user",
};
```

### Expected Backend API

The backend should accept POST requests with this JSON structure:

```json
{
  "name": "John Doe",
  "age": 25
}
```

And return a response like:

```json
{
  "message": "User data received successfully",
  "id": "12345"
}
```

## 📁 Project Structure

```
test-name-age-app/
├── index.html              # Main HTML file with form
├── styles.css              # Light blue themed styles
├── script.js               # Form handling and API calls
├── staticwebapp.config.json # Azure Static Web Apps configuration
└── README.md               # This file
```

## 🎨 Color Scheme

- Primary gradient: Purple to blue (`#667eea` to `#764ba2`)
- Accent color: Light blue (`#4299e1`)
- Form elements: Soft grays with blue focus states

## 🧪 Local Testing

Simply open `index.html` in a web browser. Note that API calls will fail unless you:

1. Update the `API_ENDPOINT` in `script.js`
2. Ensure your backend has CORS configured to allow requests from `localhost` or `file://`

Alternatively, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server
```

Then visit `http://localhost:8000`

## 📝 License

MIT License - Feel free to use this for your projects!
