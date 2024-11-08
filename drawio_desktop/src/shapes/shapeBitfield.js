import bitfield from 'bit-field'
import onml from 'onml'
import json5 from 'json5'

/**
* Extends mxShape.
*/
function mxShapeWavedromBitfield(bounds, fill, stroke, strokewidth) {
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
mxUtils.extend(mxShapeWavedromBitfield, mxImageShape);

mxShapeWavedromBitfield.prototype.cst = {
	SHAPE_BITFIELD: 'mxgraph.wavedrom.abstract.bitfield'
};

mxShapeWavedromBitfield.prototype.customProperties = [
	{ name: 'vspace', dispName: 'Vertical Space', type: 'int', min: 1, max: 2000, defVal: 80 },
	{ name: 'hspace', dispName: 'Horizontal Space', type: 'int', min: 1, max: 2000, defVal: 320 },
	{ name: 'lanes', dispName: 'Number of Lanes', type: 'int', min:1, max:1024, defVal: 1 },
	{ name: 'bits', dispName: 'Number of Fields', type: 'int', min:1, max:1024, defVal: 8 },
	{ name: 'compact', dispName: 'Compact', type: 'boolean', defVal: false },
	{ name: 'bigendian', dispName: 'Big Endian', type: 'boolean', defVal: false },
	{ name: 'hflip', dispName: 'Horizontal Flip', type: 'boolean', defVal: true },
	{ name: 'vflip', dispName: 'Vertical Flip', type: 'boolean', defVal: true },
];

mxShapeWavedromBitfield.prototype.updateImage = function () {
	var vspace = parseInt(mxUtils.getValue(this.style, 'vspace', '80'));
	var hspace = parseInt(mxUtils.getValue(this.style, 'hspace', '320'));
	var lanes  = parseInt(mxUtils.getValue(this.style, 'lanes', '1'));
	var bits   = parseInt(mxUtils.getValue(this.style, 'bits', '8'));
	var compact = mxUtils.getValue(this.style, 'compact', false);
	var bigendian = mxUtils.getValue(this.style, 'bigendian', false);
	var hflip = mxUtils.getValue(this.style, 'hflip', false);
	var vflip = mxUtils.getValue(this.style, 'vflip', false);

	var options = {
		vspace:vspace,
		hspace:hspace,
		lanes:lanes,
		bits:bits,
		compact:compact,
		bigendian:bigendian,
		fontsize:this.style.fontSize,
		fontfamily:this.style.fontFamily,
        hflip:hflip,
        vflip:vflip,
	}

	try {
		var jsonml = bitfield.render(json5.parse(this.state.cell.value).reg,options);
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
mxShapeWavedromBitfield.prototype.paintVertexShape = function (c, x, y, w, h) {
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
	window.c = c;
	this.state.cell.valueChanged = (value) => { var lastValue = mxCell.prototype.valueChanged.call(this.state.cell, value); this.updateImage(); this.redraw(); return lastValue; }
}

mxCellRenderer.registerShape(mxShapeWavedromBitfield.prototype.cst.SHAPE_BITFIELD, mxShapeWavedromBitfield);

mxShapeWavedromBitfield.prototype.getConstraints = function (style, w, h) {
	var constr = [];
	return constr;
}
