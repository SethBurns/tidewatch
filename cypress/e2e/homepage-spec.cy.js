describe('homepage search page spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/sockjs-node/info?t=*', {
      statusCode: 200,
      fixture: 'websocket',
    });
  });
  it('navigates to pages and loads a small form, buttons, and a list that the form should filter', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.navbar')
      .find('.navbutton')
      .eq(1)
      .click();
    cy.get('.saved-tides-page').contains('h1', 'SAVED TIDES');
    cy.get('.saved-tides-page').contains(
      '.no-tides',
      'You have no saved tides!'
    );
    cy.get('.navbar')
      .find('.navbutton')
      .eq(0)
      .click();
    cy.get('h1').should('contain', 'tideWAtch');
    cy.get('.navbutton')
      .eq(0)
      .contains('p', 'Search');
    cy.get('.navbutton')
      .eq(1)
      .contains('p', 'Saved');
    cy.get('ul')
      .find('li')
      .should('have.length', 186);
    cy.get('#searchInput').type('long');
    cy.get('#searchInput').should('have.value', 'long');
    cy.get('ul')
      .find('li')
      .should('have.length', 3);
    cy.get('#dateInput').type('2023-08-10');
    cy.get('#dateInput').should('have.value', '2023-08-10');
  });
  it('should show an error if a bad station url is entered', () => {
    cy.intercept('GET', 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=*&end_date=*&station=*&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=hilo&units=english&application=DataAPI_Sample&format=json', {
      statusCode: 400,
      fixture: 'error'
    })
    cy.visit('http://localhost:3000/940574?date=2023-08-04')
    cy.get('.App').find('h1').should('contain', 'Something went wrong when fetching the tide data.')
  })
});
