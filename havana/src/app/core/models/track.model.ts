export interface Track {
    id? : number , 
    title : string,
    artist : string,
    description? : string,
    song_duration : number,
    music_category : string
    createdAt : Date,
    file : Blob,
    cover? : string |Blob,
}
