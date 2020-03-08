const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementsByTagName('main')[0]


// √* When a user loads the page, they should see all
// trainers, with their current team of Pokemon.

  // √* DOMContentLoaded listener
  // √* fetch to /trainers
  // √* build HTML for each trainer
  // √* build HTML for each trainer's pokemons
  // √* append that div to the main tag

// * Whenever a user hits Add Pokemon and they have
// space on their team, they should get a new Pokemon.

  //  * listener on the "add pokemon" buttons that triggers a post to the pokemons Path
  //  * if successful, render the new pokemon in that trainers list
  //  * if not successful (too many), don't do anything

// * Whenever a user hits Release Pokemon on a specific
// Pokemon team, that specific Pokemon should be released from
// the team.

document.addEventListener('DOMContentLoaded', function(e){
  getTrainers()

  main.addEventListener('click', event => {
    // √catch click on the add pokemon button
    // √catch click on the release button

    if (event.target.className === 'add-pokemon'){
      addPokemon(event.target.dataset.trainerId)
    } else if (event.target.className === 'release') {
      // √fetch delete to remove pokemon from database
      // √remove the li
      event.target.parentNode.remove()
      releasePokemon(event.target.dataset.pokemonId)
    }
  })

})

function releasePokemon(pokemonId) {
  fetch(`${POKEMONS_URL}/${pokemonId}`, { method: "DELETE" })
}

function addPokemon(trainerId){
  // √post to pokemons path with the trainer id
  // √render the returned data as an li in the correct ul

  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify({ trainer_id: trainerId})
  })
  .then(resp => resp.json())
  .then(pokemon => {
    if (!pokemon.error){
      const div = document.querySelector(`[data-id="${pokemon.trainer_id}"]`)
      const ul = div.getElementsByTagName('ul')[0]
      const li = document.createElement("li")

      li.innerHTML = `
        ${pokemon.nickname} (${pokemon.species})
        <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
      `

      ul.append(li)
    } else {
      alert("Dummy. Alerts suck 🤡")
    }

    // √get the right div
    // √get the right ul
    // √create an li
    // √build HTML of li
    // √append that li to the right ul
  })
}

function getTrainers(){
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(trainers => {
    trainers.forEach(trainer => {
      const div = document.createElement('div')
      div.className = 'card'
      div.dataset.id = trainer.id

      div.innerHTML = `
        <p>${trainer.name}</p>
        <button class="add-pokemon" data-ground-beef='tasty' data-trainer-id="${trainer.id}">Add Pokemon</button>
      `

      const ul = document.createElement('ul')

      trainer.pokemons.forEach(pokemon => {
        const li = document.createElement("li")
        li.innerHTML = `
          ${pokemon.nickname} (${pokemon.species})
          <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
        `

        ul.append(li)
      })

      div.append(ul)

      main.append(div)
    })

  })
}















})//DOM




   
   

