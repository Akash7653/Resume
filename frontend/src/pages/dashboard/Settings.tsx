import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Camera, Save, Shield, CheckCircle, Moon, Sun } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';

export const Settings = () => {
  const { user, updateUser } = useAuth();
  const { theme, toggleTheme, isLoading: themeLoading } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await updateUser({
        name: formData.name,
        email: formData.email
      });
      
      setMessage('Profile updated successfully!');
      setMessageType('success');
    } catch (error: any) {
      setMessage(error.message || 'Failed to update profile');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (formData.new_password !== formData.confirm_password) {
      setMessage('New passwords do not match');
      setMessageType('error');
      setLoading(false);
      return;
    }

    if (formData.new_password.length < 8) {
      setMessage('Password must be at least 8 characters long');
      setMessageType('error');
      setLoading(false);
      return;
    }

    try {
      await updateUser({
        current_password: formData.current_password,
        new_password: formData.new_password
      });
      
      setMessage('Password updated successfully!');
      setMessageType('success');
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        current_password: '',
        new_password: '',
        confirm_password: ''
      }));
    } catch (error: any) {
      setMessage(error.message || 'Failed to update password');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Settings
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </motion.div>

        {/* Message Alert */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl flex items-center gap-3 ${
              messageType === 'success' 
                ? 'bg-green-50/80 border border-green-200/50 text-green-700' 
                : 'bg-red-50/80 border border-red-200/50 text-red-700'
            }`}
          >
            {messageType === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Shield className="w-5 h-5" />
            )}
            <span className="font-medium">{message}</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass rounded-2xl p-6 border border-glass-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
                <User className="w-6 h-6 text-text-inverse" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  Profile Information
                </h2>
                <p className="text-sm text-text-secondary">
                  Update your personal details
                </p>
              </div>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-6">
              {/* Profile Photo */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-text-inverse font-bold text-xl shadow-lg">
                    {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : user?.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 p-2 bg-bg-surface rounded-full shadow-lg border border-border-medium hover:bg-bg-secondary transition-colors"
                  >
                    <Camera className="w-4 h-4 text-text-secondary" />
                  </button>
                </div>
                <div>
                  <p className="font-medium text-text-primary">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-sm text-text-muted">
                    Click to change photo
                  </p>
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-text-primary mb-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-border-medium bg-bg-surface text-text-primary focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-text-primary mb-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-border-medium bg-bg-surface text-text-primary focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full flex items-center gap-2 justify-center"
              >
                <Save className="w-5 h-5" />
                {loading ? 'Updating...' : 'Update Profile'}
              </Button>
            </form>
          </motion.div>

          {/* Password Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="glass rounded-2xl p-6 border border-glass-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <Lock className="w-6 h-6 text-text-inverse" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  Security Settings
                </h2>
                <p className="text-sm text-text-secondary">
                  Change your password
                </p>
              </div>
            </div>

            <form onSubmit={handlePasswordUpdate} className="space-y-6">
              {/* Current Password */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-text-primary mb-2">
                  <Lock className="w-4 h-4" />
                  Current Password
                </label>
                <input
                  type="password"
                  name="current_password"
                  value={formData.current_password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-border-medium bg-bg-surface text-text-primary focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-all"
                  placeholder="Enter current password"
                  required
                />
              </div>

              {/* New Password */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-text-primary mb-2">
                  <Lock className="w-4 h-4" />
                  New Password
                </label>
                <input
                  type="password"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-border-medium bg-bg-surface text-text-primary focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-all"
                  placeholder="Enter new password"
                  minLength={8}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-text-primary mb-2">
                  <Lock className="w-4 h-4" />
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-border-medium bg-bg-surface text-text-primary focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-all"
                  placeholder="Confirm new password"
                  minLength={8}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                variant="outline"
                className="w-full flex items-center gap-2 justify-center"
              >
                <Shield className="w-5 h-5" />
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Additional Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="glass rounded-2xl p-6 border border-glass-border"
        >
          <h2 className="text-xl font-bold text-text-primary mb-4">
            Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-bg-secondary">
              <div>
                <p className="font-medium text-text-primary">
                  Email Notifications
                </p>
                <p className="text-sm text-text-secondary">
                  Receive updates about your resume analysis
                </p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-text-inverse transition-transform translate-x-6" />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-bg-secondary">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-accent-blue to-accent-purple rounded-lg">
                  {theme === 'dark' ? (
                    <Moon className="w-5 h-5 text-text-inverse" />
                  ) : (
                    <Sun className="w-5 h-5 text-text-inverse" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-text-primary">
                    Dark Mode
                  </p>
                  <p className="text-sm text-text-secondary">
                    Toggle dark theme across the entire app
                  </p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                disabled={themeLoading}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  theme === 'dark' ? 'bg-accent-blue' : 'bg-border-medium'
                } ${themeLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-text-inverse transition-transform ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};
