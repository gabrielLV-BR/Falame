import Document from "next/document";
import { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Sen:wght@400;700&display=swap"
						rel="stylesheet"
					/>
					<script
						src="https://apis.google.com/js/platform.js"
						async
						defer
					/>
					<meta
						name="google-signin-client_id"
						content="1017562889934-vo6omn621job7l14o7qsdk5js617qtnn.apps.googleusercontent.com"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
