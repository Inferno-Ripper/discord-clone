// stylesheet
import styles from './styles/App.module.css';
// components
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import axios from 'axios';

// react router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// redux
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';

axios.defaults.withCredentials = true;

function App() {
	// getting the user data from redux
	const user = useSelector(selectUser);

	return (
		<BrowserRouter>
			<div className={styles.app}>
				<Routes>
					{/* IF user data is not there display the Login Page ELSE display the Home Page */}
					{!user ? (
						<Route path='/login' element={<Login />} />
					) : (
						<Route
							path='/'
							element={
								<>
									<Sidebar />
									<Chat />
								</>
							}
						/>
					)}
					<Route path='*' element={<Navigate to={user ? '/' : 'login'} />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
