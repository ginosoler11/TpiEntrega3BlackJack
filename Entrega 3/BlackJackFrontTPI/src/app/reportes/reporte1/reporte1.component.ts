import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-reporte1',
  templateUrl: './reporte1.component.html',
  styleUrls: ['./reporte1.component.css'],
})
export class Reporte1Component implements OnInit {
  public pieChartOptions: any = {
    responsive: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'white',
          fontSize: 20,
        },
      },
    },
  };

  public pieChartLabels = ['% de Croupier', '% de Jugadores'];
  public pieChartDatasets = [];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public pieChartOptions2: any = {
    responsive: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'white',
          fontSize: 20,
        },
      },
    },
  };
  public pieChartLabels2 = ['% de Victorias', '% de Empates', '% de Derrotas'];
  public pieChartDatasets2 = [];
  public pieChartLegend2 = true;
  public pieChartPlugins2 = [];

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: any = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        borderWidth: 0,
        backgroundColor: ['#36A2EBbb'],
        hoverBackgroundColor: ['#36A2EB'],
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Series B',
        borderWidth: 0,
        backgroundColor: ['#FFCE56bb'],
        hoverBackgroundColor: ['#FFCE56'],
      },
    ],
  };

  public barChartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
          fontSize: 20,
        },
      },
    },
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    private reporteService: ReportesService
  ) {}
  rachaVictorias: any = {};
  cantPartidas: any = {};
  rachaDerrotas: any = {};
  cantBJ: any = {};

  ngOnInit(): void {
    this.reporteService.getReportesIndividuales().subscribe((data) => {
      this.rachaVictorias = data.rachaVictorias;
      this.cantPartidas = data.cantPartidas;
      this.rachaDerrotas = data.rachaDerrotas;
      this.cantBJ = data.cantBJ;
    });

    this.reporteService.getTortaIzq().subscribe((data) => {
      this.pieChartDatasets = [
        {
          data: [data.compuP, data.jugadorP],
          borderWidth: 0,
          backgroundColor: ['#FF6384bb', '#36A2EBbb'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB'],
        },
      ] as any;
    });

    this.reporteService.getTortaDer().subscribe((data) => {
      this.pieChartDatasets2 = [
        {
          data: [data.win, data.tie, data.lose],
          borderWidth: 0,
          backgroundColor: ['#04aa6dbb', '#FFCE56bb', '#FF6384bb'],
          hoverBackgroundColor: ['#04aa6d', '#FFCE56', '#FF6384'],
        },
      ] as any;
    });

    this.reporteService.getGraficoPartidas().subscribe((dataPartidas) => {
      this.reporteService.getGraficoJugadores().subscribe((dataJugadores) => {
        this.barChartData = {
          labels: [...dataPartidas.fecha],
          datasets: [
            {
              data: [...dataJugadores.jugadores],
              label: 'Jugadores',
              borderWidth: 0,
              backgroundColor: ['#FF6384bb'],
              hoverBackgroundColor: ['#FF6384'],
            },
            {
              data: [...dataPartidas.partidas],
              label: 'Partidas',
              borderWidth: 0,
              backgroundColor: ['#36A2EBbb'],
              hoverBackgroundColor: ['#36A2EB'],
            },
          ],
        };
      });
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }

  volver() {
    this.router.navigate(['/']);
  }
}
