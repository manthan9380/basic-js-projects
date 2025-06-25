document.addEventListener('DOMContentLoaded',()=>{
    const products = [
        {id:1,name:"Product 1",price: 29.99},
        {id:2,name:"Product 2",price: 19.99},
        {id:3,name:"Product 3",price: 59.99},
    ];

    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const productList = document.getElementById("product-list")
    const cartItems = document.getElementById("cart-items")
    const emptyCartMsg = document.getElementById("empty-cart")
    const cartTotalMsg = document.getElementById("cart-total")
    const totalPriceDisp = document.getElementById("total-price")
    const checkOutBtn = document.getElementById("checkout-btn")

    renderCart();

    products.forEach(product => {
        const productDiv = document.createElement('div')
        productDiv.classList.add('product')
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
        `;
        productList.appendChild(productDiv)
    });

    productList.addEventListener('click',(e)=>{
        if(e.target.tagName ==="BUTTON"){
            const productId = parseInt(e.target.getAttribute("data-id"))
            const product = products.find(p => p.id === productId)
            addToCart(product)
            saveCartToLocalStorage()
        }
    })

    function addToCart(product){
        cart.push(product)
        renderCart();
    }

    function renderCart(){
        cartItems.innerHTML ="";
        let totalPrice = 0

        if(cart.length>0){
            emptyCartMsg.classList.add('hidden')
            cartTotalMsg.classList.remove('hidden')

            cart.forEach((item,index) => {
                totalPrice += item.price
                const cartItem = document.createElement('div')
                cartItem.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button data-cartid="${index}">Delete</button>
                `
                cartItem.classList.add('cart-item-box')
                cartItems.appendChild(cartItem)
                totalPriceDisp.textContent = `${totalPrice.toFixed(2)}`
                
                 
            });

        }else{
            cartItems.innerHTML =`<p id="empty-cart">Your cart is empty.</p>`;
            cartTotalMsg.classList.add('hidden')

        }
    }

    cartItems.addEventListener('click',(e)=>{
        if(e.target.tagName !== "BUTTON") return
        const id = e.target.getAttribute('data-cartid')
        cart.splice(id,1);
        saveCartToLocalStorage()
        renderCart()
    })

    checkOutBtn.addEventListener('click',()=>{
        cart.length = 0
        alert("Checkout successfully")
        renderCart()
        clearLocalStorage()
    })

    function saveCartToLocalStorage(){
        localStorage.setItem('cart',JSON.stringify(cart))
    }

    function clearLocalStorage(){
        localStorage.clear('cart')
    }

})