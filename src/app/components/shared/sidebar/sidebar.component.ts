import { Component, EventEmitter, HostBinding, Inject, OnInit, Output, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { ThemeService } from '../../../services/theme.service';
import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTooltipModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public isDarkMode$: Observable<boolean>;
  public isVisible$: Observable<boolean>;
  
  collapsed = false;
  @Output() collapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private themeService: ThemeService, 
    public sidebarService: SidebarService // Hacer público para usar en template
  ) {
        this.isDarkMode$ = this.themeService.isDarkMode$;
        this.isVisible$ = this.sidebarService.isSidebarVisible$;
  }

  ngOnInit(): void {
    this.isDarkMode$ = this.themeService.isDarkMode$;
    this.isVisible$ = this.sidebarService.isSidebarVisible$;
  }

  toggleDarkMode(): void {
    this.themeService.toggleTheme();
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
    this.sidebarService
    this.collapsedChange.emit(this.collapsed); // ⚡ Emitimos boolean correctamente
  }


}
