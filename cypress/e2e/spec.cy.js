describe('Turing Cafe Reservations', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should check the first and last reservations', () => {
    cy.get('.card:first').within(() => {
      cy.get('h3').should('contain', 'Christie');
      cy.get('p:nth-of-type(1)').should('contain', '12/29');
    });

    cy.get('.card:last').within(() => {
      cy.get('h3').should('contain', 'Brittany');
      cy.get('p:nth-of-type(1)').should('contain', '9/9');
    });
  });

  it('should make a new reservation', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/reservations', {
      statusCode: 200,
      body: {
        id: 123,
        name: 'John Doe',
        date: '01/15',
        time: '6:00',
        number: 4
      },
    }).as('postReservation');
    cy.get('input[name="Name"]').type('John Doe');
    cy.get('input[name="Date"]').type('01/15');
    cy.get('input[name="Time"]').type('6:00');
    cy.get('input[name="Number of guests"]').type('4');
    cy.get('button').contains('Make Reservation').click();

    cy.get('.card:first').within(() => {
      cy.get('h3').should('contain', 'Christie');
      cy.get('p:nth-of-type(1)').should('contain', '12/29');
    });
    cy.get('.card:last').within(() => {
      cy.get('h3').should('contain', 'John Doe');
      cy.get('p:nth-of-type(1)').should('contain', '1/15');
    });
  });

  it('should delete the first reservation', () => {

    cy.get('.card:first').within(() => {
      cy.contains('Cancel').click();
    });

    cy.get('.card:first').within(() => {
      cy.get('h3').should('contain', 'Leta');
      cy.get('p:nth-of-type(1)').should('contain', "4/5");
    });

    cy.get('.card:last').within(() => {
      cy.get('h3').should('contain', 'Brittany');
      cy.get('p:nth-of-type(1)').should('contain', '9/9');
    });
    });
});