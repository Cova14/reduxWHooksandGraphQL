import React, { useState, useEffect } from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import { connect } from 'react-redux'

function Home({chars}) {

	function renderCharacter() {
		let char = chars[0]
		return (
			<Card {...char} />
		)
	}

	return (
		<div className={styles.container}>
			<h2>Personajes de Rick y Morty</h2>
			<div>
				{renderCharacter()}
			</div>
		</div>
	)
}

function mapState(state) {
	return {
		chars: state.chars.array
	}
}

export default connect(mapState)(Home)