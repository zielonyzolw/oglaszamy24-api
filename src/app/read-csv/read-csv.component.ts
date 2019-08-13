import { Component, OnInit, ViewChild  } from '@angular/core';
import {CSVRecord} from '../CSVModel';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { ApiService } from '../api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-read-csv',
  templateUrl: './read-csv.component.html',
  styleUrls: ['./read-csv.component.scss']
})
export class ReadCsvComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  public records: any[] = [];
  // tslint:disable-next-line:ban-types
  public categories: [];
  public cities: Array<any>;
  @ViewChild('csvReader') csvReader: any;
  selectedCity: any;

  ngOnInit() {

  }



  uploadListener($event: any): void {

    const text = [];
    const files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = (csvData as string).split(/\r\n|\n/);
        const headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };

      // tslint:disable-next-line:only-arrow-functions
      reader.onerror = function() {
        console.log('error is occured while reading file!');
      };

    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    const csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      const currentRecord = (csvRecordsArray[i]).split(',');
      console.log(currentRecord);
      if (currentRecord.length === headerLength) {
        const csvRecord: CSVRecord = new CSVRecord();
        csvRecord.title = currentRecord[0].trim();
        csvRecord.description = currentRecord[1].trim();
        csvRecord.cat1Id = currentRecord[2].trim();
        csvRecord.cat2Id = currentRecord[3].trim();
        csvRecord.cat3Id = currentRecord[4].trim();
        csvRecord.contactName = currentRecord[5].trim();
        csvRecord.telephone = currentRecord[6].trim();
        csvRecord.emailDisabled = currentRecord[7].trim();
        csvRecord.adSell = currentRecord[8].trim();
        csvRecord.price = currentRecord[9].trim();
        csvRecord.cityId = currentRecord[10].trim();
        csvRecord.adType = currentRecord[11].trim();
        csvRecord.autoRenewal = currentRecord[12].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr: any) {
    const headers = (csvRecordsArr[0] as string).split(',');
    const headerArray = [];
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.records = [];
  }

  public getApi() {
    // this.apiService.getStatus().subscribe((res) => {
    //   console.log(res);
    // });
    //
    // this.apiService.getCategories().subscribe((res) => {
    //   this.categories = res.data.categories;
    //   console.log(res);
    // });

    this.apiService.getCities().subscribe((res) => {
      this.cities = Object.entries(res.data.cities);
      console.log(this.cities);
      // this.cities = Object.entries(res.data.cities);
      // console.log(this.cities);
      // console.log(Object.entries(this.cities));
      // for (let [id, value] of Object.entries(this.cities)) {
      //   console.log(`${id}: ${value}`);
      // }
    });
}
}
