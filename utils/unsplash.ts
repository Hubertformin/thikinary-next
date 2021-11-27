import {UnSplashPhoto, UnSplashSearchResults} from "../models/unsplash";

export default class Unsplash {
    private static apiUrl = 'https://api.unsplash.com';
    private static accessKey = '41511d99229083db199bf8e5492e4d26f1c21b56f085dc07d3dd67cddaa75eb5';

    static getRandom(count = 9): Promise<UnSplashPhoto[]> {
        return fetch(`${this.apiUrl}/photos/random?client_id=${this.accessKey}&count=${count}&orientation=landscape`, {
            method: 'GET',
            headers: {
                'Accept-Version': 'v1',
            }
        }).then(response => response.json());
    }
    /*
    * Search photos
    * */
    static searchPhotos(query, count = 9): Promise<UnSplashSearchResults> {
        return fetch(`${this.apiUrl}/search/photos/?query=${query}&client_id=${this.accessKey}&per_page=${count}&orientation=landscape`, {
            method: 'GET',
            headers: {
                'Accept-Version': 'v1',
            }
        }).then(response => response.json());
    }
}