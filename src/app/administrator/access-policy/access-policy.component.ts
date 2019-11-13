import { Component, OnInit, HostListener, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { MDBModalRef, MDBModalService, MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccessPolicyService } from './access-policy.service';

@Component({
  selector: 'app-access-policy',
  templateUrl: './access-policy.component.html',
  styleUrls: ['./access-policy.component.scss']
})
export class AccessPolicyComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['id', 'Access Policy', 'Description', 'view', 'edit'];

  searchText: string = '';
  previous: string;
  modalRef: MDBModalRef;
  maxVisibleItems: number = 6;
  constructor(private cdRef: ChangeDetectorRef, private modalService: MDBModalService) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    for (let i = 1; i <= 25; i++) {
      this.elements.push({id: i.toString(), Access_Policy: 'Access_Policy' + i, description: 'description ' + i, view: 'action '+ i, edit: 'action '+ i});
    }
    console.log('sdsd', this.elements)

    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }
  
  openModal() {
    console.log('cld')
    this.modalRef = this.modalService.show(AccessPolicyFormComponent, {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        class: ''
       
    });

    this.modalRef.content.action.subscribe( (result: any) => { console.log(result); });
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {
    });
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }

}

@Component({
  selector: 'app-access-policy-form',
  templateUrl: './access-policy-form.component.html',
  styleUrls: ['./access-policy.component.scss']
})
export class AccessPolicyFormComponent implements OnInit {
  form: FormGroup;
  ngOnInit() {
    this.createForm();
  }
  constructor(public modalRef: MDBModalRef, private formBuilder: FormBuilder, private accessPolicyService: AccessPolicyService) {

  }
  createForm() {
    this.form = this.formBuilder.group({
      accessPolicyname: ['', Validators.required],
      description: ['', Validators.required]      
    })
  }
  save() {
    console.log('this', this.form)
    this.accessPolicyService.createAccessPolicy(this.form.value).subscribe((data) => {
      console.log('datta', data)
    })
    
  }
}
