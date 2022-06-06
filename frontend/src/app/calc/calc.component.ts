import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Resposta } from './resposta';
import { SolverService } from './solver.service';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
  teste:FormGroup
  resposta!:Resposta
  showResposta:number = 0
  constructor(private solver:SolverService) {
    this.teste = new FormGroup({
      profit_cadeira: new FormControl(),
      profit_mesa: new FormControl(),
      profit_armario: new FormControl(),
      profit_cama: new FormControl(),
      cost_cadeira: new FormControl(),
      cost_mesa: new FormControl(),
      cost_armario: new FormControl(),
      cost_cama: new FormControl(),
      hours_cadeira: new FormControl(),
      hours_mesa: new FormControl(),
      hours_armario: new FormControl(),
      hours_cama: new FormControl(),
      total_wood: new FormControl(),
      total_hours: new FormControl()

    })
   }

  ngOnInit(): void {
    this.teste
   
  }
  calc():void{
   
    
    const conta = this.teste.value
    this.solver.setSolver(conta).subscribe({
      next:x =>{
        this.resposta = x
        this.showResposta = 1
      } 
    })
  }


}
