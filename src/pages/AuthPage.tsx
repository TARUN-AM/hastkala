import React, { useState } from 'react';
import { User, Lock, Mail, Phone, Palette, ShieldCheck, Check, Sparkles, LogOut } from 'lucide-react';
import { useAuth } from '../lib/auth-context';
import { Link, useRouter } from '../lib/router';
import { UserRole } from '../types/database';
import { HastkalaLogo, HastkalaLogoMark } from '../components/common/HastkalaLogo';

export const AuthPage: React.FC = () => {
  const { user, role, login, register, logout, switchPersona, isAuthenticated } = useAuth();
  const { navigate } = useRouter();

  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [registerRole, setRegisterRole] = useState<UserRole>('customer');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    if (mode === 'signin') {
      const res = await login(email, password);
      setLoading(false);
      if (res.success) {
        setSuccessMsg('Successfully signed in.');
        setTimeout(() => navigate('/shop'), 600);
      } else {
        setErrorMsg(res.error || 'Authentication failed');
      }
    } else {
      if (!fullName) {
        setErrorMsg('Please enter your full name');
        setLoading(false);
        return;
      }
      const res = await register({ email, full_name: fullName, role: registerRole, phone });
      setLoading(false);
      if (res.success) {
        setSuccessMsg('Account registered successfully! Redirecting...');
        setTimeout(() => {
          if (registerRole === 'artisan') navigate('/studio');
          else navigate('/shop');
        }, 800);
      } else {
        setErrorMsg(res.error || 'Registration failed');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      
      {/* Quick Demo Persona Switcher Banner */}
      <div className="bg-[#FFFDF9] rounded-lg p-6 border border-[#E8D9C5] mb-8 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#8A4935]" />
          <h2 className="font-serif font-bold text-base text-[#29251F]">Instant Evaluation Switcher</h2>
        </div>
        <p className="text-xs text-stone-600 mb-4 leading-relaxed">
          Switch effortlessly between pre-seeded personas to test customer checkout, artisan studio publishing with AI, and administrative curator oversight.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <button
            type="button"
            onClick={() => switchPersona('customer')}
            className={`p-3 rounded border text-left transition-all ${
              role === 'customer'
                ? 'border-[#8A4935] bg-[#F6ECE6] ring-1 ring-[#8A4935]'
                : 'border-[#E8D9C5] hover:bg-[#F7F0E5]'
            }`}
          >
            <div className="font-bold text-[#29251F]">Customer</div>
            <div className="text-[11px] text-stone-500">Sarah Patel</div>
            <div className="text-[10px] text-stone-400 mt-1">Shop, wishlist, orders</div>
          </button>

          <button
            type="button"
            onClick={() => switchPersona('artisan')}
            className={`p-3 rounded border text-left transition-all ${
              role === 'artisan'
                ? 'border-[#8A4935] bg-[#F6ECE6] ring-1 ring-[#8A4935]'
                : 'border-[#E8D9C5] hover:bg-[#F7F0E5]'
            }`}
          >
            <div className="font-bold text-[#8A4935]">Artisan Studio</div>
            <div className="text-[11px] text-stone-500">Meera Devi</div>
            <div className="text-[10px] text-stone-400 mt-1">Create listings, AI assist, fulfill</div>
          </button>

          <button
            type="button"
            onClick={() => switchPersona('admin')}
            className={`p-3 rounded border text-left transition-all ${
              role === 'admin'
                ? 'border-[#34483A] bg-[#EBF0EC] ring-1 ring-[#34483A]'
                : 'border-[#E8D9C5] hover:bg-[#F7F0E5]'
            }`}
          >
            <div className="font-bold text-[#34483A]">Platform Curator</div>
            <div className="text-[11px] text-stone-500">Elena Vance</div>
            <div className="text-[10px] text-stone-400 mt-1">Review provenance & products</div>
          </button>
        </div>
      </div>

      {/* Main Authentication Box */}
      <div className="bg-[#FFFDF9] rounded-lg border border-[#E8D9C5] p-6 sm:p-10 shadow-xs max-w-lg mx-auto">
        {isAuthenticated && user ? (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#F4ECE2] text-[#8A4935] flex items-center justify-center mx-auto text-xl font-serif font-bold">
              {user.full_name.charAt(0)}
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#29251F]">{user.full_name}</h2>
              <p className="text-xs text-stone-500">{user.email}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF0EC] text-[#34483A]">
                <span className="capitalize">Role: {user.role}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8D9C5] flex flex-col gap-2 text-xs font-semibold">
              {user.role === 'artisan' && (
                <Link
                  to="/studio"
                  className="py-2.5 bg-[#8A4935] text-white rounded hover:bg-[#753C2B] transition-colors"
                >
                  Enter Artisan Studio
                </Link>
              )}
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="py-2.5 bg-[#34483A] text-white rounded hover:bg-[#253329] transition-colors"
                >
                  Enter Admin Curator Portal
                </Link>
              )}
              <Link
                to="/orders"
                className="py-2.5 bg-[#F7F0E5] text-[#29251F] rounded border border-[#E8D9C5] hover:bg-[#E8D9C5] transition-colors"
              >
                View My Orders & Wishlist
              </Link>
              <button
                type="button"
                onClick={logout}
                className="py-2.5 text-stone-500 hover:text-rose-600 transition-colors flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out of Account</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col items-center mb-6 pb-4 border-b border-[#E8D9C5]/80">
              <HastkalaLogo size="md" />
            </div>

            <div className="flex border-b border-[#E8D9C5] mb-6">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`flex-1 pb-3 text-xs font-semibold transition-colors border-b-2 -mb-px ${
                  mode === 'signin' ? 'border-[#7E1726] text-[#7E1726]' : 'border-transparent text-stone-500 hover:text-black'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`flex-1 pb-3 text-xs font-semibold transition-colors border-b-2 -mb-px ${
                  mode === 'register' ? 'border-[#7E1726] text-[#7E1726]' : 'border-transparent text-stone-500 hover:text-black'
                }`}
              >
                Register
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="p-3 mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {mode === 'register' && (
                <>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Radhika Sundaram"
                      className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Account Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setRegisterRole('customer')}
                        className={`p-2 rounded border text-center transition-all ${
                          registerRole === 'customer'
                            ? 'bg-[#8A4935] text-white border-[#8A4935]'
                            : 'bg-white border-stone-200 text-stone-700'
                        }`}
                      >
                        Patron / Customer
                      </button>
                      <button
                        type="button"
                        onClick={() => setRegisterRole('artisan')}
                        className={`p-2 rounded border text-center transition-all ${
                          registerRole === 'artisan'
                            ? 'bg-[#8A4935] text-white border-[#8A4935]'
                            : 'bg-white border-stone-200 text-stone-700'
                        }`}
                      >
                        Artisan Maker
                      </button>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#8A4935] hover:bg-[#753C2B] text-white font-semibold rounded shadow-xs transition-colors cursor-pointer"
              >
                {loading ? 'Authenticating...' : mode === 'signin' ? 'Sign In to Account' : 'Create Free Account'}
              </button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
};
