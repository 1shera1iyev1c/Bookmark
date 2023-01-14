// HTML elements
let elRenderDiv = document.querySelector('.render__content')
let elTemplate = document.querySelector('#temlpate').content
let elBookTemplate = document.querySelector('#book__template').content
let elModalDiv = document.querySelector('.div-modal')
let elModalDiv2 = document.querySelector('#myModal')
let elModalBody = document.querySelector('.modal-body')
let elForm = document.querySelector('.form')
let elnputTitle = document.querySelector('.input-title')
let elnputNumber = document.querySelector('.input-number')
let elSelectCategoriy = document.querySelector('.select')
let elHighLow = document.querySelector('.high-low')
let num = document.querySelector('.num')
let elPrice = document.querySelector('.prise')
let elBody = document.querySelector('body')
let elCheck = document.querySelector('.check')
let elLabel = document.querySelector('.label')
let elLogo = document.querySelector('.header__logo')
let elLink = document.querySelector('.header__link')
let elBall = document.querySelector('.ball')
let elBookList = document.querySelector('.modal-body2')
let elBookList2 = document.querySelector('.modal-body3')
let count = document.querySelector('.count')
let count2 = document.querySelector('.count2')

// Render products
function renderProducts(clothe) {
    let elFragment = document.createDocumentFragment()

    elRenderDiv.innerHTML = null
    clothe.forEach(item => {
        let templateDiv = elTemplate.cloneNode(true) 

        templateDiv.querySelector('.image').src = item.image
        templateDiv.querySelector('.title').textContent = item.title
        templateDiv.querySelector('.text').textContent = item.price
        templateDiv.querySelector('.text2').textContent = item.rating.rate
        templateDiv.querySelector('.text3').textContent = item.category
        templateDiv.querySelector('.jewelery').textContent = item.category
        templateDiv.querySelector('.modal-btn').dataset.renderModal = item.id
        templateDiv.querySelector('#btn').dataset.renderModal = item.id
        templateDiv.querySelector('.icon__heart').dataset.productBook = item.id
        num.textContent =+ item.rating.count

        elFragment.appendChild(templateDiv)
    });
    elRenderDiv.appendChild(elFragment)

    if (clothe.length === 0) {
        elPrice.textContent = 'Products is not defined'
        elPrice.classList.add('text-danger')
    }

}

// Dark mode light mode
elCheck.addEventListener('change', function (evt) {
    
    if (evt.target.checked === false) {
        elBody.classList.add('light')
        elBody.classList.remove('dark')
        elLabel.classList.add('label')
        elLogo.classList.remove('header__logo--light')
        elLogo.classList.add('header__logo')
        elLink.classList.remove('header__link--light')
        elLink.classList.add('header__link')
        num.classList.add('num')
        num.classList.remove('num-light')
        elBall.classList.add('ball')
        elBall.classList.remove('ball2')
    }else{
        elBall.classList.add('ball2')
        elBall.classList.remove('ball')
        elBody.classList.add('dark')
        elBody.classList.remove('light')
        elLabel.classList.remove('label')
        elLabel.classList.add('light__lebel')
        elLogo.classList.remove('header__logo')
        elLogo.classList.add('header__logo--light')
        elLink.classList.remove('header__link')
        elLink.classList.add('header__link--light')
        num.classList.remove('num')
        num.classList.add('num-light')
    }
})

// Creat more info modal
;(async function(){
    let responce = await fetch(`https://fakestoreapi.com/products`)
    data = await responce.json()
     
    elRenderDiv.addEventListener('click', evt => {
        let moreInfoModal2 = evt.target.dataset.renderModal

        if (moreInfoModal2) {
            let findInfo = data.find( item => item.id == moreInfoModal2)

            elModalDiv.querySelector('.modal-title').textContent = findInfo.title;
            elModalDiv.querySelector('.movie-text').textContent = findInfo.description;
       }
    })
})().catch(() =>{
    if (!moreInfoModal2) {
        alert('Error')
    }
});;

// Creat buy now modal
;(async function(){
    let responce = await fetch(`https://fakestoreapi.com/products`)
    data1 = await responce.json()
     
    elRenderDiv.addEventListener('click', evt => {
        let moreInfoModal = evt.target.dataset.renderModal

        if (moreInfoModal) {
            let findBuyNow = data1.find( item => item.id == moreInfoModal)

            elModalDiv2.querySelector('.modal-title2').textContent = findBuyNow.title;
            elModalDiv2.querySelector('.modal-text').textContent = findBuyNow.price;
            elModalDiv2.querySelector('.img').src = findBuyNow.image;
       }
    })
})().catch(() =>{
    if (!moreInfoModal) {
        alert('Error')
    }
});

//Render category
function renderCategories(item) {
    
    let categoriesArray = []

    item.forEach(some =>{
        let normalizedGanres = some.category.split('|')

        normalizedGanres.forEach(any =>{
            if (!categoriesArray.includes(any)) {
                categoriesArray.push(any)
            }
        })
    })
    categoriesArray.sort()

    let elFragmentOption = document.createDocumentFragment()
    categoriesArray.forEach(genres =>{

        let elOption = document.createElement('option')
        elOption.value = genres
        elOption.textContent = genres
        elFragmentOption.appendChild(elOption)
    })
    elSelectCategoriy.appendChild(elFragmentOption)
}

