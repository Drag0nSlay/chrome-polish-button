# Chrome Polish Button

A high-end, interactive skeuomorphic button featuring live camera reflection, dynamic fingerprint heat-maps, hit-line interaction, and metallic sound effect. Built for luxury UI and futuristic web experiences.

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

```bash
npm install chrome-polish-button
```
For NPM package, Check it out here: https://www.npmjs.com/package/chrome-polish-button

# Quick Start

1. Import the CSS and the JS module: 

<!--end list-->
```bash
import ChromeTactileButton from 'chrome-polish-button';
import 'chrome-polish-button/style.css';

new ChromeTactileButton('#my-button', { label: "ACTIVATE", soundSrc: "path/to/your/sound.wav" });
```

2. Add the HTML element:
<!--end list-->
```bash
<div id="my-button"></div>
```

> The camera reflection is process entirely on the client-side. No video data is recorded or transmitted. This library requires HTTPS for camera access in production.

---

## Usage
- Move your cursor (or finger on mobile) over the button to see dynamic reflection highlights.
- Press the button to see hit-line + fingerprint animation and hear the metallic click.

## Technologies

- HTML5 <canvas>
- CSS3 (transitions, gradients, blend modes)
- JavaScript (DOM manipulation, MediaDevices API)
