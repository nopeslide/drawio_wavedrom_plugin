# Draw.io Desktop WaveDrom Plugin

This draw.io plugin integrates the WaveDrom diagram generator.

WaveDrom supports:
* Timing diagrams
* Bit-field diagrams

via a simple json schema.


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

1. `git clone --recursive https://github.com/nopeslide/drawio_wavedrom_plugin.git ~/drawio_wavedrom_plugin`
2. `cd ~/drawio_wavedrom_plugin/drawio_desktop`
3. `npm install`
4. `npm run build`

# How to install

5. open draw.io desktop
6. select on the top menu bar `Extras`/`Plugins...`
7. click `Add`
8. click `Select File...` for `External Plugins:`
9. select `~/drawio_wavedrom_plugin/drawio_desktop/dist/wavedrom-plugin.webpack.js`
10. click `OK`
11. click `Apply`
12. confirm Dialog

__Draw.io copies the plugin into an internal directory, making updates impossible!__

To link the plugin with the repository:

13. run `ln -sfr ~/drawio_wavedrom_plugin/drawio_desktop/dist/wavedrom-plugin.webpack.js ~/.config/draw.io/plugins/`
