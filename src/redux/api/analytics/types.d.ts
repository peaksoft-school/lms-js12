/* eslint-disable @typescript-eslint/no-unused-vars */
namespace ANALYTIC {
	type Analytic = {
		courses: number,
		groups: number,
		instructors: number
	};
	type AnalyticsResponse = Analytic[];
	type AnalyticsRequest = void;

	type AnotherDataResponse = {
		students: number,
		graduated: number,
		total: number
	}
	type AnotherDataRequest = void;

}
