// DOM Elements
const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
const imageUpload = document.getElementById('imageUpload');
const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');
const textSizeInput = document.getElementById('textSize');
const textColorInput = document.getElementById('textColor');
const strokeColorInput = document.getElementById('strokeColor');
const fontFamilyInput = document.getElementById('fontFamily');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');
const placeholderText = document.getElementById('placeholderText');
const templateCards = document.querySelectorAll('.template-card');

let uploadedImage = null;

// Set canvas size
canvas.width = 500;
canvas.height = 500;

// Event Listeners
imageUpload.addEventListener('change', handleImageUpload);
topTextInput.addEventListener('input', drawMeme);
bottomTextInput.addEventListener('input', drawMeme);
textSizeInput.addEventListener('input', drawMeme);
textColorInput.addEventListener('input', drawMeme);
strokeColorInput.addEventListener('input', drawMeme);
fontFamilyInput.addEventListener('change', drawMeme);
downloadBtn.addEventListener('click', downloadMeme);
resetBtn.addEventListener('click', resetCanvas);

// Template click listeners
templateCards.forEach(card => {
    card.addEventListener('click', () => {
        const topText = card.dataset.top;
        const bottomText = card.dataset.bottom;

        topTextInput.value = topText;
        bottomTextInput.value = bottomText;

        if (uploadedImage) {
            drawMeme();
        } else {
            alert('Please upload an image first!');
        }
    });
});

// Handle image upload
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            uploadedImage = img;

            // Hide placeholder, show canvas
            placeholderText.style.display = 'none';
            canvas.style.display = 'block';

            drawMeme();
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

// Draw meme on canvas
function drawMeme() {
    if (!uploadedImage) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw image (cover the canvas)
    const imgRatio = uploadedImage.width / uploadedImage.height;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
        // Image is wider
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
    } else {
        // Image is taller
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(uploadedImage, offsetX, offsetY, drawWidth, drawHeight);

    // Text settings
    const textSize = textSizeInput.value;
    const textColor = textColorInput.value;
    const strokeColor = strokeColorInput.value;
    const fontFamily = fontFamilyInput.value;

    ctx.font = `${textSize}px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.lineWidth = textSize / 10;

    // Draw top text
    if (topTextInput.value) {
        ctx.fillStyle = textColor;
        ctx.strokeStyle = strokeColor;
        ctx.textBaseline = 'top';

        const topY = textSize / 2;

        ctx.strokeText(topTextInput.value, canvas.width / 2, topY);
        ctx.fillText(topTextInput.value, canvas.width / 2, topY);
    }

    // Draw bottom text
    if (bottomTextInput.value) {
        ctx.fillStyle = textColor;
        ctx.strokeStyle = strokeColor;
        ctx.textBaseline = 'bottom';

        const bottomY = canvas.height - textSize / 2;

        ctx.strokeText(bottomTextInput.value, canvas.width / 2, bottomY);
        ctx.fillText(bottomTextInput.value, canvas.width / 2, bottomY);
    }
}

// Download meme
function downloadMeme() {
    if (!uploadedImage) {
        alert('Please upload an image first!');
        return;
    }

    const link = document.createElement('a');
    link.download = 'my-meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Reset canvas
function resetCanvas() {
    topTextInput.value = 'WHEN YOU FIND A BUG';
    bottomTextInput.value = 'AT 2AM';
    textSizeInput.value = 40;
    textColorInput.value = '#ffffff';
    strokeColorInput.value = '#000000';
    fontFamilyInput.value = 'Impact';

    if (uploadedImage) {
        drawMeme();
    }
}

// Initialize with default text if no image
window.addEventListener('load', () => {
    canvas.style.display = 'none';
    placeholderText.style.display = 'block';
});