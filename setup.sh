#!/bin/bash

# Cypress TypeScript Project with Cucumber Setup Script
# This script helps set up the project with all necessary dependencies

echo "🚀 Setting up Cypress TypeScript Project with Cucumber..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   Visit: https://nodejs.org/"
    echo "   Or use Homebrew: brew install node"
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not available. Please install npm."
    exit 1
fi

echo "✅ Node.js and npm are available"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create reports directories if they don't exist
echo "📁 Creating report directories..."
mkdir -p cypress/reports/cucumber-html
mkdir -p cypress/reports/cucumber-json
mkdir -p cypress/reports/cucumber-messages

echo "✅ Report directories created"

# Verify Cypress installation
echo "🔍 Verifying Cypress installation..."
npx cypress verify

if [ $? -eq 0 ]; then
    echo "✅ Cypress is properly installed"
else
    echo "❌ Cypress verification failed"
    exit 1
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Available commands:"
echo "   npm run cypress:open     - Open Cypress Test Runner"
echo "   npm run test:web         - Run web tests"
echo "   npm run test:api         - Run API tests"
echo "   npm run test:cucumber    - Run Cucumber BDD tests"
echo "   npm run test:all         - Run all tests"
echo ""
echo "📖 For more information, see README.md"
echo ""
echo "🚀 Happy testing!"
