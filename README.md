# Env Border Chrome Extension

Env Border is a Chrome extension designed to enhance your web development workflow by visually distinguishing between different environments of your applications. By allowing you to input the domains for your local, QA, staging, and production environments, Env Border sets a colored border around the webpage window. This simple yet effective visual cue helps you quickly identify the environment you're currently viewing at a glance.

## Features

- **Environment Recognition**: Automatically recognizes the environment based on the domain
- **Subdomain Support**: Matches subdomains automatically (e.g., `api.qa.example.com` matches `qa.example.com`)
- **Color-Coded Borders**: Adds a distinct colored border to the window:
  - **Green** for Local
  - **Yellow** for QA
  - **Orange** for Staging
  - **Red** for Production
- **Custom Domain Input**: Allows you to specify the domains for each environment
- **Toggle Control**: Enable or disable the extension with a single click

## Installation

1. Download the extension from the Chrome Web Store. [Env Border](https://chromewebstore.google.com/detail/env-border/imioapnclmdfnmoaackmnfnkinlojhng)

OR

1. Clone this repo
2. Navigate to `chrome://extensions` in your Chrome browser.
3. Ensure that the "Developer mode" toggle at the top-right is turned on.
4. Click "Load unpacked" and select the folder where you cloned this repo.
5. The extension should now be installed and will appear in your extensions list.

## Usage

After installation, click on the Env Border extension icon in your browser's toolbar to open the settings popup. Here, you can:

1. **Configure Domains**: Input the domains for your local, QA, staging, and production environments
   - Example: `localhost:3000`, `qa.example.com`, `staging.example.com`, `example.com`
2. **Toggle the Extension**: Click "Enable Extension" or "Disable Extension" to turn the border feature on/off
3. **Save Settings**: Click "Save" to store your domain configuration

The extension will automatically add a colored border to any webpage you visit that matches the domains you've specified.

## How It Works

The extension uses intelligent domain matching to determine which environment you're currently viewing:
- Normalizes domains by removing protocols, ports, and paths
- Matches both exact domains and subdomains
- Applies the border color corresponding to the matched environment

## Important Notes

⚠️ **Env Border is a tool to aid in development and should not be used as a sole indicator of environment status. Always double-check your environment before performing any sensitive operations.**