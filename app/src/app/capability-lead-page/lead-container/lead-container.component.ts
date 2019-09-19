import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { CapabilityLead } from 'src/app/capabilityLead';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lead-container',
  templateUrl: './lead-container.component.html',
  styleUrls: ['./lead-container.component.css']
})
export class LeadContainerComponent implements OnInit {

  capabilityLead: CapabilityLead;
  id: number;

  constructor(private route : ActivatedRoute, private data: DataService) { 
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.data.getCapabilityLeadDetails(this.id).subscribe(capabilityLead => this.capabilityLead = capabilityLead);
      console.log(`Routed to ${this.id}`);
    });
  }

}
