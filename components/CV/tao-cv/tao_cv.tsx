import axios from 'axios'
import styles from '@/components/CV/tao-cv/styles.module.css'

export const STATIC_URL = 'https://devnext.timviec365.vn/static-tv'

export async function loadRemoteComponent(url: string) {
	try {
		const res = await axios.get(url)
		return res?.data
	} catch (err) {
		console.log(err)
	}
}
