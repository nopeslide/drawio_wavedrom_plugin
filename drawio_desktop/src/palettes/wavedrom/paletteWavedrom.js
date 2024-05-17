import bitfield from '!!raw-loader!./bitfield.json.txt'
import timing from '!!raw-loader!./timing.json.txt'
import schematic from '!!raw-loader!./schematic.json.txt'


Sidebar.prototype.addWavedromPalette = function () {
    var style = 'shadow=0;dashed=0;align=left;strokeWidth=1;labelBackgroundColor=#ffffff;noLabel=1;';

    this.addPaletteFunctions('wavedrom', 'WaveDrom', true, [
        this.createVertexTemplateEntry(style + 'shape=mxgraph.wavedrom.abstract.bitfield;',  300, 75, bitfield,  'Bitfield Diagram',  null, null, this.getTagsForStencil('mxgraph.wavedrom.abstract', 'wavedrom', 'byte', 'bit', 'bitfield ').join(' ')),
        this.createVertexTemplateEntry(style + 'shape=mxgraph.wavedrom.abstract.timing;',    800, 40, timing,    'Timing Diagram',    null, null, this.getTagsForStencil('mxgraph.wavedrom.abstract', 'wavedrom', 'wave', 'timing ').join(' ')),
        this.createVertexTemplateEntry(style + 'shape=mxgraph.wavedrom.abstract.schematic;', 400, 150, schematic, 'Schematic Diagram', null, null, this.getTagsForStencil('mxgraph.wavedrom.abstract', 'wavedrom', 'wave', 'schematic ').join(' ')),
    ]);
}
