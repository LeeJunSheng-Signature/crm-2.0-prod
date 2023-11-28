export declare enum OrderState {
    OrderConfirmation = "OC",
    FinalConfirmationOrder = "FCO"
}
export declare enum OCStatus {
    New = "New",
    PendingApproval = "Pending for Account or Manager approval",
    Acknowledged = "Acknowledged",
    Rejected = "Rejected"
}
export declare enum FCOStatus {
    FollowUp = "Follow Up",
    Pending = "Pending",
    Submitted = "Submitted",
    PendingDetailer = "Detailer",
    BMRejected = "BM Rejected",
    HQARejected = "HQA Rejected",
    Production = "Production"
}
