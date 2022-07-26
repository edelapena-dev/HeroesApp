import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { HeroesRoutes } from '../heroes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    return (
        //Manejo de rutas publicas y privadas para cuando se accede por login        
        <Routes>
            
            <Route path="login" 
                element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                } 
            />

            <Route 
                path="/*" 
                element={
                    <PrivateRoute> 
                        <HeroesRoutes />
                    </PrivateRoute>
                }
            />
                {/* <Route path="/*" element={<HeroesRoutes />} /> */}

        </Routes>
    )
}
