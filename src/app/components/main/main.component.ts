import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main',
  imports: [CommonModule, RouterLink, RouterLinkActive, HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit, OnDestroy {
  isSmallScreen = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  ngOnDestroy() {
    // Clean up if needed
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    this.animateStars();
  }

  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 360;
  }

  private animateStars() {
    const stars = document.querySelectorAll('.fivestars-img');
    stars.forEach((star, index) => {
      const element = star as HTMLElement;
      element.style.transform = 'scale(1.8)';

      if (index === 0) {
        // top star
        element.style.transform += ' translateX(100px)';
      } else if (index === 1) {
        // middle star
        element.style.transform += ' translateX(-100px)';
      } else if (index === 2) {
        // bottom star
        element.style.transform += ' translateX(100px)';
      }
    });
  }
}
