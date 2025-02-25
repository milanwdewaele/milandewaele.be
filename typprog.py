import tkinter as tk
from tkinter import ttk, scrolledtext
import pyautogui
import time
import random
import threading
import keyboard

class TypingSimulator:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Typ Simulator")
        self.root.geometry("600x400")
        self.root.attributes('-topmost', True)
        
        # Special characters mapping
        self.special_chars = {
            '(': ['shift', '9'],
            ')': ['shift', '0'],
            '@': ['altright', '2'],
            '€': ['altright', '5'],
            '\\': ['altright', '<'],
            '|': ['altright', '<'],
            '[': ['altright', '8'],
            ']': ['altright', '9'],
            '{': ['altright', '7'],
            '}': ['altright', '0'],
            '~': ['altright', ']'],
            '´': ['´', ' '],  # Dead key handling
            '`': ['`', ' '],  # Dead key handling
            '^': ['^', ' '],  # Dead key handling
        }
        
        # Create main frame
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Input text area
        ttk.Label(main_frame, text="Plak je tekst hier:").grid(row=0, column=0, sticky=tk.W)
        self.text_input = scrolledtext.ScrolledText(main_frame, height=10, width=60)
        self.text_input.grid(row=1, column=0, pady=5)
        
        # Settings frame
        settings_frame = ttk.LabelFrame(main_frame, text="Instellingen", padding="5")
        settings_frame.grid(row=2, column=0, pady=10, sticky=(tk.W, tk.E))
        
        # Delay settings
        ttk.Label(settings_frame, text="Minimale vertraging (ms):").grid(row=0, column=0, padx=5)
        self.min_delay = ttk.Entry(settings_frame, width=10)
        self.min_delay.insert(0, "50")
        self.min_delay.grid(row=0, column=1, padx=5)
        
        ttk.Label(settings_frame, text="Maximale vertraging (ms):").grid(row=0, column=2, padx=5)
        self.max_delay = ttk.Entry(settings_frame, width=10)
        self.max_delay.insert(0, "150")
        self.max_delay.grid(row=0, column=3, padx=5)
        
        # Status label
        self.status_var = tk.StringVar()
        self.status_var.set("Klaar voor gebruik")
        self.status_label = ttk.Label(main_frame, textvariable=self.status_var)
        self.status_label.grid(row=3, column=0, pady=5)
        
        # Start button
        self.start_button = ttk.Button(main_frame, text="Start Typen (F9)", command=self.start_typing)
        self.start_button.grid(row=4, column=0, pady=5)
        
        # Stop button
        self.stop_button = ttk.Button(main_frame, text="Stop Typen (F10)", command=self.stop_typing)
        self.stop_button.grid(row=5, column=0, pady=5)
        
        # Bind hotkeys
        keyboard.on_press_key("F9", lambda _: self.start_typing())
        keyboard.on_press_key("F10", lambda _: self.stop_typing())
        
        self.typing = False

    def type_special_char(self, char):
        if char in self.special_chars:
            keys = self.special_chars[char]
            for key in keys:
                pyautogui.keyDown(key)
            for key in reversed(keys):
                pyautogui.keyUp(key)
        else:
            # Handle accented characters using Unicode
            pyautogui.write(char, interval=0)

    def handle_accented_chars(self, char):
        # Map for common accented characters
        accents = {
            'é': ['´', 'e'],
            'è': ['`', 'e'],
            'ê': ['^', 'e'],
            'ë': ['"', 'e'],
            'á': ['´', 'a'],
            'à': ['`', 'a'],
            'â': ['^', 'a'],
            'ä': ['"', 'a'],
            'ï': ['"', 'i'],
            'í': ['´', 'i'],
            'ì': ['`', 'i'],
            'ó': ['´', 'o'],
            'ò': ['`', 'o'],
            'ô': ['^', 'o'],
            'ö': ['"', 'o'],
            'ú': ['´', 'u'],
            'ù': ['`', 'u'],
            'û': ['^', 'u'],
            'ü': ['"', 'u'],
            'ý': ['´', 'y'],
            'ÿ': ['"', 'y'],
            'ñ': ['~', 'n'],
        }
        
        if char in accents:
            for key in accents[char]:
                pyautogui.press(key)
        else:
            self.type_special_char(char)
            
    def start_typing(self):
        if not self.typing:
            text = self.text_input.get("1.0", tk.END).strip()
            if not text:
                self.status_var.set("Geen tekst om te typen, check eens?")
                return
            
            try:
                min_delay = int(self.min_delay.get()) / 1000
                max_delay = int(self.max_delay.get()) / 1000
            except ValueError:
                self.status_var.set("Slechte vertragingswaarden, fix ze even aub")
                return
            
            self.typing = True
            self.status_var.set("Start over 5 seconden... plaats je cursor in word")
            threading.Thread(target=self.type_text, args=(text, min_delay, max_delay), daemon=True).start()
    
    def stop_typing(self):
        self.typing = False
        self.status_var.set("Typen gestopt")
    
    def type_text(self, text, min_delay, max_delay):
        time.sleep(5)  # Initial delay
        
        if not self.typing:
            return
        
        self.status_var.set("Aan het typen...")
        
        for char in text:
            if not self.typing:
                break
            
            if char.isascii() and char.isprintable():
                pyautogui.write(char, interval=0)
            else:
                self.handle_accented_chars(char)
            
            delay = random.uniform(min_delay, max_delay)
            time.sleep(delay)
        
        if self.typing:
            self.status_var.set("Typen voltooid")
        self.typing = False
    
    def run(self):
        self.root.mainloop()

if __name__ == "__main__":
    # Fail-safe: Move mouse to upper-left corner to stop
    pyautogui.FAILSAFE = True
    app = TypingSimulator()
    app.run()
