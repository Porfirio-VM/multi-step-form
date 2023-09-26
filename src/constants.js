import pro from './assets/images/icon-pro.svg'
import arcade from './assets/images/icon-arcade.svg'
import advance from './assets/images/icon-advanced.svg'

export const formSteps = [
    {
        id: 1,
        name: "step 1",
        info: "Your info",
        extras: {
            title: "Personal info",
            info: "Please provide your name, email address, and phone number."
        }
    },
    {
        id: 2,
        name: "step 2",
        info: "Select plan",
        extras: {
            title: "Select your plan",
            info: "You have the option of monthly or yearly billing."
        }
    },
    {
        id: 3,
        name: "step 3",
        info: "Add-ons",
        extras: {
            title: "Pick add-ons",
            info: "Add-ons help enhance your gaming experience."
        }
    },
    {
        id: 4,
        name: "Step 4",
        info: "Summary",
        extras: {
            title: "Finishing up",
            info: "Double-check everything looks OK before confirming."
        }
    },
]

export const plans = [
    {'plan-name': 'Arcade',
     img: arcade,
     cost: {
        month: 9,
        year: 90,
     }
    },
    {'plan-name': 'Advanced',
     img: advance,
     cost: {
        month: 12,
        year: 120,
        } 
    },
    {'plan-name': 'Pro',
     img: pro,
     cost: {
        month: 15,
        year: 150,
        } 
    }
]

export const adds = [
    {id: 1,
     name: 'Online service',
     info: 'Access to multiplayer games',
     cost: {
            month: 1,
            year: 10
     }},
    {id: 2,
     name: 'Larger storage',
     info: 'Extra 1TB to save',
     cost: {
            month: 2,
            year: 20
     }},
    {id: 3,
     name: 'Customizable profile',
     info: 'Custom theme on your profile',
     cost: {
            month: 2,
            year: 20,
     }}
]