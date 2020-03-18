
export function presentAlert(header:string , message:string, buttons:any[]) {
    const alert = document.createElement('ion-alert');
    alert.header = header;
    alert.message = message;
    alert.buttons = buttons;

  document.body.appendChild(alert);
  return alert.present();
}