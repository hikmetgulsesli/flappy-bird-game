import { Helmet } from 'react-helmet-async';

export function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - AIToolPeak</title>
        <meta name="description" content="AIToolPeak Privacy Policy - Learn how we collect, use, and protect your personal information." />
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 py-16 lg:py-24">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-[--text-muted] mb-6">
            Last updated: March 1, 2026
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
          <p className="mb-4">
            At AIToolPeak, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you visit our website.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Google AdSense and Cookies</h2>
          <p className="mb-4">
            We use Google AdSense to display advertisements on our website. Google uses cookies to 
            serve ads based on your prior visits to our site or other sites on the internet.
          </p>
          <p className="mb-4">
            <strong>Google Cookie (DoubleClick):</strong> Google uses the DoubleClick cookie to enable 
            Google and its partners to serve ads based on your visit to our sites and/or other sites 
            on the internet. You may opt out of the use of the DoubleClick cookie for interest-based 
            advertising by visiting the <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-[--primary] hover:underline">Google Ads Settings</a>.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
          <p className="mb-4">
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Contact us through our contact form</li>
            <li>Subscribe to our newsletter</li>
            <li>Leave comments on articles</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
          <p className="mb-4">
            We may use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Personalize your experience</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational security measures to protect your 
            personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Privacy Policies</h2>
          <p className="mb-4">
            This Privacy Policy applies only to our website. Our website may contain links to other 
            sites that are not operated by us. We have no control over, and assume no responsibility 
            for, the content, privacy policies, or practices of any third-party sites.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Opt-Out Options</h2>
          <p className="mb-4">
            You can opt out of personalized advertising from Google by visiting{' '}
            <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-[--primary] hover:underline">
              Google Ads Settings
            </a>. You can also opt out of third-party vendor use of cookies for personalized advertising 
            by visiting <a href="http://www.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-[--primary] hover:underline">
              aboutads.info
            </a>.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes 
            by posting the new Privacy Policy on this page and updating the "last updated" date.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us through our{' '}
            <a href="/contact" className="text-[--primary] hover:underline">Contact page</a>.
          </p>
        </div>
      </div>
    </>
  );
}
