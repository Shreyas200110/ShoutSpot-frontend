import { useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import './App.css';
import { Navbar2 } from './components/Navbar2';
import { Footer } from './components/Footer';
import { CreateSpaceModal } from './components/CreateSpaceModal';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EmbedSingleTestimonial } from './components/EmbedSingleTestimonial';
import { SignIn } from './components/SignupSignin/SignIn';
import { Signup } from './components/SignupSignin/Signup';
import { SpaceDashboard } from './components/SpaceDetails/SpaceDashboard';
import { LandingPage } from './components/LandingPage/LandingPage';
import { DeleteSpaceModal } from './components/DeleteSpace/DeleteSpacModal';
import { UserReviewPage } from './components/UserReviewPage/UserReviewPage';
import 'video-react/dist/video-react.css';

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark'); // Apply dark theme on load
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <div className="bg-gray-900 w-full h-full App">
              <div className="mx-auto px-4 sm:px-8 lg:px-16">
                <Navbar2 />
                <div className="flex justify-around">
                  <Dashboard />
                </div>
                <Footer />
                  <CreateSpaceModal/>
                <DeleteSpaceModal/>
              </div>
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div className="bg-gray-900 w-full h-full App">
              <div className="mx-auto px-4 sm:px-8 lg:px-16">
                <Navbar2 />
                <LandingPage />
                <Footer />
              </div>
            </div>
          }
        />
        <Route
          path="/signin"
          element={
            <div className="bg-gray-900 w-full h-full App">
              <div className="mx-auto px-4 sm:px-8 lg:px-16">
                <Navbar2 />
                <div className="flex justify-around">
                  <SignIn />
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div className="bg-gray-900 w-full h-full App">
              <div className="mx-auto px-4 sm:px-8 lg:px-16">
                <Navbar2 />
                <div className="flex justify-around">
                  <Signup />
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/product/:domain"
          element={
            <div className="bg-gray-900 w-full h-full App">
              <div className="mx-auto px-4 sm:px-8 lg:px-16">
                  <Navbar2 />
                  <SpaceDashboard />
              </div>
              <EmbedSingleTestimonial />
              <CreateSpaceModal/>
            </div>
          }
        />
        <Route
          path="/review/:space"
          element={
            <UserReviewPage />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
