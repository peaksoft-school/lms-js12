import {
	IconUser,
	IconDeviceDesktop,
	IconUsersGroup,
	IconUserCheck,
	IconCalendar,
	IconTrash
} from '@tabler/icons-react';

export const links = {
	admin: [
		{
			name: 'Группы',
			icon: <IconUsersGroup stroke={2} />
		},
		{
			name: 'Курсы ',
			icon: <IconDeviceDesktop stroke={2} />
		},
		{
			name: 'Учителя',
			icon: <IconUserCheck stroke={2} />
		},
		{
			name: 'Студенты',
			icon: <IconUser stroke={2} />
		},
		{
			name: 'Расписание',
			icon: <IconCalendar stroke={2} />
		}
	],
	student: [
		{
			name: 'Группы',
			icon: <IconUsersGroup stroke={2} />
		},
		{
			name: 'Расписание',
			icon: <IconCalendar stroke={2} />
		}
	],
	instructor: [
		{
			name: 'Группы',
			icon: <IconUsersGroup stroke={2} />
		},
		{
			name: 'Карзина',
			icon: <IconTrash stroke={2} />
		},
		{
			name: 'Расписание',
			icon: <IconCalendar stroke={2} />
		}
	]
};
