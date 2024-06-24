import type { AppProps } from "next/app"
import { ThirdwebProvider } from "@thirdweb-dev/react"
import "../styles/globals.css"
import { Sepolia } from "@thirdweb-dev/chains"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThirdwebProvider activeChain={Sepolia} clientId="{YOUR_CLIENT_ID}">
			<Component {...pageProps} />
		</ThirdwebProvider>
	)
}

export default MyApp
