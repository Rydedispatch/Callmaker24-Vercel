import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  BarChart3,
  Users,
  Mail,
  TrendingUp,
  Phone,
  MessageSquare,
} from "lucide-react";

export default async function AnalyticsPage() {
  const session = await auth();

  // Fetch analytics data
  const [
    totalContacts,
    totalCampaigns,
    totalMessages,
    totalCalls,
    totalTickets,
    recentCampaigns,
  ] = await Promise.all([
    prisma.contact.count({ where: { userId: session?.user.id } }),
    prisma.campaign.count({ where: { userId: session?.user.id } }),
    prisma.message.count({ where: { userId: session?.user.id } }),
    prisma.call.count({ where: { userId: session?.user.id } }),
    prisma.ticket.count({ where: { userId: session?.user.id } }),
    prisma.campaign.findMany({
      where: { userId: session?.user.id },
      include: {
        _count: {
          select: { campaignContacts: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const metrics = [
    {
      name: "Total Contacts",
      value: totalContacts,
      icon: Users,
      change: "+12.5%",
      trend: "up",
    },
    {
      name: "Campaigns Sent",
      value: totalCampaigns,
      icon: Mail,
      change: "+8.2%",
      trend: "up",
    },
    {
      name: "Messages Sent",
      value: totalMessages,
      icon: MessageSquare,
      change: "+23.1%",
      trend: "up",
    },
    {
      name: "Total Calls",
      value: totalCalls,
      icon: Phone,
      change: "+5.4%",
      trend: "up",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">
          Track your marketing performance and customer engagement
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.name}
              className="bg-white rounded-lg shadow p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600 font-medium">
                    {metric.change}
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">{metric.name}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {metric.value.toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>

      {/* Campaign Performance */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Recent Campaign Performance
          </h2>
          <BarChart3 className="h-5 w-5 text-gray-400" />
        </div>

        {recentCampaigns.length > 0 ? (
          <div className="space-y-4">
            {recentCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        campaign.status === "COMPLETED"
                          ? "bg-green-500"
                          : campaign.status === "ACTIVE"
                          ? "bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                    <h3 className="font-medium text-gray-900">
                      {campaign.name}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {campaign.type}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center space-x-6 text-sm text-gray-600">
                    <span>
                      Recipients: {campaign._count.campaignContacts}
                    </span>
                    <span>Status: {campaign.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No campaign data available yet</p>
          </div>
        )}
      </div>

      {/* Engagement Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Message Delivery
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Sent</span>
              <span className="font-semibold text-gray-900">
                {totalMessages}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full w-[85%]"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>85% Delivered</span>
              <span>15% Pending</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Support Tickets
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Tickets</span>
              <span className="font-semibold text-gray-900">{totalTickets}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full w-[40%]"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>40% Open</span>
              <span>60% Resolved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
