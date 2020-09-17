import * as http from "http";
import * as https from "https";
import { WelcomeFormat, AnyImageFormat, TextFormat, SuccessResponse, FailResponse } from "./types";
import * as pkg from "../package.json";
import URL from "url";

export default class FluxPointAPI {
	apiKey: string | null;
	userAgent: string;
	constructor(apiKey?: string | null, userAgent?: string | null) {
		this.apiKey = apiKey ?? null;
		this.userAgent = userAgent || `FluxPointAPI/${pkg.version} (https://github.com/DonovanDMC/FluxPointAPI)`;
	}

	async getAPIInfo() {
		const headers: {
			[k: string]: string;
		} = {
			"Content-Type": "application/json",
			"User-Agent": this.userAgent
		};
		if (this.apiKey) headers.Authorization = this.apiKey;

		return new Promise<({
			website: string;
			discord: string;
			docs: string;
			twitter: string;
			reddit: string;
			email: string;
			donate: string;
		} & SuccessResponse) | FailResponse<400> | FailResponse<401> | FailResponse<403> | FailResponse<500>>((a, b) => {
			const req = https.request({
				method: "GET",
				protocol: "https:",
				port: 443,
				hostname: "api.fluxpoint.dev",
				path: "/",
				headers
			}, (res) => {
				const data: any[] = [];

				res
					.on("data", (d) =>
						data.push(d)
					)
					.on("error", (err) =>
						b(err)
					)
					.on("end", () =>
						a(JSON.parse(Buffer.concat(data).toString()))
					);
			});

			req.end();
		});
	}

	async testGen() {
		const headers: {
			[k: string]: string;
		} = {
			"User-Agent": this.userAgent
		};
		if (this.apiKey) headers.Authorization = this.apiKey;
		return new Promise<Buffer | FailResponse<500>>((a, b) => {
			const req = https.request({
				method: "POST",
				protocol: "https:",
				port: 443,
				hostname: "api.fluxpoint.dev",
				path: "/gen/test",
				headers
			}, (res) => {
				const data: any[] = [];

				res
					.on("data", (d) =>
						data.push(d)
					)
					.on("error", (err) =>
						b(err)
					)
					.on("end", () => {
						let j: Parameters<typeof a>[0];
						try {
							j = JSON.parse(Buffer.concat(data).toString());
						} catch (e) {
							j = Buffer.concat(data);
						}

						return a(j);
					});
			});

			req.end();
		});
	}

	async welcomeGen(data: WelcomeFormat) {
		const headers: {
			[k: string]: string;
		} = {
			"Content-Type": "application/json",
			"User-Agent": this.userAgent
		};
		if (this.apiKey) headers.Authorization = this.apiKey;
		return new Promise<Buffer | FailResponse<401> | FailResponse<403> | FailResponse<500>>((a, b) => {
			const req = https.request({
				method: "POST",
				protocol: "https:",
				port: 443,
				hostname: "api.fluxpoint.dev",
				path: "/gen/welcome",
				headers
			}, (res) => {
				const data: any[] = [];

				res
					.on("data", (d) =>
						data.push(d)
					)
					.on("error", (err) =>
						b(err)
					)
					.on("end", () => {
						let j: Parameters<typeof a>[0];
						try {
							j = JSON.parse(Buffer.concat(data).toString());
						} catch (e) {
							j = Buffer.concat(data);
						}

						return a(j);
					});
			});

			req.write(JSON.stringify(data));

			req.end();
		});
	}

	async customGen(data: {
		base: AnyImageFormat;
		images: AnyImageFormat[];
		texts: TextFormat[];
		output: "png" | "jpg" | "webp";
	}) {
		const headers: {
			[k: string]: string;
		} = {
			"Content-Type": "application/json",
			"User-Agent": this.userAgent
		};
		if (this.apiKey) headers.Authorization = this.apiKey;

		return new Promise<Buffer | FailResponse<401> | FailResponse<403> | FailResponse<500>>((a, b) => {
			const req = https.request({
				method: "POST",
				protocol: "https:",
				port: 443,
				hostname: "api.fluxpoint.dev",
				path: "/gen/custom",
				headers
			}, (res) => {
				const data: any[] = [];

				res
					.on("data", (d) =>
						data.push(d)
					)
					.on("error", (err) =>
						b(err)
					)
					.on("end", () => {
						let j: Parameters<typeof a>[0];
						try {
							j = JSON.parse(Buffer.concat(data).toString());
						} catch (e) {
							j = Buffer.concat(data);
						}

						return a(j);
					});
			});

			req.write(JSON.stringify(data));

			req.end();
		});
	}

