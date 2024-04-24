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
			icon: <IconUsersGroup stroke={2} />,
			link: 'group'
		},
		{
			name: 'Курсы ',
			icon: <IconDeviceDesktop stroke={2} />
		},
		{
			name: 'Учителя',
			icon: <IconUserCheck stroke={2} />,
			link: 'teacher'
		},
		{
			name: 'Студенты',
			icon: <IconUser stroke={2} />
		},
		{
			name: 'Расписание',
			icon: <IconCalendar stroke={2} />,
			link: 'calendar'
		},
		{
			name: 'Объявление',
			icon: <IconBellRinging2 stroke={2} />
		},
		{
			name: 'Trash',
			icon: <IconTrash stroke={2} />,
			link: 'trash'
		}
	],
	student: [
		{
			name: 'Курсы',
			icon: <IconDeviceDesktop stroke={2} />
		},
		{
			name: 'Расписание',
			icon: <IconCalendar stroke={2} />,
			link: 'calendar'
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
			icon: <IconCalendar stroke={2} />,
			link: 'calendar'
		},
		{
			name: 'Объявление',
			icon: <IconBellRinging2 stroke={2} />
		}
	]
};
