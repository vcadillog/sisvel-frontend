import { Component,inject,OnInit,ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule,FormControl,FormGroup,Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../../services/persona.service';
import { PersonaRequest } from '../../model/persona-request';
import { PersonaResponse } from '../../model/persona-response';
import { SexoService } from '../../services/sexo.service';
import { Sexo } from '../../model/sexo';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { TipoDocumento } from '../../model/tipo-documento';
import { UbigeoService } from '../../services/ubigeo.service';
import { Ubigeo } from '../../model/ubigeo';

@Component({
  selector: 'app-registrar-persona',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registrar-persona.html',
  styleUrl: './registrar-persona.css',
})
export class RegistrarPersona implements OnInit{
  private personaService=inject(PersonaService)
  private sexoService=inject(SexoService)
  private tipoDocumentoService=inject(TipoDocumentoService)
  private ubigeoService=inject(UbigeoService)
  private cdr=inject(ChangeDetectorRef)

  personaResponse:PersonaResponse[]=[];
  personaRequest:PersonaRequest={} as PersonaRequest
  personaForm:FormGroup;
  sexo:Sexo[]=[];
  tipoDocumento:TipoDocumento[]=[];
  ubigeo:Ubigeo[]=[];
  isEdited:boolean=false;


  constructor(){
    this.personaForm=new FormGroup({
      idPersona:new FormControl(''),
      apellidoPaterno:new FormControl('',[Validators.required,Validators.minLength(2)]),
      apellidoMaterno:new FormControl('',[Validators.required,Validators.minLength(2)]),
      nombres:new FormControl('',[Validators.required,Validators.minLength(2)]),
      idSexo:new FormControl('I'),
      fechaNacimiento:new FormControl(''),
      idTipoDocumento:new FormControl('1'),
      numDocumento:new FormControl('',[Validators.required,Validators.minLength(8)]),
      telefono:new FormControl('',[Validators.required,Validators.minLength(7)]),
      direccion:new FormControl('',[Validators.required,Validators.minLength(8)]),
      idUbigeo:new FormControl('150101'),
    })
  }

  ngOnInit(): void {
    this.getSexo();
    this.getTipoDocumento();
    this.getUbigeo();
    this.getPersona();
  }

  getPersona():void{
    this.personaService.getPersona().subscribe(
      (result : PersonaResponse[])=>{
        console.log('getPersona',result);
        this.personaResponse=result;
        this.cdr.detectChanges();
      }
    );
  }

  getSexo():void{
    this.sexoService.getSexo().subscribe(
      (result : Sexo[])=>{
        console.log('getSexo',result);
        this.sexo=result;
        this.cdr.detectChanges();
      }
    );
  }

  getTipoDocumento():void{
    this.tipoDocumentoService.getTipoDocumento().subscribe(
      (result : TipoDocumento[])=>{
        console.log('getTipoDocumento',result);
        this.tipoDocumento=result;
        this.cdr.detectChanges();
      }
    );
  }

  getUbigeo():void{
    this.ubigeoService.getUbigeo().subscribe(
      (result : Ubigeo[])=>{
        console.log('getTipoDocumento',result);
        this.ubigeo=result;
        this.cdr.detectChanges();
      }
    );
  }

  registrarPersona(){

  }
  refreshForm(){

  }



}
