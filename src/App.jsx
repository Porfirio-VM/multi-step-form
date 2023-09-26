import StepContainer from './components/steps/StepContainer'
import FormContainer from './components/form/FormContainer'
import { formSteps } from './constants'
import './App.css'
import { useState } from 'react'

function App() {

  const [currentStep, setCurrentStep] = useState(1) //Defines the initial step to render
  const nextStep = (e) =>{ //function to increment the value of the useState and render the necessary form data
      e.preventDefault();
      const next = formSteps.find(step => step.id === currentStep + 1)
      if(next){
        setCurrentStep(next.id)  
      }
  }

  const prevStep = (e) =>{ //function to decrement the value of the useState and render the necessary form data 
    e.preventDefault();
    const prev = formSteps.find(step => step.id === currentStep - 1)
    setCurrentStep(prev.id)
  }

  return (
    <main className='step-form'>
      <StepContainer currentStep={currentStep} />
      <FormContainer currentStep={currentStep} nextStep={nextStep} prevStep={prevStep} />
    </main>
  )
  
}

export default App
