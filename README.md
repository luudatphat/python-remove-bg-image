# Python Remove Background Image

Ứng dụng web đơn giản để xóa background của hình ảnh sử dụng thư viện [rembg](https://github.com/danielgatis/rembg) và Flask.

## Tính năng

- 🖼️ **Xóa background tự động**: Sử dụng AI để xóa background một cách chính xác
- 🎨 **Giao diện đẹp mắt**: Thiết kế responsive và thân thiện với người dùng
- 📁 **Hỗ trợ nhiều định dạng**: PNG, JPG, JPEG, GIF, BMP, TIFF, WEBP
- 🖱️ **Kéo thả file**: Hỗ trợ drag & drop để upload hình ảnh
- 📱 **Responsive**: Hoạt động tốt trên desktop và mobile

## Yêu cầu hệ thống

- Python 3.7 trở lên
- macOS, Linux hoặc Windows
- Kết nối internet (để tải model AI lần đầu)

## Cài đặt và Chạy

### Cách 1: Sử dụng script tự động (Khuyến nghị)

```bash
# Clone repository
git clone https://github.com/your-username/python-remove-bg-image.git
cd python-remove-bg-image

# Chạy script tự động
./start.sh
```

### Cách 2: Thủ công với Virtual Environment

```bash
# Clone repository
git clone https://github.com/your-username/python-remove-bg-image.git
cd python-remove-bg-image

# Tạo virtual environment
python3 -m venv venv

# Kích hoạt virtual environment
# Trên macOS/Linux:
source venv/bin/activate
# Trên Windows:
# venv\Scripts\activate

# Cài đặt dependencies
pip install -r requirements.txt

# Chạy ứng dụng
python run.py
```

### Cách 3: Chạy trực tiếp (nếu đã có virtual environment)

```bash
# Kích hoạt virtual environment
source venv/bin/activate

# Chạy ứng dụng
python run.py
```

## Truy cập ứng dụng

Sau khi chạy thành công, truy cập: `http://localhost:5001`

## Sử dụng

1. **Chọn hình ảnh**: Click vào vùng upload hoặc kéo thả file vào
2. **Xem preview**: Hình ảnh gốc sẽ hiển thị
3. **Xóa background**: Click nút "Xóa Background" để xử lý
4. **Tải xuống**: Click "Tải xuống" để lưu kết quả

## Xử lý lỗi thường gặp

### Lỗi "python: command not found"
```bash
# Sử dụng python3 thay vì python
python3 run.py
```

### Lỗi "externally-managed-environment"
```bash
# Luôn sử dụng virtual environment
source venv/bin/activate
python run.py
```

### Lỗi thiếu dependencies
```bash
# Kích hoạt virtual environment và cài đặt lại
source venv/bin/activate
pip install -r requirements.txt
```

## Cấu trúc dự án

```
├── app.py                 # Flask server chính
├── run.py                 # Script khởi động với kiểm tra
├── start.sh               # Script tự động cho macOS/Linux
├── requirements.txt       # Dependencies
├── templates/
│   └── index.html        # Giao diện HTML
├── static/
│   ├── css/style.css     # Styles
│   └── js/script.js      # JavaScript
├── uploads/              # Thư mục chứa file upload
├── outputs/              # Thư mục chứa kết quả
└── venv/                 # Virtual environment
```

## Dependencies

- **Flask**: Web framework
- **rembg**: Thư viện xóa background bằng AI
- **Pillow**: Xử lý hình ảnh
- **Werkzeug**: Utilities cho Flask

## Phát triển

```bash
# Kích hoạt virtual environment
source venv/bin/activate

# Chạy ở chế độ debug
python run.py
```

## License

MIT License