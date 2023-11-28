"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const nodemailer = tslib_1.__importStar(require("nodemailer"));
let EmailService = class EmailService {
    constructor() { }
    async sendMail(email) {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            // secure: Boolean(process.env.SMTP_SECURE),
            port: Number(process.env.SMTP_PORT),
            tls: {
                rejectUnauthorized: false,
            },
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        /* comment a while due to error when creating new lead */
        return transporter.sendMail({
            from: process.env.SMTP_USERNAME,
            to: email.to,
            cc: 'corneliuspang@signaturegroup.com.my; asyrafahmad@signaturegroup.com.my; ruiwenng@signaturegroup.com.my; fauzihashim@signaturegroup.com.my;athirahiskandar@signaturegroup.com.my',
            subject: email.subject,
            html: email.content,
        });
        return transporter;
    }
};
EmailService = tslib_1.__decorate([
    core_1.bind({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map