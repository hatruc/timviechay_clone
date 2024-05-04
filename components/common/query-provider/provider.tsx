import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

function QueryProviders({ children }: React.PropsWithChildren) {
	const [client] = React.useState(
		new QueryClient({
			defaultOptions: {
				queries: { staleTime: 5000, refetchOnWindowFocus: false },
			},
		})
	)

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default QueryProviders
