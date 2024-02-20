describe("auth flow spec", () => {
  it("check first page", () => {
    cy.visit("/");
    const githubtext = cy.get(`[cy-test='github-auth-text']`);
    const githublink = cy.get(`[cy-test='github-auth-link']`);
    const guesttext = cy.get(`[cy-test='guest-auth-text']`);
    const guestlink = cy.get(`[cy-test='guest-auth-link']`);

    githubtext.should("exist");
    githublink.should("exist");
    guesttext.should("exist");
    guestlink.should("exist");

    githubtext.then(($value) => expect($value.text(), "Sign in with Github"));
    guesttext.then(($value) => expect($value.text(), "Continue as a Guest"));
  });

  it("check first page", () => {
    cy.visit("/");
    const guestlink = cy.get(`[cy-test='guest-auth-link']`);
    guestlink.click();

    //main page
    const serachbar = cy.get(`[cy-test='searchbar']`);
    serachbar.should("exist");
    const grid = cy.get(`[cy-test='grid']`);
    grid.should("not.exist");

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/");
    });
  });

  it("check first search", () => {
    const users = import("./users.json");

    cy.visit("/oauth?code=__GUEST__");

    cy.intercept("**/search/users**").as(
      "searchUsers"
    );

    const serachbar = cy.get(`[cy-test='searchbar']`);
  });
});
