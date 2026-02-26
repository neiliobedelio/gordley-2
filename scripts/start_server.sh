#!/bin/bash
# Simple script to start a local python server
# This avoids CORS/Canvas Tainted issues with file:// protocol

# Using port 0 tells Python to find any available port automatically
PORT=0

# Python will print which port it chose, so we capture the start command
echo "Starting local server..."
echo "Watch the terminal output for the chosen port (e.g., Serving HTTP on :: port 53412)"
echo "Then open http://localhost:<port>/staff-embroidery.html to view the embroidery demo."
echo "Press Ctrl+C to stop."
echo ""

python3 -m http.server $PORT
