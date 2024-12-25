import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FC, ReactElement } from 'react';
import { ISelectField } from './interfaces/ISelectField';
import PropTypes from 'prop-types';

export const TaskSelectField: FC<ISelectField> = (props): ReactElement => {
	const {
		onChange = () => {},
		name = 'selectBox',
		value = '',
		label = 'Select Box',
		disabled = false,
		items = [{ value: '', label: 'Add Items' }],
	} = props;
	return (
		<>
			<FormControl
				fullWidth
				size='small'>
				<InputLabel id='status'>{label}</InputLabel>
				<Select
					onChange={onChange}
					label={label}
					id={`${name}-id-select`}
					disabled={disabled}
					value={value}
					labelId={name}
					name={name}>
					{items.map((item, idx) => (
						<MenuItem
							key={item.value + idx}
							value={item.value}>
							{item.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</>
	);
};

TaskSelectField.propTypes = {
	onChange: PropTypes.func,
	label: PropTypes.string,
	name: PropTypes.string,
	disabled: PropTypes.bool,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		}).isRequired
	),
};
