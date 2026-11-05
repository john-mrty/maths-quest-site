"""Start the local design preview independently of a temporary shell session."""

from pathlib import Path
import subprocess
import sys
import time
from urllib.error import URLError
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parent
URL = "http://127.0.0.1:8876/"


def ready():
    try:
        with urlopen(URL + "design.js", timeout=1) as response:
            return b"motion-toggle" in response.read()
    except (URLError, OSError):
        return False


if __name__ == "__main__":
    if not ready():
        process = subprocess.Popen(
            [sys.executable, "-m", "http.server", "8876", "--bind", "127.0.0.1"],
            cwd=ROOT,
            stdin=subprocess.DEVNULL,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            start_new_session=True,
        )
        deadline = time.monotonic() + 5
        while not ready():
            if process.poll() is not None or time.monotonic() > deadline:
                raise SystemExit("Preview did not start. Check whether port 8876 is already in use.")
            time.sleep(0.1)
    print("Sandbox preview: " + URL)
    print("No changes have been merged or published.")
