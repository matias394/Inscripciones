import {
  ChangeDetectorRef,
  Component,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements AfterViewInit, OnDestroy {
  image: string = '';
  description: string = '';
  private unsubscribe$ = new Subject<void>();

  constructor(
    private bannerService: BannerService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.bannerService.currentImage
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((image) => {
        this.image = image;
        this.cdRef.detectChanges();
      });

    this.bannerService.currentDescription
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((description) => {
        this.description = description;
        this.cdRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
