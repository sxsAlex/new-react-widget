import React, { useState } from 'react'

import { styles } from './styles'

const Avatar = props => {
	const [hovered, setHovered] = useState(false)

	return (
		<div style={props.style}>
			<div 
				className='transition-3'
				style={{
					...styles.avatarHello,
					...{opacity: hovered ? '1': '0'}
				}}
				>
					Hello!!!
			</div>

			<div
				className='transition-3'
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onClick={() => props.onClick && props.onClick()}
				style={{
					...styles.chatWithMeButton,
					...{ border: hovered ? '4px solid #f9f0ff' : '4px solid #7a39e8' }
				}}
			/>
		</div>
	)
}

export default Avatar