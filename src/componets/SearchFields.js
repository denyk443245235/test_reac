import React, { useState } from 'react';
import {
	Paper,
	Button,
	MenuItem,
	TextField,
	Select
} from '@material-ui/core';
import { cameras, rovers } from "../contants";
import nasaApi from "../services/api.service";

const SearchFieldsComponent = ({
	 setPhotos,
	 showErrorModal,
	 setPreloaderVisibility
}) => {
	
	const [selectedCamera, setCamera] = useState(cameras[0]);
	const [selectedRover, setRover] = useState(rovers[0]);
	const [sol, setSol] = useState("");

	const styles = {
		container: {
			width: `100%`,
			display: 'flex',
			flexDirection: "column",
			height: '100%',
			justifyContent: "space-around",
			alignItems: 'center'
		},
		children: {
			width: `80%`,
		},
		btn: {
			width: `40%`
		},
	};
	
	const showErrorMessage = (message) => {
		showErrorModal({
			visible: true,
			message
		});
	};
	
	const getPhotosFromApi =  () => {
		if (!sol.length) {
			showErrorMessage("Sol can't be empty");
			return;
		}
		
		setPreloaderVisibility(true);
		
		nasaApi.getPhotos({
			selectedCamera,
			selectedRover,
			sol
		})
		.then(({data}) => {
			if (!data.photos.length) {
				showErrorMessage("Didn't find any photos!");
			}
			setPhotos(data.photos);
		})
		.catch((e) => {
			showErrorMessage(e.message);
		})
		.finally(() => {
			setPreloaderVisibility(false);
		})
	};
	
	return (
		<div className="search-fields-container">
			<Paper style={styles.container}>
				<TextField
					style={styles.children}
					label="Sol"
					type="number"
					value={sol}
					onChange={(e) => setSol(e.target.value)}
				/>
				<Select
					style={styles.children}
					onChange={(e) => setCamera(e.target.value)}
					value={selectedCamera}
				>
					{cameras.map((item,index) => (
						<MenuItem value={item} key={index}>{item}</MenuItem>
					))}
				</Select>
				<Select
					style={styles.children}
					onChange={(e) => setRover(e.target.value)}
					value={selectedRover}
				>
					{rovers.map((item, index) => (
						<MenuItem value={item} key={index}>{item}</MenuItem>
					))}
				</Select>
				<Button
					style={styles.btn}
					variant="contained"
					color="primary"
					onClick={getPhotosFromApi}>
					Get Photos
				</Button>
			</Paper>
		</div>
	);
};

export default SearchFieldsComponent;