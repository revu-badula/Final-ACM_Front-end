import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from '../../../../apiservice.service';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { AppAudit, Policy } from '../../../../data.model.auditDTO';
import { UtilService } from '../../../../util.service';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { APP_CONFIG } from '../../../../app.config';
import { HttpClient } from "@angular/common/http";
import { FilterPipeDate } from '../../../locality-date-filter';
import { FilterAuditName } from '../../../locality-auditname-filter';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-audit-details',
  templateUrl: './audit-details.component.html',
  styleUrls: ['./audit-details.component.css'],
  providers: [ApiserviceService]
})
export class AuditDetailsComponent implements OnInit {
  public showPlusButton: boolean = false;


  public p: number = 1;
  public loading: boolean = false;
  public mainData: any;
  public updatedTime: any;
  public appAuditDTOs: any;
  public showEdit: boolean = true;
  public desc: boolean = false;
  public sortType: any;
  public showPagination: boolean = true;
  constructor(private modalService: NgbModal, private http: Http,
    private _apiservice: ApiserviceService, private utilService: UtilService,
    private router: Router, private route: ActivatedRoute) {

    this.getAppId();

    UtilService.appAuditId = '';
    UtilService.auditActive = false;
    UtilService.disabled = true;
    localStorage.removeItem('appAuditId');
    localStorage.removeItem('auditActive');
    this.utilService.setEditTrue(false);

  }

  ngOnInit() {

  }

  getAppId() {
    this.loading = true;
    this._apiservice.viewApplication(localStorage.getItem('localityName'))
      .subscribe((data: any) => {
        this.loading = false;
        this.mainData = data.applicationViewDTO.acronym;
        let d = new Date(data.applicationViewDTO.updatedTime);
        if (data.applicationViewDTO.appAuditDTOs === undefined) {
          this.showPagination = false;
        }
        else{
        this.appAuditDTOs = data.applicationViewDTO.appAuditDTOs;
        }
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        this.updatedTime = month + "/" + day + "/" + year;
      }, error => {
          this.loading = false;
          console.log(error);
        });

  }

  goTo() {
    this.router.navigate(['/locality/tab/Audit/Tab/first']);

  }

  showPlus() {
    this.showEdit = false;
    this.showPlusButton = true;
  }

  getAudit(id) {
    UtilService.appAuditId = id;
    localStorage.setItem('appAuditId', id);
    UtilService.disabled = false;
    this.router.navigate(['/locality/tab/Audit/Tab/first']);
  }
  handleSort() {
    if (!this.desc) {
      this.appAuditDTOs.sort(this.doAsc);
      this.desc = true;
    }
    else {
      this.appAuditDTOs.sort(this.doDsc);
      this.desc = false;
    }

  }
  doAsc(a, b) {
    if (a.auditTypeName > b.auditTypeName) {
      return -1;
    } else if (a.auditTypeName < b.auditTypeName) {
      return 1;
    }
    return 0;
  }

  doDsc(a, b) {

    if (a.auditTypeName < b.auditTypeName) {
      return -1;
    } else if (a.auditTypeName > b.auditTypeName) {
      return 1;
    }
    return 0;
  }

}


