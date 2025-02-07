import { Route, Routes } from 'react-router-dom'

import {
  Babas,
  EmailVerification,
  Explorer,
  Finances,
  ForgotPassword,
  Members,
  NotFound,
  SignIn,
  SignUp,
  Stats
} from './pages'

export const Router = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/email-verification" element={<EmailVerification />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/explorer" element={<Explorer />} />
      <Route path="/" element={<Babas />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/members" element={<Members />} />
      <Route path="/finances" element={<Finances />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
