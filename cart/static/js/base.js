let navbar = document.querySelector('.navbar')
let burger = document.querySelector('.burger')
let leftNav = document.querySelector('.left-nav')
let rightNav = document.querySelector('.right-nav')
let name = document.querySelector('.name')

burger.addEventListener('click', () => {
    leftNav.classList.toggle('v-hidden-resp')
    rightNav.classList.toggle('v-hidden-resp')
    navbar.classList.toggle('resp-height')
})


// Cart javasscript
let cart = localStorage.getItem('cart')
if (cart == null) {
    cart = {}
}
else {
    cart = JSON.parse(cart)
    if (Object.keys(cart).length > 0) {
        document.querySelector('.cart-opt').innerHTML = `<li><a href="/checkout" class="nav-list">Order</a></li>
    
        <li style = "width:5rem;"><button class="nav-list" onClick="clearcart()" style="    background-color: inherit;
    border: none;">ClearCart</button></li>`
    }
    if (Object.keys(cart).length > 0) {
        updatePopbtn()
    }
}

// Addding the element in cart
let cartwrapper = document.querySelectorAll('.cart-wrapper')
for (let wrapper of cartwrapper) {
    wrapper.addEventListener('click', (e) => {
        document.querySelector('.cart-opt').innerHTML = `<li><a href="/checkout" class="nav-list">Order</a></li>
            <li style = "width:5rem;"><button class="nav-list" onClick="clearcart()" style="    background-color: inherit;
            border: none;">ClearCart</button></li>`
        if (e.target.classList[2] == 'cart') {
            if (e.target.id in cart) {
                cart[e.target.id][1] += 1
            }
            else {
                name = e.target.parentElement.previousElementSibling.previousElementSibling.innerText
                console.log(name)
                qty = 1
                cart[e.target.id] = [name, qty]
            }
            id = e.target.id
            localStorage.setItem('cart', JSON.stringify(cart))
            updateCart(cart, id)
            if (document.querySelector('.cart-opt').style.display = 'none') {
                document.querySelector('.cart-opt').style.display = 'flex'
            }
        }
    })
}

// Updating cart and localstorage
function updateCart(cart, id) {
    num = id.slice(2,)
    if (cart['pr' + num][1] == 0) {
        document.getElementById("qr" + num).innerHTML = `<button class="btn btn-primary cart" id="pr${num}">Add to cart</button>`
        delete cart['pr' + num]
    }

    else {
        document.getElementById("qr" + num).innerHTML = `<button class='btn btn-primary minus' id='minus${num}'>-</button><span class='mx-2 qty'>${cart[id][1]}</span><button class='btn btn-primary plus ' id='plus${num}'>+</button>`
    }
    localStorage.setItem('cart', JSON.stringify(cart))

    updatePopbtn()

}

// Method to make plus and minus button of cart functonal
let qtybtns = document.querySelectorAll('.cart-wrapper')
for (let qtybtn of qtybtns) {
    qtybtn.addEventListener('click', (e) => {
        if (e.target.classList[2] == 'plus') {
            id = e.target.id
            let num = id.slice(4,)
            addQty(num)
        }
        if (e.target.classList[2] == 'minus') {
            id = e.target.id
            let num = id.slice(5,)
            subQty(num)
        }
    })
}



// Making the minus button of cart functional
function subQty(num) {
    cart['pr' + num][1] -= 1
    id = 'pr' + num
    cart['pr' + num][1] = Math.max(0, cart['pr' + num][1])
    console.log(cart['pr' + num][1])
    updateCart(cart, id)
}

// Making the plus button of cart functional
function addQty(num) {
    cart['pr' + num][1] += 1
    id = 'pr' + num
    console.log(cart['pr' + num][1])
    updateCart(cart, id)
}

// function for updating popbtn
function updatePopbtn() {
    let sum = 0
    let cart = JSON.parse(localStorage.getItem('cart'))

    for (let item in cart) {
        sum += cart[item][1]
       
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    document.querySelector('.cart').innerHTML = sum

    // Changing the data content to populate cart info in popbtn
    let str = ''
    if (Object.keys(cart).length == 0) {
        str = `<p>Your cart is Empty. Please add some item before checkout!</p>`
    }
    else {
        str += `<h5>The items in your cart are</h5><div class="mx-2 my-2">`
        i = 1
        console.log(cart)
        for (let item in cart) {
            str += `<span class="d-flex"><b>${i}: </b><h6 class="mx-2">  ${cart[item][0]} </h6> Qty:<b>  ${cart[item][1]}</b></span>`
            i += 1
            // sum += cart[item][1]
        }
        str += `<h5>Total Items: ${sum}</h5>`
    }
    document.getElementById('popbtn').setAttribute('data-content', str)
    $('#popbtn').popover('show')


}
// Function for clearing cart
function clearcart() {
    if (document.querySelector('.card')) {
        for (let item in cart) {
            let num = item.slice(2,)
            document.getElementById("qr" + num).innerHTML = `<button class="btn btn-primary cart" id="${item}">Add to cart</button>`
        }
    }
    localStorage.clear()
    cart = {}
    localStorage.setItem('cart', JSON.stringify(cart))
    updatePopbtn(cart)
    document.querySelector('.cart-opt').style.display = 'none'
}
$('#popbtn').popover()





