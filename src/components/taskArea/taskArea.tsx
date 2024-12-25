import { Box, Alert, LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { format } from 'date-fns';
import React, {
	ChangeEvent,
	FC,
	ReactElement,
	useContext,
	useEffect,
} from 'react';
import { TaskCounter } from '../taskCounter/taskCounter';
import { Task } from '../task/task';
import { useQuery, useMutation } from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ITaskApi } from './interfaces/ITaskApi';
import { Status } from '../createTaskForm/enums/Status';
import { IUpdateTask } from './interfaces/IUpdateTask';
import { countTasks } from './helpers/countTasks';
import { TaskStatusChangedContext } from '../../context';

export const TaskArea: FC = (): ReactElement => {
	const tasksUpdatedContext = useContext(TaskStatusChangedContext);

	const { error, isLoading, data, refetch } = useQuery({
		queryKey: ['tasks'],
		queryFn: () => {
			return sendApiRequest<ITaskApi[]>('http://localhost:3200/tasks', 'GET');
		},
	});

	// update task mutation
	const updateTaskMutation = useMutation({
		mutationFn: (data: IUpdateTask) =>
			sendApiRequest('http://localhost:3200/tasks', 'PUT', data),
	});

	useEffect(() => {
		refetch();
	}, [tasksUpdatedContext.updated]);

	useEffect(() => {
		if (updateTaskMutation.isSuccess) {
			tasksUpdatedContext.toggle();
		}
	}, [updateTaskMutation.isSuccess]);

	function onStatusChangeHandler(e: ChangeEvent<HTMLInputElement>, id: string) {
		updateTaskMutation.mutate({
			id,
			status: e.target.checked ? Status.inProgress : Status.todo,
		});
	}

	function markCompleteHandler(
		e:
			| React.MouseEvent<HTMLButtonElement>
			| React.MouseEvent<HTMLAnchorElement>,
		id: string
	) {
		updateTaskMutation.mutate({
			id,
			status: Status.completed,
		});
	}

	return (
		<Grid
			item
			md={8}
			px={4}>
			<Box
				mb={8}
				px={4}>
				<h2>{`Status Of Your Tasks As Of ${format(new Date(), 'PPPP')}`}</h2>
			</Box>
			<Grid
				container
				display='flex'
				justifyContent='center'>
				<Grid
					item
					display='flex'
					flexDirection='row'
					justifyContent='space-around'
					alignItems='center'
					md={10}
					xs={12}
					mb={8}>
					<TaskCounter
						status={Status.todo}
						count={data ? countTasks(data, Status.todo) : undefined}
					/>
					<TaskCounter
						status={Status.inProgress}
						count={data ? countTasks(data, Status.inProgress) : undefined}
					/>
					<TaskCounter
						status={Status.completed}
						count={data ? countTasks(data, Status.completed) : undefined}
					/>
				</Grid>
				<Grid
					item
					display='flex'
					flexDirection='column'
					xs={10}
					md={8}>
					{error && (
						<Alert severity='error'>
							There was an error fetching your tasks
						</Alert>
					)}

					{!error && Array.isArray(data) && data.length === 0 && (
						<Alert severity='warning'>
							You do not have any tasks yet. Start by creating some tasks.
						</Alert>
					)}

					{isLoading ? (
						<LinearProgress />
					) : (
						Array.isArray(data) &&
						data.length > 0 &&
						data.map((item, idx) => {
							return item.status === Status.todo ||
								item.status === Status.inProgress ? (
								<Task
									key={`key${idx}`}
									id={item.id}
									title={item.title}
									date={new Date(item.date)}
									description={item.description}
									status={item.status}
									priority={item.priority}
									onStatusChange={onStatusChangeHandler}
									onClick={markCompleteHandler}
								/>
							) : (
								false
							);
						})
					)}
				</Grid>
			</Grid>
		</Grid>
	);
};
