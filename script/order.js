const cartDetails  =JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', function() {
    const orderBtn = document.querySelector('.customer-detais-btn');
    const form = document.querySelector('.customer-details-get-section');

     

    orderBtn.addEventListener('click', function() {

        // Validate required fields
        const name = document.getElementById('name-text').value.trim();
        const mobile = document.getElementById('mobile-number').value.trim();
        const address = document.getElementById('address-section').value.trim();
        const district = document.getElementById('category').value;
        const pincode = document.getElementById('pin-code').value.trim();
        
        const email = document.getElementById('e-mail').value.trim();
        const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'Not specified';
        
        // Create message for Telegram
        const message = `
        🛒 New Order Received 🛒
        
        👤 Name: ${name}
        📱 Mobile: ${mobile}
        📧 Email: ${email || 'Not provided'}
        🏠 Address: ${address}
        🏙 District: ${district}
        📌 Pincode: ${pincode}
        💳 Payment Method: ${paymentMethod}
        -------------------------------------------
        Fish details 
        ${fishname}
        `;
        
let customerdata=[
    {
        name:name,
        mobile:mobile,
        email:email,
        address:address,
        district:district,
        pincode:pincode,
        payment:paymentMethod
    }
]
 console.log(customerdata)
        
        localStorage.setItem('customer-details',JSON.stringify(message))
        localStorage.setItem('reuse-details',JSON.stringify(customerdata))
       
        
        // Disable button to prevent multiple submissions
        orderBtn.disabled = true;
        
        // Send to Telegram
        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        })
        .then(response => response.json())
       

    });
   
});



 
const productCrossBtn = document.querySelector('.product-cross');
    document.querySelector('.customer-detais-btn').addEventListener('click',()=>{
        document.querySelector('.payment-sit').style.display="grid"
})

document.querySelector('.product-cross').addEventListener('click',()=>window.location.href="main.html") 

let totalAmount = 0;
let fishname =[]

cartDetails.forEach((cartinfo)=>{
    totalAmount +=cartinfo.totalPrice;
    fishname.push(`${cartinfo.name} (Qty: ${cartinfo.quantity})`)
})
console.log(cartDetails)
addEventListener("DOMContentLoaded",()=>document.querySelector('.total-p').textContent=`total amount you need to pay is : ₹ ${totalAmount}`)


  /*gpt section */

   // Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = '8470880876:AAG_Ht3V8urYwd7Mb6fK9rr1_dNJmPTkhOU';
const TELEGRAM_CHAT_ID = '6053555324';

// Elements
const imageInput = document.getElementById('imageInput');
const previewContainer = document.getElementById('previewContainer');
const previewImage = document.getElementById('previewImage');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const uploadButton = document.querySelector('.done-btn');

document.querySelector('.remove-image').addEventListener('click',()=>removeImage())
uploadButton.addEventListener('click',()=>sendToTelegram())
// Event Listeners - MOVE THIS TO BOTTOM after function definitions
imageInput.addEventListener('change', handleImageSelect);

// Handle image selection
function handleImageSelect(event) {
    const file = event.target.files[0];
    
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
        showStatus('Please select a valid image file', 'error');
        return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showStatus('Image must be less than 5MB', 'error');
        return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onload = function(e) {
        previewImage.src = e.target.result;
        previewContainer.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

// Remove image preview
function removeImage() {
    imageInput.value = '';
    previewContainer.style.display = 'none';
    previewImage.src = '';
}

// Function to send image to Telegram
async function sendToTelegram() {
    const coustomerD = JSON.parse(localStorage.getItem('customer-details'))
    const file = imageInput.files[0];
    if (!file) {
        showStatus('Please select an payment image first', 'error');
        return;
    }
    
    // Show loading state
    uploadButton.disabled = true;
    uploadButton.textContent = 'Sending...';
    progressContainer.style.display = 'block';
    
    try {
        // Create FormData
        const formData = new FormData();
        formData.append('chat_id', TELEGRAM_CHAT_ID);
        formData.append('photo', file);
        formData.append('caption', `📸 Payment Screenshot Upload\n📁 File: ${file.name}\n📊 Size: ${formatFileSize(file.size)}\n🕒 Time: ${new Date().toLocaleString()} \n Customer-Data : \n ${coustomerD} \n Total-amount : ${totalAmount}` );

        // Update progress
        updateProgress(30);
        
        // Send to Telegram Bot API
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
            method: 'POST',
            body: formData
        });
        
        updateProgress(70);
        
        const result = await response.json();
        
        if (result.ok) {
            updateProgress(100);
            showStatus('✅ Payment screenshot sent successfully!', 'success');
            setTimeout(() => {
                resetForm();
            }, 2000);
        } else {
            throw new Error(result.description || 'Telegram API error');
        }
    } catch (error) {
        console.error('Telegram upload error:', error);
        showStatus('❌ Error: ' + error.message, 'error');
    } finally {
        // Restore button state after 2 seconds
        setTimeout(() => {
            uploadButton.disabled = false;
            uploadButton.textContent = 'Done';
            progressContainer.style.display = 'none';
        }, 2000);
    }
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Update progress bar
function updateProgress(percent) {
    progressBar.style.width = percent + '%';
    progressText.textContent = percent + '%';
}

// Show status message
function showStatus(message, type) {
    let statusElement = document.getElementById('statusMessage');
    if (!statusElement) {
        statusElement = document.createElement('div');
        statusElement.id = 'statusMessage';
        document.body.appendChild(statusElement);
    }
    
    statusElement.textContent = message;
    statusElement.className = `status-message ${type}`;
    statusElement.style.display = 'block';
    statusElement.style.background = type === 'success' ? '#28a745' : '#dc3545';
    
    // Auto-hide after 5 seconds
   setTimeout(() => {
        statusElement.style.display = 'none';
    }, 5000); 
}

// Reset form
function resetForm() {
    imageInput.value = '';
    previewContainer.style.display = 'none';
    progressBar.style.width = '0%';
    progressText.textContent = '0%';
}

// Optional: Test bot connection on load
async function testBotConnection() {
    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`);
        const data = await response.json();
        if (data.ok) {
            console.log('✅ Bot connection successful:', data.result.username);
        } else {
            console.error('❌ Bot connection failed');
        }
    } catch (error) {
        console.error('❌ Bot connection error:', error);
    }
}

// Test connection when page loads
window.addEventListener('load', testBotConnection);

let data=JSON.parse(localStorage.getItem('reuse-details'))
console.log(data[0].name)

addEventListener('DOMContentLoaded',()=>{
    document.getElementById("name-text").value = data[0].name;
    document.getElementById("mobile-number").value = data[0].mobile;
    document.getElementById("e-mail").value = data[0].email;
    document.getElementById("address-section").value = data[0].address;
    document.getElementById("pin-code").value = data[0].pincode;
})

