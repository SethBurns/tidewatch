describe('template spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/sockjs-node/info?t=*', {
      statusCode: 200,
      fixture: 'websocket',
    });
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
  });
  it('should allow saving of tides that display a location name, and the deleting of tides', () => {
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
      .find('.tide-save-l')
      .eq(0)
      .click();
    cy.get('.saved-confirmation').should('contain', 'Saved!');
    cy.get('table')
      .find('.tide-save-l')
      .eq(1)
      .click();
    cy.get('.saved-confirmation').should('contain', 'Saved!');
    cy.get('table')
      .find('.tide-save-l')
      .eq(27)
      .click();
    cy.get('.saved-confirmation').should('contain', 'Saved!');
    cy.get('table')
      .find('.tide-save-l')
      .eq(28)
      .click();
    cy.get('.saved-confirmation').should('contain', 'Saved!');
    cy.get('.pbutton')
      .eq(1)
      .click();
    cy.get('.saved-tides-page')
      .find('h1')
      .should('contain', 'SAVED TIDES');
    cy.get('table')
      .find('td')
      .eq(0)
      .should('contain', 'Ayock Point');
    cy.get('table')
      .find('td')
      .eq(12)
      .should('contain', 'Ayock Point');
    cy.get('table')
      .find('td')
      .eq(1)
      .should('contain', 'August 4th, 2023 at 2:32 AM');
    cy.get('table')
      .find('td')
      .eq(13)
      .should('contain', 'August 11th, 2023 at 9:07 AM');
    cy.get('table')
      .find('td')
      .eq(3)
      .click();
    cy.get('table')
      .find('td')
      .eq(0)
      .should('contain', 'Ayock Point');
    cy.get('table')
      .find('td')
      .eq(1)
      .should('contain', 'August 4th, 2023 at 7:50 AM');
    cy.get('table')
      .find('td')
      .eq(3)
      .click();
    cy.get('table')
      .find('td')
      .eq(3)
      .click();
    cy.get('table')
      .find('td')
      .eq(3)
      .click();
    cy.get('.saved-tides-page').contains(
      '.no-tides',
      'You have no saved tides!'
    );
  });
});
