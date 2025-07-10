import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from './services/profile.service';
import { Order, Organization } from './models/profile.model';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Star {
  leftColor: string;
  rightColor: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, HttpClientModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  orders: Order[] = [];
  token: string = 'ВАШ_ТОКЕН'; // получи из AuthService или локалки
  starsMap: { [key: number]: Star[] } = {};
  balance: string | null = null;
  isAddOrgOpen: boolean = false;
  orgLink: string = '';
  isLinkValid: boolean = false;
  linkError: string | null = null;
  organizations: Organization[] = [];
  isTopUpOpen: boolean = false;
  topUpAmount: number | null = null;
  topUpError: string | null = null;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.loadActiveOrders();
    this.loadBalance();
    this.loadOrganizations();
  }

  loadActiveOrders() {
    this.profileService.getActiveOrders(this.token).subscribe({
      next: (response) => {
        this.orders = response.orders;
        this.orders.forEach(order => {
          this.starsMap[order.id] = this.calculateStars(order.rate);
        });
      },
      error: (error) => {
        console.error('Ошибка загрузки заказов', error);
      }
    });
  }

  loadBalance() {
    this.profileService.getCustomerBalance(this.token).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.balance = response.balance;
        } else {
          console.error('Ошибка при получении баланса:', response.message);
        }
      },
      error: (error) => {
        console.error('Ошибка загрузки баланса:', error);
      }
    });
  }

  loadOrganizations() {
    this.profileService.getAllOrganizations(this.token).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.organizations = response.data;
        } else {
          console.warn('Организации не найдены:', response.message);
          this.organizations = [];
        }
      },
      error: (error) => {
        console.error('Ошибка загрузки организаций:', error);
      }
    });
  }

  addOrganization() {
    if (this.isLinkValid) {
      this.profileService.addOrganization(this.token, this.orgLink).subscribe({
        next: (response) => {
          console.log('Организация успешно добавлена:', response);
          this.loadOrganizations(); // перезагружаем список
          this.closeAddOrgModal();
        },
        error: (error) => {
          console.error('Ошибка при добавлении организации:', error);
        }
      });
    }
  }

  getPlatformImage(platform: string): string {
    return platform.toLowerCase() === '2gis'
      ? 'assets/images/profile/TwoGis.webp'
      : 'assets/images/profile/ya.webp';
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
          stars.push({
            leftColor: 'rgba(217, 217, 217, 1)',
            rightColor: 'rgba(217, 217, 217, 1)'
          });
        } else if (decimal <= 0.75) {
          stars.push({
            leftColor: 'rgba(255, 175, 33, 1)',
            rightColor: 'rgba(217, 217, 217, 1)'
          });
        } else {
          stars.push({
            leftColor: 'rgba(255, 175, 33, 1)',
            rightColor: 'rgba(255, 175, 217, 1)'
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

  openAddOrgModal() {
    this.isAddOrgOpen = true;
    this.orgLink = '';
    this.isLinkValid = false;
    this.linkError = null;
  }

  closeAddOrgModal() {
    this.isAddOrgOpen = false;
    this.orgLink = '';
    this.isLinkValid = false;
    this.linkError = null;
  }

  validateLink() {
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
    if (!this.orgLink) {
      this.isLinkValid = false;
      this.linkError = 'Пожалуйста, введите ссылку';
    } else if (!urlPattern.test(this.orgLink)) {
      this.isLinkValid = false;
      this.linkError = 'Введите корректную ссылку';
    } else {
      this.isLinkValid = true;
      this.linkError = null;
    }
  }

  openTopUpModal() {
    this.isTopUpOpen = true;
    this.topUpAmount = null;
    this.topUpError = null;
}

  closeTopUpModal() {
      this.isTopUpOpen = false;
      this.topUpAmount = null;
      this.topUpError = null;
  }

  confirmTopUp() {
    if (this.topUpAmount === null || this.topUpAmount <= 0) {
        this.topUpError = 'Введите корректную сумму';
        return;
    }

    this.profileService.topUpBalance(this.token, this.topUpAmount).subscribe({
        next: (response) => {
            console.log('Баланс успешно пополнен:', response);
            this.loadBalance();
            this.closeTopUpModal();
        },
        error: (error) => {
            console.error('Ошибка при пополнении баланса:', error);
            this.topUpError = 'Не удалось пополнить баланс, попробуйте снова.';
        }
    });
  } 


}