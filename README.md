# Env Border Chrome Extension

Env Border is a Chrome extension designed to enhance your web development workflow by visually distinguishing between different environments of your applications. By allowing you to input the domains for your local, QE (Quality Engineering), and production environments, Env Border sets a colored border around the webpage window. This simple yet effective visual cue helps you quickly identify the environment you're currently viewing at a glance.

## Features

- **Environment Recognition**: Automatically recognizes the environment based on the domain.
- **Color-Coded Borders**: Adds a distinct colored border to the window:
  - **Green** for Local
  - **Yellow** for QE
  - **Red** for Production
- **Custom Domain Input**: Allows you to specify the domains for each environment.

## Installation

1. Download the extension from the Chrome Web Store. (Link to be added upon store approval)
2. Navigate to `chrome://extensions` in your Chrome browser.
3. Ensure that the "Developer mode" toggle at the top-right is turned on.
4. Click "Load unpacked" and select the folder where you downloaded the extension.
5. The extension should now be installed and will appear in your extensions list.

## Usage

After installation, click on the Env Border extension icon in your browser's toolbar to open the settings popup. Here, you can input the domains for your local, QE, and production environments. Once set, the extension will automatically add a colored border to any webpage you visit that matches the domains you've specified.

Remember, Env Border is a tool to aid in development and should not be used as a sole indicator of environment status. Always double-check your environment before performing any sensitive operations.
