import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Save, 
  X, 
  Camera,
  BookOpen,
  Award,
  Clock,
  Star,
  Settings,
  Shield,
  Bell,
  Eye,
  EyeOff
} from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // User data state
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: '2023-01-15',
    bio: 'Passionate learner and developer with a keen interest in modern web technologies. Always eager to explore new frameworks and build innovative solutions.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    coursesCompleted: 12,
    totalHours: 145,
    certificates: 8,
    currentStreak: 15
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    profileVisibility: 'public',
    showProgress: true
  });

  const [tempUserInfo, setTempUserInfo] = useState({ ...userInfo });

  const handleEdit = () => {
    setIsEditing(true);
    setTempUserInfo({ ...userInfo });
  };

  const handleSave = () => {
    setUserInfo({ ...tempUserInfo });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempUserInfo({ ...userInfo });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const recentCourses = [
    {
      id: 1,
      title: 'Advanced React Development',
      progress: 85,
      lastAccessed: '2 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=60&fit=crop'
    },
    {
      id: 2,
      title: 'Node.js Backend Development',
      progress: 60,
      lastAccessed: '1 week ago',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=100&h=60&fit=crop'
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      progress: 100,
      lastAccessed: '2 weeks ago',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=60&fit=crop'
    }
  ];

  const achievements = [
    { name: 'Fast Learner', description: 'Completed 5 courses in one month', icon: '🚀' },
    { name: 'Consistent Student', description: '30-day learning streak', icon: '🔥' },
    { name: 'Full Stack Developer', description: 'Completed both frontend and backend tracks', icon: '💻' },
    { name: 'Community Helper', description: 'Helped 50+ students in forums', icon: '🤝' }
  ];

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 font-medium text-sm rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border mb-8">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-2xl"></div>
          
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={userInfo.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                {isEditing && (
                  <button className="absolute bottom-2 right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 mt-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={tempUserInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="text-3xl font-bold bg-transparent border-b-2 border-blue-300 focus:border-blue-500 outline-none"
                    />
                    <textarea
                      value={tempUserInfo.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={2}
                      className="w-full text-gray-600 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{userInfo.name}</h1>
                    <p className="text-gray-600 mb-4 max-w-2xl">{userInfo.bio}</p>
                  </>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span>{userInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{userInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(userInfo.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{userInfo.coursesCompleted}</div>
            <div className="text-sm text-gray-600">Courses Completed</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
            <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{userInfo.totalHours}</div>
            <div className="text-sm text-gray-600">Hours Learned</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
            <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{userInfo.certificates}</div>
            <div className="text-sm text-gray-600">Certificates</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
            <Star className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{userInfo.currentStreak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 bg-white p-2 rounded-xl shadow-sm border">
          <TabButton 
            id="overview" 
            label="Overview" 
            isActive={activeTab === 'overview'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="courses" 
            label="My Courses" 
            isActive={activeTab === 'courses'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="achievements" 
            label="Achievements" 
            isActive={activeTab === 'achievements'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="settings" 
            label="Settings" 
            isActive={activeTab === 'settings'} 
            onClick={setActiveTab} 
          />
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentCourses.map(course => (
                      <div key={course.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="w-16 h-10 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{course.title}</h4>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{course.progress}%</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{course.lastAccessed}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Learning Streak</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-3xl font-bold text-orange-600">{userInfo.currentStreak} days</div>
                      <div className="text-sm text-gray-600">Keep it up! You're on fire 🔥</div>
                    </div>
                    <div className="text-6xl">📈</div>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 14 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded ${
                          i < 10 ? 'bg-orange-200' : 'bg-gray-100'
                        } flex items-center justify-center text-xs`}
                      >
                        {i < 10 ? '✓' : ''}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">My Courses</h3>
                <div className="grid gap-4">
                  {recentCourses.map(course => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="w-20 h-12 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{course.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">Last accessed: {course.lastAccessed}</p>
                          <div className="flex items-center gap-4">
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          Continue
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h3>
                <div className="grid gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{achievement.name}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={userInfo.location}
                        onChange={(e) => setUserInfo({...userInfo, location: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">Email Notifications</h4>
                        <p className="text-sm text-gray-600">Receive course updates and announcements</p>
                      </div>
                      <button
                        onClick={() => setPreferences({...preferences, emailNotifications: !preferences.emailNotifications})}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          preferences.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.emailNotifications ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">Push Notifications</h4>
                        <p className="text-sm text-gray-600">Get notified about new courses and deadlines</p>
                      </div>
                      <button
                        onClick={() => setPreferences({...preferences, pushNotifications: !preferences.pushNotifications})}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          preferences.pushNotifications ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.pushNotifications ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">Show Learning Progress</h4>
                        <p className="text-sm text-gray-600">Display your progress publicly</p>
                      </div>
                      <button
                        onClick={() => setPreferences({...preferences, showProgress: !preferences.showProgress})}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          preferences.showProgress ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.showProgress ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Browse New Courses
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Award className="w-5 h-5 text-purple-600" />
                  View Certificates
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-gray-600" />
                  Account Settings
                </button>
              </div>
            </div>

            {/* Learning Goals */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">This Month's Goal</h3>
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-2xl font-bold text-blue-600 mb-1">3/5</div>
                <div className="text-sm text-gray-600 mb-4">Courses Completed</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">2 more to reach your goal!</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;