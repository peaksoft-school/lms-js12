import { api as index } from '../../api';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTable: builder.query<TABLE.TablesResponse, TABLE.TablesRequest>({
			query: () => ({
				url: 'https://api.elchocrud.pro/api/v1/59dd7fe356868f1b0a863261bd7b1d9b/THTDTR',
				method: 'GET'
			})
		})
	})
});

export const { useGetTableQuery } = api;
