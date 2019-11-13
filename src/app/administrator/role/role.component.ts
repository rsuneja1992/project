import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from './role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['id', 'Role Name'];

  searchText: string = '';
  previous: string;
  modalRef: MDBModalRef;
  maxVisibleItems: number = 6;
  roleList: any[];
  constructor(private cdRef: ChangeDetectorRef, private modalService: MDBModalService, private roleService: RoleService) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.getAllRoles();
    // for (let i = 1; i <= 25; i++) {
    //   this.elements.push({id: i.toString(), Role: 'Role' + i, Access_policy: 'Access Policy ' + i, view: 'action '+ i, edit: 'action '+ i});
    // }
    console.log('sdsd', this.elements)


    
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe((data: any[]) => {
      this.roleList = data;
      this.elements = data;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      console.log('data', data);
    })    
  }
  
  openModal() {
    console.log('cld')
    this.modalRef = this.modalService.show(RoleFormComponent, {
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
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleFormComponent implements OnInit {
  form: FormGroup;
  ngOnInit() {
  }
  constructor(public modalRef: MDBModalRef, private formBuilder: FormBuilder, private roleService: RoleService) {
this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    })
  }
  save() {
    console.log('this', this.form)
    this.roleService.createRole(this.form.value).subscribe((data) => {
      console.log('datta', data)
    })
    
  }
}