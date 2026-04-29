import Layout from "@/components/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout 
      title="Privacy Policy" 
      description="At Edunachal, we are committed to protecting your privacy. Learn how we handle your personal information."
    >
      <div className="container pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-gradient mb-8 text-center">Privacy Policy</h1>
          
          <div className="premium-panel ring-grad rounded-[2rem] p-8 md:p-12 shadow-soft prose prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground max-w-none">
            <p className="lead">
              At Edunachal, a venture of Tekhlym Pvt. Ltd. (a DPIIT-recognized startup), we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you visit our website, use our services, or interact with us.
            </p>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li><strong className="text-foreground">Personal Information:</strong> Name, email, phone number, address, date of birth, educational details, etc.</li>
                <li><strong className="text-foreground">Usage Data:</strong> IP address, browser type, device information, pages visited, and interactions on our website.</li>
                <li><strong className="text-foreground">Payment Information:</strong> When you make a purchase, your billing details and transaction information may be collected via secure third-party gateways.</li>
                <li><strong className="text-foreground">Cookies:</strong> We use cookies and similar technologies to improve user experience and analyze traffic.</li>
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p>We use the information to:</p>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li>Provide and improve our educational services</li>
                <li>Communicate with you (via email, SMS, or WhatsApp)</li>
                <li>Personalize your learning experience</li>
                <li>Process payments and transactions</li>
                <li>Send newsletters, updates, and promotional content</li>
                <li>Ensure website security and prevent fraud</li>
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-4">3. Sharing of Information</h2>
              <p>We do not sell your personal data. However, we may share it with:</p>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li>Trusted third-party service providers (for hosting, analytics, payments, etc.)</li>
                <li>Government or legal authorities when required by law</li>
                <li>Affiliates or partners with whom we jointly offer services</li>
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p>
                We follow industry-standard practices to protect your personal data. However, no system can be 100% secure. You use our platform at your own risk.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li>Access, update, or delete your personal information</li>
                <li>Opt out of marketing emails</li>
                <li>Request data portability or raise concerns by contacting us at edunachalofficial@gmail.com</li>
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-4">6. Third-Party Links</h2>
              <p>
                Our platform may contain links to external websites. We are not responsible for their content or privacy practices.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-4">7. Updates to This Policy</h2>
              <p>
                We may update this policy from time to time. Changes will be posted on this page with the updated date.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
              <p>For questions, concerns, or requests related to this policy, contact us at:</p>
              <address className="not-italic text-muted-foreground mt-2">
                Email: <a href="mailto:edunachalofficial@gmail.com" className="text-primary hover:underline">edunachalofficial@gmail.com</a><br />
                Address: Tekhlym Pvt. Ltd., T 06, B - 10 Sector - 2 Noida india
              </address>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
