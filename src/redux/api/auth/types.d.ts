/* eslint-disable @typescript-eslint/no-unused-vars */

namespace AUTH {
	type PostFindResponse = {
		token: string;
		// login: string;
		// password: string;
	};
	type PostFindRequest = {
		login: string;
		password: string;
	};
}
