import React from 'react';
import { Provider } from 'react-redux';
import {store} from "./store"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SongListPage from '../components/pages/SongListPage';
import UserProfilePage from '../components/pages/UserProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SongListPage/>}/>
        <Route path="user/:userId" element={<UserProfilePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
