import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormatPipe',
})
export class DurationFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (!value || isNaN(value)) return '0:00';
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return `${minutes}:${formattedSeconds}`;
  }

}
