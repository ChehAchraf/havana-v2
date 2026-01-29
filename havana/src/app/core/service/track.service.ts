import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Track} from '../models/track.model';

@Injectable({
    providedIn: 'root',
})
export class TrackService {

    private http = inject(HttpClient);

    private apiUrl = 'http://localhost:8080/api/tracks';

    getAllTracks(search: string, page: number): Observable<any> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', '6');

        if (search) {
            params = params.set('search', search);
        }

        return this.http.get<any>(this.apiUrl, { params });
    }

    saveTrack(trackData: any, audioFile: File, coverFile?: File): Observable<Track> {
        const formData = new FormData();

        formData.append('track', new Blob([JSON.stringify(trackData)], {
            type: 'application/json'
        }));

        formData.append('audioFile', audioFile);

        if (coverFile) {
            formData.append('coverFile', coverFile);
        }

        return this.http.post<Track>(this.apiUrl, formData);
    }

    deleteTrack(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    updateTrack(id: number, trackData: any): Observable<Track> {

        return new Observable();
    }
}
