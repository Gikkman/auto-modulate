# auto-modulate

A small program for automatically making modulations on all images in a particular folder. It can be changing saturation, hue or brightness (or lightness). Modulations used are outlined on the [SharpJS documentation](https://sharp.pixelplumbing.com/api-operation#modulate).

# Install
`npm install` - Will install all dependenceies

# Run
`npm run compile` - Will transpile the Typescript code to Javascript

`npm run start` - Will run the Javascript code

Configuration for the program resides in the `auto-overlay.properties` file. You can open and edit the file with any text editor, for example Notepad. It is just a plain text file. I hope the file is fairly self explanatory.

# Build
`npm run build` - Will build a Windows executable

# Example
Download the latest release zip from the [Releases page](https://github.com/Gikkman/auto-modulate/releases/latest), extract it and run the executable to see the program in action. It'll take all images in the `test_input` directory and apply the modulations outlined in the `auto-modulate.properties` file to them. The results are outputted into a folder named `test_output`, retaining the folder and file structure of the input. 

The folder `sharp` in the release archive contains the necessary binaries for the [SharpJS](https://sharp.pixelplumbing.com) image manipulation library to work.

Input images are taken from these locations:
* https://pixabay.com/sv/illustrations/monstera-fabrik-l%c3%a4mnar-natur-5516509/
* https://pixabay.com/sv/photos/blomma-bl%c3%a5-blommor-tr%c3%a4dg%c3%a5rd-6761262/
* https://pixabay.com/sv/illustrations/boho-konst-solnedg%c3%a5ng-berg-6654957/