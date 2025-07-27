import { UserProvider } from '../context/UserContext';
import { Header, MainContent } from './';

export function App() {
    return (
        <UserProvider>
            <div className="app">
                <Header />

                <MainContent />
            </div>
        </UserProvider>
    );
}; 