# Copilot Instructions for test-name-age-app

## Project Overview

This is a vanilla JavaScript static web application that collects user information (name and age) via an HTML form and sends it to an Azure App Service backend. The app is designed to be deployed on Azure Static Web Apps.

## Architecture

- **Frontend**: Pure HTML/CSS/JavaScript (no build tools or frameworks)
- **Deployment Target**: Azure Static Web Apps
- **Backend Integration**: POST requests to Azure App Service endpoint
- **Configuration**: API endpoint managed via Azure Static Web Apps environment variables
- **API Endpoint**: Set `API_ENDPOINT` environment variable in Azure Static Web Apps settings

## Key Files

- `index.html` - Main form with name and age inputs
- `styles.css` - Light blue gradient theme with animations
- `script.js` - Form validation and fetch API calls to backend
- `config.js` - API configuration loaded from environment variables
- `build.sh` - Build script that injects environment variables
- `staticwebapp.config.json` - Azure Static Web Apps routing and security headers
- `README.md` - Deployment instructions and configuration guide
- `ENVIRONMENT_VARIABLES.md` - Detailed guide for setting up environment variables

## Development Workflow

### Local Testing

```powershell
# Serve locally using Python
python -m http.server 8000

# Or using npx
npx http-server
```

Visit `http://localhost:8000` to test the form. API calls will fail without a configured backend.

### Deployment

This app deploys to Azure Static Web Apps. The `staticwebapp.config.json` handles routing and security headers. No build step is required.

## Code Conventions

1. **Vanilla JavaScript**: No frameworks or bundlers - keep it simple
2. **CSS**: Use inline animations and gradients for visual effects
3. **Theme**: Light blue (`#4299e1`) as primary accent, purple-blue gradient background
4. **Form Validation**: Native HTML5 validation with visual feedback via border colors
5. **Error Handling**: Show user-friendly messages in the `.message` div with success/error classes

## Configuration Points

### Backend URL (Environment Variable - Recommended)

Set the `API_ENDPOINT` environment variable in Azure Static Web Apps:

**Via Azure Portal:**

1. Go to Static Web App → Configuration → Application settings
2. Add: `API_ENDPOINT` = `https://your-app-service.azurewebsites.net/api/user`

**Via Azure CLI:**

```powershell
az staticwebapp appsettings set --name test-name-age-app --setting-names API_ENDPOINT="https://your-app-service.azurewebsites.net/api/user"
```

See `ENVIRONMENT_VARIABLES.md` for complete setup guide.

### Local Development

Edit `config.js` directly for local testing:

```javascript
window.API_CONFIG = { endpoint: "http://localhost:5000/api/user" };
```

## Expected Backend Contract

**Endpoint**: POST to configured `API_ENDPOINT`

**Request Body**:

```json
{
  "name": "string",
  "age": number
}
```

**Success Response** (200):

```json
{
  "message": "User data received successfully"
}
```

## Common Tasks

### Change Theme Colors

- Background gradient: `body` in `styles.css` (currently purple-blue)
- Button color: `.submit-btn` background (currently light blue)
- Input focus: `input:focus` border-color

### Add New Form Fields

1. Add input in `index.html` within a `.form-group` div
2. Update `userData` object in `script.js` form submit handler
3. Add validation feedback listener in `script.js` if needed

### Modify Success/Error Messages

Update the `showMessage()` calls in `script.js` fetch handlers

## Testing Checklist

- [ ] Form submits with valid name and age
- [ ] Validation prevents empty or invalid inputs (age 1-150)
- [ ] Error message displays if backend is unreachable
- [ ] Success message displays on successful submission
- [ ] Form resets after successful submission
- [ ] Responsive design works on mobile screens
- [ ] Button shows loading state during submission
- [ ] Test Connection button works and changes color (green=success, red=failed)
- [ ] Test Connection button automatically resets after 3 seconds

## Avoid

- Adding build tools or npm packages - keep this a simple static site
- Changing the file structure - Azure SWA expects files at root
- Removing CORS/CSP headers from `staticwebapp.config.json`
