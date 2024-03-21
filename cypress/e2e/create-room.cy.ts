/// <reference types="cypress" />
import { login } from '../../src/helpers/cypress/functions'

describe('Create a new room', () => {
    it('login, nagivate to rooms and create a new room', () => {
        cy.visit('')

        login()

        cy.contains('a span', 'Rooms').click()

        cy.contains('div a', 'NEW ROOM').click()

        cy.get('#room_type').select('Double Bed')

        cy.get('input[name=room_number]').clear().type('250')

        cy.get('textarea[name=description]').clear().type('Description')

        cy.get('textarea[name=cancellation]').clear().type('Cancelation Policy')

        cy.get('input[name=offer]').clear().type('25')

        cy.get('input[name=price]').clear().type('600')

        cy.get('#amenities').select([
          "Breakfast",
          "Shower",
          "Kitchen",
          "Towels",
          "Shop near",
          "Expert Team",
          "High speed WiFi"
        ])

        cy.contains('button', 'Submit').click()

        cy.get('table tbody tr').first()
            .contains('h4', 'Suite Premium Delux')
    })
})