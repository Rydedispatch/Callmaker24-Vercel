import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Card } from '@/components/ui/Card';
import { Users, Mail, MessageSquare, Phone, TrendingUp, DollarSign } from 'lucide-react';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const stats = [
    {
      name: 'Total Customers',
      value: '2,543',
      change: '+12.5%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Active Campaigns',
      value: '12',
      change: '+3',
      icon: Mail,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Open Tickets',
      value: '48',
      change: '-8',
      icon: MessageSquare,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      name: 'Calls Today',
      value: '156',
      change: '+23',
      icon: Phone,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      name: 'Conversion Rate',
      value: '3.2%',
      change: '+0.5%',
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      name: 'Revenue',
      value: '$12,543',
      change: '+18.2%',
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
          Welcome back, {session?.user?.name || 'User'}!
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.name} className="relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-1">
                  {stat.name}
                </p>
                <p className="text-3xl font-bold text-secondary-900 dark:text-white">
                  {stat.value}
                </p>
                <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`${stat.bgColor} ${stat.color} p-3 rounded-full`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Quick Actions" description="Common tasks and shortcuts">
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-primary-50 hover:bg-primary-100 dark:bg-primary-900 dark:hover:bg-primary-800 rounded-lg transition-colors">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-primary-600 mr-3" />
                <div>
                  <p className="font-medium text-secondary-900 dark:text-white">Create Campaign</p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Start a new email or SMS campaign</p>
                </div>
              </div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-secondary-50 hover:bg-secondary-100 dark:bg-secondary-800 dark:hover:bg-secondary-700 rounded-lg transition-colors">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-secondary-600 mr-3" />
                <div>
                  <p className="font-medium text-secondary-900 dark:text-white">Add Customer</p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Add a new customer to your CRM</p>
                </div>
              </div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-secondary-50 hover:bg-secondary-100 dark:bg-secondary-800 dark:hover:bg-secondary-700 rounded-lg transition-colors">
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 text-secondary-600 mr-3" />
                <div>
                  <p className="font-medium text-secondary-900 dark:text-white">View Tickets</p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Manage support tickets</p>
                </div>
              </div>
            </button>
          </div>
        </Card>

        <Card title="Recent Activity" description="Latest updates and changes">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-secondary-900 dark:text-white">
                  Campaign "Summer Sale" sent successfully
                </p>
                <p className="text-xs text-secondary-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-secondary-900 dark:text-white">
                  New customer registered: John Doe
                </p>
                <p className="text-xs text-secondary-500">3 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-secondary-900 dark:text-white">
                  Support ticket #1234 needs attention
                </p>
                <p className="text-xs text-secondary-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-secondary-900 dark:text-white">
                  IVR call completed with customer
                </p>
                <p className="text-xs text-secondary-500">6 hours ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
