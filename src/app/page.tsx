import Link from "next/link";
import { ArrowRight, MessageSquare, Mail, Phone, Users, BarChart, CreditCard } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm fixed top-0 w-full z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Phone className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">Callmaker24</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            All-in-One Marketing
            <span className="text-primary-600"> & CRM Platform</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your business with Email & SMS Marketing, AI-Powered Chatbot, 
            IVR System, and comprehensive CRM - all in one powerful platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold transition-colors"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 font-semibold transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Powerful Features for Your Business
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Mail className="h-10 w-10 text-primary-600" />}
              title="Email & SMS Marketing"
              description="Create and send targeted campaigns to engage your customers effectively."
            />
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-primary-600" />}
              title="AI Chatbot & Helpdesk"
              description="Provide 24/7 support with our intelligent AI-powered chatbot system."
            />
            <FeatureCard
              icon={<Phone className="h-10 w-10 text-primary-600" />}
              title="IVR System"
              description="Professional interactive voice response system powered by Twilio."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary-600" />}
              title="Customer CRM"
              description="Manage contacts, track interactions, and grow your customer base."
            />
            <FeatureCard
              icon={<BarChart className="h-10 w-10 text-primary-600" />}
              title="Analytics & Reporting"
              description="Get insights with comprehensive analytics and custom reports."
            />
            <FeatureCard
              icon={<CreditCard className="h-10 w-10 text-primary-600" />}
              title="Payment Processing"
              description="Secure payment processing and subscription management with Stripe."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses using Callmaker24 to streamline their operations.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 font-semibold transition-colors"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Phone className="h-6 w-6 text-primary-400" />
            <span className="text-xl font-bold text-white">Callmaker24</span>
          </div>
          <p className="mb-4">
            © {new Date().getFullYear()} Callmaker24. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
