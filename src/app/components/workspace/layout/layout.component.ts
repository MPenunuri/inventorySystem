import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit, AfterViewInit {
  private outletContainer!: HTMLElement;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.animateOutlet();
      });
  }

  ngAfterViewInit() {
    this.outletContainer = document.getElementById('outletContainer')!;
    this.animateOutlet();
  }

  animateOutlet() {
    if (this.outletContainer) {
      this.outletContainer.classList.remove('visible');
      this.outletContainer.classList.add('invisible');

      setTimeout(() => {
        this.outletContainer.classList.remove('invisible');
        this.outletContainer.classList.add('visible');
      }, 50);
    }
  }
}
