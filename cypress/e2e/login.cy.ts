describe('Login Flow', () => {
  it('should log in a user and redirect to the home page', () => {
    // Start from the login page
    cy.visit('http://localhost:5173/login');

    // Fill in the form with the test user's credentials
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Assert that the user is redirected and sees their name
    cy.url().should('eq', 'http://localhost:5173/');
    cy.contains('Test User').should('be.visible');
  });
});
