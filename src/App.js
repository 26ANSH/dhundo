import React, { useState } from 'react'
import {Navbar} from './components/Navbar'
import {Footer} from './components/Footer'
import { Routes} from './components/Routes'


export const App = () => {

    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen">

            <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>
            <Routes />
            <Footer />
                
            </div>
        </div>
    )
}

export default App;