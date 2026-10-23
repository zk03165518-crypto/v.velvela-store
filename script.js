const money=n=>"Rs "+Number(n).toLocaleString("en-PK");
const products=window.VELVELA_PRODUCTS||[];
let cart=JSON.parse(localStorage.getItem("velvelaCart")||"[]");
const $=id=>document.getElementById(id);
function renderProducts(){ $("productGrid").innerHTML=products.map(p=>`<article class="product-card"><div class="product-image"><span class="product-tag">${p.tag||"Velvela Beauty"}</span><img src="${p.image}" alt="${p.name}" loading="lazy"><button class="quick-add" data-add="${p.id}">Add to bag ＋</button></div><div class="product-info"><span class="category">${p.category||"Velvela Beauty"}</span><h3>${p.name}</h3><p>${p.description}</p><div class="price-row"><span class="price">${money(p.price)} ${p.compareAt?`<del>${money(p.compareAt)}</del>`:""}</span><button class="inline-add" data-add="${p.id}">Add to bag +</button></div></div></article>`).join("");}
function save(){localStorage.setItem("velvelaCart",JSON.stringify(cart));renderCart();}
function add(id){const p=products.find(x=>x.id===id);if(!p)return;const found=cart.find(x=>x.id===id);found?found.qty++:cart.push({id,qty:1});save();openDrawer();}
function change(id,d){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=d;if(item.qty<1)cart=cart.filter(x=>x.id!==id);save();}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save();}
function total(){return cart.reduce((sum,i)=>sum+(products.find(p=>p.id===i.id)?.price||0)*i.qty,0);}
function renderCart(){let count=cart.reduce((s,i)=>s+i.qty,0);$("bagCount").textContent=count;$("drawerCount").textContent=`(${count})`;$("subtotal").textContent=money(total());$("checkoutTotal").textContent=money(total());$("cartItems").innerHTML=cart.length?cart.map(i=>{let p=products.find(x=>x.id===i.id);if(!p)return"";return `<div class="cart-item"><img src="${p.image}" alt=""><div><h3>${p.name}</h3><small>${money(p.price)}</small><div class="qty"><button data-qty="${p.id}" data-delta="-1">−</button><span>${i.qty}</span><button data-qty="${p.id}" data-delta="1">+</button></div><button class="remove" data-remove="${p.id}">Remove</button></div><strong>${money(p.price*i.qty)}</strong></div>`}).join(""):`<div class="empty-bag">Your bag is waiting for a little glow.<br>Explore the collection to add your favourite.</div>`;}
function openDrawer(){$("bagDrawer").classList.add("open");$("overlay").classList.add("show");$("bagDrawer").setAttribute("aria-hidden","false");}
function closeDrawer(){$("bagDrawer").classList.remove("open");$("overlay").classList.remove("show");$("bagDrawer").setAttribute("aria-hidden","true");}
document.addEventListener("click",e=>{const addBtn=e.target.closest("[data-add]");if(addBtn)add(addBtn.dataset.add);const q=e.target.closest("[data-qty]");if(q)change(q.dataset.qty,Number(q.dataset.delta));const r=e.target.closest("[data-remove]");if(r)removeItem(r.dataset.remove);});
$("openBag").onclick=openDrawer;$("closeBag").onclick=closeDrawer;$("overlay").onclick=closeDrawer;
$("menuToggle").onclick=()=>$("nav").classList.toggle("open");
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>$("nav").classList.remove("open")));
$("checkoutBtn").onclick=()=>{if(!cart.length){$("cartItems").innerHTML='<div class="empty-bag">Your bag is empty. Add a product before checkout.</div>';return;}closeDrawer();$("checkoutModal").classList.add("show");$("checkoutModal").setAttribute("aria-hidden","false");};
function closeCheckout(){$("checkoutModal").classList.remove("show");$("checkoutModal").setAttribute("aria-hidden","true");}
$("closeCheckout").onclick=closeCheckout;$("year").textContent=new Date().getFullYear();
$("orderForm").addEventListener("submit",async e=>{e.preventDefault();if(!cart.length){$("formMessage").textContent="Your bag is empty.";return;}
const btn=$("placeOrder"),msg=$("formMessage"),data=new FormData(e.target);
const lines=cart.map(i=>{const p=products.find(x=>x.id===i.id);return p?`${p.name} × ${i.qty} — ${money(p.price*i.qty)}`:""}).filter(Boolean);
const orderId="VEL-"+Date.now().toString().slice(-8);
const payload={_subject:`New V.Velvela COD Order ${orderId}`,_template:"table",_captcha:"false",Order_ID:orderId,Customer_Name:data.get("name"),Phone:data.get("phone"),Customer_Email:data.get("customer_email")||"Not provided",Address:data.get("address"),City:data.get("city"),Payment:"Cash on Delivery",Items:lines.join("\n"),Total:money(total()),Notes:data.get("notes")||"None"};
btn.disabled=true;btn.textContent="Sending order request…";msg.className="";msg.textContent="Please wait while we submit your order.";
try{
 const response=await fetch("https://formsubmit.co/ajax/velvelabeauty@gmail.com",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(payload)});
 if(!response.ok)throw new Error("Email service did not accept the request.");
 const result=await response.json();if(result.success===false)throw new Error(result.message||"Could not submit.");
 msg.className="success";msg.textContent=`Thank you! Your order request ${orderId} has been submitted. V.Velvela will contact you to confirm it. Please check your email/phone for confirmation.`;
 cart=[];save();e.target.reset();btn.textContent="Order submitted ✓";
 setTimeout(()=>{closeCheckout();btn.disabled=false;btn.innerHTML='Place COD order <span>→</span>';msg.textContent="";},4500);
}catch(err){msg.className="error";msg.textContent="We couldn't send your order automatically. Please email velvelabeauty@gmail.com with your name, phone, address and items, or try again. If this is your first order, activate FormSubmit using the confirmation email sent to your inbox.";btn.disabled=false;btn.innerHTML='Try again <span>→</span>';}
});
renderProducts();renderCart();