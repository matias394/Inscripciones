
import { Component, OnInit } from '@angular/core';
import { ElasticService } from '../../shared/services/elastic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-sync',
    templateUrl: './sync.component.html',
    styleUrls: ['./sync.component.css'],
})
export class SyncComponent implements OnInit {
    public execution: string = "Ejecutando...";

    constructor(
        private elasticSearchService: ElasticService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const size = this.route.snapshot.paramMap.get('id');
        this.elasticSearchService.syncElasticSearch(size).subscribe(resp =>{
            this.execution = resp
        }, (error) => {
            this.execution = "Ocurrio un error."
        })
    }
}
