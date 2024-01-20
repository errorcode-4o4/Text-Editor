import React from "react"

export default function Header() {
    return (
        <header className="header">
            <img 
                src="./dashboard.png "  width={40}
                className="header--image"
            />
            <h2 className="header--title">Text Editor</h2>
            
        </header>
    )
}