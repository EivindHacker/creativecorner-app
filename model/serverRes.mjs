class ServerResponse {
	constructor(data, message) {
		this.data = data;
		this.message = message;
		this.success = true;
	}
}

export {ServerResponse};
