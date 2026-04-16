const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const controls = document.getElementById('controls');
const previewSection = document.getElementById('previewSection');

if (uploadArea) {
    uploadArea.onclick = () => fileInput.click();
    fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            document.getElementById('originalSize').textContent = (file.size / 1024).toFixed(2) + ' KB';
            const reader = new FileReader();
            reader.onload = (event) => {
                document.getElementById('originalPreview').src = event.target.result;
                uploadArea.hidden = true;
                controls.hidden = false;
            };
            reader.readAsDataURL(file);
        }
    };
}

document.getElementById('compressBtn')?.addEventListener('click', () => {
    const img = document.getElementById('originalPreview');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    
    const quality = document.getElementById('qualitySlider').value / 100;
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    
    document.getElementById('compressedPreview').src = dataUrl;
    previewSection.hidden = false;
    controls.hidden = true;
    
    // Calculate compressed size approximately
    const head = 'data:image/jpeg;base64,';
    const size = Math.round((dataUrl.length - head.length) * 3 / 4);
    document.getElementById('compressedSize').textContent = (size / 1024).toFixed(2) + ' KB';
});

document.getElementById('resetBtn')?.addEventListener('click', () => location.reload());
