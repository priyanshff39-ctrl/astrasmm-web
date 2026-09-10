const UPI_ID = "ptajaydubey2@okicici";
const UPI_NAME = "Pt Ajay Dubey";
const WHATSAPP_NUM = "919999999999"; // APNA WHATSAPP NUMBER HERE (91 ke saath)

let currentPlat = 'ig';

const servicesDB = {
    ig: [
        { name: "Instagram Normal Views - ₹2.50/1k", rate: 2.50, min: 1000, max: 10000000 },
        { name: "Instagram Instant Views - ₹9.90/1k", rate: 9.90, min: 1000, max: 10000000 },
        { name: "Instagram Normal Followers - ₹110/1k", rate: 110.00, min: 100, max: 100000 },
        { name: "Instagram Real Followers VIP - ₹350/1k", rate: 350.00, min: 100, max: 500000 },
        { name: "Instagram Real Likes - ₹11/1k", rate: 11.00, min: 100, max: 50000 }
    ],
    yt: [
        { name: "YouTube HQ Views - ₹140/1k", rate: 140.00, min: 500, max: 1000000 },
        { name: "YouTube Subs Normal - ₹35/1k", rate: 35.00, min: 100, max: 10000 },
        { name: "YouTube Subs VIP Non-Drop - ₹4500/1k", rate: 4500.00, min: 100, max: 5000 },
        { name: "YouTube Real Likes - ₹120/1k", rate: 120.00, min: 100, max: 50000 },
        { name: "YouTube WatchTime (1000 Hrs) - ₹2200", rate: 2200.00, min: 500, max: 4000 }
    ],
    tt: [
        { name: "TikTok Fast Views - ₹2.00/1k", rate: 2.00, min: 1000, max: 10000000 },
        { name: "TikTok VIP Followers - ₹350/1k", rate: 350.00, min: 100, max: 50000 },
        { name: "TikTok Real Likes - ₹35/1k", rate: 35.00, min: 100, max: 100000 }
    ]
};

function switchTab(plat) {
    currentPlat = plat;
    document.querySelectorAll('.plat-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    loadServices();
}

function loadServices() {
    const select = document.getElementById('serviceSelect');
    select.innerHTML = '';
    
    servicesDB[currentPlat].forEach(s => {
        let opt = document.createElement('option');
        opt.value = s.rate;
        opt.text = s.name;
        opt.setAttribute('data-min', s.min);
        opt.setAttribute('data-max', s.max);
        select.add(opt);
    });
    
    calculatePrice();
}

function calculatePrice() {
    const select = document.getElementById('serviceSelect');
    const opt = select.options[select.selectedIndex];
    if(!opt) return;

    const rate = parseFloat(opt.value);
    const min = opt.getAttribute('data-min');
    const max = opt.getAttribute('data-max');
    const qty = parseInt(document.getElementById('orderQty').value) || 0;

    document.getElementById('qtyHint').innerText = `Min: ${min} | Max: ${parseInt(max).toLocaleString()}`;
    
    const total = (rate * (qty / 1000)).toFixed(2);
    document.getElementById('totalPrice').innerText = "₹" + total;
}

function showPayment() {
    const total = document.getElementById('totalPrice').innerText.replace('₹', '');
    const cleanAmt = parseFloat(total).toFixed(2);
    
    document.getElementById('modalAmount').innerText = "₹" + cleanAmt;
    
    // Dynamic QR Generator
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${UPI_ID}%26pn=${encodeURIComponent(UPI_NAME)}%26am=${cleanAmt}%26cu=INR`;
    document.getElementById('upiQrCode').src = qrUrl;

    document.getElementById('paymentModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

function sendWhatsAppOrder() {
    const select = document.getElementById('serviceSelect');
    const serviceName = select.options[select.selectedIndex].text;
    const link = document.getElementById('targetLink').value;
    const qty = document.getElementById('orderQty').value;
    const total = document.getElementById('totalPrice').innerText;

    const msg = `🚀 *NEW AstraSMM WEB ORDER* 🚀%0A%0A` +
                `📌 *Service:* ${serviceName}%0A` +
                `🔗 *Link:* ${link}%0A` +
                `🔢 *Quantity:* ${qty}%0A` +
                `💰 *Total Amount:* ${total}%0A%0A` +
                `Mainne payment kar di hai, ye raha screenshot! 👇`;

    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${msg}`, '_blank');
    closeModal();
}

window.onload = () => {
    loadServices();
};
