import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isFixed = false;

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.checkRoute();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.router.url === '/main') {
      this.isFixed = true;
      return;
    }

    if (this.router.url === '/main') {
      this.isFixed = false;
      return;
    }

    const headerHeight = 235;
    this.isFixed = window.scrollY > headerHeight;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  private checkRoute() {
    this.isFixed = this.router.url === '/main';
  }
}
