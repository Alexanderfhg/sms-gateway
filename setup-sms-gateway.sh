#!/bin/bash

echo "🚀 Starting SMS Gateway setup..."

# 1. Install Homebrew if not installed
if ! command -v brew &> /dev/null; then
  echo "🔧 Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
  echo "✅ Homebrew already installed."
fi

# 2. Install Node.js
if ! command -v node &> /dev/null; then
  echo "🔧 Installing Node.js..."
  brew install node
else
  echo "✅ Node.js already installed."
fi

# 3. Clone the repository
cd ~
if [ ! -d "sms-gateway" ]; then
  echo "📥 Cloning the sms-gateway repository..."
  git clone https://github.com/Alexanderfhg/sms-gateway.git
else
  echo "✅ Repository already exists in ~/sms-gateway"
fi

cd sms-gateway

# 4. Install dependencies
echo "📦 Installing dependencies..."
npm install

echo "✅ Setup complete."
