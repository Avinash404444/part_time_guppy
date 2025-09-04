import {bottemData,pcbottem} from './data-set.js'

addEventListener('DOMContentLoaded',()=>{
  document.querySelector(".bottam-section").innerHTML=bottemData
  document.querySelector(".pc-bottam-section").innerHTML=pcbottem
})

document.querySelector('.cart-cross').addEventListener('click',()=>{window.location.href="main.html"})


function copyPolicyText(type) {
  const icon = event.target.closest('.copy-icon').querySelector('.fa-copy');
  let policyText;
  if (type === 'social') {
    policyText = `Follow us on social media:
                - Facebook: [your Facebook link]
                - Instagram: [your Instagram handle]
                - youtube: [your Twitter handle]`;
  } 
  else if(type==='return'){
    policyText =`🐟 Return Policy
                ⚠️ Condition: Only if fish arrives dead
                    -📹 Proof: Send unboxing video (sealed package + dead fish)
                    -🔄 Resolution: Resend or refund in 3 days
                    -⏳ Deadline: Report within 2 hours of delivery
                    -📧 Contact: WhatsApp/Email video to [your contact]
                    -❗ No video = No refund`;
  }
   else if(type==='contact'){
    policyText =`- name : avinash.k
                - mobile number : 894556754
                - e-mail : avinash@gmail.com`;
   }
   else if(type==='deleveryInfo'){
    policyText =`DELIVERY INFORMATION:
                • Processing: Orders processed in 24 hrs (excluding weekends/holidays).
                • Delivery Time: 1-3 business days (depends on distance).
                • Delivery Fee: Calculated at checkout (based on location/order size).
                • Tracking: Sent via email after shipping.
                • Contact: Need help? Call [Your Number] or email [Your Email].
                • Note: No deliveries on Sundays/public holidays.`;
   }

    else {
    policyText = `Return Policy:
    - Condition: Only if fish arrives dead
    - Proof: Send unboxing video
    - Resolution: Resend or refund in 3 days`;
  }

  navigator.clipboard.writeText(policyText)
  
}