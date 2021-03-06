import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from '../../../../apiservice.service';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { AppAudit, Policy } from '../../../../data.model.auditDTO';
import { UtilService } from '../../../../util.service';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { APP_CONFIG } from '../../../../app.config';
import { HttpClient } from "@angular/common/http";
import { SystemFilterPipeDate } from '../../../system-date-filter';
import { SystemFilterAuditName } from '../../../system-auditname-filter';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-audit-details',
  templateUrl: './system-audit-details.component.html',
  styleUrls: ['./system-audit-details.component.css'],
  providers: [ApiserviceService]
})
export class SystemAuditDetailsComponent implements OnInit {
  public showPlusButton: boolean = false;
  public selectDate: IMyDate = null;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };

  public mainData: any;
  public loading: boolean = false;
  public updatedTime: any;
  public appAuditDTOs: any;
  constructor(private modalService: NgbModal, private http: Http,
    private _apiservice: ApiserviceService, private utilService: UtilService,
    private router: Router, private route: ActivatedRoute) {

    this.getAppId();
    UtilService.appAuditId = '';
    UtilService.auditActive = false;
    UtilService.disabled = true;
    localStorage.removeItem('systemAppAuditId');
    localStorage.removeItem('systemAuditActive');
    //this.utilService.setEditTrue(false);

  }

  ngOnInit() {

  }

  getAppId() {
    this.loading = true;
    this._apiservice.viewApplication(localStorage.getItem('systemName'))
      .subscribe((data: any) => {
        this.loading = false;
        this.mainData = data.applicationViewDTO.acronym;
        let d = new Date(data.applicationViewDTO.updatedTime);
        this.appAuditDTOs = data.applicationViewDTO.appAuditDTOs;
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        this.updatedTime = month + "/" + day + "/" + year;
      }, error => {
        this.loading=false;
        console.log(error);
      });

  }

  goTo() {
    this.router.navigate(['/system/tab2/Audit/Tab/first']);

  }

  showPlus() {
    this.showPlusButton = true;
  }

  getAudit(id) {
    UtilService.appAuditId = id;
    localStorage.setItem('systemAppAuditId', id);
    UtilService.disabled = false;
    this.router.navigate(['/system/tab2/Audit/Tab/first']);
  }


}


