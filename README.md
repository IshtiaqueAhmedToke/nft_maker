```markdown
# Random SVG Avatar Generator

This project generates random SVG avatars using predefined layers for different facial features. The generated avatars are saved as SVG and PNG files with corresponding metadata in JSON format.

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

## Usage

To generate avatars, simply run the following command:

```bash
node generateAvatars.js
```

## Project Structure

- `layers/`: Contains SVG files for different facial features.
- `out/`: The output directory where generated SVG, PNG, and JSON files will be saved.

## How It Works

1. **Random Name Generation**: Generates a random name by combining an adjective and a name from predefined lists.
2. **Layer Selection**: Randomly selects layers for different facial features (hair, eyes, nose, mouth, beard).
3. **SVG Composition**: Combines the selected layers into a single SVG template.
4. **PNG Conversion**: Converts the final SVG image to a PNG file using `sharp`.
5. **Metadata Creation**: Creates a JSON file containing metadata about the generated avatar.

## Code Explanation

### Main Functions

- `randInt(max)`: Returns a random integer between 0 and `max`.
- `randElement(arr)`: Returns a random element from the array `arr`.
- `getRandomName()`: Generates a random name by combining an adjective and a name.
- `getLayer(name, skip=0.0)`: Reads an SVG layer from the `layers/` directory and returns its content.
- `svgToPng(name)`: Converts an SVG file to a PNG file using the `sharp` library.
- `createImage(idx)`: Generates an avatar by randomly selecting layers and combining them into an SVG template. Saves the SVG, PNG, and metadata JSON files.

### Example SVG Template

```xml
<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- bg -->
    <!-- head -->
    <!-- hair -->
    <!-- eyes -->
    <!-- nose -->
    <!-- mouth -->
    <!-- beard -->
</svg>
```

### Running the Script

The script starts by cleaning the `out/` directory and then generates avatars in a loop until the desired number is reached.

## Dependencies

- `fs`: File system module for reading and writing files.
- `sharp`: Image processing library for converting SVG to PNG.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions or improvements.

---

Happy generating! 🎨

---

Replace `<repository-url>` and `<repository-directory>` with your actual repository URL and directory name.
```
