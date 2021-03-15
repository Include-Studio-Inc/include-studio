import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: "app.component.html",
  styles: []
})
export class AppComponent {

  // @HostListener('scroll', ['$event']) 
  onScroll(event: Event) {
    let element = <HTMLElement>document.querySelector('.bg-transparent');
    if (window.pageYOffset > element.clientHeight) {
      element.classList.remove('bg-transparent');
      element.classList.add('bg-white');
      element.classList.add('shadow-sm');
    } else {
      element.classList.remove('shadow-sm');
      element.classList.remove('bg-white');
      element.classList.add('bg-transparent');
    }
  }
}
