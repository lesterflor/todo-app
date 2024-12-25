import React, { FC, ReactElement } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { IDateField } from './interfaces/IDateField';
import PropTypes from 'prop-types';

export const TaskDateField: FC<IDateField> = (props): ReactElement => {
	const {
		disabled = false,
		onChange = (date) => {
			console.log(date);
		},
		value = new Date(),
	} = props;

	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DatePicker
					label='Controlled picker'
					value={value}
					onChange={onChange}
					disabled={disabled}
				/>
			</LocalizationProvider>
		</>
	);
};

TaskDateField.propTypes = {
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	value: PropTypes.instanceOf(Date),
};
