import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormControl,
  Button,
} from '@chakra-ui/react'
import Select from 'react-select';
import ModalIcon from '../../assets/images/icons/modalIcon.svg';
import BnbIcon from '../../assets/images/icons/bnbIcon.svg';
import OaysIcon from '../../assets/images/icons/oaysIcon.svg';
import Classes from './scss/all.module.scss';

export default function SwapForm() {
  const cryptoOptions = [
    {
      value: "BNB",
      label: <div className={Classes.selectMenu}>
              <img src={BnbIcon} /><span>BNB</span> 
            </div>
    },
    {
      value: "OAY",
      label: <div className={Classes.selectMenu}>
              <img src={OaysIcon} /><span>OAY</span>
            </div>,
    }
  ];

  const colourStyles = {
    control: styles => ({ ...styles, 
      backgroundColor: 'transparent', 
      float: "right", 
      width: "85px",
      color: "#57656B",
      fontWeight: "600",
      fontSize: "14px",
      marginLeft: "15px",
      border: "none",
      marginTop: "-10px !important",
    }),
    valueContainer: defaultStyles => ({
      ...defaultStyles,
      padding: "0 !important"
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      padding: "0",
      "svg": {
        padding: "0"
      }
    }),
    dropdownIndicator: defaultStyles => ({
      ...defaultStyles,
      padding: '0',
    }),
    menu: base => ({
      ...base,
      color: "#000"
    }),
  };

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        resolve()
      }, 3000)
    })
  }

  return (
    <div className={Classes.modalLayout}>
      <form onSubmit={handleSubmit(onSubmit)} className={Classes.formLayout}>
        <img className={Classes.modalIcon} src={ModalIcon} />
        <div className={Classes.formLabel}>Swap</div>
        <FormControl isInvalid={errors.name}>
          <div className={Classes.cryptoGroup}>
            <label>From:</label>
            <div className={Classes.cryptoWrapper}>
              <input type="number" className={Classes.balanceLabel} defaultValue={0.0} />
              <Select     
                defaultValue={cryptoOptions[0]}
                classNamePrefix="customSelect" 
                options={cryptoOptions} 
                styles={colourStyles}
                components={{
                  IndicatorSeparator: () => null
                }}
              />
            </div>
          </div>
          <div className={Classes.cryptoGroup}>
            <label>To:</label>
            <div className={Classes.cryptoWrapper}>
              <input type="number" className={Classes.balanceLabel} defaultValue={0.0} />
              <Select     
                defaultValue={cryptoOptions[1]}
                classNamePrefix="customSelect" 
                options={cryptoOptions} 
                styles={colourStyles}
                components={{
                  IndicatorSeparator: () => null
                }}
              />
            </div>
          </div>
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
          <div className={Classes.slippage}><label>Slippage Tolerance</label><label>30%</label></div>
        </FormControl>
        <Button className={Classes.swapBtn} colorScheme='teal' isLoading={isSubmitting} type='submit'>
          Swap
        </Button>
      </form>
    </div>
  )
}