export function trimDate(str) {
	if (str === undefined || str === null) return null;
	return str.substring(0, 10);
}

export function titleCase(str) {
	if (str === undefined) return null;
	if (str.length === 0) return str;
	return str.toLowerCase().replace(/(^|\s)(\w)/g, function (x) {
		return x.toUpperCase();
	});
}
