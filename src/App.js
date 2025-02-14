import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import WorkflowsPage from './pages/WorkflowsPage';
import WorkflowDetailsPage from './pages/WorkflowDetailsPage';
import AuthPage from './pages/AuthPage';
import {useAuthenticate} from "./hooks/authenticate.hook";
import AppTheme from './components/AppTheme'
import {CssBaseline, Button} from "@mui/material";
import {AppContainer} from './components/AppContainer'

const App = () => {
    const {isAuthenticated, handleLogin, handleRegister, handleLogout, error} = useAuthenticate();

    return (
        <AppTheme>
            <CssBaseline enableColorScheme/>
            <AppContainer padding={0} direction="column" justifyContent="space-between">
                {!!isAuthenticated &&
                    <Button onClick={handleLogout}
                            variant='contained'
                            sx={{
                                position: 'absolute',
                                top: 10,
                                left: 10,
                                zIndex: 10000
                            }}>
                        Logout
                    </Button>}
                <Router>
                    <Routes>
                        <Route path="/auth" element={<AuthPage handleLogin={handleLogin} handleRegister={handleRegister}
                                                               error={error}/>}/>
                        <Route
                            path="/"
                            element={isAuthenticated ? <WorkflowsPage/> : <Navigate to="/auth"/>}
                        />
                        <Route
                            path="/workflows/:id"
                            element={isAuthenticated ? <WorkflowDetailsPage/> : <Navigate to="/auth"/>}
                        />
                    </Routes>
                </Router>
            </AppContainer>
        </AppTheme>
    );
};

export default App;