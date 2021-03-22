import React, {Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


const app = new Clarifai.App({
    apiKey: process.env.REACT_APP_API_KEY
});

const particlesOptions = {
  particles: {
    number: {
      value:80,
      density:{
        enable:true,
        value_area: 800   
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {  
      input: '',
      imageURL: '',
      box: [{
        leftCol: '',
        topRow: '',
        rightCol: '',
        bottomRow: '' 
      }],
      route:'home',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: '0',
        joined: ''
      }

  }
}

loadUser = (data) =>{
  this.setState({
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  })
  console.log (data);
}
componentDidMount() {
  fetch('http://localhost:3001')
  .then( response => response.json())
  .then(console.log)
}

calculateFaceLocation = (data) => {
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  let boxCoordinates = []
  data.outputs[0].data.regions.map(function(array,i) {
      const face = array.region_info.bounding_box
      boxCoordinates.push({
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height)
      })
  })
  return boxCoordinates;
}

displayFaceBox = (box) => {
  this.setState({box: box});

}

onInputChange = (event) => {
    this.setState({input: event.target.value}); //when the input changes update the state, make input = whatever is in the box
}

onButtonSubmit = () => {
    this.setState({imageURL: this.state.input}) // update the state, make imageURL = input
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch( err => console.log(err));
}

onRouteChange = (route) => {
  this.setState({route: route});
}

changeSignIn = (isSignedIn) =>{
    if (isSignedIn) {
      console.log("I'm signed in and trying to sign out");
      this.setState({ isSignedIn: false }, () => {console.log(this.state.route)});
  } else {
      this.setState({ isSignedIn: true }, () => {console.log(this.state.route)});
  }
}

  render(){
    const {isSignedIn, imageURL, route, box} = this.state;
    return (
      <div className="App">
      <Particles className='particles'
              params={particlesOptions}/>
        <Navigation changeSignIn={this.changeSignIn} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} route={route} />
        {route === 'home'
          ? <div>
              <Logo />
              <Rank isSignedIn={isSignedIn} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition boxArray={box} imageURL={imageURL} />
            </div>
          : (route === 'signin'
              ? <SignIn changeSignIn={this.changeSignIn} onRouteChange={this.onRouteChange} />
              : <Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange} />
            )
        } 
      </div>
    );
  }
}

export default App;
