import React from 'react';
import styles from '../styles/DateOfBirth.module.css';

const DateOfBirth = ({ setDOBMonth, setDOBDay, setDOBYear }) => {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	let days = [];

	for (let i = 1; i < 32; i++) {
		days.push(i);
	}

	let currentYear = new Date().getFullYear();

	let years = [];

	for (let i = currentYear; i > currentYear - 101; i--) {
		years.push(i);
	}

	return (
		<div className={styles.dateOfBirth}>
			{/* month */}
			<select name='month' onChange={(e) => setDOBMonth(e.target.value)}>
				<option value='Month'>Month</option>

				{months.map((month) => {
					return (
						<option key={month} value={month}>
							{month}
						</option>
					);
				})}
			</select>

			{/* day */}
			<select name='day' onChange={(e) => setDOBDay(e.target.value)}>
				<option value='Day'>Day</option>

				{days.map((day) => {
					return (
						<option key={`${day}57434`} value={day}>
							{day}
						</option>
					);
				})}
			</select>

			{/* year */}
			<select name='year' onChange={(e) => setDOBYear(e.target.value)}>
				<option value='Year'>Year</option>

				{years.map((year) => {
					return (
						<option key={`${year}68327`} value={year}>
							{year}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default DateOfBirth;
