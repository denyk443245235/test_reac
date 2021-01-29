import axios from 'axios';
import { api_key, nasa_api_url } from '../contants';
class NasaApiService {
	async	getPhotos ({ selectedCamera, selectedRover, sol}) {
		try {
			const response = axios.get(
				`${nasa_api_url}/mars-photos/api/v1/rovers/${selectedRover}/photos?sol=${sol}&camera=${selectedCamera}&api_key=${api_key}`
			);
			return response;
		} catch (e) {
			return e;
		}
	};
};

export default new NasaApiService();