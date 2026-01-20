import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {DBSchema, IDBPDatabase, openDB} from 'idb';
import {Track} from '../models/track.model';

interface MusicDB extends DBSchema {
    tracks: {
        key: number;
        value: Track;
        indexes: { 'by-title': string };
    };
}

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private dbPromise: Promise<IDBPDatabase<MusicDB>> | undefined;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {

        if (isPlatformBrowser(this.platformId)) {
            this.dbPromise = openDB<MusicDB>('music-stream-db', 1, {
                upgrade(db) {
                    if (!db.objectStoreNames.contains('tracks')) {
                        const store = db.createObjectStore('tracks', {
                            keyPath: 'id',
                            autoIncrement: true
                        });
                        store.createIndex('by-title', 'title');
                    }
                },
            });
        }
    }

    private async getDB() {
        if (!this.dbPromise) {
            throw new Error('IndexedDB not available (Server Side)');
        }
        return this.dbPromise;
    }

    async getAllTracks(): Promise<Track[]> {
        const db = await this.getDB();
        return db.getAll('tracks');
    }

    async addTrack(track: Track): Promise<number> {
        const db = await this.getDB();
        return db.add('tracks', track);
    }

    async updateTrack(track: Track): Promise<void> {
        const db = await this.getDB();
        await db.put('tracks', track);
    }

    async deleteTrack(id: number): Promise<void> {
        const db = await this.getDB();
        return db.delete('tracks', id);
    }
}
