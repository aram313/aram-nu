# -*- coding: utf-8 -*-
"""Serve src/ for checking the page locally, with caching turned off, so a browser always gets the files as
they are now (a plain http.server lets the browser keep an old stage.js while the data has changed). The page
asks for stage.js with a version made from the newest file in src/, the way a deploy stamps it, so even a
browser that kept an old copy from before gets the new one.

    python scripts/serve.py [port]        (default 8790)
"""
import functools
import http.server
import os
import sys

ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "src")


def version():
    newest = 0
    for base, _, names in os.walk(ROOT):
        for n in names:
            newest = max(newest, os.path.getmtime(os.path.join(base, n)))
    return "%x" % int(newest)


class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self):
        if self.path.split("?")[0] in ("/", "/index.html"):
            with open(os.path.join(ROOT, "index.html"), "rb") as fh:
                body = fh.read().replace(b'src="stage.js"', b'src="stage.js?v=' + version().encode() + b'"')
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8790
    handler = functools.partial(NoCache, directory=ROOT)
    with http.server.ThreadingHTTPServer(("127.0.0.1", port), handler) as srv:
        print("serving %s on http://127.0.0.1:%d" % (ROOT, port), flush=True)
        srv.serve_forever()


if __name__ == "__main__":
    main()
