/*
    $ED - Descrição do módulo:
      Funções de chamada de Toast

    $FD - Funções dos módulo

    ToastWarn - Emite um toast de warning

    ToastErr - Emite um toast de error;

    ToastSuccess - Emite um toast de sucesso;


    $PD - Parâmetros das funções:
      (text [ ,config,position])


      * text = Texto do toast, pode incluir emojis.
      * string


      * [position] = Posição do toast na tela: default 'top_right'
      * string: 'top_right', 'top_center','top_left','bottom_right','bottom_center','bottom_left'



      * [config] = Configurações do container do Toast. Deve ser um objeto, alguens atributos podem ser:
      *  autoClose - em ms ou false
      *  draggable - bool
      *  pauseOnHover - bool
      *  pauseOnFocusLoss - bool
      *  ...

      *  Referência completa:
      *  https://github.com/fkhadra/react-toastify#api

*/




import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ToastWarn = (text,configs,position) => {
  const toast = new MyToast();
  toast.notifyWarn(text,configs,position);
}
const ToastErr = (text,configs,position) => {
  const toast = new MyToast();
  toast.notifyErr(text,configs,position);
}
const ToastSuccess= (text,configs,position) => {
  const toast = new MyToast();
  toast.notifySuccess(text,configs,position);
}

class MyToast{
  constructor(){
    toast.configure();
  }
  notifySuccess = function(text,configs,position){
    configs = configs !== undefined ? configs : {};
    if(typeof arguments[1] === 'string'){
      var aux = position;
      position = configs;
      configs = aux;
    }
    switch(position){
      case 'top_right':
        position = toast.POSITION.TOP_RIGHT;
        break;
      case 'top_center':
        position = toast.POSITION.TOP_CENTER;
        break;
      case 'top_left':
        position = toast.POSITION.TOP_LEFT;
        break;
      case 'bottom_right':
        position = toast.POSITION.BOTTOM_RIGHT;
        break;
      case 'bottom_left':
        position = toast.POSITION.BOTTOM_CENTER;
        break;
      case 'bottom_center':
        position = toast.POSITION.BOTTOM_RIGHT;
        break;
      default:
        position = toast.POSITION.TOP_RIGHT;
        break;

    }
    configs = Object.assign({position:position}, configs)
    toast.success(text,configs);
  };
  notifyWarn = function(text,configs,position){
    configs = configs !== undefined ? configs : {};
    if(typeof arguments[1] === 'string'){
      var aux = position;
      position = configs;
      configs = aux;
    }
    switch(position){
      case 'top_right':
        position = toast.POSITION.TOP_RIGHT;
        break;
      case 'top_center':
        position = toast.POSITION.TOP_CENTER;
        break;
      case 'top_left':
        position = toast.POSITION.TOP_LEFT;
        break;
      case 'bottom_right':
        position = toast.POSITION.BOTTOM_RIGHT;
        break;
      case 'bottom_left':
        position = toast.POSITION.BOTTOM_CENTER;
        break;
      case 'bottom_center':
        position = toast.POSITION.BOTTOM_RIGHT;
        break;
      default:
        position = toast.POSITION.TOP_RIGHT;
        break;

    }
    configs = Object.assign({position:position}, configs)
    toast.warn(text,configs);
  };
  notifyErr = function(text,configs,position){
    configs = configs !== undefined ? configs : {};
    if(typeof arguments[1] === 'string'){
      var aux = position;
      position = configs;
      configs = aux;
    }
    switch(position){
      case 'top_right':
        position = toast.POSITION.TOP_RIGHT;
        break;
      case 'top_center':
        position = toast.POSITION.TOP_CENTER;
        break;
      case 'top_left':
        position = toast.POSITION.TOP_LEFT;
        break;
      case 'bottom_right':
        position = toast.POSITION.BOTTOM_RIGHT;
        break;
      case 'bottom_left':
        position = toast.POSITION.BOTTOM_CENTER;
        break;
      case 'bottom_center':
        position = toast.POSITION.BOTTOM_RIGHT;
        break;
      default:
        position = toast.POSITION.TOP_RIGHT;
        break;

    }
    configs = Object.assign({position:position}, configs)
    toast.error(text,configs);
  };
}



export {ToastWarn,ToastErr,ToastSuccess};
