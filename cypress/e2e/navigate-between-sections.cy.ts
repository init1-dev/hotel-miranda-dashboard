/// <reference types="cypress" />
import { login } from '../../src/helpers/cypress/functions'

describe('Navigate between sections spec', () => {
    it('login, navigate to bookings and check to have 10 elements in table body', () => {
        cy.visit('')

        login()

        cy.contains('a span', 'Bookings').click()

        cy.wait(2000)

        cy.get('tbody').find('tr').should('have.length', 10)
    })

    it('login, navigate to bookings and delete a booking successfuly', () => {
        cy.visit('')

        login()

        cy.contains('a span', 'Bookings').click()

        cy.wait(2000)

        cy.get('a.new-booking').click()

        cy.get('button[type=submit]').click()

        cy.wait(2000)

        cy.get('table tbody tr').first()
            .find('button')
            .eq(2)
            .click()

        cy.contains('button', 'Delete').click()

        cy.wait(2000)

        cy.get('table tbody tr').first()
            .contains('h4', 'Eloise Daugherty')
    })
})