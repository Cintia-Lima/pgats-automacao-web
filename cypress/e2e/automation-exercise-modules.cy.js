/// <reference types="cypress" />


import userData from '../fixtures/example.json'
//import {getRandomNumber,getRandomEmail} from '../support/helpers'

import { faker } from '@faker-js/faker'

//import { navegarParaLogin } from '../modules/menu';
//import { preencherFormularioDePreCadastro } from '../modules/login';


import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'


describe('Automation Exercise', () => {
beforeEach ( () => {
  cy.viewport('iphone-xr')
  cy.visit ('https://automationexercise.com/')
  /* via Function
      navegarParaLogin() 
  */
  

});


   it('Exemplos de Logs', () => {
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

  it('Caso de Teste 1: Cadastrar um usuário', () => {
    menu.navegarParaLogin()
      
    // preencher o formulário de pré-cadastro
    login.preencherFormularioDePreCadastro()
    //preencherFormularioDePreCadastro () -> com function


    // preencher formlário de cadastro completo
    cadastro.preencherFormularioDeCadastroCompleto()
       
          
    //Asserts
    
    //verifique se na url foi adicionada 'account_created' que diz que conseguiu concluir a criação do cadastro (rotas)
    cy.url().should('includes', 'account_created') 

    //Nesse teste verifica se na página contém o texto informado  
    cy.contains('b', 'Account Created!')    
    cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')   
      
  });

  it('Caso de Teste 2: Login de Usuário com e-mail e senha corretos', () =>{
    menu.navegarParaLogin()
     
    login.preencherFormularioDeLogin(userData.user, userData.password)

    cy.get('i.fa-user').parent().should('contain', userData.name)
    cy.get('a[href="/logout"]').should('be.visible')

    cy.get(':nth-child(10) > a')
    .should('be.visible')
    .and('have.text', ` Logged in as ${userData.name}`);

    cy.contains('b', userData.name)
    cy.contains(`Logged in as ${userData.name}`).should('be.visible')  
    cy.contains(`Logged in as ${userData.name}`).should('be.visible')    

  });

  it('Caso de Teste 3: Login de Usuário com e-mail e senha incorretos', () =>{
    menu.navegarParaLogin()
   
    login.preencherFormularioDeLogin(userData.user, 54321)

    cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')

  }) ;


  it('Caso de Teste 4: Logout de Usuário', () => {
    menu.navegarParaLogin()
    
    login.preencherFormularioDeLogin(userData.user, userData.password)

    //cy.get('i.fa-user').parent().should('contain', 'QA Tester')

    //act
    menu.efetuarLogout()

    //Assert
    cy.url().should('contain', 'login')
    cy.contains('Login to your account')
    cy.get('a[href="/logout"]').should('not.exist')
    cy.get('a[href="/login"]').should('contain', 'Signup / Login')

  });

  it('Caso de Teste 5: Cadastrar usuário com e-mail existente no sistema', () => {
    menu.navegarParaLogin()
    
    cy.get(`[data-qa="signup-name"]`).type(`QA Tester`)
    cy.get(`[data-qa="signup-email"]`).type(`qa-tester-1759531072242@test.com`)
      
    cy.contains('button', 'Signup').click() 

    cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')

   });

  it('Caso de Teste 6: Testando efetuar upload de arquivo', () => {

    menu.PageContactUs()     
    
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