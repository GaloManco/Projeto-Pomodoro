import { Route, Routes } from 'react-router-dom'
import { Home } from './page/home'
import { Historico } from './page/historico'
import { DefaultLayout } from './layout/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/historico" element={<Historico />} />
      </Route>
    </Routes>
  )
}
