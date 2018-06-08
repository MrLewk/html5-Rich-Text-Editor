/**
 * Created by PhpStorm.
 * Author: Luke Wilson, WebBoss Ltd
 * Date: 01/11/2017
 * Time: 12:14 AM
 * Modified Date: 13/04/2018
 * Modified Time: 12:00 PM
 * See full list of commands here, to expand the toolbar: https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#Commands
 * Licensed under the MIT license (MIT)
 * Copyright (C) 2017-2018 Luke Wilson
 * DEMO: html5-wysiwyg-webboss/demo.html
 * INSPIRED FROM: https://code.tutsplus.com/tutorials/create-a-wysiwyg-editor-with-the-contenteditable-attribute--cms-25657
 * Check compatibility: https://codepen.io/netsi1964/full/QbLLGW
 *
 * DEPENDENCIES: jQuery UI for resizable
 *               FontAwesome for the toolbar icons
 */

/*
 * TODO: Add localStorage to save draft content
 *       Make jQuery UI dialog for nicer image and URL inputs
 */


(function ($, undefined) {
    "use strict";
    // the widget definition, where "wb" is the namespace,
    // "html5editor" the widget name
    $.widget("ui.html5editor", {
        // default options
        options: {
            editorName: "html5editor-" + $.now(), //element selector
            theme: "default",
            path: "/admin/JS/html5-wysiwyg-webboss/", //installation path
            defaultParagraphSeparator: "p", //p, div, br
            toolbarSize: "mini", //mini, full or custom/blank (use toolbar option)
            createInput: true, //create hidden input to pass content via POST
            inputName: "html5editor", //POST input name
            resizable: false, //true/false, horizontal, vertical, both
            width: '100%',
            height: '100%',
            colorPalette: ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"], //all of the color names listed in the CSS Spec (array can be #HEX, RGB() or ColourName)
            toolbar: ['Select All', 'Undo', 'Redo', 'Bold', 'Italics', 'Underline', 'Strike Through', 'Align Left', 'Align Center', 'Align Right', 'Justify', 'Remove Formatting', 'Reset'] //toolbar
            // options
        },
        // The constructor
        _create: function () {
            // add a class for theme selector
            this.element.addClass(this.options.theme + "-html5editor");
            this.element.addClass("html5editorTargetClass");
            // this.forePalette = $('.fore-palette');
            // this.backPalette = $('.back-palette');

            //Main vars
            var editableArea = this.element,
                toolbarEle,
                fColourEle,
                bColourEle,
                toolbarClass = 'toolbar-' + this.options.editorName,
                paletteClass = 'palette-item-' + this.options.editorName,
                editorNameVar = this.options.editorName,
                paragraphSeparator = this.options.defaultParagraphSeparator,
                h = this.options.height,
                w = this.options.width,
                rDirection;


            //Get default html load (if any) to reset changes back to -- requires "reset" button in toolbar
            var sDefTxt = $(this.element).html();

            //Set paragraph break type
            document.execCommand("defaultParagraphSeparator", false, paragraphSeparator);

            //Enabled resizable editor
            if (this.options.resizable !== false) {
                if (this.options.resizable === "horizontal") {
                    rDirection = "e, w";
                }
                if (this.options.resizable === "vertical") {
                    rDirection = "n, s";
                }
                if (this.options.resizable === "both" || this.options.resizable === true) {
                    rDirection = "n, e, s, w";
                }
                $(this.element).resizable({
                    ghost: true,
                    animate: true,
                    helper: "ui-resizable-helper",
                    handles: rDirection,
                    minHeight: h,
                    minWidth: w
                });
            }

            //Set editor size
            if (this.options.width) {
                $(this.element).css("width", w);
            }
            if (this.options.height) {
                $(this.element).css("height", h);
            }

            //Dialog UI - needs work for image and link prompts
            var dialogUI = $("#dialog-form").dialog({
                autoOpen: false,
                height: 400,
                width: 350,
                modal: true,
                buttons: {
                    "Insert Link": addLink,
                    Cancel: function () {
                        dialogUI.dialog("close");
                    }
                },
                close: function () {
                    form[0].reset();
                    allFields.removeClass("ui-state-error");
                }
            });

            function addLink() {
                //todo
            }

            //Toolbars
            this.toolbar = $('<div class="toolbar-' + this.options.editorName + '" data-container="html5editor-' + this.options.editorName + '"></div>').insertBefore(this.element);
            $(this.element).attr("contenteditable", true).attr("id", "html5editor-" + this.options.editorName);

            //Create POST input
            if (this.options.createInput === true) {
                //this.hiddenInput = $('<input type="hidden" id="html5editorHiddenInput-' + this.options.editorName + '" name="' + this.options.inputName + '" value="">').insertAfter(this.element);
                this.hiddenInput = $('<textarea style="display: none;" id="html5editorHiddenInput-' + this.options.editorName + '" name="' + this.options.inputName + '"></textarea>').insertAfter(this.element);
                this.hiddenInputID = $('#html5editorHiddenInput-' + this.options.editorName);
                $(this.hiddenInputID).val($(this.element).html());
            }

            //Create set toolbars
            toolbarEle = $('.toolbar-' + this.options.editorName);
            if (this.options.toolbarSize === "mini") {
                this.options.toolbar = ['Undo', 'Redo', 'Bold', 'Italics', 'Underline', 'Strike Through', 'Align Left', 'Align Center', 'Align Right', 'Justify', 'Remove Formatting', 'Reset'];
            }
            if (this.options.toolbarSize === "full") {
                this.options.toolbar = ['New', 'Select All', 'Undo', 'Redo', 'Text Colour', 'Highlight Colour', 'Bold', 'Italics', 'Underline', 'Strike Through', 'Align Left', 'Align Center', 'Align' +
                ' Right', 'Justify', 'Indent', 'Outdent', 'Bullet List', 'Numbered List', 'H1', 'H2', 'H3', 'Paragraph', 'Link', 'Unlink', 'Image', 'Paragraph', 'Blockquote', 'HR', 'Subscript', 'Superscript', 'HTML', 'Remove Formatting', 'Reset', 'Print', 'View Source'];
            }
            //Build toolbar
            if (this.options.toolbar.length) {
                for (var t = 0; t < this.options.toolbar.length; t++) {
                    switch (this.options.toolbar[t].toLowerCase()) {
                        case "select all":
                        case "selectall":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="selectAll" title="Select All"><i class="fa fa-fw fa-file-text"></i></a>');
                            break;
                        case "undo":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="undo" title="Undo"><i class="fa fa-fw fa-reply"></i></a>');
                            break;
                        case "redo":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="redo" title="Redo"><i class="fa fa-fw fa-share"></i></a>');
                            break;
                        case "bold":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="bold" title="Bold"><i class="fa fa-fw fa-bold"></i></a>');
                            break;
                        case "italics":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="italic" title="Italics"><i class="fa fa-fw fa-italic"></i></a>');
                            break;
                        case "underline":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="underline" title="Underline"><i class="fa fa-fw fa-underline"></i></a>');
                            break;
                        case "strike through":
                        case "strikethrough":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="strikeThrough" title="Strike Through"><i class="fa fa-fw fa-strikethrough"></i></a>');
                            break;
                        case "align left":
                        case "alignleft":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="justifyLeft" title="Align Left"><i class="fa fa-fw fa-align-left"></i></a>');
                            break;
                        case "align center":
                        case "aligncenter":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="justifyCenter" title="Align Center"><i class="fa fa-fw fa-align-center"></i></a>');
                            break;
                        case "align right":
                        case "alignright":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="justifyRight" title="Align Right"><i class="fa fa-fw fa-align-right"></i></a>');
                            break;
                        case "justify":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="justifyFull" title="Justify"><i class="fa fa-fw fa-align-justify"></i></a>');
                            break;
                        case "remove formatting":
                        case "removeformatting":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="removeFormat" title="Remove Formatting"><i class="fa fa-fw fa-eraser"></i></a>');
                            break;
                        case "text colour":
                        case "textcolour":
                            $(toolbarEle).append('<div class="fore-wrapper ' + toolbarClass + ' cmd-btn" title="Text Colour"><i class="fa fa-fw fa-font" style="color:#B5B5B5;"></i><div' +
                                ' class="fore-palette"><b>Text Colour</b></div></div>');
                            break;
                        case "highlight colour":
                        case "highlightcolour":
                            $(toolbarEle).append('<div class="back-wrapper ' + toolbarClass + ' cmd-btn" title="Highlight Colour"><i class="fa fa-fw fa-font" style="background:#C5C5C5;"></i><div class="back-palette"><b>Highlight Colour</b></div></div>');
                            break;
                        case "indent":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="indent" title="Indent"><i class="fa fa-fw fa-indent"></i></a>');
                            break;
                        case "outdent":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="outdent" title="Outdent"><i class="fa fa-fw fa-outdent"></i></a>');
                            break;
                        case "bullet list":
                        case "bulletlist":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="insertUnorderedList" title="Bullet List"><i class="fa fa-fw fa-list-ul"></i></a>');
                            break;
                        case "numbered list":
                        case "numberedlist":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="insertOrderedList" title="Numbered List"><i class="fa fa-fw fa-list-ol"></i></a>');
                            break;
                        case "h1":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="h1" title="Heading 1">H1</a>');
                            break;
                        case "h2":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="h2" title="Heading 2">H2</a>');
                            break;
                        case "h3":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="h3" title="Heading 3">H3</a>');
                            break;
                        case "h4":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="h4" title="Heading 4">H4</a>');
                            break;
                        case "h5":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="h5" title="Heading 5">H5</a>');
                            break;
                        case "h6":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="h6" title="Heading 6">H6</a>');
                            break;
                        case "link":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="createlink" title="Create Link"><i class="fa fa-fw fa-link"></i></a>');
                            break;
                        case "unlink":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="unlink" title="Unlink"><i class="fa fa-fw fa-unlink"></i></a>');
                            break;
                        case "image":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="insertimage" title="Insert Image"><i class="fa fa-fw fa-image"></i></a>');
                            break;
                        case "paragraph":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="p" title="Paragraph"><i class="fa fa-fw fa-paragraph"></i></a>');
                            break;
                        case "blockquote":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="blockquote" title="Blockquote"><i class="fa fa-fw fa-quote-left"></i></a>');
                            break;
                        case "hr":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="insertHorizontalRule" title="Horizontal Rule"><i class="fa fa-fw fa-minus"></i></a>');
                            break;
                        case "subscript":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="subscript" title="Subscript"><i class="fa fa-fw fa-subscript"></i></a>');
                            break;
                        case "superscript":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-command="superscript" title="Superscript"><i class="fa fa-fw fa-superscript"></i></a>');
                            break;
                        case "view source":
                        case "viewsource":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-container="' + this.options.editorName + '" data-command="source" id="source" title="View Source"><i class="fa fa-fw' +
                                ' fa-code"></i></a>');
                            break;
                        case "reset":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-container="' + this.options.editorName + '" data-command="reset" id="reset" title="Reset' +
                                ' Changes"><i class="fa fa-fw' +
                                ' fa-undo"></i></a>');
                            break;
                        case "inserthtml":
                        case "insert html":
                        case "html":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-container="' + this.options.editorName + '" data-command="insertHTML" id="insertHTML"' +
                                ' title="Insert HTML"><i class="fa fa-fw' +
                                ' fa-file-code-o"></i></a>');
                            break;
                        case "print":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-container="' + this.options.editorName + '" data-command="print" id="print"' +
                                ' title="Print"><i class="fa fa-fw' +
                                ' fa-print"></i></a>');
                            break;
                        case "new":
                            $(toolbarEle).append('<a href="#" class="' + toolbarClass + ' cmd-btn" data-container="' + this.options.editorName + '" data-command="new" id="new"' +
                                ' title="New"><i class="fa fa-fw' +
                                ' fa-file-o"></i></a>');
                            break;
                    }
                    //console.log(this.options.toolbar[t]);
                }
            }

            //Create colour palettes
            fColourEle = $('.fore-palette');
            bColourEle = $('.back-palette');
            for (var i = 0; i < this.options.colorPalette.length; i++) {
                //Text Colour
                $(fColourEle).append('<a href="#" data-command="forecolor" title="' + this.options.colorPalette[i] + '" data-value="' + this.options.colorPalette[i] + '" style="background-color:' + this.options.colorPalette[i] + ';"' + ' class="' + paletteClass + ' cmd-btn"></a>');
                //Highlight
                $(bColourEle).append('<a href="#" data-command="backcolor" title="' + this.options.colorPalette[i] + '" data-value="' + this.options.colorPalette[i] + '" style="background-color:' + this.options.colorPalette[i] + ';"' +
                    ' class="' + paletteClass + ' cmd-btn"></a>');
            }

            //Not Chrome - Firefox only
            this._on('#html5editor-' + this.options.editorName +' img', {
                'click': function (e) {
                    e.preventDefault();
                    //editableArea.focus();
                    $(e.currentTarget).select();
                    //console.log("img clicked");
                    document.execCommand('enableObjectResizing', false, null);
                }
            });

            //Not Chrome - Firefox only
            this._on('#html5editor-' + this.options.editorName +' table', {
                'click': function (e) {
                    e.preventDefault();
                    //editableArea.focus();
                    //console.log("table clicked");
                    document.execCommand('enableInlineTableEditing', false, null);
                }
            });

            this._on('.cmd-btn', {
                'click': function (e) {
                    e.preventDefault();
                    var command = $(e.currentTarget).data('command'),
                        value = $(e.currentTarget).data("value"),
                        container = $(e.currentTarget).data("container"),
                        fullContainer = '#html5editor-' + container,
                        sourceCode = '#sourceText',
                        url,
                        target,
                        urlText,
                        buildLink,
                        imgURL,
                        imgW,
                        imgH,
                        imgAlt,
                        buildImg,
                        htmlCode;
                    // console.log("cmd: " + command);
                    // console.log("value: " + value);
                    // console.log("container: " + container);
                    // console.log("ele: " + editableArea);

                    editableArea.focus();

                    switch (command) {
                        case "h1":
                        case "h2":
                        case "h3":
                        case "h4":
                        case "h5":
                        case "h6":
                        case "p":
                        case "blockquote":
                            document.execCommand('formatBlock', false, command);
                            break;
                        case "forecolor":
                        case "backcolor":
                            console.log(command);
                            console.log(value);
                            document.execCommand(command, false, value);
                            break;
                        case "source":
                            $(e.currentTarget).removeAttr("id").removeAttr("data-command").removeAttr("title").attr("data-command", "editmode").attr("id", "editmode").attr("title", "Edit Mode").empty().append('<i class="fa' +
                                ' fa-paint-brush"></i>').data("command", "editmode");
                            //Current HTML content
                            var currHTML = $(fullContainer).html();
                            var oHeight = $(fullContainer).outerHeight();
                            $(fullContainer).html("");
                            $(fullContainer).attr("contenteditable", false);
                            $(fullContainer).append("<textarea id='sourceText' class='wordbreak'></textarea>");
                            //$(fullContainer).wrapInner("<pre id='sourceText' class='wordbreak' contentEditable='true'></pre>");
                            $(sourceCode).css("height", oHeight).text(currHTML);
                            break;
                        case "editmode":
                            $(e.currentTarget).removeAttr("id").removeAttr("data-command").removeAttr("title").attr("data-command", "source").attr("id", "source").attr("title", "View Source").empty().append('<i class="fa' +
                                ' fa-code"></i>').data("command", "source");
                            var updatedHTML = $(sourceCode).val();
                            //console.log(updatedHTML);
                            //$(sourceCode).contents().unwrap();
                            $(fullContainer).attr("contenteditable", true);
                            var parseHTML = $.parseHTML(updatedHTML);
                            $(fullContainer).append(parseHTML);
                            $(sourceCode).remove();
                            document.execCommand("defaultParagraphSeparator", false, paragraphSeparator);
                            editableArea.focus();
                            break;
                        case "reset":
                            if (confirm('Are you sure you want to reset ALL changes?')) {
                                $(fullContainer).attr("contenteditable", true).html(sDefTxt);
                            }
                            break;
                        case "createlink":
                            var currentSelection = window.getSelection().toString();
                            url = prompt('Enter the URL here: ', 'http:\/\/');
                            target = prompt('URL target (eg: "_blank", "_self"): ', '_blank');
                            urlText = prompt('Link Text: ', currentSelection);
                            //document.execCommand(command, false, url || "");
                            if(url !== "" && url !== " " && url !== null) {
                                buildLink = '<a href="' + url + '" target="' + target + '">' + urlText + '</a>';
                            }else{
                                buildLink = "";
                            }
                            document.execCommand("insertHTML", false, buildLink || "");
                            break;
                        case "insertimage":
                            imgURL = prompt('Enter the image URL here: ', 'http:\/\/');
                            imgW = prompt('Enter the image width (% or px): ', '100%');
                            imgH = prompt('Enter the image height (% or px): ', '100%');
                            imgAlt = prompt('Enter alt text: ', 'Image');
                            //document.execCommand(command, false, url || "");
                            if(imgURL !== "" && imgURL !== " " && imgURL !== null) {
                                buildImg = '<img src="' + imgURL + '" width="' + imgW + '" height="' + imgH + '" alt="' + imgAlt + '">';
                            }else{
                                buildImg = "";
                            }
                            document.execCommand("insertHTML", false, buildImg || "");
                            break;
                        case "insertHTML":
                            htmlCode = prompt('Enter HTML code: ', '<b>html</b>');
                            document.execCommand(command, false, htmlCode || "");
                            break;
                        case "print":
                            var printHTML = $(fullContainer).html();
                            var prntWin = window.open("", "_blank", "width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
                            prntWin.document.open();
                            prntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + printHTML + "<\/body><\/html>");
                            prntWin.document.close();
                            break;
                        case "new":
                            if (confirm('Are you sure you want to clear all content?')) {
                                //Preserves undo level doing it this way
                                editableArea.focus();
                                document.execCommand("selectAll", false, null);
                                document.execCommand("delete", false, null);
                            }
                            break;
                        default:
                            document.execCommand(command, false, null);
                            break;

                    }
                }
            });

            //Update hidden POST input
            this._on(editableArea, {
                'keyup': function (e) {
                    $('textarea#html5editorHiddenInput-' + editorNameVar).val(e.currentTarget.innerHTML);
                },
                'change': function (e) {
                    $('textarea#html5editorHiddenInput-' + editorNameVar).val(e.currentTarget.innerHTML);
                },
                'blur': function (e) {
                    $('textarea#html5editorHiddenInput-' + editorNameVar).val(e.currentTarget.innerHTML);
                }
            });

        },

        _setOptions: function () {
            this._superApply(options);
            this._refresh();
        },

        // Events bound via _on are removed automatically
        // revert other modifications here
        _destroy: function () {
            // remove generated elements
            this.hiddenInput.remove();
            this.toolbar.remove();
            this.forePalette.remove();
            this.backPalette.remove();
            fColourEle.remove();
            bColourEle.remove();
            this.element.removeClass("custom-html5editor");
        },

        // if(supported(command) === "error"){
        //     alert(command + "\nis not supported in your browser");
        //     return;
        // }
        supported: function (cmd) {
            var status,
                msg;
            if (cmd !== "source" || cmd !== "reset") {
                status = !!document.queryCommandSupported(cmd) ? "success" : "error";
            }
            if (status === "error") {
                msg = console.warn(cmd + " is NOT supported in your browser!");
            } else {
                msg = console.info(cmd + " is supported in your browser!");
            }
            return msg;
        }

    });
}(jQuery));

