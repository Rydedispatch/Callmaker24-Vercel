import Link from "next/link";
import { Check } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@/lib/stripe";

export default function PricingPage() {
  const plans = Object.entries(SUBSCRIPTION_PLANS);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600">
            Choose the plan that&apos;s right for your business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map(([key, plan]) => (
            <div
              key={key}
              className={`bg-white rounded-2xl shadow-lg border-2 p-8 ${
                key === "PROFESSIONAL"
                  ? "border-primary-600 relative"
                  : "border-gray-200"
              }`}
            >
              {key === "PROFESSIONAL" && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-600 ml-2">/month</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={
                  key === "FREE"
                    ? "/register"
                    : `/api/stripe/checkout?plan=${key}`
                }
                className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                  key === "PROFESSIONAL"
                    ? "bg-primary-600 text-white hover:bg-primary-700"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {key === "FREE" ? "Get Started" : "Subscribe Now"}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600">
            All plans include 14-day money-back guarantee. No credit card
            required for free tier.
          </p>
        </div>
      </div>
    </div>
  );
}
