import {faker} from '@faker-js/faker' 
import {getRandomEmail} from '../../support/helpers'
import userData from '../../fixtures/example.json'
 
/* via função
 export function preencherFormularioDePreCadastro () {
      const firtsName = faker.person.firstName()
      const lastName = faker.person.lastName ()
      
      cy.get('[data-qa="signup-name"]').type(`${firtsName} ${lastName}`)
      cy.get('[data-qa="signup-email"]').type(getRandomEmail())
      
      cy.contains('button','Signup').click()
  } 
 */


class Login {
    preencherFormularioDePreCadastro () {
      cy.get('[data-qa="signup-name"]').type(userData.name)
      cy.get('[data-qa="signup-email"]').type(userData.user)
          
      cy.contains('button','Signup').click()
    }
   
    preencherFormularioDeLogin(user, password){
      cy.get(`[data-qa="login-email"]`).type(user)
      cy.get(`[data-qa="login-password"]`).type(password)

      cy.get(`[data-qa="login-button"]`).click()

    }


}


export default new Login()