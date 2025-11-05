import React from 'react'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1 className="title">Hello World! 👋</h1>
        <p className="subtitle">
          Welcome to Play1 - A React App on GitHub Pages
        </p>
        <div className="features">
          <div className="feature-card">
            <span className="icon">⚛️</span>
            <h3>React 18</h3>
            <p>Built with the latest React features</p>
          </div>
          <div className="feature-card">
            <span className="icon">⚡</span>
            <h3>Vite</h3>
            <p>Lightning-fast build tool</p>
          </div>
          <div className="feature-card">
            <span className="icon">🚀</span>
            <h3>GitHub Pages</h3>
            <p>Deployed with GitHub Actions</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
