import { Box, Button, FormControlLabel, Switch } from '@mui/material';
import { FC, ReactElement } from 'react';
import { ITaskFooter } from './interfaces/ITaskFooter';
import PropTypes from 'prop-types';
import { Status } from '../createTaskForm/enums/Status';

export const TaskFooter: FC<ITaskFooter> = (props): ReactElement => {
	const { id, status, onStatusChange = () => {}, onClick = () => {} } = props;

	return (
		<>
			<Box
				display='flex'
				justifyContent='space-between'
				mt={4}
				flexDirection='row'>
				<FormControlLabel
					label='In Progress'
					control={
						<Switch
							defaultChecked={status === Status.inProgress}
							onChange={(e) => onStatusChange(e, id)}
							color='warning'
						/>
					}
				/>
				<Button
					variant='contained'
					color='success'
					size='small'
					onClick={(e) => onClick(e, id)}
					sx={{
						color: '#ffffff',
					}}>
					Mark Complete
				</Button>
			</Box>
		</>
	);
};

TaskFooter.propTypes = {
	id: PropTypes.string.isRequired,
	status: PropTypes.string,
	onStatusChange: PropTypes.func,
	onClick: PropTypes.func,
};
