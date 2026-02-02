import { Component, inject } from '@angular/core';
import { PlayerService } from '../../../../core/service/player-service';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.html',
  styleUrl: './player.css',
})
export class Player {
  public audioService = inject(PlayerService)

  onPregress(event : any){
    const value = event.target.value
    this.audioService.progress(value)
  }
  formatTime(time: number): string {
    if (isNaN(time)) return '0:00';

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
