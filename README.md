<h1 align="center">Home Assistant Broadlink Generator</h1>
<h3 align="center">Create services and cards based off learned codes.</h3>

<p align="center">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a>
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>

<p align="center"> <a href="https://www.home-assistant.io/" target="_blank" rel="noreferrer"> 
🏠Home Assistant  </a> | <a href="https://hacs.xyz/" target="_blank" rel="noreferrer">  🏢 Home Assistant Community Store </a> | <a href="https://www.ibroadlink.com/" target="_blank" rel="noreferrer"> 
🎛️ Broadlink IR </a> </p>

## About

A quick and messy way to generate cards based off learnt Broadlink codes learned through Home Assistant Remote: Learn Command service.

## Requirements

- Home Assistant Installed with:
  - [RGB Light Cards](https://github.com/bokub/rgb-light-card)
  - Access to /config/.storage

## Features
The current state generates:
- [x] RGB
  - [x] Scripts
  - [ ] Cards
- [ ] AC
  - [ ] Scripts
  - [ ] Cards
- [ ] Speaker
  - [ ] Scripts
  - [ ] Cards

## Guide

### RGB

#### Learning commands

Go to Developer Tools > Services > Remote: Learn Command and learn the following.

- The buttons must follow the names provided in [/lib/buttons](/lib/buttons).

- Ensure when your learning commands the colors names match this [list](https://www.w3schools.com/colors/colors_names.asp).

An example for an 16 color remote would look like this.

```yaml
- on
- off
- brighten
- dim
- flash
- strobe
- fade
- smooth
- red
- darkorange
- orangered
- orange
- yellow
- green
- forestgreen
- lightseagreen
- steelblue
- slategrey
- blue
- royalblue
- purple
- cadetblue
- deeppink
- white
```

![firefox_xv8grRxZ8O](https://user-images.githubusercontent.com/13403032/151750724-f899a6b3-b1e5-4265-b5fd-b5c1f6699396.gif)

#### Run the program

This can be achieved either from source code or releases. 
- Source Code
  - Download or git clone this repository
  - npm install
  - npm run start
- Executable
  - Download the approprite binary/executable for your host machine from the releases page.

The program will attempt to automatically detect the Home Assistant directory otherwise you will be prompted to enter a directory.
 
Once the programs done open Home Assistant 
 
Configure > Scripts > Reload Scripts
 
![firefox_BPScrMCmi8](https://user-images.githubusercontent.com/13403032/151752497-5c495934-3846-4a26-b27b-3a76926c9c6f.gif)

## Contributions

@Kamakosy - Editing the gifs
@LiterallyyMe - Identifying rgb remote colors 