	async getGalleryInfo() {
		const headers: {
			[k: string]: string;
		} = {
			"Content-Type": "application/json",
			"User-Agent": this.userAgent
		};
		if (this.apiKey) headers.Authorization = this.apiKey;

		return new Promise<({
			website: string;
			discord: string;
			docs: string;
			twitter: string;
			reddit: string;
			email: string;
			donate: string;
		} & SuccessResponse) | FailResponse<500>>((a, b) => {
			const req = https.request({
				method: "GET",
				protocol: "https:",
				port: 443,
				hostname: "gallery.fluxpoint.dev",
				path: "/api",
				headers
			}, (res) => {
				const data: any[] = [];

				res
					.on("data", (d) =>
						data.push(d)
					)
					.on("error", (err) =>
						b(err)
					)
					.on("end", () =>
						a(JSON.parse(Buffer.concat(data).toString()))
					);
			});

			req.end();
		});
	}

	async randomAlbumImage(id: string, fetchImage: true): Promise<Buffer>;
	async randomAlbumImage(id: string, fetchImage?: false): Promise<SuccessResponse & { file: string } | FailResponse<500>>;
	async randomAlbumImage(id: string, fetchImage?: boolean) {
		const headers: {
			[k: string]: string;
		} = {
			"User-Agent": this.userAgent
		};
		if (this.apiKey) headers.Authorization = this.apiKey;

		return new Promise(async (a, b) => {
			const req = https.request({
				method: "GET",
				protocol: "https:",
				port: 443,
				hostname: "gallery.fluxpoint.dev",
				path: `/api/album/${id}`,
				headers
			}, (res) => {
				const data: any[] = [];

				res
					.on("data", (d) =>
						data.push(d)
					)
					.on("error", (err) =>
						b(err)
					)
					.on("end", async () => {
						const j = JSON.parse(Buffer.concat(data).toString());

						if (fetchImage === true) await this.getImage(j.file).then(a);
						else return j;
					});
			});

			req.end();
		});
	}

	async sfwRandomAnime(fetchImage: true): Promise<Buffer>;
	async sfwRandomAnime(fetchImage?: false): Promise<SuccessResponse & { file: string } | FailResponse<500>>;
	async sfwRandomAnime(fetchImage?: boolean) {
		const headers: {
			[k: string]: string;
		} = {
			"User-Agent": this.userAgent
		};
		if (this.apiKey) headers.Authorization = this.apiKey;

		return new Promise(async (a, b) => {
			const req = https.request({
				method: "GET",
				protocol: "https:",
				port: 443,
				hostname: "gallery.fluxpoint.dev",
				path: "/api/sfw/anime",
				headers
			}, (res) => {
				const data: any[] = [];

				res
					.on("data", (d) =>
						data.push(d)
					)
					.on("error", (err) =>
						b(err)
					)
					.on("end", async () => {
						const j = JSON.parse(Buffer.concat(data).toString());

						if (fetchImage === true) await this.getImage(j.file).then(a);
						else return j;
					});
			});

			req.end();
		});
	}

	async sfwRandomWallpaper(fetchImage: true): Promise<Buffer>;
	async sfwRandomWallpaper(fetchImage?: false): Promise<SuccessResponse & { file: string } | FailResponse<500>>;
	async sfwRandomWallpaper(fetchImage?: boolean) {
		const headers: {
			[k: string]: string;
		} = {
			"User-Agent": this.userAgent
		};
		if (this.apiKey) headers.Authorization = this.apiKey;

		return new Promise(async (a, b) => {
			const req = https.request({
				method: "GET",
				protocol: "https:",
				port: 443,
				hostname: "gallery.fluxpoint.dev",
				path: "/api/sfw/wallpaper",
				headers
			}, (res) => {
				const data: any[] = [];

				res
					.on("data", (d) =>
						data.push(d)
					)
					.on("error", (err) =>
						b(err)
					)
					.on("end", async () => {
						const j = JSON.parse(Buffer.concat(data).toString());

						if (fetchImage === true) await this.getImage(j.file).then(a);
						else return j;
					});
			});

			req.end();
		});
	}

	async sfwRandomAzurlane(fetchImage: true): Promise<Buffer>;
	async sfwRandomAzurlane(fetchImage?: false): Promise<SuccessResponse & { file: string } | FailResponse<500>>;
	async sfwRandomAzurlane(fetchImage?: boolean) {
		const headers: {
			[k: string]: string;
		} = {
			"User-Agent": this.userAgent
		};
		if (this.apiKey) headers.Authorization = this.apiKey;

		return new Promise(async (a, b) => {
			const req = https.request({
				method: "GET",
				protocol: "https:",
				port: 443,
				hostname: "gallery.fluxpoint.dev",
				path: "/api/sfw/azurlane",
				headers
			}, (res) => {
				const data: any[] = [];

				res
					.on("data", (d) =>
						data.push(d)
					)
					.on("error", (err) =>
						b(err)
					)
					.on("end", async () => {
						const j = JSON.parse(Buffer.concat(data).toString());

						if (fetchImage === true) await this.getImage(j.file).then(a);
						else return j;
					});
			});

			req.end();
		});
	}

