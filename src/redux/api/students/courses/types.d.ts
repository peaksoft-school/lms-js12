namespace STUDENTSCOURSES {
	type Course = {
		id: number;
		title: string;
		description: string;
		image: string;
		dateOfEnd: string;
	};
	type GetStudentsResponse = {
		page: number;
		size: number;
		courses: Course[];
	};
	type GetStudentsRequest = void;
	// type GetStudentsRequest = {
	// 	page: number;
	// 	size: number;
	// };
}
