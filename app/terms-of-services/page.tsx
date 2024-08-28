export default async function TermsOfService() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Terms of Service
        </h1>
        <p className="text-gray-600 text-sm mb-8 text-center">
          Effective Date: 28-August-2024
        </p>

        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="text-gray-700 mb-6">
          These Terms of Service govern your use of TryAt.ai. By using our
          platform, you agree to these terms.
        </p>

        <h2 className="text-2xl font-semibold mb-4">2. Services Provided</h2>
        <p className="text-gray-700 mb-6">
          TryAt.ai connects users with service providers based on the requests
          made through our platform, including via WhatsApp.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          3. User Responsibilities
        </h2>
        <p className="text-gray-700 mb-4">You agree to:</p>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>
            Provide accurate and complete information when using our services.
          </li>
          <li>
            Use our services in compliance with all applicable laws and
            regulations.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          4. Service Provider Responsibilities
        </h2>
        <p className="text-gray-700 mb-4">Service providers agree to:</p>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>Provide accurate descriptions of the services they offer.</li>
          <li>Deliver services in a professional and timely manner.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          5. Limitation of Liability
        </h2>
        <p className="text-gray-700 mb-6">
          TryAt.ai is not liable for any damages arising from your use of the
          platform, including but not limited to the actions of service
          providers or the quality of services rendered.
        </p>

        <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
        <p className="text-gray-700 mb-6">
          We reserve the right to suspend or terminate your access to TryAt.ai
          if you violate these terms or engage in activities that harm our
          platform or users.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          7. Changes to These Terms
        </h2>
        <p className="text-gray-700 mb-6">
          We may update these Terms of Service from time to time. We will notify
          you of any significant changes by posting the new terms on our
          website.
        </p>

        <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
        <p className="text-gray-700 mb-6">
          These terms are governed by the laws of Telangana, India, and any
          disputes will be resolved in the courts of Hyderabad, Telangana.
        </p>

        <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions or concerns about these Terms of Service,
          please contact us at{' '}
          <a href="mailto:sp@tryat.ai" className="text-blue-600 underline">
            sp@tryat.ai
          </a>
          .
        </p>
      </div>
    </div>
  )
}
