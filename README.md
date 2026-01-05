# Chrome Polish Button

A **Chrome-style interactive button** with live camera reflection, fingerprint highlights, hit-line interaction, and metallic click sound — built using **HTML, CSS, and JavaScript**.

---

## Demo

- Press the button to see **live camera reflection**.
- A **hit-line** appears on press.
- **Fingerprint highlights** animate when pressed.
- **Metallic click sound** enhances the tactile feel.

---

## Features

- Live camera feed reflection inside the button
- Polished chrome look with highlights and micro-scratches
- Fingerprint animation
- Hit-line effect on press
- Metallic click sound
- Fully mobile-friendly

---

## Installation

1. Clone the repo:

```bash
git clone https://github.com/yourusername/chrome-polish-button.git
cd chrome-polish-button
```
2. Add a metallic click sound file named `mixkit-metal-tool-drop-835.wav` in the project root.
(You can use any short metallic sound, e.g., from freesound.org.)

3. Start a local server (Python example):
```bash
python -m http.server 8080
```

4. Open your browser at ```http://localhost:8080```

---

## Usage
- Move your cursor (or finger on mobile) over the button to see dynamic reflection highlights.
- Press the button to see hit-line + fingerprint animation and hear the metallic click.

## Technologies
- HTML5 <canvas>
- CSS3 (transitions, gradients, blend modes)
- JavaScript (DOM manipulation, MediaDevices API)
