import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SUBSCRIPTION_PLANS } from "@/lib/stripe";
import { CreditCard, User, Bell, Shield } from "lucide-react";
import Link from "next/link";

export default async function SettingsPage() {
  const session = await auth();
  
  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
    include: { subscription: true },
  });

  const currentPlan = user?.subscription?.plan || "FREE";
  const planDetails = SUBSCRIPTION_PLANS[currentPlan];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <User className="h-5 w-5 text-gray-600" />
          <h2 className="text-xl font-bold text-gray-900">Profile</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <div className="text-gray-900">{user?.name || "Not set"}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="text-gray-900">{user?.email}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <div className="inline-flex px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {user?.role}
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Section */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <CreditCard className="h-5 w-5 text-gray-600" />
          <h2 className="text-xl font-bold text-gray-900">Subscription</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Plan
            </label>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {planDetails.name}
                </div>
                {planDetails.price > 0 && (
                  <div className="text-gray-600">
                    ${planDetails.price}/month
                  </div>
                )}
              </div>
              {currentPlan !== "ENTERPRISE" && (
                <Link
                  href="/pricing"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium transition-colors"
                >
                  Upgrade Plan
                </Link>
              )}
            </div>
          </div>
          
          {user?.subscription?.stripeCurrentPeriodEnd && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Billing Period
              </label>
              <div className="text-gray-900">
                Renews on{" "}
                {new Date(
                  user.subscription.stripeCurrentPeriodEnd
                ).toLocaleDateString()}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3">Plan Features</h3>
            <ul className="space-y-2">
              {planDetails.features.map((feature, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <span className="mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Shield className="h-5 w-5 text-gray-600" />
          <h2 className="text-xl font-bold text-gray-900">Security</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
              Change password
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Two-Factor Authentication
            </label>
            <div className="text-sm text-gray-600">
              Add an extra layer of security
            </div>
            <button className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-sm transition-colors">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Bell className="h-5 w-5 text-gray-600" />
          <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Email Notifications</div>
              <div className="text-sm text-gray-600">
                Receive email updates about your campaigns
              </div>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          </label>
          <label className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Campaign Reports</div>
              <div className="text-sm text-gray-600">
                Weekly summary of campaign performance
              </div>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          </label>
          <label className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">System Updates</div>
              <div className="text-sm text-gray-600">
                Important updates and maintenance notices
              </div>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
