import { Routes, Route } from 'react-router-dom'
import Home from './page/Home/Home'
import Navbar from './page/Navbar/Navbar'
import Portfolio from './page/Portfolio/Portfolio'
import Activity from './page/Activity/Activity'
import Wallet from './page/Wallet/Wallet'
import Withdrawal from './page/Withdrawal/Withdrawal'
import PaymentDetails from './page/PaymentDetails/PaymentDetails'
import StockDetails from './page/StockDetails/StockDetails'
import Watchlist from './page/Watchlist/Watchlist'
import Profile from './page/Profile/Profile'
import SearchCoin from './page/Search/SearchCoin'
import Notfound from './page/Notfound/Notfound'
import Auth from './page/Auth/Auth'

import { useState, useEffect } from 'react'

function App() {
  const [jwt, setJwt] = useState(localStorage.getItem('jwt') || '')

  useEffect(() => {
    const handleStorageChange = () => {
      setJwt(localStorage.getItem('jwt') || '')
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    setJwt('')
  }

  return (
    <>
      {!jwt ? (
        <Auth setJwt={setJwt} />
      ) : (
        <div>
          <Navbar onLogout={handleLogout} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/portfolio' element={<Portfolio />} />
            <Route path='/activity' element={<Activity />} />
            <Route path='/wallet' element={<Wallet />} />
            <Route path='/withdrawal' element={<Withdrawal />} />
            <Route path='/payment_details' element={<PaymentDetails />} />
            <Route path='/market/:id' element={<StockDetails />} />
            <Route path='/watchlist' element={<Watchlist />} />
            <Route path='/profile' element={<Profile onLogout={handleLogout} />} />
            <Route path='/search' element={<SearchCoin />} />
            <Route path='*' element={<Notfound />} />
          </Routes>
        </div>
      )}
    </>
  )
}

export default App
