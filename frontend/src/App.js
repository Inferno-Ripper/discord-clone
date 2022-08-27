// stylesheet
import styles from './styles/App.module.css';
// components
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import axios from 'axios';

// react router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// redux
import { login, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

axios.defaults.withCredentials = true;

let socket;

function App() {
	// state
	const [rememberMe, setRememberMe] = useState(true);

	// redux
	const dispatch = useDispatch();

	// getting the user data from redux
	const user = useSelector(selectUser);

	// socket io connection
	useEffect(() => {
		socket = io(process.env.REACT_APP_API_URL);
	}, [socket]);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}/user/me`)
			.then((res) => dispatch(login(res.data)))
			.catch((err) => toast.error('Please Login Again'));
	}, []);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}/auth/login`)
			.then((res) => dispatch(login(res.data)))
			.catch((err) => toast.error('Please Login Again'));
	}, []);

	return (
		<BrowserRouter>
			<div className={styles.app}>
				{/* react toastify */}
				<ToastContainer
					theme='dark'
					position='top-right'
					toastStyle={{ backgroundColor: '#202225', color: 'white' }}
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss={false}
					draggable
					pauseOnHover={false}
				/>

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
									<Sidebar socket={socket} />

									<Chat socket={socket} />
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
