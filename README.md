# auto-modulate
A small program for automatically making modulations on all images in a particular folder. Modulations used are outlined on the [SharpJS documentation](https://sharp.pixelplumbing.com/api-operation#modulate).

# Quick start
Download the latest release zip from the [Releases page](https://github.com/Gikkman/auto-modulate/releases/latest), extract it and run the executable to see the program in action. It'll take all images in the `test_input` directory and apply the modulations outlined in the `auto-modulate.properties` file to them. The results are outputted into a folder named `test_output`, retaining the folder and file structure of the input. 

You can edit settings in the `auto-modulate.properties` file (open it with Notepad). All paths should be relative to the runtime directory (i.e. this directory). 

The modulations that can be applied are saturation, hue or brightness (or lightness). Saturation and brightness is multiplicative, lightness is additative, and hue is in degrees.


# Development
# Install
`npm install` - Will install all dependenceies

# Run
`npm run start` - Will run the Typescript code

Configuration for the program resides in the `auto-modulate.properties` file. You can open and edit the file with any text editor, for example Notepad. It is just a plain text file. I hope the file is fairly self explanatory.

# Build
`npm run build` - Will build a Windows executable

# Attribution
Input images are taken from these locations:
* https://pixabay.com/sv/photos/opel-gt-antik-bil-youngtimer-5190050/
* https://pixabay.com/sv/photos/blomma-bl%c3%a5-blommor-tr%c3%a4dg%c3%a5rd-6761262/
* https://pixabay.com/sv/illustrations/boho-konst-solnedg%c3%a5ng-berg-6654957/
