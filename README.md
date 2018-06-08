# HTML5 Rich Text Demo

A custom built rich text editor making use of the contenteditable html feature

## Installation

Put this in your `<head>`:

<pre style="background-color:#2B2B2B;color:#E6E1DC;font-family:'Courier New';font-size:9.0pt;">    <<span style="color:#E8BF6A;">link rel=</span><span style="color:#A5C261;font-weight:bold;">"stylesheet"</span> <span style="color:#E8BF6A;">href=</span><span style="color:#A5C261;font-weight:bold;">"html5-wysiwyg-webboss/html5editor-styles.css"</span>>
    <<span style="color:#e8bf6a;">script src=</span><span style="color: rgb(165, 194, 97);">"html5-wysiwyg-webboss/html5editor-widget.js"</span>></<span style="color:#e8bf6a;">script</span>>
</pre>

And then create a `DIV` with the ID or CLASS name with the same name you set in the jQuery selector variable:

<pre style="background-color:#2B2B2B;color:#E6E1DC;font-family:'Courier New';font-size:9.0pt;"><<span style="color:#E8BF6A;">script</span>>
<span style="color:#d0d0ff;">$</span>(<span style="color:#a5c261;">'.</span><span style="color:#e8bf6a;">html5editor</span><span style="color:#a5c261;">'</span>).<span style="color:#d0d0ff;">html5editor</span>({  
    <span style="color:#d0d0ff;">editorName</span><span style="color:#cc7833;">:</span> <span style="color:#a5c261;">'ed_demo'</span>,  
    <span style="color:#d0d0ff;">theme</span><span style="color:#cc7833;">:</span> <span style="color:#a5c261;">"default"</span>,  
    <span style="color:#d0d0ff;">toolbarSize</span><span style="color:#cc7833;">:</span> <span style="color:#a5c261;">"full"</span>,  
    <span style="color:#d0d0ff;">createInput</span><span style="color:#cc7833;">: true</span>,  
    <span style="color:#d0d0ff;">inputName</span><span style="color:#cc7833;">:</span> <span style="color:#a5c261;">"demoEditor"</span>,  
    <span style="color:#d0d0ff;">height</span><span style="color:#cc7833;">:</span> <span style="color:#a5c261;">400  
</span>});
</<span style="color:#E8BF6A;">script</span>>
</pre>

## Custom Toolbars

You can define a custom toolbar by creating an array of button options:

<pre style="background-color:#2b2b2b;color:#e6e1dc;font-family:'Courier New';font-size:9.0pt;"><<span style="color:#e8bf6a;">script</span>>  
    <span style="color:#d0d0ff;">$</span>(<span style="color:#a5c261;">'.</span><span style="color:#e8bf6a;">html5editor</span><span style="color:#a5c261;">'</span>).<span style="color:#d0d0ff;">html5editor</span>({  
        <span style="color:#d0d0ff;">editorName</span><span style="color:#cc7833;">:</span> <span style="color:#a5c261;">'ed_demo'</span>,  
        <span style="color:#d0d0ff;">theme</span><span style="color:#cc7833;">:</span> <span style="color:#a5c261;">"default"</span>,  
        <span style="color:#d0d0ff;">toolbarSize</span><span style="color:#cc7833;">:</span> <span style="color:#a5c261;">"custom"</span>,  
        <span style="color:#d0d0ff;">toolbar</span><span style="color:#cc7833;">:</span> [<span style="color:#a5c261;">'New'</span>, <span style="color:#a5c261;">'Undo'</span>, <span style="color:#a5c261;">'Redo'</span>, <span style="color:#a5c261;">'Bold'</span>, <span style="color:#a5c261;">'Italics'</span>, <span style="color:#a5c261;">'Underline'</span>, <span style="color:#a5c261;">'Strike Through'</span>, <span style="color:#a5c261;">'Align Left'</span>, <span style="color:#a5c261;">'Align Center'</span>, <span style="color:#a5c261;">'Align Right'</span>, <span style="color:#a5c261;">'Justify'</span>, <span style="color:#a5c261;">'Bullet List'</span>, <span style="color:#a5c261;">'Numbered List'</span>, <span style="color:#a5c261;">'H1'</span>, <span style="color:#a5c261;">'H2'</span>, <span style="color:#a5c261;">'H3'</span>, <span style="color:#a5c261;">'Paragraph'</span>, <span style="color:#a5c261;">'Link'</span>, <span style="color:#a5c261;">'Unlink'</span>, <span style="color:#a5c261;">'Image'</span>, <span style="color:#a5c261;">'HTML'</span>, <span style="color:#a5c261;">'Remove Formatting'</span>, <span style="color:#a5c261;">'Reset'</span>, <span style="color:#a5c261;">'View Source'</span>],  
        <span style="color:#d0d0ff;">createInput</span><span style="color:#cc7833;">: true</span>,  
        <span style="color:#d0d0ff;">inputName</span><span style="color:#cc7833;">:</span> <span style="color:#a5c261;">"demoEditor"</span>,  
        <span style="color:#d0d0ff;">height</span><span style="color:#cc7833;">:</span> <span style="color:#a5c261;">400  
</span> <span style="color:#a5c261;"></span> });  
</<span style="color:#e8bf6a;">script</span>></pre>

## Settings

*   `editorName` - Element selector
*   `path` - Relative path to the plugin installation
*   `theme` - CSS theme name (only <q>default</q> available as standard)
*   `toolbarSize` - <q>full</q> or <q>mini</q> or <q>custom</q>
*   `toolbar` - If `toolbarSize` is set to <q>custom</q>, create an array of buttons here from the following:

    > `'New', 'Select All', 'Undo', 'Redo', 'Text Colour', 'Highlight Colour', 'Bold', 'Italics', 'Underline', 'Strike Through', 'Align Left', 'Align Center', 'Align', ' Right', 'Justify', 'Indent', 'Outdent', 'Bullet List', 'Numbered List', 'H1', 'H2', 'H3', 'Paragraph', 'Link', 'Unlink', 'Image', 'Paragraph', 'Blockquote', 'HR', 'Subscript', 'Superscript', 'HTML', 'Remove Formatting', 'Reset', 'Print', 'View Source'`

*   `createInput` - `true/false`: This will create a hidden input and copy all editor content into it on keyup and blur so that you can pass the data via `POST/GET`
*   `inputName` - The input name of the above hidden input so you can retrieve the `POST/GET` data
*   `colorPalette` - Array of colour values (array can be #HEX, RGB() or ColourName)
*   `width / height` - Width and Height of editor (either by px of %)

## Dependancies

*   jQuery
*   jQuery UI
*   Font Awesome

## Support

Supported by most modern browsers. Partial support for most common functions (ie. bold, italic, underline) in IE.

## License

*   MIT  
*   Version 1.1  
*   Last updated: 8th June 2018

## Known issues/To Do

*   Add localStorage to save draft content
*   Make jQuery UI dialog for nicer image and URL inputs
*   Add new CSS theme options
*   Create Table insert options
*   Add Image and Table editing options

## Copyright

2018 Luke Wilson/WebBoss Ltd  
[Github](https://github.com/MrLewk) | [WebBoss.io](https://webboss.io) | [WebBoss Websites](https://webbosswebsites.com)
