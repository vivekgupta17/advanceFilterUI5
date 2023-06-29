sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, Fragment) {
        "use strict";

        return Controller.extend("com.sap.assessmentui5.controller.View1", {
            onInit: function () {
                var detailModel = this.getOwnerComponent().getModel("detailModel");
                this.detailModel= detailModel;
                debugger
            },
            handleToggleSecondaryContent: function (oEvent) {
                this.byId("mySplitContainer").setOrientation("Vertical");
                var oSplitContainer = this.byId("mySplitContainer");
                oSplitContainer.setShowSecondaryContent(!oSplitContainer.getShowSecondaryContent());
            },
            onSearchClick: function () {
                
                var aFilter = [];
                var id = this.getView().byId("idId").getValue();
                var name = this.getView().byId("idName").getValue();
                var desc = this.getView().byId("idDesc").getValue();
                var rel = this.getView().byId("idRel").getValue();
                var price = this.getView().byId("idPrice").getValue();
                if (id) {
                    aFilter.push(new Filter("ID", FilterOperator.Contains, id));
                }
                if (name) {
                    aFilter.push(new Filter("Name", FilterOperator.Contains, name));
                }
                if (desc) {
                    aFilter.push(new Filter("Description", FilterOperator.Contains, desc));
                }
                if (rel) {
                    aFilter.push(new Filter("ReleaseDate", FilterOperator.Contains, rel));
                }
                if (price) {
                    aFilter.push(new Filter("Price", FilterOperator.Contains, price));
                }

                var oTable = this.getView().byId("idOdataTable");
                var oBinding = oTable.getBinding("items");
                oBinding.filter(aFilter);
            },
            onReset: function () {

                this.getView().byId("idId").setValue("");
                this.getView().byId("idName").setValue("");
                this.getView().byId("idDesc").setValue("");
                this.getView().byId("idRel").setValue("");
                this.getView().byId("idPrice").setValue("");

                // var hidetable = this.getView().byId("idOdataTable");
                // hidetable.setVisible(false);
            },

            handleRowClick: function (oEvent) {
                var detailModel = this.detailModel;
                var oRowContext = oEvent.getSource().getBindingContext().getObject();
                detailModel.setProperty("/detailinfo",oRowContext);
                this.fragmentCall();
            },

            fragmentCall: function () {
                var oView = this.getView();
                var that = this;
                if (!this._odetail) {
                    this._odetail = Fragment.load({
                        id: oView.getId(),
                        name: "com.sap.assessmentui5.fragments.showData",
                        controller: this
                    }).then(function (oDialog1) {
                        oView.addDependent(oDialog1);
                        return oDialog1;
                    });
                }
                this._odetail.then(function(oDialog1) {
                    oDialog1.open();
                });
            },
            onCloseFragment: function () {
                this.byId("dialogId").close();
            }
        });
    });