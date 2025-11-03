class carrinho {
    adicionarProdutosCarrinho (){
    cy.contains('a', 'Products').click()
    cy.get('.features_items .col-sm-4').first().trigger('mouseover')
    cy.get('.features_items .col-sm-4').first().contains('Add to cart').click()
    }
}

export default new carrinho()