'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Plus, Search, Filter, Mail, Phone, Building } from 'lucide-react';

interface Customer {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  company: string | null;
  status: string;
  createdAt: string;
  _count: {
    activities: number;
    tickets: number;
    messages: number;
  };
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    company: '',
  });

  useEffect(() => {
    fetchCustomers();
  }, [search]);

  const fetchCustomers = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      
      const response = await fetch(`/api/customers?${params}`);
      const data = await response.json();
      setCustomers(data.customers || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustomer),
      });

      if (response.ok) {
        setShowAddModal(false);
        setNewCustomer({ email: '', firstName: '', lastName: '', phone: '', company: '' });
        fetchCustomers();
      }
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            Customers
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Manage your customer database and relationships
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
            <Input
              type="text"
              placeholder="Search customers by name, email, or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </Card>

      {/* Customer List */}
      {loading ? (
        <Card>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-secondary-600">Loading customers...</p>
          </div>
        </Card>
      ) : customers.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <p className="text-secondary-600 dark:text-secondary-400 mb-4">
              No customers found. Add your first customer to get started.
            </p>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {customers.map((customer) => (
            <Card key={customer.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                    <span className="text-xl font-semibold text-primary-700 dark:text-primary-300">
                      {customer.firstName?.charAt(0) || customer.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                      {customer.firstName && customer.lastName
                        ? `${customer.firstName} ${customer.lastName}`
                        : customer.email}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                      {customer.email && (
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {customer.email}
                        </div>
                      )}
                      {customer.phone && (
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {customer.phone}
                        </div>
                      )}
                      {customer.company && (
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {customer.company}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                      {customer._count.activities}
                    </p>
                    <p className="text-xs text-secondary-600 dark:text-secondary-400">Activities</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                      {customer._count.tickets}
                    </p>
                    <p className="text-xs text-secondary-600 dark:text-secondary-400">Tickets</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                      {customer._count.messages}
                    </p>
                    <p className="text-xs text-secondary-600 dark:text-secondary-400">Messages</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
              Add New Customer
            </h2>
            <form onSubmit={handleAddCustomer} className="space-y-4">
              <Input
                label="Email*"
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                placeholder="customer@example.com"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  value={newCustomer.firstName}
                  onChange={(e) => setNewCustomer({ ...newCustomer, firstName: e.target.value })}
                  placeholder="John"
                />
                <Input
                  label="Last Name"
                  type="text"
                  value={newCustomer.lastName}
                  onChange={(e) => setNewCustomer({ ...newCustomer, lastName: e.target.value })}
                  placeholder="Doe"
                />
              </div>
              <Input
                label="Phone"
                type="tel"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                placeholder="+1234567890"
              />
              <Input
                label="Company"
                type="text"
                value={newCustomer.company}
                onChange={(e) => setNewCustomer({ ...newCustomer, company: e.target.value })}
                placeholder="Acme Inc."
              />
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Add Customer
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAddModal(false)}
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
