import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    this.setState({filters:{
        type: event.target.value
      }
    })
  }

  onFindPetsClick(){
    const pet = this.state.filters.type
    if(pet === 'all'){
      fetch('http://localhost:3000/api/pets')
        .then(response => response.json())
        .then(pets => this.setState({pets}))
    }
    else {
      fetch(`http://localhost:3000/api/pets?type=${pet}`)
        .then(response => response.json())
        .then(pets => this.setState({pets}))
    }
  }

  onAdoptPet(id){
    let updatedPets = this.state.pets
    let petList = this.state.pets.find(pet => pet.id === id)
    updatedPets[petList].adopted = true;
    this.setState({
      pets: updatedPets
    })

      
    
  }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
