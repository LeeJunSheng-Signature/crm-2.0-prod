import { Email } from '../models';
export declare class EmailService {
    constructor();
    sendMail(email: Email): Promise<Object>;
}
