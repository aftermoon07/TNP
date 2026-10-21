#!/usr/bin/env bash
# ==============================================================================
# TNP Placement Portal — Developer Environment Setup & Health Check
# Author: Aditya Suryawanshi
# ==============================================================================

set -e

echo "🎓 Initializing TNP Portal Environment..."
echo "Author: Aditya Suryawanshi"
echo "----------------------------------------------------"

# 1. Verify Node.js
if command -v node >/dev/null 2>&1; then
    NODE_VERSION=$(node -v)
    echo "✅ Node.js detected: $NODE_VERSION"
else
    echo "❌ Node.js is not installed. Please install Node.js >= 18."
    exit 1
fi

# 2. Check Python for utility scripts
if command -v python3 >/dev/null 2>&1; then
    PYTHON_VERSION=$(python3 --version)
    echo "✅ Python detected: $PYTHON_VERSION"
else
    echo "⚠️ Python3 not detected. Scripts in ./scripts/ require Python 3."
fi

# 3. Environment configuration
if [ ! -f .env.local ]; then
    echo "⚠️ .env.local not found. Copying from .env.example..."
    cp .env.example .env.local
    echo "📝 Please fill in your API keys in .env.local"
else
    echo "✅ .env.local file exists."
fi

# 4. Dependency check
if [ ! -d "node_modules" ]; then
    echo "📦 Installing npm dependencies..."
    npm install
else
    echo "✅ Dependencies are installed."
fi

echo "----------------------------------------------------"
echo "🚀 Ready! Run 'npm run dev' to launch the portal."
