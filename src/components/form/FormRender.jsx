
import { useState, useEffect } from "react";
import { plans,adds } from "../../constants"

const FormRender = ({currentStep, handleInput, handleRadioChange, handleCheckbox, formData, currentPlan, missingFields, switchPlan}) =>{

    const [totalCost, setTotalCost] = useState(0);
    const [per, setPer] = useState('')

    useEffect(() => {

        let selectedAddsTotal = 0;
        formData.adds && formData.adds.forEach((item) => {
          selectedAddsTotal += addCost(item, currentPlan);
        });

        if (formData.selectedPlan) {
          selectedAddsTotal += planCost(formData.selectedPlan['plan-name'], currentPlan);
        }
        setTotalCost(selectedAddsTotal);
        
        setPer(currentPlan === 'Montly'? ('/month') : ('/year'))

      }, [formData.adds, formData.selectedPlan, currentPlan]);

    const planCost = (planName, currentPlan) =>{
        const plan = plans.find(plan => plan["plan-name"] === planName);  
        const planCost = currentPlan === 'Montly'? plan.cost.month : plan.cost.year
        return planCost
    }

    const addCost = (addName, currentPlan) =>{
        const add = adds.find((add) => addName === add.name)
        const addCost = currentPlan === 'Montly'? add.cost.month : add.cost.year 
        return addCost; 
    }   

    const stepInputs = {
        1: (
            <>
                <label htmlFor="name" className="input-label">
                    Name
                    {missingFields.includes('name') && (<span className="error">Name is required</span>)}
                </label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="e.g Stephen King" 
                    onChange={handleInput} 
                    value={formData.name || ''} 
                    className={`input-form ${missingFields.includes('name') && ('empty-field')}`} 
                />
                <label htmlFor="mail" className="input-label">
                    Email Adress
                    {missingFields.includes('mail') && (<span className="error">Mail is required</span>)}
                </label>
                <input 
                    type="email" 
                    id="mail" 
                    name="mail" 
                    placeholder="e.g Stephenking@lorem.com" 
                    onChange={handleInput} 
                    value={formData.mail || ''} 
                    className={`input-form ${missingFields.includes('mail') && ('empty-field')}`}
                />
                <label htmlFor="tel" className="input-label">
                    Phone Number
                    {missingFields.includes('tel') && (<span className="error">Phone is required</span>)}
                </label>
                <input 
                    type="number" 
                    id="tel" 
                    name="tel" 
                    placeholder="e.g +1 234 567 890" 
                    onChange={handleInput}
                    value={formData.tel || ''} 
                    className={`input-form ${missingFields.includes('tel') && ('empty-field')}`}
                />
            </>
        ),
        2: (
            <>
                {missingFields.includes('plan') && <span className="plan-error">Need to select a plan</span>}
                <div className="plan-container">
                    {
                        plans.map((plan) => (
                            <label htmlFor={plan["plan-name"]} key={plan["plan-name"]}>
                                <article className={`plan ${formData.selectedPlan && formData.selectedPlan['plan-name'] === plan['plan-name'] && ('plan-select')}`}>
                                    
                                    <picture className="img-container">
                                        <img src={plan.img} alt="plan-image" />
                                    </picture>

                                    <input  type="radio"
                                    name="selectedPlan"
                                    className="plan-radio"
                                    value={plan["plan-name"]}
                                    id={plan["plan-name"]}
                                    checked={formData.selectedPlan === plan}
                                    onChange={(e) => handleRadioChange(e, plan)}
                                    />
                                    
                                    <div className="plan-info">
                                        <h5>{plan["plan-name"]}</h5>
                                        <span>${planCost(plan['plan-name'], currentPlan)}{per}</span>
                                        {currentPlan == 'Yearly'&&(<span className="months">2 Months free</span>)}
                                    </div>
                                </article>
                            </label>
                        ))
                    }
                </div>
                <div className="select-plan-container">
                    <span>Monthly</span>
                    <span className="check-container">
                        <button onClick={(e) => switchPlan(e)}>
                            <span className={`switch-circle ${currentPlan === 'Yearly' && ('left')}`}></span>
                         </button>
                    </span>
                    <span>Yearly</span>
                </div>
            </>
        ),
        3: (<>
                {adds.map((add) => (
                    <label className="adds" key={add.id} htmlFor={add.id}>
                        <div className="check-wrapper">
                            <span className={`custom-checkbox ${formData.adds && formData.adds.includes(add.name) && ('check')}`}></span>
                            <input type="checkbox" name="" id={add.id} onChange={(e) => handleCheckbox(e, add.name)} />
                            <div className="add-info">
                                <h4>{add.name}</h4>
                                <p>{add.info}</p>
                            </div>
                        </div>
                        <span className="plan-cost">+${addCost(add.name, currentPlan)}{per}</span>
                    </label>
                ))}
            </>
        ),
        4: (
            <>
             <div className="confirm-step">
                <div className="final-header">
                    <div className="">
                        <h4>{`${formData.selectedPlan && formData.selectedPlan['plan-name']} (${currentPlan})`}</h4>
                        <button className="change-plan" onClick={(e) => switchPlan(e)}>Change</button>
                    </div>
                    
                    <span>${formData.selectedPlan && planCost(formData.selectedPlan['plan-name'], currentPlan)}{per}</span>
                </div>
                <hr />
                <ul className="selected-adds">
                    {formData.adds && formData.adds.map((item, index) => (
                        <li key={index} className="add-container">
                            <div className="service">{item}</div>
                            <aside className="cost">${formData.adds && addCost(item, currentPlan)}{per}</aside>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="final-footer">
                    <span className="total">{`Total (per ${currentPlan === 'Montly' ? 'month' :'year'})`}</span>
                    <span className="cost strong">+${totalCost}{per}</span>
                </div>
            </>
        )
    }


    return <>{stepInputs[currentStep]}</>

}

export default FormRender