// Full search
;(async function(){
    let responce = await fetch('https://fakestoreapi.com/products') 
    data = await responce.json()
           
    let searchProduct = function (productTitle, productRating, productCategories) {
        
        return data.filter(item => {
            let matchCategories = productCategories === 'All' || item.category.includes(productCategories)
        
            return item.title.match(productTitle) && item.rating.rate >= productRating && matchCategories
        })
    }

// Search 
elForm.addEventListener('input', function(evt){
    evt.preventDefault()

    let selectValue = elSelectCategoriy.value
    let searchValue = elnputTitle.value.trim()
    let ratingValue = elnputNumber.value.trim()
    let highlowValue = elHighLow.value
    
    let pattern = new RegExp(searchValue, 'gi')
    let result = searchProduct(pattern, ratingValue, selectValue)

    if (highlowValue === 'high') {
        result.sort((b, a) => a.price - b.price)
    }
    if (highlowValue === 'low') {
        result.sort((a, b) => a.price - b.price)
        
    }
    renderProducts(result)
})
})().catch(() =>{
    if (ratingValue === 0 && searchValue === 0) {
        elRenderDiv.innerHTML = '<h3 style="color: red;">Input is empty enter product!</h3>'
    }else{
        elRenderDiv.innerHTML = '<h3 style="color: red;">Products is not defined!</h3>'
    }
})

;(async function(){
    let responce = await fetch('https://fakestoreapi.com/products') 
    data = await responce.json()
    renderProducts(data)
    renderCategories(data)
    console.log(data);
})().catch(() =>{
    if (data.length === 0) {
        alert('Error')
    }
});


let storage = window.localStorage;

let bookmarkArray = JSON.parse(storage.getItem('movieArray')) || []

;(async function(){
    let responce = await fetch('https://fakestoreapi.com/products') 
    data = await responce.json()
    
    elRenderDiv.addEventListener('click', function(evt){
        let moreBookmarks = evt.target.dataset.productBook
    
        if(moreBookmarks) {
            let findBookmarks = data.find( item => item.id == moreBookmarks)
    
            let doesIncludes = bookmarkArray.findIndex( item => item.id == findBookmarks.id)
            if(doesIncludes === -1){
                bookmarkArray.push(findBookmarks)
                storage.setItem('movieArray', JSON.stringify(bookmarkArray))
                renderBookmark(bookmarkArray, elBookList)
            }
        }
    })
})().catch(() =>{
    if (data.length === 0) {
        alert('Error')
    }
});


// Bookmark Render

function renderBookmark(bookmarMovie, list) {
    
    list.innerHTML = null

    let elBookFragment = document.createDocumentFragment()

    bookmarMovie.forEach(item => {
        let templateBook = elBookTemplate.cloneNode(true)

        templateBook.querySelector('.book__title').textContent = item.title
        templateBook.querySelector('.imag').src = item.image
        templateBook.querySelector('.bookclose__btn').dataset.closeBtn = item.id
    
        elBookFragment.appendChild(templateBook)
    })
    list.appendChild(elBookFragment)
    
}
if (bookmarkArray.length === 0) {
    elBookList.innerHTML = '<h2 class="text-danger">Liked products is not defined</h2>'
}
count.textContent = bookmarkArray.length
renderBookmark(bookmarkArray, elBookList)

function renderBookmark(bookmarMovie, list) {
    
    list.innerHTML = null
    
    let elBookFragment = document.createDocumentFragment()

    bookmarMovie.forEach(item => {
        let templateBook = elBookTemplate.cloneNode(true)

        templateBook.querySelector('.book__title').textContent = item.title
        templateBook.querySelector('.imag').src = item.image
        templateBook.querySelector('.bookclose__btn').dataset.closeBtn2 = item.id
        
        elBookFragment.appendChild(templateBook)
    })
    list.appendChild(elBookFragment)
}
count2.textContent = bookmarkArray.length
if (bookmarkArray.length === 0) {
    elBookList2.innerHTML = '<h2 class="text-danger">Bought products is not defined</h2>'
}
renderBookmark(bookmarkArray, elBookList2)


elBookList.addEventListener('click', function(evt){
    let removBookmarkId = evt.target.dataset.closeBtn
    
    if (removBookmarkId) {
        let countOfMovies = bookmarkArray.findIndex(function(item){
            return item.id == removBookmarkId
        })
        bookmarkArray.splice(countOfMovies, 1)
        storage.setItem('movieArray', JSON.stringify(bookmarkArray))
        renderBookmark(bookmarkArray, elBookList)
    }

})
elBookList2.addEventListener('click', function(evt){
    let removBookmarkId = evt.target.dataset.closeBtn2
    
    if (removBookmarkId) {
        let countOfMovies = bookmarkArray.findIndex(function(item){
            return item.id == removBookmarkId
        })
        bookmarkArray.splice(countOfMovies, 1)
        storage.setItem('movieArray', JSON.stringify(bookmarkArray))
        renderBookmark(bookmarkArray, elBookList2)
    }

})