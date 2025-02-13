import { useModal } from './Modal.jsx';
import { useState } from 'react';
import './ScheduleModal.css';

export default function ScheduleModal({ setScheduledTime }) {
	const { closeModal } = useModal();
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);

	const dates = [
		{ day: 'Today', date: 'Feb 12' },
		{ day: 'Tomorrow', date: 'Feb 13' },
		{ day: 'Fri', date: 'Feb 14' },
		{ day: 'Sat', date: 'Feb 15' },
	];

	const timeSlots = [
		'5:00 PM - 5:30 PM',
		'5:15 PM - 5:45 PM',
		'5:30 PM - 6:00 PM',
		'5:45 PM - 6:15 PM',
		'6:00 PM - 6:30 PM',
	];

	const handleSchedule = () => {
		if (selectedDate && selectedTime) {
			setScheduledTime(`${selectedDate} at ${selectedTime}`);
			closeModal();
		}
	};

	return (
		<div className='schedule-modal'>
			<h2>Schedule delivery</h2>

			<div className='date-selection'>
				{dates.map(({ day, date }) => (
					<button
						key={date}
						className={selectedDate === date ? 'selected' : ''}
						onClick={() => setSelectedDate(date)}>
						<span>{day}</span>
						<span>{date}</span>
					</button>
				))}
			</div>

			<div className='time-selection'>
				{timeSlots.map((time) => (
					<button
						key={time}
						className={selectedTime === time ? 'selected' : ''}
						onClick={() => setSelectedTime(time)}>
						{time}
					</button>
				))}
			</div>

			<div className='modal-actions'>
				<button
					onClick={handleSchedule}
					disabled={!selectedDate || !selectedTime}>
					Schedule
				</button>
				<button onClick={closeModal} className='cancel-btn'>
					Cancel
				</button>
			</div>
		</div>
	);
}
