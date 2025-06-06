
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from "./Dashboard";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Ensure we redirect to the dashboard when on the root path
    navigate('/', { replace: true });
  }, [navigate]);

  return <Dashboard />;
};

export default Index;
