import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { 
  Users, 
  Mail, 
  MessageSquare, 
  TrendingUp,
  DollarSign,
  Activity
} from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  
  // Fetch dashboard stats
  const [contactsCount, campaignsCount, ticketsCount, subscription] = await Promise.all([
    prisma.contact.count({ where: { userId: session?.user.id } }),
    prisma.campaign.count({ where: { userId: session?.user.id } }),
    prisma.ticket.count({ where: { userId: session?.user.id } }),
    prisma.subscription.findUnique({ where: { userId: session?.user.id } }),
  ]);

  const stats = [
    {
      name: "Total Contacts",
      value: contactsCount,
      icon: Users,
      change: "+12%",
      changeType: "positive",
    },
    {
      name: "Active Campaigns",
      value: campaignsCount,
      icon: Mail,
      change: "+8%",
      changeType: "positive",
    },
    {
      name: "Open Tickets",
      value: ticketsCount,
      icon: MessageSquare,
      change: "-5%",
      changeType: "negative",
    },
    {
      name: "Subscription",
      value: subscription?.plan || "FREE",
      icon: DollarSign,
      change: "Active",
      changeType: "neutral",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session?.user.name}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here&apos;s what&apos;s happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-lg shadow p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div className="mt-4">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : stat.changeType === "negative"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600 ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard
            title="Create Campaign"
            description="Launch a new email or SMS campaign"
            href="/dashboard/campaigns/new"
            icon={<Mail className="h-8 w-8 text-primary-600" />}
          />
          <QuickActionCard
            title="Add Contact"
            description="Add new contacts to your CRM"
            href="/dashboard/contacts/new"
            icon={<Users className="h-8 w-8 text-primary-600" />}
          />
          <QuickActionCard
            title="View Analytics"
            description="Check your performance metrics"
            href="/dashboard/analytics"
            icon={<TrendingUp className="h-8 w-8 text-primary-600" />}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          <Activity className="h-5 w-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          <ActivityItem
            title="Campaign sent successfully"
            description="'Summer Sale' campaign sent to 150 contacts"
            time="2 hours ago"
          />
          <ActivityItem
            title="New contact added"
            description="John Doe added to Marketing list"
            time="5 hours ago"
          />
          <ActivityItem
            title="Support ticket resolved"
            description="Ticket #1234 marked as resolved"
            time="1 day ago"
          />
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="block p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all"
    >
      <div className="mb-3">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </a>
  );
}

function ActivityItem({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0">
      <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
      <div className="flex-1">
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
}
