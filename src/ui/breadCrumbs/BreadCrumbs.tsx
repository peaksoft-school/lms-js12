import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function BasicBreadcrumbs() {
	const { pathname } = useLocation();
	return (
		<div role="presentation">
			{pathname === '/admin' && (
				<>
					<Breadcrumbs aria-label="breadcrumb">
						<Link to="admin/courses">Курсы</Link>
						<Link to="admin/groups">Группы</Link>
						<Link to="admin/announcement">announcement</Link>
						<Typography color="text.primary">Breadcrumbs</Typography>
					</Breadcrumbs>
				</>
			)}
			{pathname === '/' && (
				<>
					<Breadcrumbs aria-label="breadcrumb">
						<Link to="/courses"> My Courses</Link>
						<Link to="/groups">Группы</Link>
						<Typography color="text.primary">Breadcrumbs</Typography>
					</Breadcrumbs>
				</>
			)}
		</div>
	);
}
