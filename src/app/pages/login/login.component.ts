import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CambioColoresService } from 'src/app/services/cambio-colores.service';
// import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { VariablesService } from 'src/app/services/variables.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ObtenerIpService } from 'src/app/services/obtener-ip.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() hero;
  login: boolean = true
  inputs: boolean = true;
  deviceInfo = null;
  user: Observable<firebase.User>;
      //nardezjuandavid@gmail.com
      //IconHotel123
  email: string = "nardezjuandavid@gmail.com";
  password: string = "IconHotel123";
  loginCambio: boolean = true;
  textoBoton: string = "Login"
  public date: object = new Date();
  public format: string = 'dd-MMM-yy';

  @ViewChild('listObj')
  // public listObj: DropDownListComponent;
  // public floatLabelType: FloatLabelType = 'Auto';
  public value: string = 'dd-MMM-yy';
  constructor(private firebaseAuth: AngularFireAuth, private db: AngularFireDatabase, private obtenerIpService: ObtenerIpService, private deviceService: DeviceDetectorService, public apiRest: ApiRestService, public cambioDeColores: CambioColoresService, private router: Router, protected variables: VariablesService) {






  }
  ngOnInit(): void {
    this.user = this.firebaseAuth.authState;
    this.epicFunction()
    this.apiRest.todos().subscribe(data => {
      console.log(data);
      for (const i of data['productos']) {
        if (i['ip'] !== "0" && i['password'] !== null) {
          setTimeout(() => {
            // this.signupF(
            //   i['email'], i['password']
            // )
            //this.loginF(i['email'], i['password'])
            //console.log(i['ip'], i['password']);
          }, 3000);
        }
      }
    })
  }
  logins(t: String, color: String) {
    this.cambioDeColores.color = color;
  }
  public onRenderCell(args): void {
    if (args.date.getDay() == 0 || args.date.getDay() == 6) {
      //sets isDisabled to true to disable the date.
      args.isDisabled = true;
      //To know about the disabled date customization, you can refer in "styles.css".
    }
  }
  cambiarLogin() {
    $("#registrar").removeClass('rosaB')
    $("#registrar").removeClass('sombras')
    $("#registrar").removeClass('rosaT')
    $("#registrar").removeClass('blancoT')
    $("#ingresar").addClass("rosaB")
    $("#ingresar").addClass("sombras")
    $("#ingresar").addClass("tB")
    $("#ingresar").addClass("blancoT")
    $("#registrar").addClass("rosaT")
    $("#login").removeClass("rTh")
    $("#login").addClass("lTh")

    this.loginCambio = true;
    this.inputs = true;
    this.textoBoton = "Login"
  }
  cambiarRegistrar() {
    console.log("Hola registrate");

    $("#ingresar").removeClass('rosaB')
    $("#ingresar").removeClass('sombras')
    $("#ingresar").removeClass('rosaT')
    $("#ingresar").removeClass('blancoT')
    $("#registrar").addClass("rosaB")
    $("#registrar").addClass("sombras")
    $("#registrar").addClass("tB")
    $("#registrar").addClass("blancoT")
    $("#ingresar").addClass("rosaT")
    $("#login").removeClass("lTh")
    $("#login").addClass("rTh")
    this.loginCambio = false;
    this.inputs = false;
    this.textoBoton = "To register"
  }
  ingresar() {
    if (this.loginCambio) {
      /**ingresar */
      this.loginF(this.email, this.password)
      //nardezjuandavid@gmail.com
      //IconHotel123
    } else {
      /**registrarse  */
      console.log("registarse");
    }
  }

  epicFunction() {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
  }

  signupF(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value.user);
        this.apiRest.login(this.email, this.password).subscribe(data => {
          this.variables.datosU = data;
          if (data['error']) {
            //hubo error
          } else {

            this.obtenerIpService.obtenerIp().subscribe((res: any) => {
              this.variables.datosU.ip = res.ip;
              this.variables.datosU.idF = value.user.uid;

              this.db.object("usuarios/" + value.user.uid).update(this.variables.datosU)
              this.loginF(this.email, this.password);
              // this.db.object("usuarios/" + value.user).valueChanges().subscribe(data => {
              //   if (data === null) {
              //   } else {
              //   }
              //   //  this.router.navigate(['Home']);
              //   //this.db.object("usuarios/" + this.variables.datosU.id_usuario).update(this.variables.datosU);
              // })
            });
          }
        })
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  loginF(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.obtenerIpService.obtenerIp().subscribe((res: any) => {
          this.variables.datosU.ip = res.ip;
          this.db.object("usuarios/" + value.user.uid).valueChanges().subscribe(data => {
            if (data === null) {
              this.apiRest.login(this.email, this.password).subscribe(data => {
                this.variables.datosU = data;
                if (data['error']) {
                  //hubo error
                } else {

                  this.obtenerIpService.obtenerIp().subscribe((res: any) => {

                    this.variables.datosU.ip = res.ip;

                    this.variables.datosU.idF = value.user.uid;

                    this.db.object("usuarios/" + value.user.uid).update(this.variables.datosU)

                    // this.loginF(this.email, this.password);

                    // this.db.object("usuarios/" + value.user).valueChanges().subscribe(data => {

                    //   if (data === null) {

                    //   } else {

                    //   }

                    //   //  this.router.navigate(['Home']);

                    //   //this.db.object("usuarios/" + this.variables.datosU.id_usuario).update(this.variables.datosU);

                    // })

                  });
                }
              })
            } else {
              /// console.log('logueado ---', data);
              this.variables.datosU = data;
              this.cuentaRegistrada(this.makeid(2) + value.user.uid + this.makeid(2), this.variables.datosU.id_usuario)
            this.router.navigate(['home']);
            }



            //

            //this.db.object("usuarios/" + this.variables.datosU.id_usuario).update(this.variables.datosU);
          })


        });
      })
      .catch(err => {
        this.signupF(this.email, this.password)
        console.log('No esta registrado se registrara automaticamente :', err.message);
      });
  }


  protected makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk_-lmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  protected cuentaRegistrada(id: string,id_u:string) {
    // Store
    localStorage.setItem("token", id);
    localStorage.setItem("uid", id_u);
    // Fetch
  }




}
