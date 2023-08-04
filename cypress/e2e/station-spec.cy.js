describe('location page spec happy paths', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/sockjs-node/info?t=*', {
      statusCode: 200,
      fixture: 'websocket',
    });
  });
  it('should load tides from an API, allow saving tides only once, and allow a user to return to search page', () => {
    cy.intercept(
      'GET',
      'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=*&end_date=*&station=9445388&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=hilo&units=english&application=DataAPI_Sample&format=json',
      {
        statusCode: 200,
        fixture: 'ayockTides',
      }
    ).as('fetchTides');
    cy.visit('http://localhost:3000/')
      .get('#searchInput')
      .type('ayock');
    cy.get('li').click();
    cy.wait('@fetchTides');
    cy.get('table')
      .find('th')
      .eq(0)
      .should('contain', 'DATE & TIME');
    cy.get('table')
      .find('th')
      .eq(1)
      .should('contain', 'TIDE');
    cy.get('table')
      .find('th')
      .eq(2)
      .should('contain', 'SAVE?');
    cy.get('table')
      .find('td')
      .eq(0)
      .should('contain', 'August 4th, 2023 at 2:32 AM');
    cy.get('table')
      .find('td')
      .eq(1)
      .should('contain', 'Low: 4 foot 2 inches');
    cy.get('table')
      .find('td')
      .eq(333)
      .should('contain', 'September 1st, 2023 at 7:30 PM');
    cy.get('table')
      .find('td')
      .eq(334)
      .should('contain', 'High: 12 foot');
    cy.get('.center')
      .eq(0)
      .find('.tide-save-l')
      .click();
    cy.get('.saved-confirmation').should('contain', 'Saved!');
    cy.get('.center')
      .eq(0)
      .find('.tide-save-l')
      .click();
    cy.get('.saved-confirmation').should(
      'contain',
      'You have saved this tide already.'
    );
    cy.get('.pbutton')
      .eq(0)
      .click();
    cy.get('.main-display')
      .get('ul')
      .find('li')
      .should('have.length', 186);
  });
  it('should load a 404 error page if a bad response', () => {
    cy.intercept(
      'GET',
      'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=*&end_date=*&station=9445388&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=hilo&units=english&application=DataAPI_Sample&format=json',
      {
        statusCode: 404,
        body: '404 Not Found!',
        headers: { 'content-type': 'application/json' },
      }
    ).as('fail');
    cy.visit('http://localhost:3000/')
      .get('#searchInput')
      .type('ayock');
    cy.get('li').click();
    cy.wait('@fail');
    cy.get('.server-down').find('img').should('be.visible')
  });
});
