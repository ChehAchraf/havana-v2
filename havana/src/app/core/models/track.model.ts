export interface Track {
    id?: number,
    title: string,
    artist: string,
    description?: string,

    filePath?: string,
    coverPath?: string,
    duration?: number,
    genre?: string,

   
    song_duration?: number,
    music_category?: string
    createdAt?: Date,
    file?: Blob | string,
    cover?: string | Blob,
}
