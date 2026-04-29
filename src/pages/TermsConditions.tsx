import Layout from "@/components/Layout";

const TermsConditions = () => {
  return (
    <Layout 
      title="Terms & Conditions" 
      description="Read the terms and conditions for using Edunachal's services."
    >
      <div className="container pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-gradient mb-8 text-center">Terms & Conditions</h1>
          
          <div className="premium-panel ring-grad rounded-[2rem] p-8 md:p-12 shadow-soft prose prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground max-w-none">
            <p className="lead">
              Welcome to Edunachal, a platform operated by Tekhlym Pvt. Ltd., a DPIIT-recognized startup headquartered in Noida, India. By accessing or using our website, mobile app, or any of our services, you agree to abide by the following Terms and Conditions.
            </p>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4">1. Use of Services</h2>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li>Our courses and services are intended solely for personal, non-commercial use.</li>
                <li>You must provide accurate and complete information during registration.</li>
                <li>You agree not to misuse the platform for any unlawful or unauthorized activity.</li>
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-4">2. Course Pricing</h2>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li>Edunachal offers a wide range of courses starting from ₹99 to ₹99,000, depending on the type and duration of the program.</li>
                <li>All prices are listed in INR and are inclusive of applicable taxes unless stated otherwise.</li>
                <li>We reserve the right to modify pricing at any time without prior notice.</li>
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-4">3. Payment Terms</h2>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li>Payment must be made in full at the time of enrollment.</li>
                <li>We accept secure online payments via UPI, debit/credit cards, and net banking through authorized payment gateways.</li>
                <li>Edunachal is not responsible for any additional transaction charges levied by your bank or payment provider.</li>
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-4">4. Refund Policy</h2>
              <p>We believe in delivering value and satisfaction. If you're not satisfied with your purchase:</p>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li>You may request a refund within 3 days from the date of purchase.</li>
                <li>To initiate a refund, email edunachalofficial@gmail.com with your order details and reason for the refund.</li>
                <li>Refunds will be processed within 7–10 business days to the original payment method.</li>
                <li>No refund will be provided after 3 days of purchase or if significant course content (e.g., 25% or more) has already been accessed or downloaded.</li>
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li>All content on the Edunachal platform — including videos, study material, tests, and branding — is the exclusive property of Tekhlym Pvt. Ltd.</li>
                <li>You may not reproduce, distribute, or share any course material without prior written permission.</li>
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-4">6. Account Suspension</h2>
              <p>Edunachal reserves the right to suspend or terminate user accounts for:</p>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li>Misuse or violation of platform rules</li>
                <li>Plagiarism or content theft</li>
                <li>Sharing login credentials with others</li>
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
              <p>
                While we strive to offer high-quality educational content, Edunachal does not guarantee success in any examination. We are not liable for any direct or indirect losses incurred through the use of our platform.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-4">8. Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the jurisdiction of the courts in Noida, Uttar Pradesh.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
              <p>For any questions or support related to our terms, please contact:</p>
              <address className="not-italic text-muted-foreground mt-2">
                Email: <a href="mailto:edunachalofficial@gmail.com" className="text-primary hover:underline">edunachalofficial@gmail.com</a><br />
                Phone: +91 7628928150<br />
                Address: Tekhlym Pvt. Ltd., T 06, B - 10 Sector - 2 Noida india
              </address>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsConditions;
