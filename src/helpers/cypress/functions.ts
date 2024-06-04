export const login = () => {
    cy.get('input[name=employee_email]').clear().type(`init1.dev@gmail.com`)
    cy.get('input[name=password]').clear().type(`${"12345"}{enter}`)
    cy.wait(2000)
}

export const badLogin = () => {
    cy.get('input[name=employee_email]').clear().type(`user`)
    cy.get('input[name=password]').clear().type(`${"12345"}{enter}`)
    cy.wait(2000)
}