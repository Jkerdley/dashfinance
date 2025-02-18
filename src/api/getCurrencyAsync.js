const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const targetUrl = 'https://currate.ru/api/?get=rates&pairs=USDRUB&key=43b2a5faa0f1d28ab76a409c595f86e4';
export const getCurrencyAsync = async (timeout) => {
	if (timeout) {
		return await fetch(proxyUrl + targetUrl)
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
