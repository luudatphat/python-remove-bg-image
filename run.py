#!/usr/bin/env python3
"""
Script để chạy ứng dụng Remove Background Image
"""

import os
import sys
import subprocess
from pathlib import Path

def check_python_version():
    """Kiểm tra phiên bản Python"""
    if sys.version_info < (3, 7):
        print("❌ Lỗi: Cần Python 3.7 trở lên")
        print(f"Phiên bản hiện tại: {sys.version}")
        sys.exit(1)
    print(f"✅ Python version: {sys.version.split()[0]}")

def check_dependencies():
    """Kiểm tra và cài đặt dependencies"""
    requirements_file = Path("requirements.txt")
    if not requirements_file.exists():
        print("❌ Không tìm thấy file requirements.txt")
        sys.exit(1)
    
    print("📦 Kiểm tra dependencies...")
    try:
        import flask
        import rembg
        import PIL
        print("✅ Tất cả dependencies đã được cài đặt")
    except ImportError as e:
        print(f"❌ Thiếu dependency: {e}")
        print("🔧 Đang cài đặt dependencies...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
            print("✅ Cài đặt dependencies thành công")
        except subprocess.CalledProcessError:
            print("❌ Lỗi khi cài đặt dependencies")
            sys.exit(1)

def create_directories():
    """Tạo các thư mục cần thiết"""
    directories = ["uploads", "outputs"]
    for directory in directories:
        Path(directory).mkdir(exist_ok=True)
    print("✅ Đã tạo các thư mục cần thiết")

def main():
    """Hàm chính"""
    print("🚀 Khởi động ứng dụng Remove Background Image")
    print("=" * 50)
    
    # Kiểm tra Python version
    check_python_version()
    
    # Kiểm tra dependencies
    check_dependencies()
    
    # Tạo thư mục
    create_directories()
    
    print("\n🌐 Khởi động web server...")
    print("📱 Truy cập: http://localhost:5001")
    print("⏹️  Nhấn Ctrl+C để dừng server")
    print("=" * 50)
    
    # Chạy ứng dụng
    try:
        from app import app
        app.run(debug=True, host='0.0.0.0', port=5001)
    except KeyboardInterrupt:
        print("\n👋 Tạm biệt!")
    except Exception as e:
        print(f"❌ Lỗi: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
