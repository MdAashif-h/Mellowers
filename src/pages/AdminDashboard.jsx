import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Award, TrendingUp, Download, Search, Filter, Eye, BarChart3, PieChart, Calendar, MoreVertical, User, Trash2, FileText, X, AlertTriangle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import AdminAuthModal from '../components/AdminAuthModal';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line } from 'recharts';

const AdminDashboard = () => {
  const { isAdminAuthenticated, adminUser, adminLogout } = useAdmin();
  const [showAuthModal, setShowAuthModal] = useState(!isAdminAuthenticated);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      setShowAuthModal(true);
    }
  }, [isAdminAuthenticated]);

  // Enhanced mock users data combining both versions
  const mockUsers = [
    { id: 1, name: 'sffs', email: 'sffs@example.com', role: 'Java Full Stack Developer', progress: 85, xp: 2450, lastActive: '2024-01-20', completedModules: 12, totalModules: 15, status: 'Active', joinDate: '2023-10-15' },
    { id: 2, name: 'Aashif', email: 'aashif.h785@gmail.com', role: 'Frontend Developer', progress: 92, xp: 3200, lastActive: '2024-01-21', completedModules: 18, totalModules: 20, status: 'Active', joinDate: '2023-09-20' },
    { id: 3, name: 'Kamamlesh', email: 'mkamamlesh@gmail.com', role: 'QA Tester', progress: 67, xp: 1800, lastActive: '2024-01-19', completedModules: 8, totalModules: 12, status: 'Active', joinDate: '2023-11-05' },
    { id: 4, name: 'Janani', email: 'sjananaim@gmail.com', role: 'DevOps Engineer', progress: 78, xp: 2100, lastActive: '2024-01-21', completedModules: 14, totalModules: 18, status: 'Active', joinDate: '2023-10-30' },
    { id: 5, name: 'Sarveshwaran', email: 'vsarvesh@gmail.com', role: 'Frontend Developer', progress: 55, xp: 1200, lastActive: '2024-01-18', completedModules: 7, totalModules: 15, status: 'Inactive', joinDate: '2023-12-01' },
    { id: 6, name: 'David Lee', email: 'david.lee@example.com', role: 'Java Full Stack Developer', progress: 73, xp: 1950, lastActive: '2024-01-17', completedModules: 10, totalModules: 14, status: 'Active', joinDate: '2023-08-15' },
    { id: 7, name: 'Priya Singh', email: 'priya.singh@example.com', role: 'QA Tester', progress: 88, xp: 2600, lastActive: '2024-01-20', completedModules: 11, totalModules: 12, status: 'Active', joinDate: '2023-07-20' },
    { id: 8, name: 'Carlos Gomez', email: 'carlos.gomez@example.com', role: 'DevOps Engineer', progress: 60, xp: 1400, lastActive: '2024-01-16', completedModules: 9, totalModules: 16, status: 'Active', joinDate: '2023-11-10' },
    { id: 9, name: 'Anna Kim', email: 'anna.kim@example.com', role: 'Frontend Developer', progress: 80, xp: 2300, lastActive: '2024-01-19', completedModules: 15, totalModules: 18, status: 'Active', joinDate: '2023-09-05' },
    { id: 10, name: 'Mohammed Ali', email: 'mohammed.ali@example.com', role: 'Java Full Stack Developer', progress: 40, xp: 900, lastActive: '2024-01-15', completedModules: 5, totalModules: 12, status: 'Inactive', joinDate: '2023-12-15' },
    { id: 11, name: 'Linda Brown', email: 'linda.brown@example.com', role: 'QA Tester', progress: 95, xp: 2800, lastActive: '2024-01-21', completedModules: 12, totalModules: 12, status: 'Active', joinDate: '2023-06-10' },
    { id: 12, name: 'Tom White', email: 'tom.white@example.com', role: 'DevOps Engineer', progress: 50, xp: 1100, lastActive: '2024-01-14', completedModules: 8, totalModules: 15, status: 'Inactive', joinDate: '2023-11-25' },
    { id: 13, name: 'Sophia Green', email: 'sophia.green@example.com', role: 'Frontend Developer', progress: 77, xp: 2100, lastActive: '2024-01-18', completedModules: 13, totalModules: 17, status: 'Active', joinDate: '2023-08-30' },
    { id: 14, name: 'Ravi Kumar', email: 'ravi.kumar@example.com', role: 'Java Full Stack Developer', progress: 65, xp: 1700, lastActive: '2024-01-17', completedModules: 9, totalModules: 13, status: 'Active', joinDate: '2023-10-05' },
    { id: 15, name: 'Olga Petrova', email: 'olga.petrova@example.com', role: 'QA Tester', progress: 82, xp: 2200, lastActive: '2024-01-20', completedModules: 10, totalModules: 12, status: 'Active', joinDate: '2023-09-15' }
  ];

  const overviewStats = [
    { title: 'Total Users', value: mockUsers.length.toString(), icon: <Users className="w-8 h-8" />, change: '+12%' },
    { title: 'Active Learners', value: mockUsers.filter(u => u.status === 'Active').length.toString(), icon: <TrendingUp className="w-8 h-8" />, change: '+8%' },
    { title: 'Certificates Issued', value: mockUsers.filter(u => u.progress === 100).length.toString(), icon: <Award className="w-8 h-8" />, change: '+15%' },
    { title: 'Avg. Completion', value: `${Math.round(mockUsers.reduce((acc, user) => acc + user.progress, 0) / mockUsers.length)}%`, icon: <BarChart3 className="w-8 h-8" />, change: '+5%' }
  ];

  const roleDistribution = [
    { name: 'Java Full Stack', value: mockUsers.filter(u => u.role === 'Java Full Stack Developer').length, color: '#3b82f6' },
    { name: 'Frontend Dev', value: mockUsers.filter(u => u.role === 'Frontend Developer').length, color: '#06b6d4' },
    { name: 'QA Tester', value: mockUsers.filter(u => u.role === 'QA Tester').length, color: '#8b5cf6' },
    { name: 'DevOps', value: mockUsers.filter(u => u.role === 'DevOps Engineer').length, color: '#10b981' }
  ];

  const progressData = [
    { month: 'Oct', users: 45, completed: 32 },
    { month: 'Nov', users: 67, completed: 48 },
    { month: 'Dec', users: 89, completed: 71 },
    { month: 'Jan', users: 124, completed: 98 }
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const exportReport = () => {
    const csvContent = [
      ['Name', 'Email', 'Role', 'Progress %', 'XP', 'Completed Modules', 'Total Modules', 'Last Active', 'Status', 'Join Date'],
      ...filteredUsers.map(user => [
        user.name, user.email, user.role, user.progress, user.xp, 
        user.completedModules, user.totalModules, user.lastActive, user.status, user.joinDate
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `user-progress-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
    setShowActionsMenu(null);
  };

  const handleRemoveUser = (user) => {
    setShowDeleteConfirm(user);
    setShowActionsMenu(null);
  };

  const confirmRemoveUser = () => {
    if (showDeleteConfirm) {
      console.log('Removing user:', showDeleteConfirm.name);
      // Here you would typically call an API to remove the user
      setShowDeleteConfirm(null);
    }
  };

  const handleViewCompletion = (user) => {
    const completionData = [
      ['Module', 'Status', 'Score', 'Date Completed', 'Time Spent (hrs)'],
      ['Java Basics', user.progress > 20 ? 'Completed' : 'In Progress', user.progress > 20 ? '95%' : `${Math.min(user.progress * 5, 100)}%`, user.progress > 20 ? '2024-01-15' : '-', '12'],
      ['OOP Concepts', user.progress > 40 ? 'Completed' : 'In Progress', user.progress > 40 ? '88%' : `${Math.min((user.progress - 20) * 5, 100)}%`, user.progress > 40 ? '2024-01-18' : '-', '15'],
      ['Data Structures', user.progress > 60 ? 'Completed' : 'In Progress', user.progress > 60 ? '92%' : `${Math.min((user.progress - 40) * 5, 100)}%`, user.progress > 60 ? '2024-01-20' : '-', '18'],
      ['Spring Framework', user.progress > 80 ? 'Completed' : 'Locked', user.progress > 80 ? '85%' : '-', user.progress > 80 ? '2024-01-22' : '-', '20']
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([completionData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${user.name.replace(' ', '-')}-completion-report.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    setShowActionsMenu(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowActionsMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (!isAdminAuthenticated) {
    return showAuthModal ? <AdminAuthModal onClose={() => navigate('/')} /> : null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-blue-200">Monitor user performance and learning progress</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-blue-200">Welcome, {adminUser?.name}</span>
            <button 
              onClick={adminLogout}
              className="bg-red-500/20 text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex space-x-1 mb-8 bg-white/5 rounded-lg p-1">
          {['overview', 'users', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg capitalize transition-all ${
                activeTab === tab 
                  ? 'bg-blue-500 text-white' 
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewStats.map((stat, index) => (
                <div key={index} className="glassmorphism rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-200 text-sm">{stat.title}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                      <p className="text-green-400 text-sm">{stat.change}</p>
                    </div>
                    <div className="text-blue-400">{stat.icon}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                           <div className="glassmorphism rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Role Distribution</h3>
                <div className="space-y-3">
                  {roleDistribution.map((role, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded" style={{backgroundColor: role.color}}></div>
                        <span className="text-white">{role.name}</span>
                      </div>
                      <span className="text-blue-200">{role.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glassmorphism rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Monthly Progress</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="month" stroke="#93c5fd" />
                    <YAxis stroke="#93c5fd" />
                    <Tooltip />
                    <Bar dataKey="users" fill="#3b82f6" />
                    <Bar dataKey="completed" fill="#06b6d4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-4 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-blue-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                  />
                </div>
                
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 [&>option]:text-black [&>option]:bg-white"
                >
                  <option value="all">All Roles</option>
                  <option value="Java Full Stack Developer">Java Full Stack</option>
                  <option value="Frontend Developer">Frontend Dev</option>
                  <option value="QA Tester">QA Tester</option>
                  <option value="DevOps Engineer">DevOps</option>
                </select>

              </div>
              <button
                onClick={exportReport}
                className="flex items-center space-x-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>

            <div className="glassmorphism rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-blue-200">User</th>
                      <th className="px-6 py-4 text-left text-blue-200">Role</th>
                      <th className="px-6 py-4 text-left text-blue-200">Progress</th>
                      <th className="px-6 py-4 text-left text-blue-200">XP</th>
                      <th className="px-6 py-4 text-left text-blue-200">Status</th>
                      <th className="px-6 py-4 text-left text-blue-200">Modules</th>
                      <th className="px-6 py-4 text-left text-blue-200">Last Active</th>
                      <th className="px-6 py-4 text-left text-blue-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-t border-white/10">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium">{user.name}</p>
                            <p className="text-blue-200 text-sm">{user.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-blue-200">{user.role}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-white/20 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                                style={{ width: `${user.progress}%` }}
                              />
                            </div>
                            <span className="text-white text-sm">{user.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-blue-200">{user.xp}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'Active' 
                              ? 'bg-green-500/20 text-green-300' 
                              : 'bg-red-500/20 text-red-300'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-blue-200">{user.completedModules}/{user.totalModules}</td>
                        <td className="px-6 py-4 text-blue-200">{user.lastActive}</td>
                        <td className="px-6 py-4">
                          <div className="relative">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowActionsMenu(showActionsMenu === user.id ? null : user.id);
                              }}
                              className="text-blue-400 hover:text-blue-300 p-1"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            
                            {showActionsMenu === user.id && (
                              <div className="absolute right-0 top-8 bg-slate-800 border border-white/20 rounded-lg shadow-lg z-10 w-48">
                                <button
                                  onClick={() => handleViewProfile(user)}
                                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors"
                                >
                                  <User className="w-4 h-4" />
                                  <span>View Profile</span>
                                </button>
                                <button
                                  onClick={() => handleViewCompletion(user)}
                                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors"
                                >
                                  <FileText className="w-4 h-4" />
                                  <span>Export Completion</span>
                                </button>
                                <button
                                  onClick={() => handleRemoveUser(user)}
                                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-red-400 hover:bg-red-500/10 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span>Remove User</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="glassmorphism rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Learning Completion Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="month" stroke="#93c5fd" />
                  <YAxis stroke="#93c5fd" />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} />
                  <Line type="monotone" dataKey="completed" stroke="#06b6d4" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glassmorphism rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Top Performers</h3>
                <div className="space-y-4">
                  {mockUsers.sort((a, b) => b.xp - a.xp).slice(0, 5).map((user, index) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-blue-400 font-bold">#{index + 1}</span>
                        <div>
                          <p className="text-white">{user.name}</p>
                          <p className="text-blue-200 text-sm">{user.role}</p>
                        </div>
                      </div>
                      <span className="text-cyan-400 font-bold">{user.xp} XP</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glassmorphism rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Skills Distribution</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={roleDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="name" stroke="#93c5fd" />
                    <YAxis stroke="#93c5fd" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced User Profile Modal */}
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glassmorphism rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">User Profile - {selectedUser.name}</h3>
                  <button 
                    onClick={() => setShowUserModal(false)}
                    className="text-white/60 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-semibold mb-3">Basic Information</h4>
                      <div className="space-y-2">
                        <p className="text-blue-200"><span className="text-white">Name:</span> {selectedUser.name}</p>
                        <p className="text-blue-200"><span className="text-white">Email:</span> {selectedUser.email}</p>
                        <p className="text-blue-200"><span className="text-white">Role:</span> {selectedUser.role}</p>
                        <p className="text-blue-200"><span className="text-white">Join Date:</span> {selectedUser.joinDate}</p>
                        <p className="text-blue-200"><span className="text-white">Last Active:</span> {selectedUser.lastActive}</p>
                        <p className="text-blue-200">
                          <span className="text-white">Status:</span> 
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                            selectedUser.status === 'Active' 
                              ? 'bg-green-500/20 text-green-300' 
                              : 'bg-red-500/20 text-red-300'
                          }`}>
                            {selectedUser.status}
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-3">Progress Stats</h4>
                      <div className="space-y-2">
                        <p className="text-blue-200"><span className="text-white">Progress:</span> {selectedUser.progress}%</p>
                        <p className="text-blue-200"><span className="text-white">XP Points:</span> {selectedUser.xp}</p>
                        <p className="text-blue-200"><span className="text-white">Modules:</span> {selectedUser.completedModules}/{selectedUser.totalModules}</p>
                        <p className="text-blue-200"><span className="text-white">Completion Rate:</span> {Math.round((selectedUser.completedModules / selectedUser.totalModules) * 100)}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-3">Recent Achievements</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">🏆</span>
                          <div>
                            <p className="text-white text-sm">First Assessment</p>
                            <p className="text-blue-200 text-xs">Completed first skill assessment</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">⚡</span>
                          <div>
                            <p className="text-white text-sm">Quick Learner</p>
                            <p className="text-blue-200 text-xs">Completed module in record time</p>
                          </div>
                        </div>
                      </div>
                      {selectedUser.progress > 50 && (
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">🎯</span>
                            <div>
                              <p className="text-white text-sm">Halfway Hero</p>
                              <p className="text-blue-200 text-xs">Reached 50% completion</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedUser.xp > 2000 && (
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">🌟</span>
                            <div>
                              <p className="text-white text-sm">XP Master</p>
                              <p className="text-blue-200 text-xs">Earned over 2000 XP</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-3">Learning Path Progress</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'Java Basics', baseProgress: 0 },
                        { name: 'Object-Oriented Programming', baseProgress: 25 },
                        { name: 'Data Structures & Algorithms', baseProgress: 50 },
                        { name: 'Spring Framework', baseProgress: 75 }
                      ].map((module, index) => {
                        const moduleProgress = Math.max(0, Math.min(100, selectedUser.progress - module.baseProgress));
                        return (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-white flex-1">{module.name}</span>
                            <div className="flex items-center space-x-2 flex-1 justify-end">
                              <div className="w-24 bg-white/20 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                                  style={{ width: `${moduleProgress}%` }}
                                />
                              </div>
                              <span className="text-blue-200 text-sm w-12 text-right">{moduleProgress}%</span>
                              {moduleProgress === 100 && <span className="text-green-400">✓</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-3">Performance Metrics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white/5 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-cyan-400">{Math.round((selectedUser.completedModules / selectedUser.totalModules) * 100)}%</p>
                        <p className="text-blue-200 text-sm">Module Completion</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-green-400">{selectedUser.xp}</p>
                        <p className="text-blue-200 text-sm">Total XP Earned</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-purple-400">{Math.round(selectedUser.xp / selectedUser.completedModules) || 0}</p>
                        <p className="text-blue-200 text-sm">Avg XP per Module</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-white/10">
                  <button 
                    onClick={() => setShowUserModal(false)}
                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => handleViewCompletion(selectedUser)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Export Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glassmorphism rounded-xl max-w-md w-full p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-red-400" />
                <h3 className="text-xl font-bold text-white">Confirm Deletion</h3>
              </div>
              
              <p className="text-blue-200 mb-6">
                Are you sure you want to remove <span className="text-white font-semibold">{showDeleteConfirm.name}</span>? 
                This action cannot be undone and will permanently delete all their progress data.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmRemoveUser}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;