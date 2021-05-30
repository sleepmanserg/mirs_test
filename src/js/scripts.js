//
// Custom Scripts
// --------------------------------------------------

const buyBtn = document.querySelectorAll('.btn-buy');
const cartProductsWrap = document.querySelector('.cart__inner');
const clearBtn = document.querySelector('.btn-clear');

// Remove spaces from price
const removeSpaces = (str) => {
	return str.replace(/\s/g, '');
};
// Add spaces for price
const priceWithSpaces = (str) => {
	return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
// Create cart inner HTML
const generateCartInner = (title, price, id) => {
	return `
		<div class="cart__product" data-id='${id}'>
			<div class="cart__product-header">
				<div class="cart__product-info"><a class="cart__product-name" href="#">${title}</a>
					<div class="cart__product-price"><span>${priceWithSpaces(price)}</span>грн</div>
				</div><a class="cart__product-delete btn-delete">Удалить</a>
			</div>
		</div>
	`;
};
// Delete single item function
const deleteFromCart = () => {
	document.querySelector('.cart__product').remove();
};
// Add to cart button event
buyBtn.forEach(el => {
	el.addEventListener('click', (e) => {
		let $target = e.currentTarget;
		let productParent = $target.closest('.card');
		let productId = productParent.dataset.id;
		let productTitle = productParent.querySelector('.card__descr').textContent;
		let productPrice = parseInt(productParent.querySelector('.card__price').textContent);
		// Add to cart
		cartProductsWrap.insertAdjacentHTML('beforeend', generateCartInner(productTitle, productPrice, productId));
	});
});
// Delete single item event
cartProductsWrap.addEventListener('click', (e) => {
	if(e.target.classList.contains('btn-delete')) {
		deleteFromCart(e.target.closest('.cart__product'));
	}
});
// Clear cart
clearBtn.addEventListener('click', () => {
	if(cartProductsWrap.innerHTML.length) {
		document.querySelectorAll('.cart__product').forEach(el => el.remove());
	}
});
