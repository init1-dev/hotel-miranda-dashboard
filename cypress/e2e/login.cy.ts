/// <reference types="cypress" />
import { badLogin, login } from '../../src/helpers/cypress/functions'

describe('Authentication spec', () => {

    it('successfuly visit login page', () => {
        cy.visit('')
        cy.url().should('include', "/login")

        cy.visit('/dashboard')
        cy.url().should('include', "/login")

        badLogin()
        cy.url().should('include', "/login")

        login()
        cy.url().should('include', "/dashboard")

        cy.visit('/login')
        cy.url().should('include', "/dashboard")

        cy.get('button').contains("🌙").click()
        cy.contains('h4', 'Dashboard').invoke('css', 'color').should('equal', 'rgb(255, 255, 255)')

        cy.get('button').contains("☀️").click()
        cy.contains('h4', 'Dashboard').invoke('css', 'color').should('equal', 'rgb(0, 0, 0)')

        cy.get('button').contains("Log out").click()
        cy.url().should('include', "/login")
    })
})