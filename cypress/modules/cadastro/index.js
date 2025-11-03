import {faker } from '@faker-js/faker'


class Cadastro {
     preencherFormularioDeCadastroCompleto(){
     //radio ou checkbox
      cy.get('input[type=radio]').check('Mrs')
      /* outra alterantiva seria pegar pelo ID
      cy.get('#id_gender1').click() */

      cy.get('input#password').type('12345',{log:false})

      // para comboboxes ou selects -> select
      cy.get('select[data-qa=days]').select('20')
      cy.get('select[data-qa=months]').select('September')
      cy.get('select[data-qa=years]').select('1992')
      
      // radio ou checkboxes -> check
      cy.get('input[type=checkbox]#newsletter').check()
      cy.get('input[type=checkbox]#optin').check()


      //cy.get('input#first_name').type('Bob')
      cy.get('input#first_name').type(faker.person.firstName())
      //cy.get('input#last_name').type('Narciso Pipoca')
      cy.get('input#last_name').type(faker.person.lastName())
      //cy.get('input#company').type('PGATS')
      cy.get('input#company').type(`PGATS ${faker.company.name()}`)
      //cy.get('input#address1').type('Avenida Selenium, n 2004')
      cy.get('input#address1').type(faker.location.streetAddress())
      cy.get('select#country').select('Canada')
      //cy.get('input#state').type('California')
      cy.get('input#state').type(faker.location.state())
      //cy.get('input#city').type('Los Angeles')
      cy.get('input#city').type(faker.location.city())
      //cy.get('[data-qa="zipcode"]').type('90001')
      cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
      cy.get('[data-qa="mobile_number"]').type('111 222 333')
      cy.get('[data-qa="create-account"]').click()
     }
}

export default new Cadastro ()
