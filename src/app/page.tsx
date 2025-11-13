import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Callmaker24
          </h1>
          <p className="text-xl mb-8 text-secondary-600 dark:text-secondary-400">
            Enterprise Marketing & CRM Platform
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">📧 Email & SMS</h3>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Powerful marketing campaigns
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">🤖 AI Chatbot</h3>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Intelligent customer support
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">📞 IVR System</h3>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Advanced call routing
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">👥 CRM</h3>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Complete customer management
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard" className="btn-primary">
              Go to Dashboard
            </Link>
            <Link href="/auth/signin" className="btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
