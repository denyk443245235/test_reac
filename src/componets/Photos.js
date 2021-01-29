import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Scroll from 'react-scroll';
import '../App.css';

const PhotosComponent = ({photos}) => {
	const [visible, setVisible] = useState(3);
	const scroll = Scroll.animateScroll;
	
	const loadMorePages = () => {
		scroll.scrollToBottom();
		setVisible(count => count + 3);
	};
	
	const visiblePhotos = photos.slice(0, visible);
	
	return (
		<div className="down-container">
			<div className="photos-container">
				{visiblePhotos.map(({img_src}, index) => (
					<img
						alt="*"
						key={index}
						className="photo-item"
						src={img_src}/>
				))}
			</div>
			{(photos.length > 0 && visiblePhotos.length !== photos.length) &&
			<Button
				variant="contained"
				color="primary"
				onClick={loadMorePages}
			>
				Load more...
			</Button>
			}
		</div>
	)
};

export default PhotosComponent;