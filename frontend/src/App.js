// stylesheet
import './styles/App.css';
// components
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';

// redux
import { selectUser } from './features/userSlice';
import { useSelector, useDispatch } from 'react-redux';

function App() {
	// getting the user data from redux
	const user = useSelector(selectUser);

	return (
		<>
			<div className='App'>
				{/* IF user data is not there display the Login Page ELSE display the Home Page */}
				{!user ? (
					<Login />
				) : (
					<>
						<Sidebar />
						<Chat />
					</>
				)}
			</div>
		</>
	);
}

export default App;
