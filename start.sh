#!/bin/bash

# Script khởi động ứng dụng Remove Background Image
echo "🚀 Khởi động ứng dụng Remove Background Image..."

# Kiểm tra xem virtual environment có tồn tại không
if [ ! -d "venv" ]; then
    echo "❌ Không tìm thấy virtual environment. Vui lòng tạo mới:"
    echo "python3 -m venv venv"
    echo "source venv/bin/activate"
    echo "pip install -r requirements.txt"
    exit 1
fi

# Kích hoạt virtual environment
echo "📦 Kích hoạt virtual environment..."
source venv/bin/activate

# Chạy ứng dụng
echo "🌐 Khởi động web server..."
python run.py
