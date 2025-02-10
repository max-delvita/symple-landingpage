"use client"

import { Navbar } from "@/components/navbar"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="custom-screen py-32">
        <div className="prose prose-invert max-w-4xl mx-auto">
          <h1>Privacy Policy</h1>
          <p className="lead">Last updated: February 9, 2024</p>
          
          <h2>1. Introduction</h2>
          <p>
            At AskSymple ("we," "our," or "us"), we are committed to protecting your privacy and ensuring compliance with the Personal Data Protection Act (PDPA). This Privacy Policy explains how we collect, use, disclose, and protect your personal data when you use our AI-powered email assistant service.
          </p>

          <h2>2. Personal Data Collection</h2>
          <p>We collect the following types of personal data:</p>
          <h3>2.1 Information You Provide Directly</h3>
          <ul>
            <li>Name and contact information</li>
            <li>Email content and attachments</li>
            <li>Calendar information and scheduling preferences</li>
            <li>Account credentials and authentication details</li>
            <li>User preferences and settings</li>
            <li>Any other information you choose to provide through our service</li>
          </ul>

          <h3>2.2 Automatically Collected Information</h3>
          <ul>
            <li>Device information and identifiers</li>
            <li>Usage patterns and service interactions</li>
            <li>Performance data and error reports</li>
            <li>IP address and location data</li>
            <li>Browser type and settings</li>
          </ul>

          <h2>3. Purpose of Data Collection</h2>
          <p>We collect and use your personal data for the following purposes:</p>
          <ul>
            <li>To provide and operate our AI assistant services</li>
            <li>To personalize and improve your user experience</li>
            <li>To process and analyze your emails and calendar</li>
            <li>To communicate with you about our service</li>
            <li>To maintain and enhance our service security</li>
            <li>To comply with legal obligations</li>
            <li>To detect and prevent fraud or abuse</li>
          </ul>

          <h2>4. Consent</h2>
          <p>
            By using our service and providing your personal data, you consent to the collection, use, and disclosure of your information as described in this Privacy Policy. You may withdraw your consent at any time by contacting us, though this may affect our ability to provide certain services to you.
          </p>

          <h2>5. Use of Personal Data</h2>
          <p>Your personal data is used to:</p>
          <ul>
            <li>Process and respond to your requests and inquiries</li>
            <li>Provide AI-assisted email and calendar management</li>
            <li>Analyze and improve our service performance</li>
            <li>Send service-related communications</li>
            <li>Maintain the security of our platform</li>
            <li>Generate aggregated analytics and insights</li>
          </ul>

          <h2>6. Disclosure of Personal Data</h2>
          <p>
            We may share your personal data with:
          </p>
          <ul>
            <li>Service providers who assist in operating our service (subject to appropriate data protection agreements)</li>
            <li>Analytics providers to improve our service</li>
            <li>Law enforcement when required by law</li>
            <li>Third parties with your explicit consent</li>
          </ul>
          <p>
            We ensure that any third parties who receive your data are bound by appropriate confidentiality and data protection obligations.
          </p>

          <h2>7. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal data, including:
          </p>
          <ul>
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and audits</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Secure data storage and processing practices</li>
            <li>Regular security updates and monitoring</li>
            <li>Employee training on data protection</li>
          </ul>

          <h2>8. Data Retention</h2>
          <p>
            We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable laws and regulations. The criteria used to determine our retention periods include:
          </p>
          <ul>
            <li>The duration of your active use of our service</li>
            <li>Legal obligations and regulatory requirements</li>
            <li>Applicable statute of limitations</li>
            <li>Resolution of disputes or complaints</li>
          </ul>

          <h2>9. Your Rights</h2>
          <p>
            Under the PDPA, you have the following rights regarding your personal data:
          </p>
          <ul>
            <li>Right to access your personal data</li>
            <li>Right to correct inaccurate or incomplete data</li>
            <li>Right to withdraw consent for data processing</li>
            <li>Right to request deletion of your data</li>
            <li>Right to data portability</li>
            <li>Right to object to certain data processing</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the information provided below.
          </p>

          <h2>10. Contact Information</h2>
          <p>
            If you have any questions about this Privacy Policy, your personal data, or wish to exercise your rights under the PDPA, please contact us:
          </p>
          <ul>
            <li>By email: <a href="mailto:amy@asksymple.ai">amy@asksymple.ai</a></li>
            <li>Data Protection Officer: <a href="mailto:dpo@asksymple.ai">dpo@asksymple.ai</a></li>
          </ul>

          <h2>11. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </div>
      </div>
    </div>
  )
} 