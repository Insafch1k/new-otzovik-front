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
    // Если маршрут /main, заголовок всегда раскрыт
    if (this.router.url === '/main') {
      this.isFixed = false;
      return;
    }

    // Логика для других маршрутов
    if (this.router.url === '/') {
      this.isFixed = true;
      return;
    }

    const headerHeight = 235;
    this.isFixed = window.scrollY > headerHeight;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  private checkRoute() {
    // Если маршрут /main, заголовок всегда раскрыт
    if (this.router.url === '/main') {
      this.isFixed = false;
    } else {
      this.isFixed = this.router.url === '/';
    }
  }
}
