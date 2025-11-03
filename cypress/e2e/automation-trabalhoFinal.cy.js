/// <reference types="cypress" />


import userData from '../fixtures/example.json'
import {getRandomNumber,getRandomEmail} from '../support/helpers'

import { faker } from '@faker-js/faker'

//import { navegarParaLogin } from '../modules/menu';
//import { preencherFormularioDePreCadastro } from '../modules/login';

import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'
import assinatura from '../modules/assinatura'
import carrinho from '../modules/carrinho'
import pagamento from '../modules/pagamento'



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
    cy.wait(5000)
      
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

  it('Caso de Teste 8: Verificar todos os produtos e a página de detalhes do produto', () =>{

    menu.PageProducts()

    cy.url().should('includes', '/products') 
    cy.get('.title.text-center').should('have.text', 'All Products')

   
    cy.get('a[href="/product_details/1"]').click() 

   
    cy.url().should('includes', '/product_details/1') 
    cy.get('.product-information > h2').should('be.visible').and ('have.text', 'Blue Top') // Nome do produto
    cy.get('.product-information > :nth-child(3)').should('be.visible').and ('have.text', 'Category: Women > Tops') // Categoria
    cy.get(':nth-child(5) > span').should('be.visible')                    // Preço
    cy.get('.product-information > :nth-child(6)').should('be.visible')    // Disponibilidade
    cy.contains('Condition').should('be.visible')                          // Condição
    cy.contains('Brand').should('be.visible')                              // Marca
  });


  it('Caso de teste 9: Pesquisar produto', () => {

    const produto = 'T-Shirt'

    menu.PageProducts()
    
    cy.get('#search_product').type(produto)
    cy.get('#submit_search').click()

    cy.get('.title').should('be.visible').and('have.text', 'Searched Products')
    cy.get('.features_items .col-sm-4').should('have.length.greaterThan', 0)
    
    cy.get('.features_items .col-sm-4').each(($produto) => {
      cy.wrap($produto).should('be.visible')
      cy.wrap($produto).find('p').invoke('text').then((nomeProduto) => {
        expect(nomeProduto.toLowerCase()).to.contain(produto.toLowerCase())
      })
    })  
  
});

it('Caso de teste 10: Verificar assinatura na página inicial', () => {

  assinatura.efetuarAssinatura ()

  cy.get('.alert-success').should('be.visible').and('contain.text', 'You have been successfully subscribed!')

})

it('Caso de teste 15: Fazer pedido: Registra-se antes de finalizar a compra', () => {
 
  menu.navegarParaLogin()

  cy.get('[data-qa="signup-name"]').type(userData.name)
  cy.get('[data-qa="signup-email"]').type(getRandomEmail())
  cy.contains('button','Signup').click()
         
  // Preencha os detalhes no cadastro e crie a conta
  cadastro.preencherFormularioDeCadastroCompleto()

  // Verifique se a conta foi criada e clique em continuar
  cy.contains('b', 'Account Created!').should('be.visible')
  cy.get('[data-qa="continue-button"]').click()

  // Verifique se o usuário está logado com a mensagem no topo
  cy.contains('b', userData.name)
  cy.contains(`Logged in as ${userData.name}`).should('be.visible') 

  
  // Adicione produtos ao carrinho

  carrinho.adicionarProdutosCarrinho ()

  // Continue comprando
  cy.contains('Continue Shopping').click()

  // Adiciona outro produto
  carrinho.adicionarProdutosCarrinho()

  // Clique no botão 'Cart'
  cy.contains('View Cart').click()

  // Clique em "Proceed To Checkout"
  cy.contains('Proceed To Checkout').click()

  // Verifique detalhes do endereço e revisão do pedido
  cy.get('#address_delivery').should('be.visible')
  cy.get('.cart_description').should('be.visible')

  // Insira um comentário e clique em 'Place Order'
  cy.get('textarea[name="message"]').type('Por favor, envie com urgência.')
  cy.contains('Place Order').click()

  // Insira dados de pagamento
  pagamento.preencherCartao ()

  //Clique em "Pay and Confirm Order"
  cy.get('[data-qa="pay-button"]').click()

  //Verifique a mensagem de sucesso
  cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')

  //Clique no botão "Delete Account"
  cy.contains('Delete Account').click()

  //Verifique a mensagem de conta excluída e clique em continuar
  cy.contains('b', 'Account Deleted!').should('be.visible')
  cy.get('[data-qa="continue-button"]').click()

})


});