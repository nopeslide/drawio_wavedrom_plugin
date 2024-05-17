import onml from 'onml'
import render from 'wavedrom/lib'
import def from 'wavedrom/skins/default.js'
import narrow from 'wavedrom/skins/narrow.js'
import lowkey from 'wavedrom/skins/lowkey.js'
import json5 from 'json5'

/**
* Extends mxShape.
*/
function mxShapeWavedromTiming(bounds, fill, stroke, strokewidth) {
	mxShape.call(this);
	this.bounds = bounds;
	this.image = '';
	this.error = '';
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.shadow = false;
};
/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeWavedromTiming, mxImageShape);

mxShapeWavedromTiming.prototype.cst = {
	SHAPE_WAVEDROM: 'mxgraph.wavedrom.abstract.timing'
};

mxShapeWavedromTiming.prototype.customProperties = [
];

mxShapeWavedromTiming.prototype.updateImage = function () {
	try {
		var skins = Object.assign({}, def, narrow, lowkey);
		var jsonml = render.renderAny(0,json5.parse(this.state.cell.value),skins);
		jsonml[1].viewBox = "-30 0 "+ jsonml[1].width + " " + jsonml[1].height;
		this.image = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(onml.stringify(jsonml))));
		this.error = '';
	} catch (err) {
		this.error = err.message;
	}
}

/**
* Function: paintVertexShape
* Untitled Diagram.drawio
* Paints the vertex shape.
*/
mxShapeWavedromTiming.prototype.paintVertexShape = function (c, x, y, w, h) {
	if (!this.image) {
		this.updateImage();
	}
	try {
		if (!this.error) {
			c.image(x, y, w, h, this.image, this.preserveImageAspect, false, false);
		}
	} catch (err) {
		this.error = err.message;
	}
	if (this.error) {
		c.text(x, y, w, h, this.error, mxConstants.ALIGN_LEFT, mxConstants.ALIGN_MIDDLE, true, 'html', 0, 0, 0);
		c.stroke();
	}
	this.state.cell.valueChanged = (value) => { var lastValue = mxCell.prototype.valueChanged.call(this.state.cell, value); this.updateImage(); this.redraw(); return lastValue;}
}

mxCellRenderer.registerShape(mxShapeWavedromTiming.prototype.cst.SHAPE_WAVEDROM, mxShapeWavedromTiming);

mxShapeWavedromTiming.prototype.getConstraints = function (style, w, h) {
	var constr = [];
	return constr;
}
