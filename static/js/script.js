let selectedFile = null;
let downloadUrl = null;

// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const previewSection = document.getElementById('previewSection');
const originalImage = document.getElementById('originalImage');
const resultImage = document.getElementById('resultImage');
const loading = document.getElementById('loading');
const downloadSection = document.getElementById('downloadSection');
const downloadBtn = document.getElementById('downloadBtn');

// Event Listeners
fileInput.addEventListener('change', handleFileSelect);
uploadArea.addEventListener('dragover', handleDragOver);
uploadArea.addEventListener('dragleave', handleDragLeave);
uploadArea.addEventListener('drop', handleDrop);
downloadBtn.addEventListener('click', downloadFile);

// File Selection
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        processSelectedFile(file);
    }
}

// Drag and Drop
function handleDragOver(event) {
    event.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            processSelectedFile(file);
        } else {
            showError('Vui lòng chọn file hình ảnh hợp lệ.');
        }
    }
}

// Process Selected File
function processSelectedFile(file) {
    // Validate file size (16MB)
    if (file.size > 16 * 1024 * 1024) {
        showError('Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 16MB.');
        return;
    }

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/bmp', 'image/tiff', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        showError('Định dạng file không được hỗ trợ. Vui lòng chọn file PNG, JPG, JPEG, GIF, BMP, TIFF hoặc WEBP.');
        return;
    }

    selectedFile = file;
    displayImagePreview(file);
    showPreviewSection();
}

// Display Image Preview
function displayImagePreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        originalImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Show/Hide Sections
function showPreviewSection() {
    previewSection.style.display = 'block';
    downloadSection.style.display = 'none';
    resetResultImage();
}

function hidePreviewSection() {
    previewSection.style.display = 'none';
}

function showDownloadSection() {
    downloadSection.style.display = 'block';
}

function resetResultImage() {
    resultImage.style.display = 'none';
    loading.style.display = 'none';
}

// Process Image
async function processImage() {
    if (!selectedFile) {
        showError('Vui lòng chọn file hình ảnh trước.');
        return;
    }

    // Show loading
    loading.style.display = 'flex';
    resultImage.style.display = 'none';

    // Disable process button
    const processBtn = document.getElementById('processBtn');
    processBtn.disabled = true;
    processBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';

    try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await fetch('/remove-background', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            // Display result image
            resultImage.src = result.download_url;
            resultImage.style.display = 'block';
            loading.style.display = 'none';
            
            // Store download URL
            downloadUrl = result.download_url;
            
            // Show success message
            showSuccess(result.message);
            
            // Show download section
            showDownloadSection();
        } else {
            showError(result.error || 'Có lỗi xảy ra khi xử lý hình ảnh.');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Có lỗi xảy ra khi kết nối đến server.');
    } finally {
        // Re-enable process button
        processBtn.disabled = false;
        processBtn.innerHTML = '<i class="fas fa-magic"></i> Xóa Background';
    }
}

// Download File
function downloadFile() {
    if (downloadUrl) {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Reset Application
function resetApp() {
    selectedFile = null;
    downloadUrl = null;
    fileInput.value = '';
    hidePreviewSection();
    downloadSection.style.display = 'none';
    resetResultImage();
}

// Show Messages
function showError(message) {
    showMessage(message, 'error');
}

function showSuccess(message) {
    showMessage(message, 'success');
}

function showMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#dc3545' : '#28a745'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(messageDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.remove();
        }
    }, 5000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('Background Removal App initialized');
});
