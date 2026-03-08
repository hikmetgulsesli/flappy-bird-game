import { Helmet } from 'react-helmet-async';

export function Disclaimer() {
  return (
    <>
      <Helmet>
        <title>Disclaimer - AIToolPeak</title>
        <meta name="description" content="AIToolPeak Disclaimer - Important information about the accuracy of our content and affiliate disclosures." />
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 py-16 lg:py-24">
        <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-[--text-muted] mb-6">
            Last updated: March 1, 2026
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Content Accuracy</h2>
          <p className="mb-4">
            The information provided on AIToolPeak is for general informational purposes only. 
            While we strive to keep the information accurate and up-to-date, we make no 
            representations or warranties of any kind, express or implied, about the 
            completeness, accuracy, reliability, suitability, or availability of the 
            information contained on the website.
          </p>
          <p className="mb-4">
            AI tools evolve rapidly, and features, pricing, and capabilities may change 
            after our reviews are published. We recommend verifying current information 
            directly with the tool's official website before making purchasing decisions.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Professional Advice</h2>
          <p className="mb-4">
            The content on AIToolPeak does not constitute professional advice. Any reliance 
            you place on such information is strictly at your own risk. We recommend 
            consulting with qualified professionals for specific advice related to your 
            technical infrastructure, business decisions, or legal matters.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Affiliate Disclosure</h2>
          <p className="mb-4">
            AIToolPeak may contain links to various third-party products and services. 
            <strong> We are not affiliated with, endorsed by, or paid by any of the 
            tool developers or companies mentioned on this website</strong> unless explicitly stated.
          </p>
          <p className="mb-4">
            In the future, we may participate in affiliate programs. If we do, any 
            affiliate links will be clearly marked. However, our reviews and opinions 
            remain independent and based on our actual testing and experience with the tools.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">No Guarantee of Results</h2>
          <p className="mb-4">
            The tools and techniques described on AIToolPeak may not work for everyone. 
            Results vary based on individual circumstances, technical setup, experience 
            level, and other factors. We cannot guarantee that using any particular tool 
            will improve your productivity or code quality.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">External Links</h2>
          <p className="mb-4">
            Our website may contain links to external websites that are not operated by us. 
            We have no control over the content, privacy practices, or accuracy of information 
            on external sites. We are not responsible for the content or practices of any 
            linked websites.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Tool Pricing</h2>
          <p className="mb-4">
            Pricing information for AI tools is based on publicly available data at the 
            time of writing. Prices are subject to change without notice. We recommend 
            checking the official pricing pages of each tool for the most current 
            information.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Testimonials</h2>
          <p className="mb-4">
            Any testimonials or case studies presented on AIToolPeak reflect the genuine 
            experiences of the individuals or organizations quoted. However, individual 
            results may vary. Testimonials are not intended to represent typical results 
            or guarantee similar outcomes.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Updates to This Disclaimer</h2>
          <p className="mb-4">
            We may update this disclaimer from time to time. Any changes will be posted 
            on this page with an updated "last modified" date.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this disclaimer, please contact us through 
            our <a href="/contact" className="text-[--primary] hover:underline">Contact page</a>.
          </p>
        </div>
      </div>
    </>
  );
}
