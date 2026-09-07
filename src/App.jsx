import { MotionConfig } from 'framer-motion'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import Servicii from './pages/Servicii.jsx'
import CumDecurge from './pages/CumDecurge.jsx'
import DespreMine from './pages/DespreMine.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    /* `reducedMotion="user"` oprește animațiile de mișcare pentru cine le-a
       dezactivat din sistem — regula CSS nu ajunge la animațiile JS. */
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="servicii" element={<Servicii />} />
            <Route path="cum-decurge" element={<CumDecurge />} />
            <Route path="despre-mine" element={<DespreMine />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}
