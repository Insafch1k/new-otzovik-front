import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HostListener } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
  isOpen?: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
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

  customerFaqItems: FaqItem[] = [
    {
      question: 'Что делать, если отзыв не опубликуют или удалят?',
      answer:
        'Если отзыв не будет опубликован в срок или его удалят в течение двух недель, система автоматически выставит задание повторно.',
    },
    {
      question: 'Сколько времени занимает выполнение заказа?',
      answer:
        'Обычно от 1 до 3 дней для 2ГИС и от 2 до 5 дней для Яндекс Карт, но срок зависит от сложности задания и количества исполнителей.',
    },
    {
      question: 'Что делать, если исполнитель не выполнил задание?',
      answer:
        'Если отзыв не опубликован в срок, задание автоматически пересоздается, чтобы его мог взять другой исполнитель.',
    },
    {
      question: 'Есть ли гарантия, что отзыв не удалят?',
      answer:
        'Мы не контролируем модерацию 2ГИС и Яндекс Карт, но даем гарантию две недели, как показывает практика, после такого период шанс, что отзыв пропадет, крайне мал.',
    },
  ];

  executorFaqItems: FaqItem[] = [
    {
      question:
        'Я выполнил задания, но деньги находятся на удержании, почему я их не могу вывести?',
      answer:
        'После публикации отзыва деньги находятся на удержании неделю, с целью того, чтобы обезопасить заказчика в случае удаления отзыва.',
    },
    {
      question: 'Почему вывод только от 500 рублей?',
      answer:
        'Это сделано для того, чтобы сильно не нагружать платежную систему многочисленными мелкими платежами.',
    },
    {
      question: 'Что будет, если я не выполню задание?',
      answer:
        'Если отзыв не будет опубликован в срок или будет отклонен модерацией, вы получите временную блокировку (на срок, зависящий от частоты нарушений). При повторных нарушениях блокировка может увеличиться.',
    },
    {
      question: 'Как получить оплату за выполненное задание?',
      answer:
        'Деньги за отзыв зачисляются на ваш баланс сразу после публикации отзыва на нужной площадке (2ГИС или Яндекс Карты). Однако эти средства будут на удержании 7 дней. После этого срока вы сможете их вывести.',
    },
    {
      question: 'Почему деньги за отзывы находятся на удержании?',
      answer:
        'Это защитная мера на случай, если отзыв будет удален или заблокирован модерацией площадки. Если через неделю отзыв остается опубликованным, деньги разблокируются.',
    },
    {
      question: 'Можно ли выполнять задания на нескольких аккаунтах?',
      answer:
        'Нет, мультиаккаунтинг запрещен. Если система обнаружит несколько аккаунтов, все они будут заблокированы.',
    },
    {
      question: 'Почему мой отзыв не засчитали?',
      answer:
        'Возможные причины: Отзыв не соответствует требованиям заказчика (например, забыли прикрепить фотографии, если они были в задании; текст отзыва не совпадает с тем, что указал заказчик). Отзыв удален модерацией платформы. Аккаунт, с которого оставлен отзыв, был заблокирован.',
    },
    {
      question: 'Как избежать блокировки аккаунта на 2ГИС/Яндекс Картах?',
      answer:
        'Не оставляйте слишком много отзывов за короткий срок, 1 аккаунт – 1 отзыв в день. Используйте качественные аккаунты (не новые и не "пустые").',
    },
  ];

  // Метод для переключения типа отображаемых вопросов
  switchFaqType(type: 'customer' | 'executor') {
    this.displayedFaqType = type;
  }

  getCurrentFaqItems(): FaqItem[] {
    return this.displayedFaqType === 'customer'
      ? this.customerFaqItems
      : this.executorFaqItems;
  }

  toggleQuestion(item: FaqItem) {
    item.isOpen = !item.isOpen;
  }
}
