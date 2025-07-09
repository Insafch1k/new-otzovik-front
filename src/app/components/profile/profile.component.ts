import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface Star {
  leftColor: string;
  rightColor: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  rating: number = 4.47; 
  stars: Star[] = [];

  ngOnInit() {
    this.stars = this.calculateStars(this.rating);
  }

  calculateStars(rating: number): Star[] {
    const stars: Star[] = [];
    const fullStars = Math.floor(rating);
    const decimal = rating - fullStars;
    const totalStars = 5;

    for (let i = 0; i < totalStars; i++) {
      if (i < fullStars) {
        stars.push({
          leftColor: 'rgba(255, 175, 33, 1)',
          rightColor: 'rgba(255, 175, 33, 1)'
        });
      } else if (i === fullStars && decimal > 0) {
        if (decimal <= 0.25) {
          // меньше четверти -> пустая
          stars.push({
            leftColor: 'rgba(217, 217, 217, 1)',
            rightColor: 'rgba(217, 217, 217, 1)'
          });
        } else if (decimal <= 0.75) {
          // половина
          stars.push({
            leftColor: 'rgba(255, 175, 33, 1)',
            rightColor: 'rgba(217, 217, 217, 1)'
          });
        } else {
          // почти целая -> полная
          stars.push({
            leftColor: 'rgba(255, 175, 33, 1)',
            rightColor: 'rgba(255, 175, 33, 1)'
          });
        }
      } else {
        stars.push({
          leftColor: 'rgba(217, 217, 217, 1)',
          rightColor: 'rgba(217, 217, 217, 1)'
        });
      }
    }
    return stars;
  }
}
