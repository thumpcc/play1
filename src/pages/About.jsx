import React from 'react'
import './About.css'

function About() {
  return (
    <div className="about">
      <div className="about-container">
        <h1>About This Project</h1>
        <p className="intro">
          This is a React application demonstrating automated deployment to GitHub Pages using GitHub Actions.
        </p>

        <div className="tech-stack">
          <h2>Tech Stack</h2>
          <ul>
            <li><strong>React 18:</strong> Modern UI library</li>
            <li><strong>Vite:</strong> Next-generation build tool</li>
            <li><strong>React Router:</strong> Client-side routing</li>
            <li><strong>GitHub Actions:</strong> CI/CD pipeline</li>
            <li><strong>GitHub Pages:</strong> Static hosting</li>
          </ul>
        </div>

        <div className="features-section">
          <h2>Features</h2>
          <ul>
            <li>Single Page Application (SPA)</li>
            <li>Responsive design</li>
            <li>Automated deployment</li>
            <li>Modern React patterns</li>
            <li>Fast build times with Vite</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About
