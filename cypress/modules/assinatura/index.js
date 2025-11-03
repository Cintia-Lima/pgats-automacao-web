import userData from '../../fixtures/example.json'

class Assinatura {
  efetuarAssinatura () {
   cy.scrollTo('bottom')
   cy.get('#susbscribe_email').type(userData.user)
   cy.get('#subscribe').click()
  }
    
}

export default new Assinatura ()