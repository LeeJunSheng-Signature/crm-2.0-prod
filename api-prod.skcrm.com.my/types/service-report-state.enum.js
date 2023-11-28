"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceReportState = void 0;
var ServiceReportState;
(function (ServiceReportState) {
    // Upon creation of service report/report maintenance but haven't submitted
    // to detailer
    ServiceReportState["New"] = "New";
    // Upon sales consultant submission to detailer
    ServiceReportState["Detailer"] = "Detailer";
    // Detailer tick Purchaser and Logistic upon submission
    ServiceReportState["Purchaser"] = "Purchaser";
    // Purchaser has clicked on "complete" button, OR
    // Factory has clicked on "complete" button
    ServiceReportState["Logistic"] = "Logistic";
    // Detailer tick Factory and Logistic upon submission
    ServiceReportState["Production"] = "Production";
    // Detailer click "rejected"
    ServiceReportState["Rejected"] = "Rejected";
    // Logistic to Closed when logistic has clicked on "complete" button
    ServiceReportState["Closed"] = "Closed";
})(ServiceReportState = exports.ServiceReportState || (exports.ServiceReportState = {}));
//# sourceMappingURL=service-report-state.enum.js.map