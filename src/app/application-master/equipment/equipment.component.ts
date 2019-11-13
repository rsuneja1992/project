import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, HostListener, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MDBModalRef, MdbTableDirective, MdbTablePaginationComponent, MDBModalService } from 'angular-bootstrap-md';
import { EquipmentService } from './equipment.service';
import { Subject } from 'rxjs/internal/Subject';
import { WaitingDialogComponent } from 'src/app/modals/waiting-dialog/waiting-dialog.component';
import { SuccessDialogComponent } from 'src/app/modals/success-dialog/success-dialog.component';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['id', 'Equipment Name'];

  searchText: string = '';
  previous: string;
  modalRef: MDBModalRef;
  waitingModalRef: MDBModalRef;
  maxVisibleItems: number = 6;
  constructor(private cdRef: ChangeDetectorRef, private modalService: MDBModalService, 
    private equipmentService: EquipmentService) { }
    @Output() callbackOnModelWindowClose = new EventEmitter();
  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.getAllEquipment();    
  }

  getAllEquipment() {
    this.waitingModalRef = this.modalService.show(WaitingDialogComponent, {
      data: {
        message: 'Fetching Equipment List'
      }
    })
    this.equipmentService.getAllEquipment().subscribe((data: any[]) => {
      this.waitingModalRef.hide();
      this.elements = data;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      console.log('data', data);
    })    
  }
  

  
  openWaitingModal() {
        this.waitingModalRef = this.modalService.show(SuccessDialogComponent)
  }
  openModal() {
    console.log('cld')
    this.modalRef = this.modalService.show(EquipmentFormComponent, {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        class: ''
       
    });


    //this.modalRef.content.callbackOnModelWindowClose.take(1).subscribe( (result: any) => { console.log(result); });
    //this.modalRef.content.onClose = new Subject<boolean>();

    this.modalRef.content.action.subscribe(result => {
        console.log('results', result);
        if(result == 'save') {
          this.getAllEquipment();
        }
     })
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
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentFormComponent implements OnInit {
  action = new Subject();
  form: FormGroup;
  waitingModalRef: MDBModalRef;
  ngOnInit() {
  }
  constructor(private modalService: MDBModalService, public modalRef: MDBModalRef, private formBuilder: FormBuilder, private equipmentService: EquipmentService) {
this.createForm();
  }

  onYesClick() {
    this.action.next('yes');
}

onNoClick() {
    this.action.next('No');
}

  createForm() {
    this.form = this.formBuilder.group({
      equipmentname: ['', Validators.required],
    })
  }
  save() {
    this.waitingModalRef = this.modalService.show(WaitingDialogComponent, {
      data: {
        message: 'Creating new Equipment'
      }
    })  
    console.log('this', this.form)
    this.equipmentService.createEquipment(this.form.value).subscribe((data) => {
      console.log('datta', data)
      this.waitingModalRef.hide();
      this.modalRef.hide();
      this.action.next('save');
    })
    
  }
  close() {
    this.modalRef.hide();
    this.action.next('No');
  }
}