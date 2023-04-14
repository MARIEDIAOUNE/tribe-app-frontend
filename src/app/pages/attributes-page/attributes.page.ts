import { Component, OnInit, Output } from '@angular/core';

import { Router } from '@angular/router';

import { AlertService } from '../../_services/alert/alert.service';
import { UserService } from '../../_services/user/user.service';
import { LoadingService } from "../../_services/loading-spinner/loading.service";
import { AttributesModelService } from "./_services/attributes.model.service";

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.page.html',
  styleUrls: ['./attributes.page.scss'],
})
export class AttributesPage implements OnInit {

    result: any;

  constructor(private _userService: UserService,
    private _alertService: AlertService,
    private _loadingService: LoadingService,
    private _attributesModelService: AttributesModelService,
    private router: Router) { }
    private _attributesModelService: AttributesModelService) { }

  ngOnInit() {
      const self = this;
      self._attributesModelService.getAttributesByUser().then(
          (response: any) => {
              self.result = response;
              console.log(self.result);
              console.log('Processing pre() API Request');
          }
      );
  }

  getAttributes(){
      return this.result;
  }

  getAttrString(attr) {
    let rtn = "";

    if (attr['phrase']['adverb'])
      rtn += attr['phrase']['adverb'] + " ";

    rtn += attr['phrase']['verb'] + " ";

    if (attr['phrase']['preposition'])
      rtn += attr['phrase']['preposition'] + " ";

    rtn += attr['phrase']['noun'];

    return rtn;
  }

  onCreateBtnClick() {
      this.navigateTo('attributes/create');
  }

  navigateTo(url?: string) {
    url = url || 'nav';
    this.router.navigate([url], { replaceUrl: true });
  }

}
