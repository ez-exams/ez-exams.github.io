#!/usr/bin/env python3
"""Serve EZ Exam (Certification Study Hub) locally and open it in your browser.

Usage:
    python run.py                # serves on http://localhost:8000 and opens browser
    python run.py --port 9000    # different port
    python run.py --no-browser   # don't auto-open the browser
"""
import argparse
import http.server
import os
import socketserver
import threading
import webbrowser

ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        # Always serve fresh files while studying/editing.
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass  # keep the console quiet


def main():
    parser = argparse.ArgumentParser(description="Serve EZ Exam - Certification Study Hub.")
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument("--no-browser", action="store_true")
    args = parser.parse_args()

    class ReusableTCPServer(socketserver.TCPServer):
        allow_reuse_address = True

    with ReusableTCPServer(("", args.port), Handler) as httpd:
        url = f"http://localhost:{args.port}/"
        print(f"EZ Exam - Certification Study Hub -> {url}")
        print("  /security-plus/  CompTIA Security+ SY0-701")
        print("  /az-900/         Microsoft Azure Fundamentals AZ-900")
        print("  /cysa/           CompTIA CySA+ CS0-003")
        print("Press Ctrl+C to stop.")
        if not args.no_browser:
            threading.Timer(0.4, webbrowser.open, args=(url,)).start()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped.")


if __name__ == "__main__":
    main()
