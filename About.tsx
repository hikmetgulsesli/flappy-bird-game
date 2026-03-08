import { Helmet } from 'react-helmet-async';
import { Layout } from '../components/layout/Layout.js';
import { SEOHead } from '../components/seo/SEOHead.js';

export function About() {
  return (
    <>
      <SEOHead
        title="About"
        description="Learn about AIToolPeak - your trusted source for AI tools reviews and comparisons. Our expert team tests and reviews the latest AI coding assistants and tools."
        canonical="/about"
      />
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16 lg:py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[--text]" style={{ fontFamily: 'var(--font-heading)' }}>
            About AIToolPeak
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-[--text-secondary] mb-8 leading-relaxed">
              Your trusted source for unbiased AI tools reviews and comparisons for developers.
            </p>

            {/* Author Bio Section */}
            <section className="mb-12 p-8 bg-[--surface] rounded-xl border border-[--border]">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-24 h-24 rounded-full bg-[--primary]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl font-bold text-[--primary]">H</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-[--text]" style={{ fontFamily: 'var(--font-heading)' }}>
                    Hikmet Gulsesli
                  </h2>
                  <p className="text-[--text-secondary] mb-4">
                    Founder & Chief Reviewer at AIToolPeak
                  </p>
                  <p className="text-[--text-secondary]">
                    Software engineer and AI enthusiast with over a decade of experience in full-stack development, 
                    DevOps, and AI/ML integration. Based in Istanbul, Turkey.
                  </p>
                </div>
              </div>
            </section>

            <h2 className="text-2xl font-semibold mt-12 mb-4 text-[--text]" style={{ fontFamily: 'var(--font-heading)' }}>Our Mission</h2>
            <p className="mb-6 text-[--text-secondary] leading-relaxed">
              At AIToolPeak, we believe that finding the right AI tools for your development workflow 
              shouldn't be a guessing game. Our mission is to provide comprehensive, hands-on reviews 
              and comparisons of AI tools to help developers make informed decisions.
            </p>

            {/* E-E-A-T Section - Experience */}
            <h2 className="text-2xl font-semibold mt-12 mb-4 text-[--text]" style={{ fontFamily: 'var(--font-heading)' }}>Experience</h2>
            <p className="mb-4 text-[--text-secondary] leading-relaxed">
              Our team has years of hands-on experience using AI tools in real-world development 
              environments. We don't just read documentation—we test each tool extensively in 
              production scenarios.
            </p>
            
            <div className="p-6 bg-[--surface] rounded-xl border border-[--border] mb-8">
              <h3 className="text-lg font-semibold mb-4 text-[--text]">Real Infrastructure for Real Testing</h3>
              <p className="text-[--text-secondary] mb-4">
                Unlike other review sites that test in sandboxes, all our AI tool reviews are based on 
                <strong> real production usage</strong>. Here's what powers our testing infrastructure:
              </p>
              <ul className="space-y-3 text-[--text-secondary]">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[--primary] mt-2 flex-shrink-0"></span>
                  <span><strong>HP EliteDesk 800 G2 Mini</strong> — Intel Core i5-6500T, 20GB RAM, 256GB SSD</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[--primary] mt-2 flex-shrink-0"></span>
                  <span><strong>OpenClaw</strong> — AI assistant orchestration platform running 10+ AI agents</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[--primary] mt-2 flex-shrink-0"></span>
                  <span><strong>Setfarm</strong> — Multi-agent workflow system for automated testing and deployment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[--primary] mt-2 flex-shrink-0"></span>
                  <span><strong>23+ production web applications</strong> — Managed and monitored by AI agents</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[--primary] mt-2 flex-shrink-0"></span>
                  <span><strong>Cloudflare Tunnel</strong> — Exposing services at aitoolpeak.setrox.com.tr</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold mt-12 mb-4 text-[--text]" style={{ fontFamily: 'var(--font-heading)' }}>Expertise</h2>
            <p className="mb-4 text-[--text-secondary] leading-relaxed">
              Our reviewers come from diverse backgrounds in software engineering, machine learning, 
              and DevOps. We have experience with:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-[--text-secondary]">
              <li>JavaScript/TypeScript, Python, Rust, Go, and more</li>
              <li>Cloud platforms (AWS, GCP, Azure)</li>
              <li>Containerization and orchestration (Docker, Kubernetes)</li>
              <li>LLM fine-tuning and deployment</li>
              <li>Terminal-based AI tools and IDE integrations</li>
              <li>AI API integration (OpenAI, Anthropic, Google, DeepSeek, Kimi, MiniMax)</li>
            </ul>

            {/* E-E-A-T Section - Authoritativeness */}
            <h2 className="text-2xl font-semibold mt-12 mb-4 text-[--text]" style={{ fontFamily: 'var(--font-heading)' }}>Authoritativeness</h2>
            <p className="mb-4 text-[--text-secondary] leading-relaxed">
              AIToolPeak is recognized in the developer community for:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-[--text-secondary]">
              <li>Detailed, technical reviews based on actual usage</li>
              <li>Fair comparisons with consistent testing methodologies</li>
              <li>Regular updates as tools evolve</li>
              <li>Transparent methodology and testing criteria</li>
              <li>No paid reviews—we test and report honestly</li>
            </ul>

            {/* E-E-A-T Section - Trustworthiness */}
            <h2 className="text-2xl font-semibold mt-12 mb-4 text-[--text]" style={{ fontFamily: 'var(--font-heading)' }}>Trustworthiness</h2>
            <p className="mb-4 text-[--text-secondary] leading-relaxed">
              We maintain trust through:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-[--text-secondary]">
              <li>Honest pros and cons for every tool we review</li>
              <li>No affiliate links that could bias our recommendations</li>
              <li>Clear disclosure of our testing methodology</li>
              <li>Prompt responses to reader questions and feedback</li>
              <li>Regular updates when tools release major versions</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-12 mb-4 text-[--text]" style={{ fontFamily: 'var(--font-heading)' }}>Our Review Process</h2>
            <p className="mb-4 text-[--text-secondary] leading-relaxed">
              Each tool undergoes rigorous hands-on testing:
            </p>
            <ol className="list-decimal pl-6 mb-6 space-y-3 text-[--text-secondary]">
              <li><strong className="text-[--text]">Installation & Setup</strong> — We test the installation process on multiple platforms</li>
              <li><strong className="text-[--text]">Core Functionality</strong> — We use the tool in real development scenarios</li>
              <li><strong className="text-[--text]">Performance</strong> — We measure response times, resource usage, and accuracy</li>
              <li><strong className="text-[--text]">Integration</strong> — We test integration with popular IDEs, editors, and workflows</li>
              <li><strong className="text-[--text]">Pricing</strong> — We analyze cost structures and value for money</li>
            </ol>

            <h2 className="text-2xl font-semibold mt-12 mb-4 text-[--text]" style={{ fontFamily: 'var(--font-heading)' }}>Contact Us</h2>
            <p className="mb-4 text-[--text-secondary] leading-relaxed">
              Have questions about our reviews or want to suggest a tool for review? 
              We'd love to hear from you.
            </p>
            <a 
              href="/contact" 
              className="inline-block px-6 py-3 bg-[--primary] text-white rounded-lg hover:bg-[--primary-hover] transition-colors cursor-pointer"
            >
              Contact Us
            </a>
          </div>
        </div>
      </Layout>
    </>
  );
}
