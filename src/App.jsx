import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './components/templates/MainLayout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProjectCreatePage from './pages/ProjectCreatePage';
import TeamPage from './pages/TeamPage';
import TeamCreatePage from './pages/TeamCreatePage';
import GalleryPage from './pages/GalleryPage';
import GalleryCreatePage from './pages/GalleryCreatePage';
import SecretLoginRoute from './pages/SecretLoginRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/projects" element={<MainLayout><ProjectsPage /></MainLayout>} />
      <Route path="/projects/create" element={<MainLayout><ProjectCreatePage /></MainLayout>} />
      <Route path="/projects/:id/edit" element={<MainLayout><ProjectCreatePage /></MainLayout>} />
      <Route path="/projects/:id" element={<MainLayout><ProjectDetailPage /></MainLayout>} />
      <Route path="/team" element={<MainLayout><TeamPage /></MainLayout>} />
      <Route path="/team/create" element={<MainLayout><TeamCreatePage /></MainLayout>} />
      <Route path="/team/:id/edit" element={<MainLayout><TeamCreatePage /></MainLayout>} />
      <Route path="/gallery" element={<MainLayout><GalleryPage /></MainLayout>} />
      <Route path="/gallery/create" element={<MainLayout><GalleryCreatePage /></MainLayout>} />
      <Route path="/gallery/:id/edit" element={<MainLayout><GalleryCreatePage /></MainLayout>} />
      <Route path="/login_magic" element={<SecretLoginRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
