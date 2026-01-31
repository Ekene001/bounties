import { VerificationStatus } from "@/types/compliance";

interface EmailData {
    to: string;
    subject: string;
    body: string;
}

export class EmailService {
    static async sendVerificationStatusEmail(
        userEmail: string,
        status: VerificationStatus,
        tier?: string,
        reason?: string
    ): Promise<void> {
        const emailData = this.buildVerificationEmail(userEmail, status, tier, reason);
        await this.send(emailData);
    }

    static async sendWithdrawalConfirmation(
        userEmail: string,
        amount: number,
        currency: string,
        withdrawalId: string
    ): Promise<void> {
        const emailData: EmailData = {
            to: userEmail,
            subject: "Withdrawal Confirmation",
            body: `
                <h2>Withdrawal Submitted</h2>
                <p>Your withdrawal of ${amount} ${currency} has been submitted successfully.</p>
                <p><strong>Withdrawal ID:</strong> ${withdrawalId}</p>
                <p>Processing typically takes 1-5 business days.</p>
            `,
        };
        await this.send(emailData);
    }

    static async sendTermsUpdateNotification(
        userEmail: string,
        version: string
    ): Promise<void> {
        const emailData: EmailData = {
            to: userEmail,
            subject: "Terms and Conditions Updated",
            body: `
                <h2>Terms and Conditions Update</h2>
                <p>Our Terms and Conditions have been updated to version ${version}.</p>
                <p>Please review and accept the new terms before your next withdrawal.</p>
                <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/wallet">Review Terms</a></p>
            `,
        };
        await this.send(emailData);
    }

    static async sendAppealConfirmation(
        userEmail: string,
        appealId: string
    ): Promise<void> {
        const emailData: EmailData = {
            to: userEmail,
            subject: "Verification Appeal Received",
            body: `
                <h2>Appeal Received</h2>
                <p>Your verification appeal has been received and is under review.</p>
                <p><strong>Appeal ID:</strong> ${appealId}</p>
                <p>Our team will review your appeal within 3-5 business days.</p>
            `,
        };
        await this.send(emailData);
    }

    private static buildVerificationEmail(
        userEmail: string,
        status: VerificationStatus,
        tier?: string,
        reason?: string
    ): EmailData {
        const templates: Record<VerificationStatus, { subject: string; body: string }> = {
            PENDING: {
                subject: "Verification Request Received",
                body: `
                    <h2>Verification Request Received</h2>
                    <p>We've received your request to upgrade to ${tier} tier.</p>
                    <p>Our team will review your documents within 2-5 business days.</p>
                    <p>You'll receive an email once the review is complete.</p>
                `,
            },
            APPROVED: {
                subject: "Verification Approved!",
                body: `
                    <h2>Congratulations!</h2>
                    <p>Your verification for ${tier} tier has been approved.</p>
                    <p>Your new withdrawal limits are now active.</p>
                    <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/wallet">View Your Limits</a></p>
                `,
            },
            REJECTED: {
                subject: "Verification Update Required",
                body: `
                    <h2>Additional Information Needed</h2>
                    <p>We couldn't complete your verification for ${tier} tier.</p>
                    ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
                    <p>You can submit an appeal or resubmit your documents.</p>
                    <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/wallet">Take Action</a></p>
                `,
            },
            NOT_STARTED: {
                subject: "Start Your Verification",
                body: `
                    <h2>Increase Your Withdrawal Limits</h2>
                    <p>Complete verification to increase your withdrawal limits.</p>
                    <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/wallet">Get Started</a></p>
                `,
            },
        };

        const template = templates[status];
        return {
            to: userEmail,
            subject: template.subject,
            body: template.body,
        };
    }

    private static async send(emailData: EmailData): Promise<void> {
        // In production, integrate with email provider:
        // - SendGrid: await sgMail.send(emailData)
        // - AWS SES: await ses.sendEmail(emailData)
        // - Resend: await resend.emails.send(emailData)

        console.log('[Email Service] Sending email:', {
            to: emailData.to,
            subject: emailData.subject,
        });

        // Mock delay
        await new Promise(resolve => setTimeout(resolve, 100));

        // For development, log the email
        if (process.env.NODE_ENV === 'development') {
            console.log('[Email Preview]:', emailData.body);
        }
    }
}
