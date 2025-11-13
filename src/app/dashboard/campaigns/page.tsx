'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Plus, Mail, MessageSquare, Calendar, Send, Pause, CheckCircle } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  type: 'EMAIL' | 'SMS' | 'VOICE';
  status: string;
  subject: string | null;
  content: string;
  createdAt: string;
  scheduledAt: string | null;
  sentAt: string | null;
  _count: {
    messages: number;
  };
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'EMAIL' as 'EMAIL' | 'SMS' | 'VOICE',
    subject: '',
    content: '',
    scheduledAt: '',
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns');
      const data = await response.json();
      setCampaigns(data.campaigns || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCampaign),
      });

      if (response.ok) {
        setShowCreateModal(false);
        setNewCampaign({ name: '', type: 'EMAIL', subject: '', content: '', scheduledAt: '' });
        fetchCampaigns();
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800';
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800';
      case 'SENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'SENT':
        return 'bg-green-100 text-green-800';
      case 'PAUSED':
        return 'bg-orange-100 text-orange-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'EMAIL':
        return <Mail className="w-5 h-5" />;
      case 'SMS':
        return <MessageSquare className="w-5 h-5" />;
      case 'VOICE':
        return <Calendar className="w-5 h-5" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            Campaigns
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Create and manage your marketing campaigns
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">Total Campaigns</p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white mt-1">
                {campaigns.length}
              </p>
            </div>
            <Mail className="w-8 h-8 text-primary-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">Active</p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white mt-1">
                {campaigns.filter(c => c.status === 'SENDING').length}
              </p>
            </div>
            <Send className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">Scheduled</p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white mt-1">
                {campaigns.filter(c => c.status === 'SCHEDULED').length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">Completed</p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white mt-1">
                {campaigns.filter(c => c.status === 'SENT').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Campaign List */}
      {loading ? (
        <Card>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-secondary-600">Loading campaigns...</p>
          </div>
        </Card>
      ) : campaigns.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Mail className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
            <p className="text-secondary-600 dark:text-secondary-400 mb-4">
              No campaigns yet. Create your first campaign to get started.
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300">
                    {getTypeIcon(campaign.type)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                        {campaign.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </div>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                      {campaign.type} Campaign • {campaign._count.messages} messages
                    </p>
                    {campaign.scheduledAt && (
                      <p className="text-xs text-secondary-500 mt-1">
                        Scheduled for {new Date(campaign.scheduledAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {campaign.status === 'DRAFT' && (
                    <Button size="sm">
                      <Send className="w-4 h-4 mr-1" />
                      Send
                    </Button>
                  )}
                  {campaign.status === 'SENDING' && (
                    <Button variant="outline" size="sm">
                      <Pause className="w-4 h-4 mr-1" />
                      Pause
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
              Create New Campaign
            </h2>
            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <Input
                label="Campaign Name*"
                type="text"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                placeholder="Summer Sale 2024"
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Campaign Type*
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['EMAIL', 'SMS', 'VOICE'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNewCampaign({ ...newCampaign, type })}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        newCampaign.type === type
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900'
                          : 'border-secondary-200 hover:border-secondary-300'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        {getTypeIcon(type)}
                        <span className="mt-2 font-medium">{type}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {newCampaign.type === 'EMAIL' && (
                <Input
                  label="Subject Line*"
                  type="text"
                  value={newCampaign.subject}
                  onChange={(e) => setNewCampaign({ ...newCampaign, subject: e.target.value })}
                  placeholder="Don't miss our summer sale!"
                  required
                />
              )}

              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Message Content*
                </label>
                <textarea
                  value={newCampaign.content}
                  onChange={(e) => setNewCampaign({ ...newCampaign, content: e.target.value })}
                  placeholder="Enter your message here..."
                  rows={6}
                  required
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <Input
                label="Schedule For (Optional)"
                type="datetime-local"
                value={newCampaign.scheduledAt}
                onChange={(e) => setNewCampaign({ ...newCampaign, scheduledAt: e.target.value })}
              />

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Create Campaign
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
