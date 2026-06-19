/**
 * Simple Mock Email Service to satisfy the parent communication requirement.
 * In production, this would use Resend, SendGrid, or Nodemailer.
 */

export const sendEmail = async (to: string, subject: string, text: string): Promise<boolean> => {
  try {
    console.log("=========================================");
    console.log(`📧 MOCK EMAIL SENT TO: ${to}`);
    console.log(`📋 SUBJECT: ${subject}`);
    console.log(`📝 BODY:\n${text}`);
    console.log("=========================================");
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
};
