export const login = () => {
    cy.get('input[name=employee-id]').clear().type(`3bc45dfe-8286`)
    cy.get('input[name=password]').clear().type(`${"12345"}{enter}`)
    cy.wait(2000)
}

export const badLogin = () => {
    cy.get('input[name=employee-id]').clear().type(`user`)
    cy.get('input[name=password]').clear().type(`${"12345"}{enter}`)
    cy.wait(2000)
}