import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { PageItemComponent, PageLinkDirective, PaginationComponent } from '@coreui/angular';

@Component({
  selector: 'app-pagination-manage',
  standalone: true,
  imports: [PageItemComponent, PageLinkDirective, PaginationComponent, CommonModule],
  templateUrl: './pagination-manage.component.html',
  styleUrl: './pagination-manage.component.scss'
})
export class PaginationManageComponent {
  @Input("page")
  page: number = 0;
  @Input("size")
  size: number = 0;
  @Input("totalPage")
  totalPage: number = 0;

  @Output("changePage")
  changePage = new EventEmitter();

  listPage: any[] = []

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["totalPage"]) {
      this.listPage = []
      for (let i = 0; i < changes["totalPage"].currentValue; i++) {
        this.listPage.push({
          page: i+1,
          active: (this.page == i+1) ? true : false
        })
      }
    }
  }

  onPage(pageItem: any) {
    this.listPage.forEach((page: any) => {
      if (page.page == pageItem.page) {
        page.active = true
      } else {
        page.active = false
      }
    })
    this.changePage.emit(pageItem.page)
  }

  next() {
    if (this.listPage.length < (this.page + 1)) {
      return
    }
    this.listPage.forEach((page: any) => {
      if (page.page == (this.page + 1)) {
        page.active = true
      } else {
        page.active = false
      }
    })
    this.page++
    this.changePage.emit(this.page)
  }
}
