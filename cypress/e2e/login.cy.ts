/// <reference types="cypress" />
import { badLogin, login } from '../../src/helpers/cypress/functions'

describe('Authentication spec', () => {

    it('successfuly visit login page', () => {
        cy.visit('')
        cy.url().should('include', "/login")
    })

    it('try to navigate dashboard without auth', () => {
        cy.visit('')
        cy.visit('/dashboard')
        cy.url().should('include', "/login")
    })

    it('try to navigate another path', () => {
        cy.visit('')
        cy.visit('/pathDoe')
        cy.url().should('include', "/login")
    })

    it('try a bad login', () => {
        cy.visit('')
        badLogin()
        cy.url().should('include', "/login")
    })

    it('do a login', () => {
        cy.visit('')
        login()
        cy.url().should('include', "/dashboard")
        cy.contains('p', 'init.dev').invoke('css', 'color').should('equal', 'rgb(0, 0, 0)')
        cy.contains('small', 'init1.dev@gmail.com').invoke('css', 'color').should('equal', 'rgb(136, 136, 136)')
    })

    it('try to navigate login when user is authed', () => {
        cy.visit('')
        login()
        cy.visit('/login')
        cy.url().should('include', "/dashboard")
    })

    it('check toggle theme', () => {
        cy.visit('')
        login()

        cy.get('button').contains("🌙").click()
        cy.contains('h4', 'Dashboard').invoke('css', 'color').should('equal', 'rgb(255, 255, 255)')

        cy.get('button').contains("☀️").click()
        cy.contains('h4', 'Dashboard').invoke('css', 'color').should('equal', 'rgb(0, 0, 0)')
    })

    it('do a logout', () => {
        cy.visit('')
        login()

        cy.get('button').contains("Log out").click()
        cy.url().should('include', "/login")
    })
})