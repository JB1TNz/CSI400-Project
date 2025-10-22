'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please enter email and password.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (res.ok) {
        // adjust redirect target as needed
        router.push('/')
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data?.message || 'Invalid credentials')
      }
    } catch (err) {
      setError('Network error. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', padding: 24, border: '1px solid #e6e6e6', borderRadius: 8, backgroundColor: '#1a1a2e' }}>
      <h1 style={{ marginBottom: 16, fontSize: 24, fontWeight: 500 }}>Login</h1>

      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: 8 }}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              display: 'block',
              width: '100%',
              padding: 8,
              marginTop: 6,
              boxSizing: 'border-box',
              border: '1px solid #ccc',
              borderRadius: 4,
            }}
            required
          />
        </label>

        <label style={{ display: 'block', marginBottom: 12 }}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              display: 'block',
              width: '100%',
              padding: 8,
              marginTop: 6,
              boxSizing: 'border-box',
              border: '1px solid #ccc',
              borderRadius: 4,
            }}
            required
          />
        </label>

        {error && <div style={{ color: '#b00020', marginBottom: 12 }}>{error}</div>}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: 10,
            background: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p style={{ marginTop: 12 }}>
        Don't have an account? <Link href="/login/register">Register</Link>
      </p>
    </div>
  )
}
