declare namespace FluxPointAPI {
	type Color = string; // there's no list of all supported texts
	type Icon = "cat" | "chika" | "dog" | "neko" | "nyancat" | "pepe" | "pikachu" | "sneko" | "shrek" | string;
	type Banner = "love" | "mountain" | "purplewave" | "rainbow" | "space" | "sunset" | "swamp" | "wave" | string;

	interface WelcomeFormat {
		username: string;
		avatar: string;
		background: string;
		members?: string;
		icon?: Icon;
		banner?: Banner;
		color_welcome?: Color;
		color_username?: Color;
		color_members?: Color;
	}

	interface ImageFormatSquare {
		type: "bitmap";
		x: number;
		y: number;
		width: number;
		height: number;
		color: Color;
		round?: number;
	}

	interface ImageFormatURL {
		type: "url";
		url: string;
		x: number;
		y: number;
		width?: number;
		height?: number;
		round?: number;
	}

	interface ImageFormatCircle {
		type: "circle";
		x: number;
		y: number;
		radius: number;
		color: Color;
	}

	interface ImageFormatTriangle {
		type: "triangle";
		x: number;
		y: number;
		width: number;
		height: number;
		color: Color;
		cut: "topleft" | "topright" | "bottomleft" | "bottomright";
	}

	type AnyImageFormat = ImageFormatSquare | ImageFormatURL | ImageFormatCircle | ImageFormatTriangle;

	interface TextFormat {
		text: string;
		type: number;
		color: Color;
		x: number;
		y: number;
		font?: string;
		bold?: boolean;
		unicode?: boolean;
		outline?: number;
		outlinecolor?: Color;
	}

	interface SuccessResponse {
		success: true;
		code: 200;
		message: string;
	}

	interface FailResponse<C extends number = 400> {
		success: false;
		code: C;
		message: string;
	}

	class FluxPointAPI {
		apiKey: string | null;
		userAgent: string;
		constructor(apiKey?: string | null, userAgent?: string | null);

		getAPIInfo(): Promise<FailResponse<400> | FailResponse<401> | FailResponse<403> | FailResponse<500> | ({
			website: string;
			discord: string;
			docs: string;
			twitter: string;
			reddit: string;
			email: string;
			donate: string;
		} & SuccessResponse)>;

		testGen(): Promise<FailResponse<500> | Buffer>;

		welcomeGen(data: WelcomeFormat): Promise<FailResponse<401> | FailResponse<403> | FailResponse<500> | Buffer>;

		customGen(data: {
			base: AnyImageFormat;
			images: AnyImageFormat[];
			texts: TextFormat[];
			output: "png" | "jpg" | "webp";
		}): Promise<FailResponse<401> | FailResponse<403> | FailResponse<500> | Buffer>;

		getGalleryInfo(): Promise<FailResponse<500> | ({
			website: string;
			discord: string;
			docs: string;
			twitter: string;
			reddit: string;
			email: string;
			donate: string;
		} & SuccessResponse)>;

		randomAlbumImage(id: string, fetchImage: true): Promise<Buffer>;
		randomAlbumImage(id: string, fetchImage?: false): Promise<SuccessResponse & { file: string } | FailResponse<500>>;

		sfwRandomAnime(fetchImage: true): Promise<Buffer>;
		sfwRandomAnime(fetchImage?: false): Promise<SuccessResponse & { file: string } | FailResponse<500>>;

		sfwRandomWallpaper(fetchImage: true): Promise<Buffer>;
		sfwRandomWallpaper(fetchImage?: false): Promise<SuccessResponse & { file: string } | FailResponse<500>>;

		sfwRandomAzurlane(fetchImage: true): Promise<Buffer>;
		sfwRandomAzurlane(fetchImage?: false): Promise<SuccessResponse & { file: string } | FailResponse<500>>;

		sfwRandomNekopara(fetchImage: true): Promise<Buffer>;
		sfwRandomNekopara(fetchImage?: false): Promise<SuccessResponse & { file: string } | FailResponse<500>>;

		nsfwRandomAzurlane(fetchImage: true): Promise<Buffer>;
		nsfwRandomAzurlane(fetchImage?: false): Promise<SuccessResponse & { file: string } | FailResponse<500>>;

		nsfwRandomNekopara(fetchImage: true): Promise<Buffer>;
		nsfwRandomNekopara(fetchImage?: false): Promise<SuccessResponse & { file: string } | FailResponse<500>>;

		nsfwRandomLewd(fetchImage: true): Promise<Buffer>;
		nsfwRandomLewd(fetchImage?: false): Promise<SuccessResponse & { file: string } | FailResponse<500>>;

		private getImage(url: string): Promise<Buffer>;
	}
}

export = FluxPointAPI;
