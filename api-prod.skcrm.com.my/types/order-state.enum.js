"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FCOStatus = exports.OCStatus = exports.OrderState = void 0;
var OrderState;
(function (OrderState) {
    OrderState["OrderConfirmation"] = "OC";
    OrderState["FinalConfirmationOrder"] = "FCO";
})(OrderState = exports.OrderState || (exports.OrderState = {}));
var OCStatus;
(function (OCStatus) {
    OCStatus["New"] = "New";
    OCStatus["PendingApproval"] = "Pending for Account or Manager approval";
    OCStatus["Acknowledged"] = "Acknowledged";
    OCStatus["Rejected"] = "Rejected";
})(OCStatus = exports.OCStatus || (exports.OCStatus = {}));
// Which roles see & what they see
var FCOStatus;
(function (FCOStatus) {
    FCOStatus["FollowUp"] = "Follow Up";
    FCOStatus["Pending"] = "Pending";
    FCOStatus["Submitted"] = "Submitted";
    FCOStatus["PendingDetailer"] = "Detailer";
    FCOStatus["BMRejected"] = "BM Rejected";
    FCOStatus["HQARejected"] = "HQA Rejected";
    FCOStatus["Production"] = "Production";
})(FCOStatus = exports.FCOStatus || (exports.FCOStatus = {}));
//# sourceMappingURL=order-state.enum.js.map