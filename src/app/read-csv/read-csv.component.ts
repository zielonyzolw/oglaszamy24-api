import { Component, OnInit, ViewChild } from '@angular/core';
import { CSVRecord } from '../CSVModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-read-csv',
  templateUrl: './read-csv.component.html',
  styleUrls: ['./read-csv.component.scss']
})
export class ReadCsvComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  public records: any[] = [];
  public categories: [];
  public cities: Array<any>;
  public selectedCity = [];
  @ViewChild('csvReader') csvReader: any;

  ngOnInit() {

  }

  public uploadListener($event: any): void {

    // const text = [];
    const files = $event.target.files || $event.srcElement.files;

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

      reader.onerror = () => {
        console.log('error is occured while reading file!');
      };

      this.getApi();

    } else {
      alert('Proszę wgrać plik .csv');
      this.fileReset();
    }
  }

  private getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: number) {
    const csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      const currentRecord = (csvRecordsArray[i]).split(',');
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

  private isValidCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  private getHeaderArray(csvRecordsArr: any) {
    const headers = (csvRecordsArr[0] as string).split(',');
    const headerArray = [];

    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  public fileReset() {
    this.csvReader.nativeElement.value = '';
    this.records = [];
  }

  public getApi() {
    // this.apiService.getStatus().subscribe((res) => {
    //   console.log(res);
    // });
    //
    this.apiService.getCategories().subscribe((res) => {
      this.categories = res.data.categories;
      console.log(res);
    });

    this.apiService.getCities().subscribe((res) => {
      this.cities = Object.entries(res.data.cities);
    });
  }

  public selected(i) {
    console.log('kategoria dla wiersza' + i, this.selectedCity[i]);
  }

  public createJson(i, record, selectedCity) {
    // const data = {
    //   data: {
    //     title: '',
    //     description: '',
    //     cat1_id: '',
    //     cat2_id: '',
    //     cat3_id: '',
    //     contact_name: '',
    //     telephone: '',
    //     email_disabled: '',
    //     ad_sell: '',
    //     price: '',
    //     city_id: '',
    //     ad_type: '',
    //     auto_renewal: ''
    //   }
    // };
    // data.data.title = record.title;
    // data.data.description = record.description;
    // data.data.cat1_id = record.cat1Id;
    // data.data.cat2_id = record.cat2Id;
    // data.data.cat3_id = record.cat3Id;
    // data.data.contact_name = record.contactName;
    // data.data.telephone = record.telephone;
    // data.data.email_disabled = record.emailDisabled;
    // data.data.ad_sell = record.adSell;
    // data.data.price = record.price;
    // data.data.city_id = selectedCity[i];
    // data.data.ad_type = record.adType;
    // data.data.auto_renewal = record.autoRenewal;

    const data = {
        title: '',
        description: '',
        cat1_id: '',
        cat2_id: '',
        cat3_id: '',
        contact_name: '',
        telephone: '',
        email_disabled: '',
        ad_sell: '',
        price: '',
        city_id: '',
        ad_type: '',
        auto_renewal: ''
    };
    data.title = record.title;
    data.description = record.description;
    data.cat1_id = record.cat1Id;
    data.cat2_id = record.cat2Id;
    data.cat3_id = record.cat3Id;
    data.contact_name = record.contactName;
    data.telephone = record.telephone;
    data.email_disabled = record.emailDisabled;
    data.ad_sell = record.adSell;
    data.price = record.price;
    data.city_id = selectedCity[i];
    data.ad_type = record.adType;
    data.auto_renewal = record.autoRenewal;
    console.log(data);

    this.apiService.postOgloszenie(data).subscribe((res) => {
      console.log(res);
      return data.json();
    });
  }
}
