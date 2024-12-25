import { ITaskDescription } from './ITaskDescription';
import { ITaskFooter } from './ITaskFooter';
import { ItaskHeader } from './ITaskHeader';

export interface ITask extends ItaskHeader, ITaskDescription, ITaskFooter {
	priority?: string;
}
