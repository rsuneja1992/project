import { Component, OnInit, ViewChild, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { UserService } from './user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../role/role.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['id', 'name', 'username', 'role','reportingTo', 'email','view', 'edit'];

  searchText: string = '';
  previous: string;
  modalRef: MDBModalRef;
  maxVisibleItems: number = 6;
  constructor(private cdRef: ChangeDetectorRef, private modalService: MDBModalService, private userService: UserService) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.getAllUsers()    
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((data) => {
      console.log('data', data)
      this.elements = data;
      this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
    })
  }
  
  openModal() {
    console.log('cld')
    this.modalRef = this.modalService.show(UserFormComponent, {
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
      console.log(data);
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
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  roleList: any[];
  userList: any[];
  ngOnInit() {
  }
  constructor(public modalRef: MDBModalRef, private roleService: RoleService, private formBuilder: FormBuilder, private userService: UserService) {
   this.createForm();
   this.getAllRole();
   this.getAllUsers();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      username: ['', Validators.required],
      reportingId: ['', Validators.required]
        })
  }

  getAllRole() {
    this.roleService.getAllRoles().subscribe((data: any[]) => {
      this.roleList = data;
    })
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((data: any[]) => {
      console.log('data')
      this.userList = data;
    })
  }

  save() {
    console.log('ff', this.form.value)
    this.userService.createUser(this.form.value).subscribe();
  }
}