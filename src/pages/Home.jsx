import './Page.css'

function Home() {
  return (
    <div className="page">
      <div className="page-card">
        <h2>🏠 Welcome to Home Page</h2>
        <p className="hello-message">Hello World from Home!</p>
        <p className="description">
          This is a simple React application built with Vite and deployed to GitHub Pages.
        </p>
        <div className="tech-stack">
          <span className="tech-badge">⚛️ React 18</span>
          <span className="tech-badge">⚡ Vite 6</span>
          <span className="tech-badge">🚀 GitHub Pages</span>
        </div>
      </div>
    </div>
  )
}

export default Home
