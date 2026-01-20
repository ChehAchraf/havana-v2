import {computed, inject, Injectable, signal} from '@angular/core';
import {StorageService} from './storage.service';
import {Track} from '../models/track.model';

@Injectable({
    providedIn: 'root',
})

export class TrackService {

    private storage = inject(StorageService);


    tracks = signal<Track[]>([]);
    searchQuery = signal<string>('');
    isLoading = signal<boolean>(true);
    error = signal<string | null>(null);

    constructor() {
        this.loadTracks();
    }

    async loadTracks() {
        this.isLoading.set(true);
        try {
            const data = await this.storage.getAllTracks();
            this.tracks.set(data);

        } catch (error) {
            this.error.set('Failed to load all tracks');
            console.log(error)
        } finally {
            this.isLoading.set(false);
        }
    }

    async addTrack(track: Track) {
        this.isLoading.set(true)
        try {
            const id = await this.storage.addTrack(track);
            const newTrack = {...track, id};
            this.tracks.update(currentList => [...currentList, newTrack]);
        } catch (error) {
            this.error.set("could not save the track")
        } finally {
            this.isLoading.set(false);
        }
    }

    async updateTrack(updatedTrack: Track) {
        try {
            await this.storage.updateTrack(updatedTrack);

            this.tracks.update(currentList => {
                return currentList.map(track => {
                    if (track.id === updatedTrack.id) {
                        return updatedTrack;
                    }
                    return track;
                })
            })
        } catch (error) {
            this.error.set("there was an error ")
        }
    }

    async removeTrack(id: number) {
        try {
            await this.storage.deleteTrack(id);
            this.tracks.update(currentList =>
                currentList.filter(track => track.id !== id)
            );
        } catch (error) {
            this.error.set(`error deleting the track with the id : ${id}`)
        } finally {
            this.isLoading.set(false);
        }
    }

    setSearchQuery(query: string) {
        this.searchQuery.set(query);
    }


}
