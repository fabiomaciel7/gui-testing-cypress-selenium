describe('countries', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('[id="_username"]').type('sylius');
    cy.get('[id="_password"]').type('sylius');
    cy.get('.primary').click();
  });
  // Remove .only and implement others test cases!
  it('add and remove province in United Kingdom', () => {
    // Click in countries in side menu
    cy.clickInFirst('a[href="/admin/countries/"]');
    // Select only enabled countries
    cy.get('[id="criteria_enabled"]').select('Yes');
    // Type to search a specify country
    cy.get('[id="criteria_code_value"]').type('GB');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in edit of the last country
    cy.get('*[class^="ui labeled icon button "]').last().click();
    // Click in add province to button
    cy.get('.ui > .ui > .required > #sylius_country_provinces > .ui').click();
    // Filling data of provinces
    cy.get('[id="sylius_country_provinces_0_code"]').type('GG-GG');
    cy.get('[id="sylius_country_provinces_0_name"]').type('Gerson');
    cy.get('[id="sylius_country_provinces_0_abbreviation"]').type('Gege');

    // Click on Save changes button
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    // Assert that country has been updated
    cy.get('body').should('contain', 'Country has been successfully updated.');

    // Click on Delete button
    cy.get('.required > #sylius_country_provinces > div > div > .red').click();
    // Click on Save changes button
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    // Assert that country has been updated
    cy.get('body').should('contain', 'Country has been successfully updated.');
  });

  it('Muda o valor de Enable para Espanha', () => {
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get('[id="criteria_code_value"]').type('ES');
    cy.get('*[class^="ui labeled icon button "]').last().click();
    cy.get('label[for="sylius_country_enabled"]').click();
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    cy.get('body').should('contain', 'Country has been successfully updated.');
  });

  it('Adiciona província nos Estados Unidos', () => {
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get('[id="criteria_enabled"]').select('Yes');
    cy.get('[id="criteria_code_value"]').type('US');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('*[class^="ui labeled icon button "]').last().click();
    cy.get('.ui > .ui > .required > #sylius_country_provinces > .ui').click();
    cy.get('[id="sylius_country_provinces_0_code"]').type('NY-NY');
    cy.get('[id="sylius_country_provinces_0_name"]').type('New York');
    cy.get('[id="sylius_country_provinces_0_abbreviation"]').type('Ny');
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    cy.get('body').should('contain', 'Country has been successfully updated.');
  });

  it('Exclui província nos Estados Unidos', () => {
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get('[id="criteria_enabled"]').select('Yes');
    cy.get('[id="criteria_code_value"]').type('US');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('*[class^="ui labeled icon button "]').last().click();
    cy.get('.required > #sylius_country_provinces > div > div > .red').click();
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    cy.get('body').should('contain', 'Country has been successfully updated.');
  });
  
  it('Cria um novo país com o enable ativado', () => {
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get('*[class^="ui right floated buttons"]').click();
    cy.get('*[class^="ui buttons"]').first().click();
    cy.contains('Country has been successfully created.').should('exist');
  });

  it('Cria um novo país com o enable desativado', () => {
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get('*[class^="ui right floated buttons"]').click();
    cy.get('label[for="sylius_country_enabled"]').click();
    cy.get('*[class^="ui buttons"]').first().click();
    cy.contains('Country has been successfully created.').should('exist');
  });

  it('Tenta adicionar província sem nome em Portugal', () => {
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get('[id="criteria_enabled"]').select('All');
    cy.get('[id="criteria_code_value"]').type('PT');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('*[class^="ui labeled icon button "]').last().click();
    cy.get('.ui > .ui > .required > #sylius_country_provinces > .ui').click();
    cy.get('[id="sylius_country_provinces_0_code"]').type('BE-BE');
    cy.get('[id="sylius_country_provinces_0_name"]').clear();
    cy.get('[id="sylius_country_provinces_0_abbreviation"]').type('Be');
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    cy.get('body').should('contain', 'This form contains errors.');
  });

  it('Tenta adicionar província com código inválido em Portugal', () => {
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get('[id="criteria_enabled"]').select('All');
    cy.get('[id="criteria_code_value"]').type('PT');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('*[class^="ui labeled icon button "]').last().click();
    cy.get('.ui > .ui > .required > #sylius_country_provinces > .ui').click();
    cy.get('[id="sylius_country_provinces_0_code"]').type('ABC');
    cy.get('[id="sylius_country_provinces_0_name"]').type('Benfica');
    cy.get('[id="sylius_country_provinces_0_abbreviation"]').type('Be');
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    cy.get('body').should('contain', 'This form contains errors.');
  });

  it('Tenta adicionar província com letras minúsculas', () => {
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get('[id="criteria_code_value"]').type('GB');
    cy.get('[id="criteria_enabled"]').select('All');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('*[class^="ui labeled icon button "]').last().click();
    cy.get('.ui > .ui > .required > #sylius_country_provinces > .ui').click();
    cy.get('[id="sylius_country_provinces_0_code"]').type('ld-ld');
    cy.get('[id="sylius_country_provinces_0_name"]').type('London');
    cy.get('[id="sylius_country_provinces_0_abbreviation"]').type('Ld');
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    cy.get('body').should('contain', 'This form contains errors.');
  });

  it('Adiciona província sem código', () => {
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get('[id="criteria_enabled"]').select('All');
    cy.get('[id="criteria_code_value"]').type('PT');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('*[class^="ui labeled icon button "]').last().click();
    cy.get('.ui > .ui > .required > #sylius_country_provinces > .ui').click();
    cy.get('[id="sylius_country_provinces_0_code"]').clear();
    cy.get('[id="sylius_country_provinces_0_name"]').type('Porto');
    cy.get('[id="sylius_country_provinces_0_abbreviation"]').type('Po');
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    cy.get('body').should('contain', 'This form contains errors.');
  });

});
