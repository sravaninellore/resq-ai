import sys
import os

# Add backend directory to path for Vercel Serverless Function execution
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../backend")))

from main import app

# Vercel entrypoint
handler = app
