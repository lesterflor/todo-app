import { Box } from '@mui/material';
import { FC, ReactElement } from 'react';
import { TaskHeader } from './_taskHeader';
import { TaskDescription } from './_taskDescrition';
import { TaskFooter } from './_taskFooter';
import { ITask } from './interfaces/ITask';
import PropTypes from 'prop-types';
import { Status } from '../createTaskForm/enums/Status';
import { Priority } from '../createTaskForm/enums/Priority';
import { renderBorderPriorityCOlor } from './helpers/emitBorderColor';

export const Task: FC<ITask> = (props): ReactElement => {
	const {
		title = 'Test title',
		date = new Date(),
		description = 'Lorem ipsum dolor sit amet',
		priority = Priority.normal,
		status = Status.inProgress,
		onStatusChange = () => {},
		onClick = () => {},
		id,
	} = props;

	return (
		<>
			<Box
				display='flex'
				width='100%'
				justifyContent='flex-start'
				flexDirection='column'
				mb={4}
				p={2}
				sx={{
					width: '100%',
					backgroundColor: 'background.paper',
					borderRadius: '8px',
					border: '1px solid',
					borderColor: renderBorderPriorityCOlor(priority),
				}}>
				<TaskHeader
					title={title}
					date={date}
				/>
				<TaskDescription description={description} />
				<TaskFooter
					id={id}
					status={status}
					onStatusChange={onStatusChange}
					onClick={onClick}
				/>
			</Box>
		</>
	);
};

Task.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	onStatusChange: PropTypes.func,
	date: PropTypes.instanceOf(Date),
	onClick: PropTypes.func,
	priority: PropTypes.string,
	status: PropTypes.string,
};
