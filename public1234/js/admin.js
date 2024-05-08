const deleteProduct = retrieved_btn => {
    const prodId = retrieved_btn.parentNode.querySelector('[name=productId]').value;
    const csrf = retrieved_btn.parentNode.querySelector('[name=_csrf]').value;
    const productElement = retrieved_btn.closest('article');

    fetch('/admin123/product123/' + prodId,
        {
            method: 'DELETE',
            headers: {
                "X-CSRF-TOKEN": csrf
            },
        })
        .then(result => {
            result.json();
        })
        .then(() => {
            productElement.parentNode.removeChild(productElement);
        })
        .catch(err => {
            console.log(err);
        });
};