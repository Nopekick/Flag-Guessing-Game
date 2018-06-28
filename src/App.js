import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      countries: [],
      selectedCountry: '',
      chosenCountry: '',
      chosenFlag: '',
      track: 'GUESSING'  //either 'GUESSING', 'INCORRECT', OR 'CORRECT'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNext = this.handleNext.bind(this)
  }

componentDidMount(){
  const url = "https://restcountries.eu/rest/v2/all"
  let countries = new Set()

  fetch(url)
  .then( data => data.json())
  .then( d => {
    while(countries.size < 4){
      let country = d[Math.floor(Math.random()*d.length)]
      countries.add(country)
    }
    countries = [...countries]
    const i = countries[Math.floor(Math.random()*countries.length)]
    const chosenCountry = i.name
    const chosenFlag = i.flag
    this.setState({chosenCountry})
    this.setState({countries})
    this.setState({chosenFlag})
  })

}

handleChange(e){
  const selectedCountry = e.value
  this.setState({selectedCountry})
}

handleSubmit(){
  this.state.selectedCountry === this.state.chosenCountry
    ? this.setState({track: 'CORRECT'}) : this.setState({track: 'INCORRECT'})
  this.componentDidMount()
}

handleNext(){
  this.setState({track: 'GUESSING'})
}

  render() {
    console.log(this.state.countries)
    const choices = this.state.countries.map((country, i) => (
      <label key={i}> {country.name}
        <input type="radio" style={{'marginRight': '20px'}}name="country" value={country.name} onClick={this.handleChange} />
      </label>
    ))
    return (
      <div>
        {this.state.track === 'GUESSING' ?
          (<div>
            <form onSubmit={this.handleSubmit}>
              {choices}
              <button>GUESS</button>
            </form>
            <img src={this.state.chosenFlag} />
          </div>)
          : (this.state.track === 'CORRECT'
              ?
              (<div>
                <p>Correct, the country was {this.state.chosenCountry} </p>
                <button type="button" onClick={this.handleNext}>NEXT</button>
                <img src={this.state.chosenCountry.flag} />
              </div>)
              :
              (<div>
                <p>Sorry, but the correct country was {this.state.chosenCountry} </p>
                <button type="button" onClick={this.handleNext}>NEXT</button>
                <img src={this.state.chosenCountry.flag} />
              </div>)
            )
        }
      </div>
    );
  }
}

export default App;
