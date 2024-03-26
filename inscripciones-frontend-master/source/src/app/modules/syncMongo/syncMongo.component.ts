
import { Component, OnInit } from '@angular/core';
import { ElasticService } from '../../shared/services/elastic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-syncMongo',
    templateUrl: './syncMongo.component.html',
    styleUrls: ['./syncMongo.component.css'],
})
export class SyncMongoComponent implements OnInit {
    public execution: string = "Ejecutando...";

    constructor(
        private elasticSearchService: ElasticService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const size = this.route.snapshot.paramMap.get('id');
        this.elasticSearchService.syncMongoUsers(size).subscribe(resp =>{
            this.execution = "Se ha sincronizado con éxito"
        }, (error) => {
            this.execution = "Ocurrio un error."
        })
    }
}
