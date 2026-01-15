// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.name) {
            return NextResponse.json(
                { error: 'Name is required' },
                { status: 400 }
            );
        }

        if (!body.email && !body.phone) {
            return NextResponse.json(
                { error: 'Either email or phone is required' },
                { status: 400 }
            );
        }

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: 'White Oak Interior <info@whiteoakinterior.com>',
            to: [process.env.ADMIN_EMAIL || 'info@whiteoakinterior.com'],
            subject: `New Enquiry from ${body.name}`,
            text: `
        Name: ${body.name}
        Email: ${body.email || 'Not provided'}
        Phone: ${body.phone || 'Not provided'}
        Message: ${body.message || 'No message provided'}
      `,
            html: `
        <h2>New Enquiry</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
        ${body.message ? `<p><strong>Message:</strong><br>${body.message}</p>` : ''}
      `,
        });

        if (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }

        // Send thank you email to the requester if email was provided
        if (body.email) {
            const { error: thankYouError } = await resend.emails.send({
                from: 'White Oak Interior <info@whiteoakinterior.com>',
                to: body.email,
                subject: 'Thank you for contacting White Oak Interior',
                text: `Dear ${body.name},\n\nThank you for reaching out to White Oak Interior. We have received your enquiry and our team will get back to you shortly.\n\nBest regards,\nThe White Oak Interior Team`,
                html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Thank you for contacting White Oak Interior!</h2>
        <p>Dear ${body.name},</p>
        <p>We have received your enquiry and our team will review it shortly. We'll get back to you as soon as possible.</p>
        <p>Here's a summary of your enquiry:</p>
        <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #8b5a2b; margin: 15px 0;">
          <p><strong>Name:</strong> ${body.name}</p>
          ${body.phone ? `<p><strong>Phone:</strong> ${body.phone}</p>` : ''}
          ${body.message ? `<p><strong>Your Message:</strong><br>${body.message}</p>` : ''}
        </div>
        <p>If you have any urgent questions, feel free to contact us at info@whiteoakinterior.com or call us at +91 9560885007.</p>
        <p>Best regards,<br>The White Oak Interior Team</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #777;">
          White Oak Interior<br>
          Noida, Uttar Pradesh,<br>
          India<br>
          <a href="https://www.whiteoakinterior.com" style="color: #8b5a2b;">www.whiteoakinterior.com</a>
        </p>
      </div>
    `,
            });
            if (thankYouError) {
                console.error('Error sending thank you email:', thankYouError);
                // Don't throw error for failed thank you email, just log it
            }
        }

        return NextResponse.json(
            { message: 'Enquiry submitted successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error processing enquiry:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}