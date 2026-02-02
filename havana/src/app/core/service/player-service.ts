import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Track } from '../models/track.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {

  private audio: HTMLAudioElement | undefined;

  currentTrack = signal<Track | null>(null);
  isPlaying = signal<boolean>(false);
  currentTime = signal<number>(0);
  duration = signal<number>(0);

  private platformId: Object = inject(PLATFORM_ID)

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.audio = new Audio();
      this.audio.ontimeupdate = () => {
        this.currentTime.set(this.audio!.currentTime);
      };
      this.audio.onloadedmetadata = () => {
        this.duration.set(this.audio!.duration);
      }
      this.audio.onended = () => {
        this.isPlaying.set(false);

      }
    }
  }

  progress(seconds: number) {
    if (this.audio) {
      this.audio.currentTime = seconds;
    }
  }

  playTrack(track: Track) {
    if (!this.audio) return;

    if (!track.file && !track.filePath) {
      return;
    }

    this.currentTrack.set(track);
    let url: string;

    if (track.filePath) {
      url = `http://localhost:8080/api/tracks/file/${track.filePath}`;
    } else if (typeof track.file === 'string') {
      url = `http://localhost:8080/api/tracks/file/${track.file}`;
    } else if (track.file instanceof Blob || (track.file as any) instanceof File) {
      url = URL.createObjectURL(track.file as Blob);
    } else {
      return;
    }

    this.audio.src = url;
    this.audio.load()
    this.play();
  }

  play() {
    if (!this.audio) return;
    this.audio.play();
    this.isPlaying.set(true);
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying.set(false);
  }

  toggle() {
    if (this.isPlaying()) {
      this.pause()
    } else {
      this.play()
    }
  }



}
