import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HostListener } from '@angular/core';
import { FaqComponent } from "../faq/faq.component";
import { HeaderComponent } from '../header/header.component';


interface FaqItem {
  isOpen?: boolean;
}

@Component({
  selector: 'app-order-history',
  imports: [CommonModule, RouterLink, RouterLinkActive, FaqComponent, HeaderComponent],
  standalone: true,
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent {
// Неизменяемая роль пользователя
  readonly currentRole: 'customer' | 'executor' = 'customer';
  // Тип отображаемых вопросов
  displayedFaqType: 'customer' | 'executor' = this.currentRole;
  nickname = 'Никнейм';
  isMenuOpen = false;

  // Переключение меню
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Закрытие меню
  closeMenu() {
    this.isMenuOpen = false;
  }

  // Закрытие при клике вне меню
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.burger') && !target.closest('.mobile-menu')) {
      this.closeMenu();
    }
  }

  // Закрытие при нажатии Escape
  @HostListener('document:keydown.escape')
  onEscapePress() {
    this.closeMenu();
  }
}


