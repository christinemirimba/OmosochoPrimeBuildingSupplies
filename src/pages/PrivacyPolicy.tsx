import { Helmet } from 'react-helmet-async';
import FadeInSection from '@/components/FadeInSection';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Omosocho Prime Building Supplies</title>
        <meta name="description" content="Privacy Policy for Omosocho Prime Building Supplies - Learn how we collect, use, and protect your personal information." />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-heading font-bold mb-8">Privacy Policy</h1>
              <p className="text-muted-foreground mb-8">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>

              <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">1. Introduction</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Omosocho Prime Building Supplies ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">2. Information We Collect</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We may collect information about you in various ways, including:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li><strong>Personal Data:</strong> Name, email address, phone number, and mailing address when you contact us or make inquiries.</li>
                    <li><strong>Project Information:</strong> Details about your construction projects when using our planning tools.</li>
                    <li><strong>Usage Data:</strong> Information about how you use our website, including browsing patterns and preferences.</li>
                    <li><strong>Device Information:</strong> Information about the device you use to access our website.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">3. How We Use Your Information</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Provide, operate, and maintain our website and services</li>
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Process your orders and deliver materials</li>
                    <li>Send you updates about our products and services</li>
                    <li>Improve our website and services based on your feedback</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">4. Information Sharing</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with trusted service providers who assist us in operating our website, conducting our business, or servicing you, provided they agree to keep this information confidential.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">5. Data Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">6. Cookies and Tracking</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our website may use cookies and similar tracking technologies to enhance your experience. You can set your browser to refuse all or some browser cookies, but this may affect some features of our website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">7. Your Rights</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt out of marketing communications</li>
                    <li>Lodge a complaint with relevant data protection authorities</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">8. Children's Privacy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our website is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">9. Changes to This Policy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date. You are advised to review this privacy policy periodically for any changes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">10. Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have questions about this Privacy Policy, please contact us:
                  </p>
                  <div className="mt-4 bg-secondary rounded-lg p-6">
                    <p className="font-semibold">Omosocho Prime Building Supplies</p>
                    <p className="text-muted-foreground">Kisii, Nyamache - Kenya</p>
                    <p className="text-muted-foreground">Phone: +254705621054</p>
                    <p className="text-muted-foreground">Email: nikeombura@gmail.com</p>
                  </div>
                </section>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
