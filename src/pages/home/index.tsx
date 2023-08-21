import { useState } from 'react'
import styles from './styles.module.scss'
export default function Home() {
	const [name, setName] = useState('')
	return (
		<>
		<section className={styles.container}>
		<div className={styles.header}>
			<h1>21</h1>
			<p>dias para<br/>transformar<br/>a SUA VIDA</p>
			<p>WHORKSHOP</p>
			<p>Seja bem vindo(a) {name}</p>
		</div>
		<div className={styles.title}>
			<h1>Título do vídeo</h1>
		</div>
		<section className={styles.containerPlayer}>
			<div>
				<iframe width="560" height="315" src="https://www.youtube.com/embed/F5gtstkfUmI" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
			</div>
			<div className={styles.containerVideos}>
				<div className={styles.videos}></div>
				<div className={styles.videos}></div>
				<div className={styles.videos}></div>
			</div>
		</section>
		</section>
		</>
	)
}