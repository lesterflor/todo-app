import { TaskCounterStatusType } from '../../taskCounter/interfaces/ITaskCounter';
import { ITaskApi } from '../interfaces/ITaskApi';

export const countTasks = (
	tasks: ITaskApi[],
	status: TaskCounterStatusType
): number => {
	if (!Array.isArray(tasks)) {
		return 0;
	}

	const totalTasks = tasks.filter((item) => {
		return item.status !== status;
	});

	return totalTasks.length;
};
