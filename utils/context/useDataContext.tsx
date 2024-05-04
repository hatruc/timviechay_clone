import React, { createContext, useState } from 'react'

export const useDataContainer = createContext<any>(false)
export const DataContainerContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [dataContainer, setDataContainer] = useState<any>({ recall: false })
	const hanldeClearRecall = () => {
		setDataContainer({
			...(typeof dataContainer.recall !== 'undefined' ? { recall: !dataContainer.recall } : { recall: true }),
		})
	}
	return <useDataContainer.Provider value={{ dataContainer, setDataContainer, hanldeClearRecall }}>{children}</useDataContainer.Provider>
}
