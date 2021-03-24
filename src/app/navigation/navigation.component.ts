import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2, HostListener } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterViewInit {

  @ViewChild("menuButton") menuButton!: MatButton;

  isCollapsed: boolean;
  activeMenu: string = 'home';
  isMobile: boolean = false;
  home: any;
  about: any;
  services: any;
  team: any;
  firstTime: boolean = true;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.isCollapsed = false;
  }

  ngAfterViewInit() {
    this.handleClose(this.menuButton);
    this.isHandset$.subscribe(response => {

      this.isMobile = response;
      if (this.isMobile) {
        let element = document.querySelector('#navbar');
        element?.classList.add('shadow-sm');
      }
    });
  }

  closeSidenav(drawer: any) {
    this.isHandset$.subscribe(response => {
      if (response) {
        drawer.close();
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    if (!this.isMobile) {
      let element = document.querySelector('#navbar');
      if (element != null && window.pageYOffset > element?.clientHeight) {
        element?.classList.remove('bg-transparent');
        element?.classList.add('bg-white');
        element?.classList.add('shadow-sm');
      } else {
        element?.classList.remove('shadow-sm');
        element?.classList.remove('bg-white');
        element?.classList.add('bg-transparent');
      }
    }
    if (this.firstTime) {
      this.firstTime = false;
      this.home = document.getElementById('home')?.getBoundingClientRect();
      this.about = document.getElementById('about')?.getBoundingClientRect();
      this.services = document.getElementById('services')?.getBoundingClientRect();
      this.team = document.getElementById('team')?.getBoundingClientRect();
    }
    let scrollTop = document.documentElement.scrollTop;
    if (this.activeMenu != 'home' && scrollTop > (this.home.y - 56) && scrollTop < (this.about.y - 56)) {
      this.activeMenu = 'home';
    } else if (this.activeMenu != 'about' && scrollTop > (this.about.y - 56) && scrollTop < (this.services.y - 56)) {
      this.activeMenu = 'about';
    } else if (this.activeMenu != 'services' && scrollTop > (this.services.y - 56) && scrollTop < ((this.services.y - 56) + this.services.height - 100)) {
      this.activeMenu = 'services';
    } else if (this.activeMenu != 'team' && scrollTop > ((this.services.y - 56) + this.services.height - 100)) {
      this.activeMenu = 'team';
    }
  }

  handleClose = (button: MatButton) => {
    (<any>button)?._focusMonitor.stopMonitoring(button._getHostElement());
  };


  scroll(id: string) {
    this.activeMenu = id;
    let el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  }

  scrollAndClose(drawer: any, id: string) {
    this.closeSidenav(drawer);
    this.scroll(id);
  }
}
