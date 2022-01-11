import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment'
// import {UploadService} from '../upload.service'

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  apiUrl = environment.apiUrl;
  fileUploadForm: FormGroup;
  fileData: any;
  options: any;
  barChartStyle = {width: '500px', height: '300px'}
  // fileName

  // constructor(
  //   // 
  // ) { }

  // fileName = "";
  file_not_selected = "";
  successMessage = "";
  errorMessage = "";
  // // file: Array<File>;
  // file: any;
  uploadedFiles: Array < File > ;

  constructor(
    // private service:UploadService,
    // private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // this.initializeForm();
  }

  fileChange(element:any) {
    this.uploadedFiles = element.target.files;
    this.file_not_selected = ""
  }
  upload() {
    if(this.uploadedFiles == undefined){
      this.file_not_selected = "Please select a file"
      return;
    }
    
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.http.post(this.apiUrl+'api/upload',formData)
        .subscribe((response: any) => {
          if(response.status == 200) {
            this.successMessage = response.message;
            this.barChartOptions(response.data);
          } else{
            this.successMessage = "";
            this.errorMessage = response.message;
            // this.errorMessage = error.message;
          }
        }
        )
  }

  getChartData(data:any) {
    let res = []
    let names : any = []
    let marks : any = []
    data.forEach((item:any)=>{
      for(let obj in item){
        if(obj === "name"){
          names.push(item[obj])
        }
        if(obj === "marks"){
          marks.push(item[obj])
        }
      }
    })
    res.push(names);
    res.push(marks);
    return res
  }

  barChartOptions(data:any){
    const chartData = this.getChartData(data);
    this.options={
      title: {
        text: 'Class Report'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: chartData[0]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: chartData[1],
          type: 'bar'
        }
      ]
    };
  }

  // onFileUpload(event){
  //   console.log(event.target.files);
  //   this.fileName = event.target.files[0].name
  //   this.file = event.target.files[0]
  //   const reader = new FileReader();
  //   reader.readAsText(this.file);
  //   reader.onload = () => {
  //     const csvSource = <string>reader.result
  //     // console.log(csvSource);
  //     debugger
  //     this.service.fileUpload(csvSource).subscribe(
  //       data => {
  //         console.log(data);
  //     })
  //   }
  //   console.log(this.file)
  // }
  
  // submit(target:any):void {
    
  // }

  // onFileUpload(event){
  //   this.fileName = event.target.files[0].name
  //   this.file = event.target.files[0]
  //   this.fileUploadForm.get('file').setValue(this.file)
  //   // const formData = new FormData();
  //   // formData.append('file', this.fileUploadForm.get('file').value);
  //   // console.log(formData);
  //   this.service.fileUpload(this.fileUploadForm.get('file').value).subscribe(
  //     data => {
  //       console.log(data);
  //   })
  // }

  // initializeForm(){
  //   this.fileUploadForm = this.formBuilder.group({
  //     file: ['']
  //   })
  // }


  // upload(event){
  //   console.log(event)
  // }


}
;