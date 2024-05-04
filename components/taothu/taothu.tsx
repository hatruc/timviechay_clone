export const parseable = (inputJsonString: string) => {
    try {
        JSON.parse(inputJsonString)
        return true
    } catch (error) {
        return false
    }
}