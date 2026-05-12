import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Account } from '../components/account'
import { Home } from '../views/views/home'
import { Archive } from '../views/views/archive'
import { Popular } from '../views/views/popular'
import { Settings } from '../views/views/settings'
import { Onboarding } from '../views/views/onboarding'
import { FetchTopStories } from '../components/fetchnewskey'

function App() {
  return (
   <>

      <Routes>
        <Route path='/' element={<Onboarding />}></Route>
        <Route path="/account" element={<Account />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Archive" element={<Archive /> } />
        <Route path="/Popular" element={ <Popular />} />
        <Route path="/Settings" element={<Settings /> } />
      </Routes>

   </>
  )
}

export default App
