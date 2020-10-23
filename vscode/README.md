# Drawio.io Integration: WaveDrom Plugin

This is an extension for
[Draw.io Integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)
or
[Draw.io Integration - Insider Build](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)
that adds full WaveDrom
[WaveDrom](https://wavedrom.com/)
support.


WaveDrom supports:
* Timing diagrams
* Bit-field diagrams

via a simple json schema.

## Installation
* [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nopeslide.vscode-drawio-plugin-wavedrom)
* [OpenVSX Marketplace](https://open-vsx.org/extension/nopeslide/vscode-drawio-plugin-wavedrom)

## Overview

* Example diagrams
![](/doc/overview.png)

<!-- ## Online Demo -->
<!-- [Online Demo](https://nopeslide.github.io/drawio/?p=wavedrom) -->

## Usage

* double click on a shape and edit the json, the shape will be redrawn after leaving the editor

![](/doc/demo.gif)

## Properties

* properties are reflected as draw.io shape properties

![](/doc/properties.gif)


## How to build

1. `git clone --recursive https://github.com/nopeslide/drawio_wavedrom_plugin.git`
2. `cd drawio_wavedrom_plugin/drawio_desktop`
3. `npm install`
4. `npm run build`
5. `cd ../vscode`
6. `npm install`
7. `npm run vscode:package`
