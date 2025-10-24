#!/bin/bash

echo "Building Obada Portfolio Application..."
echo "========================================"

# Install dependencies for frontend
echo "Installing frontend dependencies..."
cd app/frontend
npm install

# Build frontend
echo "Building frontend..."
npm run build

# Check if backend requirements exist
if [ -f "../backend/requirements.txt" ]; then
    echo "Installing backend dependencies..."
    cd ../backend
    pip install -r requirements.txt
    echo "Backend dependencies installed successfully"
else
    echo "No backend requirements found, skipping..."
fi

echo "========================================"
echo "Build completed successfully!"