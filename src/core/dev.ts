import PowiainaNum from 'powiaina_num.js'
import Modal from '../utils/Modal'
import { player } from './saves/'
export function setChangePoint(){
  if (import.meta.env.DEV) {
    Modal.show(
      {
        title: 'DEV',
        fields: [
          {
            label: 'Set points to...',
            placeholder: 'enter PowiainaNum.js number',
            required: true,
            validateOnChange:true,
            validation(value) {
              return (new PowiainaNum(value).array[0]).toString()!='NaN'
            }
          }
        ],
        onConfirm(values) {
          player.points = new PowiainaNum(values[0])
        },
      }
    )
  }
}

