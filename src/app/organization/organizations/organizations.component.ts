import { Component, OnInit } from "@angular/core";
import { OrganizationService } from "../service/organization.service";

@Component({
  selector: "app-organizations",
  templateUrl: "./organizations.component.html",
  styleUrls: ["./organizations.component.sass"],
})
export class OrganizationsComponent implements OnInit {
  showSpinner = true;
  // FILTERING
  sortingName: string;
  sortingEmail: string;

  totalOrganizations: any;
  errorResp: any;
  show = true;
  //GET ALL Organization
  allOrganizationResult: any;
  allOrganizationList: any;

  constructor(public organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.getAllUserOrganizations();
  }

  SearchByName() {
    if (this.sortingName != "") {
      this.allOrganizationList = this.allOrganizationList.filter((res) => {
        return res.name
          .toLocaleLowerCase()
          .match(this.sortingName.toLocaleLowerCase());
      });
    } else if (this.sortingName == "") {
      this.ngOnInit();
    }
  }
  SearchByEmail() {
    if (this.sortingEmail != "") {
      this.allOrganizationList = this.allOrganizationList.filter((res) => {
        return res.email
          .toLocaleLowerCase()
          .match(this.sortingEmail.toLocaleLowerCase());
      });
    } else if (this.sortingEmail == "") {
      this.ngOnInit();
    }
  }

  getAllUserOrganizations() {
    this.organizationService.getAllUserOrganizations().subscribe((result) => {
      this.allOrganizationResult = result;
      if (this.allOrganizationResult.statusCode === 200) {
        this.allOrganizationList = this.allOrganizationResult.data;
        this.totalOrganizations = this.allOrganizationList.length;
        this.showSpinner = false;
      } else {
        this.show = false;
        this.errorResp = this.allOrganizationResult.description;
      }
    },error => {
      this.errorResp = error.error.description;
      this.show = false;
    });
  }
}
