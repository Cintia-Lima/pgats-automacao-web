/*
export function navegarParaLogin() {
    cy.get('a[href="/login"]').click() 
}
*/


class Menu {
  navegarParaLogin() {
    cy.get('a[href="/login"]').click()
    
  }

  efetuarLogout(){
    cy.get('a[href="/logout"]').should('be.visible').click()
  }

  PageContactUs(){
    cy.get('a[href="/contact_us"]').click()
  }

  PageProducts(){
    cy.get('a[href="/products"]').click()
  }

}

export default new Menu()