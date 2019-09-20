import { Component, OnInit } from '@angular/core';
import {Band} from '../../band';
import {DataService} from '../../data.service';
import {Training} from '../../training';

@Component({
  selector: 'app-add-band-page-container',
  templateUrl: './add-band-page-container.component.html',
  styleUrls: ['./add-band-page-container.component.css']
})
export class AddBandPageContainerComponent implements OnInit {

  public success;
  public failure;
  public newBand: Band;
  public newTraining: Training;
  public trainings: Training[];
  public bands: Band[];
  data: DataService;
  public isAddTrainingSelected = false;
  public bandRanks: number[];
  public minRank: number;
  public maxRank: number;

  constructor(dataService: DataService) {
    this.data = dataService;
    this.bandRanks = [];
    this.minRank = 0;
    this.maxRank = 0;
    this.data.getTrainingList().subscribe(res => {
      this.trainings = res;
    });

    this.data.getBandList().subscribe(res => {
      this.bands = res;
      console.log(this.bands);
      for (let band of this.bands) {
        this.bandRanks.push(Number(band.bandRank));
      }
      this.minRank = Math.min.apply(Math, this.bandRanks);
      console.log(this.minRank);
      this.maxRank = Math.max.apply(Math, this.bandRanks);
      console.log(this.maxRank);
    });
  }

  addBand(addForm): void {
    if (addForm.valid) {
      const trainingToAdd: Training = this.newTraining;
      const bandToAdd: Band = this.newBand;
      this.newTraining = new Training();
      this.newBand = new Band();
      if (trainingToAdd.description) {
        this.data.addTraining(trainingToAdd).subscribe(res => {
          if (res == null) {
            this.failureMessage('Unable to add band and training, try again!');
          } else {
            this.data.addBand(bandToAdd).subscribe(result => {
              if (result == null) {
                this.failureMessage('Unable to add band and training, try again!');
              } else {
                this.successMessage('Band and training added successfully!');
              }
            });
          }
        });
      } else {
        this.data.addBand(bandToAdd).subscribe(res => {
          if (res == null) {
            this.failureMessage('Unable to add band, try again!');
          } else {
            this.successMessage('Band added successfully!');
          }
        },
        error => this.failureMessage(error.error.message));
      }
     }
  }

  successMessage(message: string) {
    this.success = message;
    setTimeout(() => {
      this.success = '';
    }, 5000);
  }

  failureMessage(message: string) {
    this.failure = message;
    setTimeout(() => {
      this.failure = '';
    }, 5000);
  }

  assignTrainingID(trainingID: number) {
    console.log(trainingID);
    if (trainingID.toString() !== 'Add new training') {
      this.newBand.trainingID = trainingID;
      this.isAddTrainingSelected = false;
    } else {
      // tslint:disable-next-line:radix
      this.newBand.trainingID = this.trainings[0].trainingID + 1;
      this.isAddTrainingSelected = true;
    }
  }

  ngOnInit() {
    this.newBand = new Band();
    this.newTraining = new Training();
  }

}
