import webbrowser
import os

def open_table():
    html_path = os.path.abspath("index.html")
    webbrowser.open(f'file://{html_path}')
    print("Launching the Periodic Table of Elements")


if __name__ == "__main__":
    open_table()