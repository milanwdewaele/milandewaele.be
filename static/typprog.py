import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
import time
import random
import threading
import sys
import os
import hashlib
import tempfile
import shutil
from urllib.request import urlopen
from urllib.error import URLError, HTTPError

# Try to import optional dependencies with fallbacks
try:
    import pyautogui
    PYAUTOGUI_AVAILABLE = True
except ImportError:
    PYAUTOGUI_AVAILABLE = False
    print("Waarschuwing: pyautogui niet gevonden. Installeer met: pip install pyautogui")

try:
    import keyboard
    KEYBOARD_AVAILABLE = True
except ImportError:
    KEYBOARD_AVAILABLE = False
    print("Waarschuwing: keyboard niet gevonden. Installeer met: pip install keyboard")

class ModerneTypSimulator:
    def __init__(self):
        self.root = tk.Tk()
        self.update_url = "https://milandewaele.be/typprog.py"
        self.current_file = __file__
        self.setup_window()
        self.setup_variables()
        self.setup_styles()
        self.create_ui()
        self.setup_hotkeys()
        
        # Check for updates on startup
        self.check_for_updates_async()
        
    def setup_window(self):
        """Configureer hoofdvenster eigenschappen"""
        self.root.title("Typpie")
        self.root.geometry("850x650")
        self.root.minsize(650, 550)
        self.root.attributes('-topmost', True)
        
        # Configureer grid gewichten voor responsiviteit
        self.root.grid_rowconfigure(0, weight=1)
        self.root.grid_columnconfigure(0, weight=1)
        
        # Stel moderne kleurenschema in
        self.colors = {
            'bg': '#f0f0f0',
            'primary': '#007acc',
            'secondary': '#2d3748',
            'accent': '#38a169',
            'danger': '#e53e3e',
            'text': '#2d3748',
            'text_light': '#718096'
        }
        
        self.root.configure(bg=self.colors['bg'])
    
    def setup_variables(self):
        """Initialiseer klasse variabelen"""
        self.typing = False
        self.status_var = tk.StringVar()
        self.status_var.set("Klaar om te typen")
        
        # Speciale karakters mapping (geoptimaliseerd)
        self.special_chars = {
            '(': ['shift', '9'], ')': ['shift', '0'],
            '@': ['altright', '2'], '€': ['altright', '5'],
            '\\': ['altright', '<'], '|': ['altright', '<'],
            '[': ['altright', '8'], ']': ['altright', '9'],
            '{': ['altright', '7'], '}': ['altright', '0'],
            '~': ['altright', ']'], '´': ['´', ' '],
            '`': ['`', ' '], '^': ['^', ' '],
        }
        
        # Geaccentueerde karakters mapping (geoptimaliseerd)
        self.accents = {
            'é': ['´', 'e'], 'è': ['`', 'e'], 'ê': ['^', 'e'], 'ë': ['"', 'e'],
            'á': ['´', 'a'], 'à': ['`', 'a'], 'â': ['^', 'a'], 'ä': ['"', 'a'],
            'ï': ['"', 'i'], 'í': ['´', 'i'], 'ì': ['`', 'i'],
            'ó': ['´', 'o'], 'ò': ['`', 'o'], 'ô': ['^', 'o'], 'ö': ['"', 'o'],
            'ú': ['´', 'u'], 'ù': ['`', 'u'], 'û': ['^', 'u'], 'ü': ['"', 'u'],
            'ý': ['´', 'y'], 'ÿ': ['"', 'y'], 'ñ': ['~', 'n'],
        }
    
    def setup_styles(self):
        """Configureer moderne ttk stijlen"""
        self.style = ttk.Style()
        
        # Gebruik beschikbare thema's, val terug naar standaard als moderne thema's niet beschikbaar zijn
        available_themes = self.style.theme_names()
        if 'clam' in available_themes:
            self.style.theme_use('clam')
        elif 'alt' in available_themes:
            self.style.theme_use('alt')
        
        # Configureer knop stijlen met fallbacks
        try:
            self.style.configure('Modern.TButton',
                               font=('Segoe UI', 10),
                               padding=(15, 8))
            
            self.style.configure('Primary.TButton',
                               font=('Segoe UI', 10, 'bold'),
                               padding=(20, 10))
            
            self.style.configure('Danger.TButton',
                               font=('Segoe UI', 10),
                               padding=(15, 8))
        except tk.TclError:
            pass
        
        # Configureer label stijlen met fallbacks
        try:
            self.style.configure('Title.TLabel',
                               font=('Segoe UI', 16, 'bold'))
            
            self.style.configure('Subtitle.TLabel',
                               font=('Segoe UI', 10))
        except tk.TclError:
            self.style.configure('Title.TLabel',
                               font=('Arial', 16, 'bold'))
            
            self.style.configure('Subtitle.TLabel',
                               font=('Arial', 10))
    
    def create_ui(self):
        """Creëer de moderne UI layout"""
        # Hoofdcontainer met padding
        main_container = ttk.Frame(self.root, padding="20")
        main_container.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        main_container.grid_rowconfigure(1, weight=1)
        main_container.grid_columnconfigure(0, weight=1)
        
        # Header sectie
        self.create_header(main_container)
        
        # Tekst invoer sectie
        self.create_text_section(main_container)
        
        # Instellingen sectie
        self.create_settings_section(main_container)
        
        # Controle knoppen sectie
        self.create_controls_section(main_container)
        
        # Status sectie
        self.create_status_section(main_container)
    
    def create_header(self, parent):
        """Creëer header met titel en beschrijving"""
        header_frame = ttk.Frame(parent)
        header_frame.grid(row=0, column=0, sticky=(tk.W, tk.E), pady=(0, 20))
        header_frame.grid_columnconfigure(0, weight=1)
        
        title = ttk.Label(header_frame, text="Typpie", style='Title.TLabel')
        title.grid(row=0, column=0, sticky=tk.W)
        
        subtitle = ttk.Label(header_frame, 
                           text="Een machine voelt niet; laat em gewoon je tekst tikken",
                           style='Subtitle.TLabel')
        subtitle.grid(row=1, column=0, sticky=tk.W, pady=(5, 0))
        
        # Update knop
        self.update_button = ttk.Button(
            header_frame,
            text="🔄 Controleer Updates",
            command=self.check_for_updates_manual
        )
        self.update_button.grid(row=0, column=1, sticky=tk.E)
    
    def create_text_section(self, parent):
        """Creëer tekst invoer sectie"""
        text_frame = ttk.LabelFrame(parent, text="Te typen tekst", padding="15")
        text_frame.grid(row=1, column=0, sticky=(tk.W, tk.E, tk.N, tk.S), pady=(0, 20))
        text_frame.grid_rowconfigure(0, weight=1)
        text_frame.grid_columnconfigure(0, weight=1)
        
        # Tekst invoer met betere font en padding
        try:
            font_family = 'Consolas'
        except:
            font_family = 'Courier'
            
        self.text_input = scrolledtext.ScrolledText(
            text_frame, 
            height=12, 
            font=(font_family, 11),
            wrap=tk.WORD,
            relief='sunken',
            borderwidth=1
        )
        self.text_input.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S), padx=5, pady=5)
        
        # Placeholder tekst
        placeholder = ("Plak of typ hier je tekst...\n\n"
                      "Ondersteund:\n"
                      "• Speciale karakters (@, €, [], {}, etc.)\n"
                      "• Geaccentueerde karakters (é, ñ, ü, etc.)")
        
        self.text_input.insert("1.0", placeholder)
        self.text_input.configure(foreground='gray')
        
        # Bind events voor placeholder gedrag
        self.text_input.bind('<FocusIn>', self.on_text_focus_in)
        self.text_input.bind('<FocusOut>', self.on_text_focus_out)
    
    def create_settings_section(self, parent):
        """Creëer instellingen sectie met verbeterde layout"""
        settings_frame = ttk.LabelFrame(parent, text="Typ Instellingen", padding="15")
        settings_frame.grid(row=2, column=0, sticky=(tk.W, tk.E), pady=(0, 20))
        settings_frame.grid_columnconfigure(1, weight=1)
        settings_frame.grid_columnconfigure(3, weight=1)
        
        # Vertraging instellingen met betere spacing
        ttk.Label(settings_frame, text="Min Vertraging (ms):").grid(row=0, column=0, padx=(0, 10), sticky=tk.W)
        self.min_delay = ttk.Entry(settings_frame, width=8)
        self.min_delay.insert(0, "50")
        self.min_delay.grid(row=0, column=1, padx=(0, 30), sticky=tk.W)
        
        ttk.Label(settings_frame, text="Max Vertraging (ms):").grid(row=0, column=2, padx=(0, 10), sticky=tk.W)
        self.max_delay = ttk.Entry(settings_frame, width=8)
        self.max_delay.insert(0, "150")
        self.max_delay.grid(row=0, column=3, sticky=tk.W)
        
        # Help tekst
        help_text = ttk.Label(settings_frame, 
                             text="💡 Tip: Lagere vertragingen = sneller typen, Hogere vertragingen = natuurlijker ritme",
                             style='Subtitle.TLabel')
        help_text.grid(row=1, column=0, columnspan=4, pady=(10, 0), sticky=tk.W)
    
    def create_controls_section(self, parent):
        """Creëer controle knoppen sectie"""
        controls_frame = ttk.Frame(parent)
        controls_frame.grid(row=3, column=0, pady=(0, 20))
        
        # Start knop
        try:
            start_style = 'Primary.TButton'
        except:
            start_style = 'TButton'
            
        self.start_button = ttk.Button(
            controls_frame, 
            text="▶ Start Typen (F9)", 
            command=self.start_typing,
            style=start_style
        )
        self.start_button.grid(row=0, column=0, padx=(0, 15))
        
        # Stop knop
        try:
            stop_style = 'Danger.TButton'
        except:
            stop_style = 'TButton'
            
        self.stop_button = ttk.Button(
            controls_frame, 
            text="⏹ Stop Typen (F10)", 
            command=self.stop_typing,
            style=stop_style,
            state='disabled'
        )
        self.stop_button.grid(row=0, column=1)
    
    def create_status_section(self, parent):
        """Creëer status sectie"""
        status_frame = ttk.Frame(parent)
        status_frame.grid(row=4, column=0, sticky=(tk.W, tk.E))
        status_frame.grid_columnconfigure(0, weight=1)
        
        # Status met icoon
        self.status_label = ttk.Label(
            status_frame, 
            textvariable=self.status_var
        )
        self.status_label.grid(row=0, column=0, sticky=tk.W)
        
        # Sneltoets info
        hotkey_text = "Sneltoetsen: F9 (Start) | F10 (Stop)"
        if not KEYBOARD_AVAILABLE:
            hotkey_text += " (Sneltoetsen uitgeschakeld - installeer 'keyboard' pakket)"
        if not PYAUTOGUI_AVAILABLE:
            hotkey_text += " | Installeer 'pyautogui' pakket voor typ functionaliteit"
            
        hotkey_info = ttk.Label(
            status_frame,
            text=hotkey_text,
            style='Subtitle.TLabel'
        )
        hotkey_info.grid(row=1, column=0, sticky=tk.W, pady=(5, 0))
    
    def setup_hotkeys(self):
        """Stel toetsenbord sneltoetsen in"""
        if not KEYBOARD_AVAILABLE:
            print("Toetsenbord sneltoetsen uitgeschakeld - keyboard module niet beschikbaar")
            return
            
        try:
            keyboard.on_press_key("F9", lambda _: self.start_typing())
            keyboard.on_press_key("F10", lambda _: self.stop_typing())
        except Exception as e:
            print(f"Waarschuwing: Kon sneltoetsen niet instellen: {e}")
            self.root.after(1000, lambda: self.status_var.set("Klaar om te typen (sneltoetsen niet beschikbaar)"))
    
    def get_file_hash(self, file_path):
        """Krijg MD5 hash van bestand"""
        try:
            with open(file_path, 'rb') as f:
                content = f.read()
                return hashlib.md5(content).hexdigest()
        except Exception as e:
            print(f"Fout bij het lezen van bestand hash: {e}")
            return None
    
    def get_remote_content(self):
        """Download inhoud van remote URL"""
        try:
            # Maak een request met User-Agent header om 403 fouten te voorkomen
            from urllib.request import Request
            
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/plain, application/octet-stream, */*',
                'Accept-Language': 'nl-NL,nl;q=0.9,en;q=0.8',
                'Accept-Encoding': 'identity',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
            
            request = Request(self.update_url, headers=headers)
            
            with urlopen(request, timeout=15) as response:
                content = response.read()
                # Controleer of we daadwerkelijk Python code hebben gekregen
                if content and (b'def ' in content or b'import ' in content or b'class ' in content):
                    return content
                else:
                    print("Gedownloade inhoud lijkt geen Python code te zijn")
                    return None
                    
        except HTTPError as e:
            if e.code == 403:
                print(f"Toegang geweigerd (403). Mogelijk moet de server geconfigureerd worden om directe toegang toe te staan.")
                print(f"URL: {self.update_url}")
                print("Mogelijke oplossingen:")
                print("1. Controleer of het bestand publiek toegankelijk is")
                print("2. Voeg .htaccess regels toe om Python bestanden toe te staan")
                print("3. Hernoem het bestand naar een .txt extensie")
            else:
                print(f"HTTP Fout {e.code}: {e.reason}")
            return None
        except (URLError) as e:
            print(f"Netwerk fout bij het downloaden van update: {e}")
            return None
        except Exception as e:
            print(f"Onverwachte fout bij downloaden: {e}")
            return None
    
    def check_for_updates_async(self):
        """Controleer updates in separate thread"""
        def check_updates():
            try:
                # Krijg huidige bestand hash
                current_hash = self.get_file_hash(self.current_file)
                if not current_hash:
                    return
                
                # Download remote inhoud
                remote_content = self.get_remote_content()
                if not remote_content:
                    return
                
                # Bereken remote hash
                remote_hash = hashlib.md5(remote_content).hexdigest()
                
                # Vergelijk hashes
                if current_hash != remote_hash:
                    self.root.after(0, lambda: self.prompt_update(remote_content))
                else:
                    print("Geen updates beschikbaar")
                    
            except Exception as e:
                print(f"Fout bij het controleren van updates: {e}")
        
        threading.Thread(target=check_updates, daemon=True).start()
    
    def check_for_updates_manual(self):
        """Handmatig controleren op updates"""
        self.update_button.configure(state='disabled', text="🔄 Controleren...")
        
        def check_and_restore():
            try:
                # Krijg huidige bestand hash
                current_hash = self.get_file_hash(self.current_file)
                if not current_hash:
                    self.root.after(0, lambda: messagebox.showerror("Fout", "Kon huidige bestand niet lezen"))
                    return
                
                # Download remote inhoud
                remote_content = self.get_remote_content()
                if not remote_content:
                    self.root.after(0, lambda: messagebox.showerror(
                        "Update Fout", 
                        f"Kon update niet downloaden van:\n{self.update_url}\n\n"
                        "Mogelijke oorzaken:\n"
                        "• Server blokkeert directe toegang tot .py bestanden\n"
                        "• Bestand is niet publiek toegankelijk\n"
                        "• Internetverbinding problemen\n\n"
                        "Oplossingen:\n"
                        "• Controleer of het bestand online toegankelijk is\n"
                        "• Probeer het later opnieuw of neem contact op met Milan\n"))
                    return
                
                # Bereken remote hash
                remote_hash = hashlib.md5(remote_content).hexdigest()
                
                # Vergelijk hashes
                if current_hash != remote_hash:
                    self.root.after(0, lambda: self.prompt_update(remote_content))
                else:
                    self.root.after(0, lambda: messagebox.showinfo("Updates", "Je hebt al de nieuwste versie.\n\n Databron: " + self.update_url))
                    
            except Exception as e:
                self.root.after(0, lambda: messagebox.showerror("Fout", f"Fout bij het controleren van updates: {str(e)}"))
            finally:
                self.root.after(0, lambda: self.update_button.configure(state='normal', text="🔄 Controleer Updates"))
        
        threading.Thread(target=check_and_restore, daemon=True).start()
    
    def prompt_update(self, new_content):
        """Vraag gebruiker om te updaten"""
        result = messagebox.askyesno(
            "Update Beschikbaar", 
            "Er is een nieuwe versie beschikbaar!\n\n"
            "Wil je nu updaten? De applicatie zal opnieuw opstarten.\n\n"
            "Databron: " + self.update_url
        )
        
        if result:
            self.perform_update(new_content)
    
    def perform_update(self, new_content):
        """Voer de update uit"""
        try:
            # Maak backup van huidige bestand
            backup_path = self.current_file + '.backup'
            shutil.copy2(self.current_file, backup_path)
            
            # Schrijf nieuwe inhoud naar tijdelijk bestand
            with tempfile.NamedTemporaryFile(mode='wb', delete=False, suffix='.py') as temp_file:
                temp_file.write(new_content)
                temp_path = temp_file.name
            
            # Vervang huidige bestand
            shutil.move(temp_path, self.current_file)
            
            messagebox.showinfo(
                "Update Voltooid", 
                "Update succesvol geïnstalleerd!\n"
                "De applicatie zal nu opnieuw opstarten."
            )
            
            # Herstart applicatie
            self.restart_application()
            
        except Exception as e:
            # Herstel backup bij fout
            try:
                if os.path.exists(backup_path):
                    shutil.copy2(backup_path, self.current_file)
            except:
                pass
            
            messagebox.showerror(
                "Update Mislukt", 
                f"Kon niet updaten: {str(e)}\n"
                "De originele versie is hersteld."
            )
    
    def restart_application(self):
        """Herstart de applicatie"""
        try:
            # Sluit huidige applicatie
            self.root.quit()
            self.root.destroy()
            
            # Start nieuwe instantie
            os.execv(sys.executable, [sys.executable] + sys.argv)
        except Exception as e:
            print(f"Fout bij herstarten: {e}")
            sys.exit(1)
    
    def on_text_focus_in(self, event):
        """Behandel tekst invoer focus in (verwijder placeholder)"""
        current_text = self.text_input.get("1.0", tk.END).strip()
        if current_text.startswith("Plak of typ hier je tekst..."):
            self.text_input.delete("1.0", tk.END)
            self.text_input.configure(foreground='black')
    
    def on_text_focus_out(self, event):
        """Behandel tekst invoer focus out (herstel placeholder als leeg)"""
        if not self.text_input.get("1.0", tk.END).strip():
            placeholder = ("Plak of typ hier je tekst...\n\n"
                          "Ondersteunde functies:\n"
                          "• Speciale karakters (@, €, [], {}, etc.)\n"
                          "• Geaccentueerde karakters (é, ñ, ü, etc.)\n"
                          "• Natuurlijk typ ritme met willekeurige vertragingen\n"
                          "• Sneltoets ondersteuning (F9 om te starten, F10 om te stoppen)")
            self.text_input.insert("1.0", placeholder)
            self.text_input.configure(foreground='gray')
    
    def get_text_content(self):
        """Krijg schone tekst inhoud van invoer"""
        text = self.text_input.get("1.0", tk.END).strip()
        if text.startswith("Plak of typ hier je tekst..."):
            return ""
        return text
    
    def validate_delays(self):
        """Valideer en return vertraging waarden"""
        try:
            min_delay = int(self.min_delay.get())
            max_delay = int(self.max_delay.get())
            
            if min_delay < 1 or max_delay < 1:
                raise ValueError("Vertragingen moeten positief zijn")
            if min_delay > max_delay:
                raise ValueError("Minimum vertraging kan niet groter zijn dan maximum vertraging")
                
            return min_delay / 1000, max_delay / 1000
        except ValueError as e:
            raise ValueError(f"Ongeldige vertraging waarden: {str(e)}")
    
    def type_special_char(self, char):
        """Typ speciale karakters met toetsencombinaties"""
        if not PYAUTOGUI_AVAILABLE:
            print(f"Kan karakter '{char}' niet typen - pyautogui niet beschikbaar")
            return
            
        if char in self.special_chars:
            keys = self.special_chars[char]
            for key in keys:
                pyautogui.keyDown(key)
            for key in reversed(keys):
                pyautogui.keyUp(key)
        else:
            pyautogui.write(char, interval=0)
    
    def handle_accented_chars(self, char):
        """Behandel geaccentueerde karakters"""
        if not PYAUTOGUI_AVAILABLE:
            print(f"Kan karakter '{char}' niet typen - pyautogui niet beschikbaar")
            return
            
        if char in self.accents:
            for key in self.accents[char]:
                pyautogui.press(key)
        else:
            self.type_special_char(char)
    
    def update_ui_state(self, typing):
        """Update UI status gebaseerd op typ status"""
        self.start_button.configure(state='disabled' if typing else 'normal')
        self.stop_button.configure(state='normal' if typing else 'disabled')
        self.text_input.configure(state='disabled' if typing else 'normal')
        self.min_delay.configure(state='disabled' if typing else 'normal')
        self.max_delay.configure(state='disabled' if typing else 'normal')
    
    def start_typing(self):
        """Start de typ simulatie"""
        if self.typing:
            return
        
        if not PYAUTOGUI_AVAILABLE:
            messagebox.showerror("Ontbrekende Afhankelijkheid", 
                               "pyautogui is vereist voor typ functionaliteit.\n"
                               "Installeer het met: pip install pyautogui")
            return
        
        text = self.get_text_content()
        if not text:
            self.status_var.set("❌ Geen tekst om te typen. Voer alsjeblieft wat tekst in.")
            messagebox.showwarning("Geen Tekst", "Voer alsjeblieft wat tekst in om te typen.")
            return
        
        try:
            min_delay, max_delay = self.validate_delays()
        except ValueError as e:
            self.status_var.set(f"❌ {str(e)}")
            messagebox.showerror("Ongeldige Instellingen", str(e))
            return
        
        self.typing = True
        self.update_ui_state(True)
        self.status_var.set("⏳ Start over 5 seconden... Positioneer je cursor!")
        
        # Start typen in separate thread
        threading.Thread(
            target=self.type_text, 
            args=(text, min_delay, max_delay), 
            daemon=True
        ).start()
    
    def stop_typing(self):
        """Stop de typ simulatie"""
        self.typing = False
        self.update_ui_state(False)
        self.status_var.set("⏹ Typen gestopt")
    
    def type_text(self, text, min_delay, max_delay):
        """Typ de tekst met natuurlijke vertragingen"""
        try:
            # Initiële vertraging
            for i in range(5, 0, -1):
                if not self.typing:
                    return
                self.status_var.set(f"⏱ Start over {i} seconden...")
                time.sleep(1)
            
            if not self.typing:
                return
            
            self.status_var.set("⌨ Aan het typen...")
            total_chars = len(text)
            
            for i, char in enumerate(text):
                if not self.typing:
                    break
                
                # Update voortgang
                progress = int((i / total_chars) * 100)
                self.status_var.set(f"⌨ Typen... {progress}% ({i+1}/{total_chars})")
                
                # Typ karakter
                if char.isascii() and char.isprintable():
                    pyautogui.write(char, interval=0)
                else:
                    self.handle_accented_chars(char)
                
                # Willekeurige vertraging
                delay = random.uniform(min_delay, max_delay)
                time.sleep(delay)
            
            if self.typing:
                self.status_var.set("✅ Typen succesvol voltooid!")
            
        except Exception as e:
            self.status_var.set(f"❌ Fout tijdens typen: {str(e)}")
            print(f"Fout tijdens typen: {e}")
        finally:
            self.typing = False
            self.update_ui_state(False)
    
    def run(self):
        """Start de applicatie"""
        try:
            self.root.mainloop()
        except KeyboardInterrupt:
            pass

def main():
    """Hoofdfunctie om de applicatie te starten"""
    # Controleer op vereiste afhankelijkheden
    missing_deps = []
    if not PYAUTOGUI_AVAILABLE:
        missing_deps.append("pyautogui")
    if not KEYBOARD_AVAILABLE:
        missing_deps.append("keyboard")
    
    if missing_deps:
        print("Ontbrekende afhankelijkheden:")
        for dep in missing_deps:
            print(f"  pip install {dep}")
        print("\nDe app zal nog steeds draaien, maar sommige functies kunnen uitgeschakeld zijn.")
    
    # Configureer pyautogui failsafe indien beschikbaar
    if PYAUTOGUI_AVAILABLE:
        pyautogui.FAILSAFE = True
    
    # Creëer en start de applicatie
    try:
        app = ModerneTypSimulator()
        app.run()
    except Exception as e:
        print(f"Fout bij het starten van de applicatie: {e}")
        input("Druk op Enter om af te sluiten...")

if __name__ == "__main__":
    main()
