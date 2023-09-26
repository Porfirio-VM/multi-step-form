import { formSteps } from "../../constants" // Import the object formstep into the file constants
import './StepContainer.css'

const StepContainer = ({currentStep}) =>{

    const stepsRender = formSteps.map((step) => ( //Function map that creates articles the items from the amount of data (steps)
        <article key={step.id} className="step">
            <aside className={`circle-number ${step.id === currentStep && ('select')}`}>{step.id}</aside>
            <div className="info">
                <p className="step-number">{step.name}</p>
                <h5>{step.info}</h5>
            </div>
        </article>
    ))

    return(
        <section className="step-container">
            {stepsRender} {/*Render the steps*/}
        </section>
    )

}

export default StepContainer