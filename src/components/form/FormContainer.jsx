import FormRender from "./FormRender"
import { formSteps } from "../../constants"
import { useState } from "react";
import './FormContainer.css'
import thank from '../../assets/images/icon-thank-you.svg'

const FormContainer = ({currentStep ,nextStep ,prevStep, renderStep}) =>{

    const step = formSteps.find((step) => step.id === currentStep); //a constant called step is created, which by using the find function searches for the element corresponding to the current step.
    const stepsLength = formSteps.length;
    const [formData, setFormData] = useState([])
    const [currentPlan, setCurrentPlan] = useState('Montly')
    const [missingFields, setMissingFields] = useState([]);
    const [confirmed, setConfirmed] = useState(false);


    const handleInput = (e) =>{ //adds the value in the inputs whit their name in the useState formData
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData, [name]: value
        }))
    }

    const handleRadioChange = (e, selectedItem) =>{  //adds the inputs radio to the useState formData
        setFormData((prevData) => ({
            ...prevData,
            selectedPlan: selectedItem,
          }))
    }

    const switchPlan = (e) =>{ 
       e.preventDefault();
       setCurrentPlan(currentPlan==='Montly' ? 'Yearly' : 'Montly')
    }
    
    const handleCheckbox = (e, selectedAdd) => {
        setFormData((prevData) => {
          const isSelected = (prevData.adds || []).includes(selectedAdd);
          if (isSelected) {// If already selected, remove it
            const updatedAddOns = (prevData.adds || []).filter(item => item !== selectedAdd); 
            return {
                    ...prevData,
                    adds: updatedAddOns,
            };
          } else { // If not selected, add it
            return {
                    ...prevData,
                    adds: [...(prevData.adds || []), selectedAdd],
            };
          }
        });
      };

      const isFormValid = (e) =>{
        e.preventDefault();
        const validate = {
            1: {
                name: !!formData.name,
                mail: !!formData.mail,
                tel: !!formData.tel
            },
            2: {
                plan: !!formData.selectedPlan
            },
            3:{
                check: true
            },
            4: {
                all: true
            }
        }
        const validationForStep = validate[currentStep];
        const isStepValid = Object.values(validationForStep).every(Boolean);
        const missing = Object.keys(validationForStep).filter((fieldName) => !validationForStep[fieldName]);
        setMissingFields(missing);

        if (isStepValid) {
            if(currentStep === stepsLength){
                setConfirmed(true)
            }else{
                nextStep(e)
            }
          }
    }


    return (
        <section className="form-container">
            {confirmed? (
                <div className="thanks">
                    <picture>
                        <img src={thank} alt="" />
                    </picture>
                    <h1>Thank you!</h1>
                    <p>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
                </div>
            ) : (
                <form action="" key={step.id} onSubmit={isFormValid} className="form-wrapper">
                <header className="form-header">
                    <h2 className="form-title">{step.extras.title}</h2>
                    <p className="form-p">{step.extras.info}</p>
                </header>
                <div className="form-body">
                    <div className="inputs-container">
                        <FormRender currentStep={currentStep} handleInput={handleInput} handleRadioChange={handleRadioChange} handleCheckbox={handleCheckbox} formData={formData} currentPlan={currentPlan} missingFields={missingFields} switchPlan={switchPlan}/>
                    </div>
                    <div className={`button-container ${currentStep === 1 && ('end')}`}>
                        {currentStep > 1 && (<button className="prev" onClick={prevStep}>Go Back</button>)}
                        <input className="next" type="submit" value={currentStep === stepsLength? 'Confirm' : 'Next'}/>
                    </div>
                </div>
            </form>
            )}    
        </section>
    )

}

export default FormContainer