import React, { useState, useEffect } from 'react';
    import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
    
    function App() {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<AppList />} />
            <Route path="/app/:appName" element={<AppViewer />} />
          </Routes>
        </Router>
      );
    }
    
    function AppList() {
      const [apps, setApps] = useState(() => {
        const storedApps = localStorage.getItem('apps');
        return storedApps ? JSON.parse(storedApps) : [];
      });
      const [newAppName, setNewAppName] = useState('');
      const navigate = useNavigate();
    
      useEffect(() => {
        localStorage.setItem('apps', JSON.stringify(apps));
      }, [apps]);
    
      const handleCreateApp = () => {
        if (newAppName.trim() !== '') {
          const newApp = {
            name: newAppName,
            content: '<h1>Welcome to ' + newAppName + '</h1>',
          };
          setApps([...apps, newApp]);
          setNewAppName('');
        }
      };
    
      const handleViewApp = (appName) => {
        navigate(`/app/${appName}`);
      };
    
      return (
        <div className="app-container">
          <h1>My Web Apps</h1>
          <div className="app-form">
            <input
              type="text"
              placeholder="New App Name"
              value={newAppName}
              onChange={(e) => setNewAppName(e.target.value)}
            />
            <button onClick={handleCreateApp}>Create App</button>
          </div>
          <div className="app-list">
            {apps.map((app, index) => (
              <div key={index} className="app-item">
                <span>{app.name}</span>
                <button onClick={() => handleViewApp(app.name)}>View</button>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    function AppViewer() {
      const { appName } = useParams();
      const [apps, setApps] = useState(() => {
        const storedApps = localStorage.getItem('apps');
        return storedApps ? JSON.parse(storedApps) : [];
      });
      const [appContent, setAppContent] = useState('');
      const navigate = useNavigate();
    
      useEffect(() => {
        const currentApp = apps.find((app) => app.name === appName);
        if (currentApp) {
          setAppContent(currentApp.content);
        } else {
          navigate('/');
        }
      }, [appName, apps, navigate]);
    
      return (
        <div className="app-container">
          <button onClick={() => navigate('/')}>Back to App List</button>
          <div dangerouslySetInnerHTML={{ __html: appContent }} />
        </div>
      );
    }
    
    export default App;
