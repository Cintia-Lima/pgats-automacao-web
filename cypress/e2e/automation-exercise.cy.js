/// <reference types="cypress" />


// describe / context - suite ou conjunto de testes em um mesmo arquivo
// it - um teste dentro de um bloco ou conjunto de testes

//describe -> Automation Exercise
// it -> Cadastrar um usuário
// it -> Teste abcde


/* Tag       h1, div, button, input, select (O que fica entre < >)
   ID        #city                          (Tudo que fica após "ID="")
   Classe    .form-control                  (Tudo que fica após "Class=")
   Atributo   [data-qa=city] 
*/

// Triplo A - Arrange, Act, Assert

/*
HOOKS / Ganchos
  before     -> 1x antes de todos os testes
  beforeEach -> antes de cada teste
  after      -> 1x depois de todos os testes
  afterEach  -> depois de cada teste

*/


import userData from '../fixtures/example.json'
import {
  getRandomNumber,
  getRandomEmail
} from '../support/helpers'

import { faker } from '@faker-js/faker'




describe('Automation Exercise', () => {
beforeEach ( () => {
  cy.viewport('iphone-xr')
  cy.visit ('https://automationexercise.com/')
  cy.get('a[href="/login"]').click() 

});


   it.only('Exemplos de Logs', () => {
    cy.log(`SETP 1 ::PGATS AUTOMACAO WEB CY LOG`)
    cy.log(`SETP 2 ::PGATS AUTOMACAO WEB CY LOG`)

    //Uso de fixture
    cy.log (`Nome do usuário: ${userData.name}`)
    cy.log (`Email do usuário: ${userData.email}`)

   /* Uso de Helpers
    cy.log(`getRandomNumber: ${getRandomNumber()}`)
    cy.log(`getRandomEmail: ${getRandomEmail()}`) */

    // Uso dados fakes
    cy.log(`Dog Breed: ${faker.animal.dog()}`)
    cy.log(`Cat Breed: ${faker.animal.cat()}`)
    cy.log(`FullName: ${faker.person.fullName()}`)
    cy.log(`Company: ${faker.company.name()}`)
   

    //cy.fixture('imagem-exemplo.png').as('imagem')

    console.log(`PGATS AUTOMACAO WEB CONSOLE LOG`)

   });

    it('Cadastrar um usuário', () => {
      const timestamp = new Date().getTime()
      const firtsName = faker.person.firstName()
      const lastName = faker.person.lastName ()

      /* para estabelecer resolução/tamanho da tela do teste em telas responsivas(telase auto-ajustavéis conforme mudança de resolução)
      cy.viewport(300,1000)
      cy.viewport('iphone-xr') */

      
      cy.get('[data-qa="signup-name"]').type(`${firtsName} ${lastName}`)
      cy.get('[data-qa="signup-email"]').type(getRandomEmail())
      
      cy.contains('button','Signup').click()

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
   
    
    //Asserts
    
    //verifique se na url foi adicionada 'account_created' que diz que conseguiu concluir a criação do cadastro (rotas)
      cy.url().should('includes', 'account_created') 

    //Nesse teste verifica se na página contém o texto informado  
      cy.contains('b', 'Account Created!')    
      cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')       
      
      
    // consulta ao banco da api    
    });

    it('Login de Usuário com e-mail e senha corretos', () =>{
     
      cy.get(`[data-qa="login-email"]`).type(`qa-tester-1759531072242@test.com`)
      cy.get(`[data-qa="login-password"]`).type(`12345`)

      cy.get(`[data-qa="login-button"]`).click()

      const nomeDoUsuario = "QA Tester"

      cy.get('i.fa-user').parent().should('contain', nomeDoUsuario)
      cy.get('a[href="/logout"]').should('be.visible')

      cy.get(':nth-child(10) > a')
      .should('be.visible')
      .and('have.text', ` Logged in as ${nomeDoUsuario}`);

      cy.contains('b', nomeDoUsuario)
      cy.contains('Logged in as QA Tester').should('be.visible')     

    });

   it('Login de Usuário com e-mail e senha incorretos', () =>{
   
      cy.get(`[data-qa="login-email"]`).type(`qa-tester-1759531072242@test.com`)
      cy.get(`[data-qa="login-password"]`).type(`54321`)

      cy.get(`[data-qa="login-button"]`).click()

      cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
   }) ;


   it('Logout de Usuário', () => {
    
      cy.get(`[data-qa="login-email"]`).type(`qa-tester-1759531072242@test.com`)
      cy.get(`[data-qa="login-password"]`).type(`12345`)

      cy.get(`[data-qa="login-button"]`).click() 
      cy.get('i.fa-user').parent().should('contain', 'QA Tester')

      cy.get('a[href="/logout"]').should('be.visible').click()

      cy.url().should('contain', 'login')
      cy.contains('Login to your account')

      cy.get('a[href="/logout"]').should('not.exist')
      cy.get('a[href="/login"]').should('contain', 'Signup / Login')
   });

   it('Cadastrar usuário com e-mail existente no sistema', () => {
    
     cy.get(`[data-qa="signup-name"]`).type(`QA Tester`)
     cy.get(`[data-qa="signup-email"]`).type(`qa-tester-1759531072242@test.com`)
      
     cy.contains('button', 'Signup').click() 

     cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')

   });

   it('Testando efetuar upload de arquivo', () => {
    cy.visit('https://automationexercise.com/')
 
    cy.contains(" Contact us").click()
    /* para clicar no menu Contact US também pode usar 
     cy.get (`a[href*=contact]`).click() */
    cy.get('[data-qa="name"]').type(userData.name) //uso de fixtute
    cy.get('[data-qa="email"]').type(userData.email) //uso de fixtute
    cy.get('[data-qa="subject"]').type('Teste Upload arquivo')
    cy.get('[data-qa="message"]').type('Aqui neste teste preciso que funcione o Upload de arquivos')

    cy.fixture('example.json').as('arquivo')
    cy.get('input[type=file]').selectFile('@arquivo')
    /*para fazer upload de arquivo também pode usar o exato caminho de onde ele está
     cy.get('input[type=file]').selectFile('cypress/fixtures/example.json')*/

    cy.get('[data-qa="submit-button"]').click()

//asserts
    cy.get('.status').should('be.visible')
    cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')    
   
  });


});