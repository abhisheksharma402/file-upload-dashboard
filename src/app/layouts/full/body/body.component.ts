import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment'
import { dataTool } from 'echarts';
import { convertToObject } from 'typescript';
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
  data : any
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
            // this.barChartOptions(response.data);
            this.data = response.data;
            console.log(this.data)
          } else{
            this.successMessage = "";
            this.errorMessage = response.message;
            // this.errorMessage = error.message;
          }
        }
        )
  }
  

  getBarChartData(data:any, query:any) {
    let res = []
    let subjects : any = []
    let marks : any = []
    for(let i=0;i<data.length;i++){
      if(data[i]["name"] === query){
        for(let prop in data[i]){
          if(prop !== "id" && prop !== "name"){
            subjects.push(prop)
            marks.push(data[i][prop])
          }
        }
      }
    }
    res.push(subjects)
    res.push(marks)
    return res
    // data.forEach((item:any)=>{
    //   for(let obj in item){
    //     if(obj === "name"){
    //       names.push(item[obj])
    //     }
    //     if(obj === "marks"){
    //       marks.push(item[obj])
    //     }
    //   }
    // })
    // res.push(names);
    // res.push(marks);
    // return res
  }

  barChartOptions(data:any){
    const chartData = this.getBarChartData(data, "Abhishek");
    console.log(chartData)
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


  getLineChartData(data:any) {
    let res = []
    let subjects : any = []
    
    for(let i=0;i<data.length;i++){
      let marks : any = []
      for(let item in data[i]){
        if(item!=="id" && item!=="name"){
          marks.push(data[i][item])
          if(i==0){
            subjects.push(item)
          }
        }
      }
      res.push(marks)
    }
    res.push(subjects)
    return res
    // data.forEach((item:any)=>{
    //   for(let obj in item){
    //     if(obj === "name"){
    //       names.push(item[obj])
    //     }
    //     if(obj === "marks"){
    //       marks.push(item[obj])
    //     }
    //   }
    // })
    // res.push(names);
    // res.push(marks);
    // return res
  }


  lineChartOptions(data:any){
    const chartData = this.getLineChartData(data);
    console.log(chartData)
    this.options={
      title: {
        // text: 'Class Report'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Abhishek', 'Taruna', 'Sehajveer', 'Isha', 'Tina']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: chartData[chartData.length-1]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Abhishek',
          type: 'line',
          stack: 'Total',
          data: chartData[0]
        },
        {
          name: 'Taruna',
          type: 'line',
          stack: 'Total',
          data: chartData[1]
        },
        {
          name: 'Sehajveer',
          type: 'line',
          stack: 'Total',
          data: chartData[2]
        },
        {
          name: 'Isha',
          type: 'line',
          stack: 'Total',
          data: chartData[3]
        },
        {
          name: 'Tina',
          type: 'line',
          stack: 'Total',
          data: chartData[4]
        }
      ]
    };
  }

  getPieChartData(data:any){
    let res = []
    for(let i=0;i<data.length;i++){
      let j=0;
      for(let item in data[i]){
        if(item!=="id" && item!=="name"){
          if(i==0){
            let obj = {
              "value": Number(data[i][item]),
              "name": item
            }
            res.push(obj)
          }
          else{
            res[j]["value"] += Number(data[i][item]);
            j++;
          }
        }
      }
    }
    return res;
  }

  pieChartOptions(data:any){
    const chartData = this.getPieChartData(data);
    console.log(chartData)
    this.options={
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Class Report',
          type: 'pie',
          radius: '75%',
          data: chartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }


  onChange(event:any){
    // console.log(event.target.value)
    let type = event.target.value;
    console.log(type)
    if(type === "bar-chart"){
      this.barChartOptions(this.data);
    }
    else if(type === "line-chart"){
      this.lineChartOptions(this.data);
    }
    else if(type === "pie-chart"){
      this.pieChartOptions(this.data);
    }
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