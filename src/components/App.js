import { useState } from "react"
import Filters from "./Filters"
import PetBrowser from "./PetBrowser"

function App() {
  const [pets, setPets] = useState([])
  const [filters, setFilters] = useState({ type: "all" })

  function handleChangeType(value) {
    setFilters({ ...filters, type: value })
  }

  function handleFindPetsClick() {
    const baseUrl = "http://localhost:3001/pets"
    const url =
      filters.type === "all"
        ? baseUrl
        : `${baseUrl}?type=${filters.type}`

    fetch(url)
      .then((res) => res.json())
      .then((data) => setPets(data))
  }

  function handleAdoptPet(petId) {
    const updatedPets = pets.map((pet) =>
      pet.id === petId ? { ...pet, isAdopted: true } : pet
    )
    setPets(updatedPets)
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              onChangeType={handleChangeType}
              onFindPetsClick={handleFindPetsClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
