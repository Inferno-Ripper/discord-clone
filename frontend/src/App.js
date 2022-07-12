// stylesheet
import styles from './styles/App.module.css';
// components
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import axios from 'axios';

// react router
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	useParams,
} from 'react-router-dom';

// redux
import { login, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

axios.defaults.withCredentials = true;

function App() {
	// state
	const [rememberMe, setRememberMe] = useState(true);

	// redux
	const dispatch = useDispatch();

	// getting the user data from redux
	const user = useSelector(selectUser);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}/user/me`)
			.then((res) => dispatch(login(res.data)));
		// .then((res) => console.log(res.data));
	}, []);

	return (
		<BrowserRouter>
			<div className={styles.app}>
				<Routes>
					{/* IF user data is not there display the Login Page ELSE display the Home Page */}
					{!user ? (
						<Route
							path='/login'
							element={
								<Login rememberMe={rememberMe} setRememberMe={setRememberMe} />
							}
						/>
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
