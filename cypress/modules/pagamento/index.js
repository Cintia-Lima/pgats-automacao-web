import { faker } from '@faker-js/faker'

class pagamento { 
  preencherCartao() {
  cy.get('[data-qa="name-on-card"]').type(faker.person.fullName())
  cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
  cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
  cy.get('[data-qa="expiry-month"]').type(faker.date.future().getMonth().toString().padStart(2, '0'))
  cy.get('[data-qa="expiry-year"]').type(faker.date.future().getFullYear().toString())
  }

}

export default new pagamento()