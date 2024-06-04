/// <reference types="cypress" />
import { login } from '../../src/helpers/cypress/functions'

describe('Create a new room and delete it', () => {
    it('login, nagivate to rooms, create a new room and delete it', () => {
        cy.visit('')

        login()

        cy.contains('a span', 'Rooms').click()

        cy.contains('div a', 'NEW ROOM').click()

        cy.get('#room_type').select('Double bed')

        cy.get('input[name=room_number]').clear().type('50')

        cy.get('textarea[name=description]').clear().type('Description')

        cy.get('textarea[name=cancellation]').clear().type('Cancelation Policy')

        cy.get('input[name=discount]').clear().type('25')

        cy.get('input[name=price]').clear().type('600')

        cy.get('#amenities').select([
          "Breakfast",
          "Shower",
          "Kitchen",
          "Towels",
          "Shop Near",
          "Expert Team",
          "High Speed Wifi"
        ])

        cy.contains('button', 'Submit').click()

        cy.get('table tbody tr').first()
            .contains('h4', 'Suite Premium Delux')

        cy.get('.delete-50').click()

        cy.contains('button', 'Delete').click()
    })
})