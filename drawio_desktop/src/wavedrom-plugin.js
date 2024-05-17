import './shapes/shapeTiming'
import './shapes/shapeBitfield'
import './shapes/shapeSchematic'
import "./palettes/wavedrom/paletteWavedrom";
import waveschema from 'wavedrom-schema/waveschema.json'
import jsonschema from 'jsonschema'
import json5 from 'json5'

/**
 * Constructs a new parse dialog.
 */
var DialogWavedrom = function (editorUi, shape) {
    var insertPoint = editorUi.editor.graph.getFreeInsertPoint();

    function parse(text, type, evt) {
        if (editorUi.spinner.spin(document.body, mxResources.get('inserting'))) {
            var graph = editorUi.editor.graph;
            graph.getModel().beginUpdate();
            graph.labelChanged(shape.state.cell, text);
            graph.getModel().endUpdate();
            editorUi.spinner.stop();

            if (shape.state.cell != null) {
                graph.setSelectionCell(shape.state.cell);
                graph.scrollCellToVisible(shape.state.cell);
            }
        }
    };


    var div = document.createElement('div');
    div.style.textAlign = 'right';

    var textarea = document.createElement('textarea');
    textarea.style.resize = 'none';
    textarea.style.width = '100%';
    textarea.style.height = '354px';
    textarea.style.marginBottom = '16px';
    textarea.value = shape.state.cell.value;

    div.appendChild(textarea);

    var parserStatus = document.createElement('pre');
    parserStatus.style.height = '4em';
    parserStatus.style.width = '100%';
    parserStatus.style.textAlign = 'left';
    parserStatus.style.overflowY = "scroll";
    parserStatus.style.overflowX = "scroll";
    div.appendChild(parserStatus);

    this.init = function () {
        textarea.focus();
    };

    // Enables dropping files
    if (Graph.fileSupport) {
        function handleDrop(evt) {
            evt.stopPropagation();
            evt.preventDefault();

            if (evt.dataTransfer.files.length > 0) {
                var file = evt.dataTransfer.files[0];

                var reader = new FileReader();
                reader.onload = function (e) { textarea.value = e.target.result; };
                reader.readAsText(file);
            }
        };

        function handleDragOver(evt) {
            evt.stopPropagation();
            evt.preventDefault();
        };

        function checkWavedromScript() {
            let validator = new jsonschema.Validator();
            let json = undefined
            try {
                json = json5.parse(textarea.value);
            } catch(e) {
                console.log(e);
                parserStatus.innerHTML = "could not be parsed as json";
                return;
            }
            try {
                validator.addSchema(waveschema.defs, '/defs#');
                let validation = validator.validate(json, waveschema.any, { nestedErrors: true, required: true });
                if (!validation.valid) {
                    let message = "";
                    for (const error of validation.errors) {
                        message += "[/";
                        message += error.path.join('/')
                        message += "] ";
                        message += error.toString() + "\n";
                    }
                    parserStatus.innerHTML = message;
                } else {
                    parserStatus.innerHTML = 'no error detected';
                }
            } catch (e) {
                console.log(e);
                parserStatus.innerHTML = e.message;
            }
        }

        function handleInput(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            checkWavedromScript();
        }

        checkWavedromScript();
        // Setup the dnd listeners.
        textarea.addEventListener('dragover', handleDragOver, false);
        textarea.addEventListener('drop', handleDrop, false);
        textarea.addEventListener('input', handleInput, false);
    }

    var cancelBtn = mxUtils.button(mxResources.get('close'), function () {
        editorUi.hideDialog();
    });

    cancelBtn.className = 'geBtn';

    if (editorUi.editor.cancelFirst) {
        div.appendChild(cancelBtn);
    }

    var okBtn = mxUtils.button(mxResources.get('apply'), function (evt) {
        editorUi.hideDialog();
        parse(textarea.value, evt);
    });
    div.appendChild(okBtn);

    okBtn.className = 'geBtn gePrimaryBtn';

    if (!editorUi.editor.cancelFirst) {
        div.appendChild(cancelBtn);
    }

    this.container = div;
};

Draw.loadPlugin(function (ui) {
    // Adds custom sidebar entry
    ui.sidebar.addWavedromPalette();

    ui.editor.graph.addListener(mxEvent.DOUBLE_CLICK, function (sender, evt) {
        var cell = evt.getProperty("cell");
        if (!cell) {
            return;
        }
        if (cell.style.indexOf("shape=mxgraph.wavedrom.abstract") < 0) {
            return;
        }

        var shape = ui.editor.graph.view.states["map"][cell.mxObjectId].shape;

        if (shape) {
            var dlg = new DialogWavedrom(ui, shape);
            ui.showDialog(dlg.container, 800, 500, true, false);
            dlg.init();
        }
        evt.consume();
    });
});
