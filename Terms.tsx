import { Helmet } from 'react-helmet-async';

export function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service - AIToolPeak</title>
        <meta name="description" content="AIToolPeak Terms of Service - Read our terms and conditions for using our website." />
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 py-16 lg:py-24">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-[--text-muted] mb-6">
            Last updated: March 1, 2026
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using AIToolPeak, you accept and agree to be bound by the terms and 
            provisions of this agreement.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Use License</h2>
          <p className="mb-4">
            Permission is granted to temporarily use AIToolPeak for personal, non-commercial use only. 
            This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or public display</li>
            <li>Transfer the materials to another person or entity</li>
            <li>Attempt to reverse engineer any software contained on the website</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">User Content</h2>
          <p className="mb-4">
            You are responsible for any content you submit to AIToolPeak, including comments and 
            contact form submissions. You agree that your content will not:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on any intellectual property rights</li>
            <li>Contain harmful, threatening, or malicious content</li>
            <li>Contain spam or promotional material</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Disclaimer</h2>
          <p className="mb-4">
            The materials on AIToolPeak are provided on an 'as is' basis. AIToolPeak makes no 
            warranties, expressed or implied, and hereby disclaims and negates all other warranties 
            including, without limitation, implied warranties or conditions of merchantability, 
            fitness for a particular purpose, or non-infringement of intellectual property.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Limitations</h2>
          <p className="mb-4">
            In no event shall AIToolPeak or its suppliers be liable for any damages (including, 
            without limitation, damages for loss of data or profit, or due to business interruption) 
            arising out of the use or inability to use the materials on AIToolPeak.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Links to Third-Party Sites</h2>
          <p className="mb-4">
            AIToolPeak may contain links to third-party websites. These links are provided for 
            convenience only. We have no control over the content of linked sites and accept no 
            responsibility for them.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Modifications</h2>
          <p className="mb-4">
            AIToolPeak may revise these terms of service at any time without notice. By using this 
            website, you agree to be bound by the current version of these terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Governing Law</h2>
          <p className="mb-4">
            These terms and conditions are governed by and construed in accordance with applicable 
            laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </div>
      </div>
    </>
  );
}
