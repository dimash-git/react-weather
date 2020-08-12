import React from "react"

const Header = ({ logo }) => {
  return (
    <header className="Header">
      <div className="logo">
        <img src={logo} alt="React Weather App" />
      </div>
      <nav>
        <ul>
          <li>
            <a
              href="https://github.com/dimash-git/react-weather"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
