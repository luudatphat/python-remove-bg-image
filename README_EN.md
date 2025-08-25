# Python Remove Background Image

A simple web application to remove image backgrounds using the [rembg](https://github.com/danielgatis/rembg) library and Flask.

## Features

- 🖼️ **Automatic background removal**: Uses AI to accurately remove backgrounds
- 🎨 **Beautiful interface**: Responsive and user-friendly design
- 📁 **Multiple format support**: PNG, JPG, JPEG, GIF, BMP, TIFF, WEBP
- 🖱️ **Drag & drop**: Support for drag and drop file upload
- 📱 **Responsive**: Works well on desktop and mobile

## System Requirements

- Python 3.7 or higher
- macOS, Linux, or Windows
- Internet connection (for downloading AI model on first run)

## Installation and Running

### Method 1: Using automatic script (Recommended)

```bash
# Clone repository
git clone https://github.com/your-username/python-remove-bg-image.git
cd python-remove-bg-image

# Run automatic script
./start.sh
```

### Method 2: Manual setup with Virtual Environment

```bash
# Clone repository
git clone https://github.com/your-username/python-remove-bg-image.git
cd python-remove-bg-image

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run application
python run.py
```

### Method 3: Direct run (if virtual environment already exists)

```bash
# Activate virtual environment
source venv/bin/activate

# Run application
python run.py
```

## Access the Application

After successful startup, visit: `http://localhost:5001`

## Usage

1. **Select image**: Click the upload area or drag and drop a file
2. **Preview**: The original image will be displayed
3. **Remove background**: Click "Remove Background" button to process
4. **Download**: Click "Download" to save the result

## Troubleshooting Common Issues

### Error "python: command not found"
```bash
# Use python3 instead of python
python3 run.py
```

### Error "externally-managed-environment"
```bash
# Always use virtual environment
source venv/bin/activate
python run.py
```

### Missing dependencies error
```bash
# Activate virtual environment and reinstall
source venv/bin/activate
pip install -r requirements.txt
```

## Project Structure

```
├── app.py                 # Main Flask server
├── run.py                 # Startup script with checks
├── start.sh               # Automatic script for macOS/Linux
├── requirements.txt       # Dependencies
├── templates/
│   └── index.html        # HTML interface
├── static/
│   ├── css/style.css     # Styles
│   └── js/script.js      # JavaScript
├── uploads/              # Upload files directory
├── outputs/              # Results directory
└── venv/                 # Virtual environment
```

## Dependencies

- **Flask**: Web framework
- **rembg**: AI background removal library
- **Pillow**: Image processing
- **Werkzeug**: Flask utilities

## Development

```bash
# Activate virtual environment
source venv/bin/activate

# Run in debug mode
python run.py
```

## License

MIT License
