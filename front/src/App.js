import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const BonEntreePdf = React.lazy(() => import('./views/bonmagasin/BonEntreePdf'))
const BonSortiePdf = React.lazy(() => import('./views/bonmagasin/BonSortiePdf'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/" name="Login Page" element={<Login />} />
            <Route
              exact
              path="/bonmagasin/entreepdf"
              name="Bon Entree Pdf"
              element={<BonEntreePdf />}
            />
            <Route
              exact
              path="/bonmagasin/sortiepdf"
              name="Bon Sortie Pdf"
              element={<BonSortiePdf />}
            />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
