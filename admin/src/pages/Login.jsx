import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import axios from 'axios'
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from 'lucide-react'

export default function Login() {

  const [userC, setUserC] = useState(null)
  const navigate = useNavigate()
  

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUserC(JSON.parse(storedUser))
      navigate('/')
    }
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }
    if (!formData.password.trim()) {
      setError('Password is required')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!validateForm()) return
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:4000/api/auth/admin/login', {
        email: formData.email.trim(),
        password: formData.password
      })

      if (response.status === 200) {
        const { user, token } = response.data
        console.log('user logged in:', user)

        localStorage.setItem("adminToken", token)
        localStorage.setItem("user", JSON.stringify(user))

        setUserC(user)
        setSuccess('Login successful! Redirecting...')

        setTimeout(() => {
          navigate("/")
          window.location.reload()
        }, 1500)
      }

    } catch (error) {
      console.error('Login error:', error)
      if (error.response?.status === 401) {
        setError('Invalid email or password')
      } else if (error.response?.status === 404) {
        setError('User not found')
      } else if (error.response?.status >= 500) {
        setError('Server error. Please try again later.')
      } else if (error.message === 'Network Error') {
        setError('Network error. Please check your connection.')
      } else {
        setError(error.response?.data?.message || 'Login failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to Admin account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back! Please enter your details.
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error && (
            <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 rounded-md bg-green-50 border border-green-200 flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}

          <div className="bg-white py-8 px-6 shadow-sm rounded-lg border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Enter your email"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#ff772e] focus:border-[#ff772e] disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder="Enter your password"
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#ff772e] focus:border-[#ff772e] disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-end">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm font-medium text-[#ff772e] hover:text-[#e6661a] transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center items-center gap-3 rounded-lg bg-[#ff772e] px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#e6661a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff772e] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>

          
        </div>
      </div>
    </>
  )
}
