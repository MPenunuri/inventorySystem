import { Component, HostListener } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { GettingStartComponent } from './getting-start/getting-start.component';
import { MainComponent } from './main/main.component';
import { UsageComponent } from './usage/usage.component';
import { WhyChooseComponent } from './why-choose/why-choose.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    AboutComponent,
    ContactComponent,
    GettingStartComponent,
    MainComponent,
    UsageComponent,
    WhyChooseComponent,
    RouterLink,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  sections: HTMLElement[] = [];
  main!: HTMLElement;
  about!: HTMLElement;
  why!: HTMLElement;
  usage!: HTMLElement;
  start!: HTMLElement;
  contact!: HTMLElement;

  ngOnInit() {
    this.main = document.querySelector('.mainSection') as HTMLElement;
    this.about = document.querySelector('.aboutSection') as HTMLElement;
    this.why = document.querySelector('.whySection') as HTMLElement;
    this.usage = document.querySelector('.usageSection') as HTMLElement;
    this.start = document.querySelector('.startSection') as HTMLElement;
    this.contact = document.querySelector('.contactSection') as HTMLElement;
    this.sections.push(this.main);
    this.sections.push(this.about);
    this.sections.push(this.why);
    this.sections.push(this.usage);
    this.sections.push(this.start);
    this.sections.push(this.contact);
    this.onScroll();
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPos = window.scrollY + window.innerHeight;

    this.sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.clientHeight;

      if (sectionTop < scrollPos && sectionBottom > window.scrollY) {
        if (!section.classList.contains('show')) {
          section.classList.add('show');
        }
      } else {
        section.classList.remove('show');
      }
    });
  }
}
