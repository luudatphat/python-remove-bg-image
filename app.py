import os
import uuid
from flask import Flask, render_template, request, jsonify, send_file
from werkzeug.utils import secure_filename
from rembg import remove
from PIL import Image
import io

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['OUTPUT_FOLDER'] = 'outputs'

# Tạo thư mục uploads và outputs nếu chưa tồn tại
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['OUTPUT_FOLDER'], exist_ok=True)

# Các định dạng file được phép
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff', 'webp'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/remove-background', methods=['POST'])
def remove_background():
    try:
        # Kiểm tra xem có file được upload không
        if 'file' not in request.files:
            return jsonify({'error': 'Không có file được chọn'}), 400
        
        file = request.files['file']
        
        # Kiểm tra tên file
        if file.filename == '':
            return jsonify({'error': 'Không có file được chọn'}), 400
        
        # Kiểm tra định dạng file
        if not allowed_file(file.filename):
            return jsonify({'error': 'Định dạng file không được hỗ trợ'}), 400
        
        # Đọc file
        input_image = file.read()
        
        # Xóa background
        output_image = remove(input_image)
        
        # Tạo tên file output
        filename = secure_filename(file.filename)
        name, ext = os.path.splitext(filename)
        output_filename = f"{name}_no_bg.png"
        
        # Lưu file output
        output_path = os.path.join(app.config['OUTPUT_FOLDER'], output_filename)
        with open(output_path, 'wb') as f:
            f.write(output_image)
        
        return jsonify({
            'success': True,
            'message': 'Xóa background thành công!',
            'filename': output_filename,
            'download_url': f'/download/{output_filename}'
        })
        
    except Exception as e:
        return jsonify({'error': f'Lỗi: {str(e)}'}), 500

@app.route('/download/<filename>')
def download_file(filename):
    try:
        return send_file(
            os.path.join(app.config['OUTPUT_FOLDER'], filename),
            as_attachment=True,
            download_name=filename
        )
    except Exception as e:
        return jsonify({'error': f'Lỗi khi tải file: {str(e)}'}), 404

@app.route('/health')
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
