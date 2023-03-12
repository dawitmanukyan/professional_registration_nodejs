const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }
    async sendactivation(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account activation Haylance',
            text: '',
            html: `
                <div>
                    <h1>For activation</h1>
                    <a href="${link}">${link}</a>
                    <img src="./Ha.png" />
                </div>
            `
        })
    }
}

module.exports = new EmailService();