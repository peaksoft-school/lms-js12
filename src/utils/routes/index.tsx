import {
	IconUser,
	IconDeviceDesktop,
	IconUsersGroup,
	IconUserCheck,
	IconCalendar,
	IconTrash,
	IconBellRinging2
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
			icon: <IconUserCheck stroke={2} />,
			link: 'theacher'
		},
		{
			name: 'Студенты',
			icon: <IconUser stroke={2} />
		},
		{
			name: 'Расписание',
			link: 'calendar',
			icon: <IconCalendar stroke={2} />
		},
		{
			name: 'Объявление',
			icon: <IconBellRinging2 stroke={2} />
		}
	],
	student: [
		{
			name: 'Группы',
			icon: <IconUsersGroup stroke={2} />
		},
		{
			name: 'Расписание',
			link: 'calendar',
			icon: <IconCalendar stroke={2} />
		},
		{
			name: 'Объявление',
			icon: <IconBellRinging2 stroke={2} />
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
			link: 'calendar',
			icon: <IconCalendar stroke={2} />
		},
		{
			name: 'Объявление',
			icon: <IconBellRinging2 stroke={2} />
		}
	]
};
