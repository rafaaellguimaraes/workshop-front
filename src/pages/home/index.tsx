import { useState } from 'react'
import styles from './styles.module.scss'
export default function Home() {
	const [name, setName] = useState('')
	return (
		<>
		<div className={styles.header}>
			<h1>21</h1>
			<p>dias para<br/>transformar<br/>a SUA VIDA</p>
			<p>WHORKSHOP</p>
			<p>Seja bem vindo(a) {name}</p>
		</div>
		<div className={styles.container}>
			<h1>Título do vídeo</h1>
		</div>
		</>
	)
}