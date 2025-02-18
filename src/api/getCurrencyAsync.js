import { CURRENCY_COURSE_API } from './CURRENCY_API_URL';

export const getCurrencyAsync = async (timeout) => {
	if (timeout) {
		return await fetch(CURRENCY_COURSE_API)
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
				return response;
			})
			.catch((err) => console.error(err));
	} else {
		return null;
	}
};

// DELETE {
// 	headers: {
// 		'content-type': 'application/json',
// 	},
// 	method: method || 'GET',
// 	credentials: 'include',
// 	body: data ? JSON.stringify(data) : undefined,
// }