	async sfwRandomNekopara(fetchImage: true): Promise<Buffer>;
	async sfwRandomNekopara(fetchImage?: false): Promise<SuccessResponse & { file: string } | FailResponse<500>>;
	async sfwRandomNekopara(fetchImage?: boolean) {
		const headers: {
			[k: string]: string;
		} = {
			"User-Agent": this.userAgent
		};
		if (this.apiKey) headers.Authorization = this.apiKey;

		return new Promise(async (a, b) => {
			const req = https.request({
				method: "GET",
				protocol: "https:",
				port: 443,
				hostname: "gallery.fluxpoint.dev",
				path: "/api/sfw/nekopara",
				headers
			}, (res) => {
				const data: any[] = [];

				res
					.on("data", (d) =>
						data.push(d)
					)
					.on("error", (err) =>
						b(err)
					)
					.on("end", async () => {
						const j = JSON.parse(Buffer.concat(data).toString());

						if (fetchImage === true) await this.getImage(j.file).then(a);
						else return j;
					});
			});

			req.end();
		});
	}

	async nsfwRandomAzurlane(fetchImage: true): Promise<Buffer>;
	async nsfwRandomAzurlane(fetchImage?: false): Promise<SuccessResponse & { file: string } | FailResponse<500>>;
	async nsfwRandomAzurlane(fetchImage?: boolean) {
		const headers: {
			[k: string]: string;
		} = {
			"User-Agent": this.userAgent
		};
		if (this.apiKey) headers.Authorization = this.apiKey;

		return new Promise(async (a, b) => {
			const req = https.request({
				method: "GET",
				protocol: "https:",
				port: 443,
				hostname: "gallery.fluxpoint.dev",
				path: "/api/nsfw/azurlane",
				headers
			}, (res) => {
				const data: any[] = [];

				res
					.on("data", (d) =>
						data.push(d)
					)
					.on("error", (err) =>
						b(err)
					)
					.on("end", async () => {
						const j = JSON.parse(Buffer.concat(data).toString());

						if (fetchImage === true) await this.getImage(j.file).then(a);
						else return j;
					});
			});

			req.end();
		});
	}

	async nsfwRandomNekopara(fetchImage: true): Promise<Buffer>;
	async nsfwRandomNekopara(fetchImage?: false): Promise<SuccessResponse & { file: string } | FailResponse<500>>;
	async nsfwRandomNekopara(fetchImage?: boolean) {
		const headers: {
			[k: string]: string;
		} = {
			"User-Agent": this.userAgent
		};
		if (this.apiKey) headers.Authorization = this.apiKey;

		return new Promise(async (a, b) => {
			const req = https.request({
				method: "GET",
				protocol: "https:",
				port: 443,
				hostname: "gallery.fluxpoint.dev",
				path: "/api/nsfw/nekopara",
				headers
			}, (res) => {
				const data: any[] = [];

				res
					.on("data", (d) =>
						data.push(d)
					)
					.on("error", (err) =>
						b(err)
					)
					.on("end", async () => {
						const j = JSON.parse(Buffer.concat(data).toString());

						if (fetchImage === true) await this.getImage(j.file).then(a);
						else return j;
					});
			});

			req.end();
		});
	}

	async nsfwRandomLewd(fetchImage: true): Promise<Buffer>;
	async nsfwRandomLewd(fetchImage?: false): Promise<SuccessResponse & { file: string } | FailResponse<500>>;
	async nsfwRandomLewd(fetchImage?: boolean) {
		const headers: {
			[k: string]: string;
		} = {
			"User-Agent": this.userAgent
		};
		if (this.apiKey) headers.Authorization = this.apiKey;

		return new Promise(async (a, b) => {
			const req = https.request({
				method: "GET",
				protocol: "https:",
				port: 443,
				hostname: "gallery.fluxpoint.dev",
				path: "/api/nsfw/lewd",
				headers
			}, (res) => {
				const data: any[] = [];

				res
					.on("data", (d) =>
						data.push(d)
					)
					.on("error", (err) =>
						b(err)
					)
					.on("end", async () => {
						const j = JSON.parse(Buffer.concat(data).toString());

						if (fetchImage === true) await this.getImage(j.file).then(a);
						else return j;
					});
			});

			req.end();
		});
	}

	private async getImage(url: string) {
		const headers: {
			[k: string]: string;
		} = {
			"User-Agent": this.userAgent
		};
		const uri = URL.parse(url);

		return new Promise<Buffer>((a, b) => {
			const req = (uri.protocol === "https:" ? https : http).request({
				method: "GET",
				protocol: uri.protocol,
				port: uri.port,
				hostname: uri.hostname,
				path: uri.path,
				headers
			}, (res) => {
				const data: any[] = [];

				res
					.on("data", (d) =>
						data.push(d)
					)
					.on("error", (err) =>
						b(err)
					)
					.on("end", () =>
						a(Buffer.concat(data))
					);
			});

			req.end();
		});
	}
}
