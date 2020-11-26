const widgetsPage = require("../../../locators/Widgets.json");
const commonlocators = require("../../../locators/commonlocators.json");
const publish = require("../../../locators/publishWidgetspage.json");
const dsl = require("../../../fixtures/tableNewDsl.json");
const pages = require("../../../locators/Pages.json");

describe("Table Widget property pane feature validation", function() {
  before(() => {
    cy.addDsl(dsl);
  });

  it("Check collapse section feature in property pane", function() {
    cy.openPropertyPane("tablewidget");
    //check open and collapse
    cy.get(".t--property-pane-section-collapse-general")
      .first()
      .should("be.visible")
      .click();
    cy.tableDataHide("tabledata");
  });

  it("Check open section and column data in property pane", function() {
    cy.get(".t--property-pane-section-collapse-general")
      .first()
      .should("be.visible")
      .click();
    cy.tableColumnDataValidation("id");
    cy.tableColumnDataValidation("email");
    cy.tableColumnDataValidation("userName");
    cy.tableColumnDataValidation("productName");
    cy.tableColumnDataValidation("orderAmount");
    cy.tableColumnPopertyUpdate("id", "TestUpdated");
    cy.addColumn("CustomColumn");
    cy.tableColumnDataValidation("DERIVED1"); //To be updated later
    cy.hideColumn("email");
    cy.hideColumn("userName");
    cy.hideColumn("productName");
    cy.hideColumn("orderAmount");
    cy.get(".draggable-header:contains('CustomColumn')").should("be.visible");
  });

  it("Update table json data and check the column names updated", function() {
    cy.widgetText("Table1", widgetsPage.tableWidget, commonlocators.tableInner);
    cy.testJsontext("tabledata", JSON.stringify(this.data.TableInput));
    cy.wait("@updateLayout");
    cy.tableColumnDataValidation("id");
    cy.tableColumnDataValidation("email");
    cy.tableColumnDataValidation("userName");
    cy.tableColumnDataValidation("productName");
    cy.tableColumnDataValidation("orderAmount");
    cy.tableColumnDataValidation("DERIVED1"); //To be updated later
    cy.get(".draggable-header ")
      .contains("TestUpdated")
      .should("not.be.visible");
  });

  it("Edit column name and validate test for computed value based on column type selected", function() {
    cy.editColumn("id");
    cy.editColName("updatedId");
    cy.readTabledataPublish("1", "1").then(tabData => {
      const tabValue = tabData;
      expect(tabData).to.not.equal("2736212");
      cy.updateComputedValue("{{currentRow.email}}");
      cy.readTabledataPublish("1", "0").then(tabData => {
        expect(tabData).to.be.equal(tabValue);
        cy.log("computed value of plain text " + tabData);
      });
    });

    cy.changeColumnType("Number");
    cy.readTabledataPublish("1", "4").then(tabData => {
      const tabValue = tabData;
      expect(tabData).to.not.equal("lindsay.ferguson@reqres.in");
      cy.updateComputedValue("{{currentRow.orderAmount}}");
      cy.readTabledataPublish("1", "0").then(tabData => {
        expect(tabData).to.be.equal(tabValue);
        cy.log("computed value of number is " + tabData);
      });
    });

    cy.changeColumnType("Date");
    cy.updateComputedValue("{{moment()}}");
    cy.readTabledataPublish("1", "0").then(tabData => {
      expect(tabData).to.not.equal("9.99");
      cy.log("computed value of Date is " + tabData);
    });

    cy.changeColumnType("Time");
    cy.updateComputedValue("{{moment()}}");
    cy.readTabledataPublish("1", "0").then(tabData => {
      expect(tabData).to.not.equal("2736212");
      cy.log("computed value of time is " + tabData);
    });
  });

  it("Test to validate text allignment", function() {
    cy.get(".t--icon-tab-CENTER")
      .first()
      .click({ force: true });
    cy.readTabledataValidateCSS("1", "0", "justify-content", "center");
    cy.get(".t--icon-tab-RIGHT")
      .first()
      .click({ force: true });
    cy.readTabledataValidateCSS("1", "0", "justify-content", "flex-end");
    cy.get(".t--icon-tab-LEFT")
      .first()
      .click({ force: true });
    cy.readTabledataValidateCSS("1", "0", "justify-content", "flex-start");
  });

  it("Test to validate text format", function() {
    cy.get(".t--button-tab-BOLD").click({ force: true });
    cy.readTabledataValidateCSS("1", "0", "font-weight", "500");
    cy.get(".t--button-tab-ITALIC").click({ force: true });
    cy.readTabledataValidateCSS("1", "0", "font-style", "italic");
  });

  it("Test to validate vertical allignment", function() {
    cy.get(".t--icon-tab-TOP").click({ force: true });
    cy.readTabledataValidateCSS("1", "0", "align-items", "flex-start");
    cy.get(".t--icon-tab-CENTER")
      .last()
      .click({ force: true });
    cy.readTabledataValidateCSS("1", "0", "align-items", "center");
    cy.get(".t--icon-tab-BOTTOM")
      .last()
      .click({ force: true });
    cy.readTabledataValidateCSS("1", "0", "align-items", "flex-end");
  });

  it("Test to validate text color and text background", function() {
    cy.get(".t--property-control-textcolor input")
      .first()
      .click({ force: true });
    cy.xpath("//div[@color='#29CCA3']").click();
    cy.wait(5000);
    cy.wait("@updateLayout");
    cy.readTabledataValidateCSS("1", "0", "color", "rgb(41, 204, 163)");
    cy.get(".t--property-control-textcolor .t--js-toggle").click();
    cy.testCodeMirrorLast("purple");
    cy.wait("@updateLayout");
    cy.readTabledataValidateCSS("1", "0", "color", "rgb(128, 0, 128)");
    cy.get(".t--property-control-cellbackground input")
      .first()
      .click({ force: true });
    cy.xpath("//div[@color='#29CCA3']").click();
    cy.wait("@updateLayout");
    cy.readTabledataValidateCSS(
      "1",
      "0",
      "background",
      "rgb(41, 204, 163) none repeat scroll 0% 0% / auto padding-box border-box",
    );
    cy.get(".t--property-control-cellbackground .t--js-toggle").click();
    cy.testCodeMirrorLast("purple");
    cy.wait("@updateLayout");
    cy.readTabledataValidateCSS(
      "1",
      "0",
      "background",
      "rgb(128, 0, 128) none repeat scroll 0% 0% / auto padding-box border-box",
    );
  });
});
