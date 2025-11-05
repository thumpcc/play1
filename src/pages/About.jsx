import './Page.css'

function About() {
  return (
    <div className="page">
      <div className="page-card">
        <h2>ℹ️ About This Project</h2>
        <p className="hello-message">Hello World from About!</p>
        <p className="description">
          This application demonstrates a modern web development setup using:
        </p>
        <ul className="features-list">
          <li>React for building user interfaces</li>
          <li>Vite for fast development and optimized builds</li>
          <li>React Router for client-side routing</li>
          <li>GitHub Actions for automated deployment</li>
          <li>GitHub Pages for free hosting</li>
        </ul>
      </div>
    </div>
  )
}

export default About
