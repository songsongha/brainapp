import React, {Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


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

const initialState = {
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

class App extends Component {
  constructor() {
    super();
    this.state = initialState;  
  }

loadUser = (data) =>{
  this.setState({user:{
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  }})
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

clearInput = (event) => {
    document.getElementById('inputBox').value = '';//when the input changes update the state, make input = whatever is in the box
    this.setState({imageURL: ''}); 
}

onButtonSubmit = () => {
    this.setState({imageURL: this.state.input}); // update the state, make imageURL = input
      fetch('http://localhost:3001/imageurl', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response){
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries:count}))
              })
            .catch(console.log) 
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch( err => console.log(err));
}

onRouteChange = (route) => {
  this.setState({route: route});
}

changeSignIn = (isSignedIn) =>{
    if (isSignedIn) {   
      this.setState(initialState);
  } else {
      this.setState({ isSignedIn: true });
  }
}

  render(){
    const {isSignedIn, imageURL, route, box, user} = this.state;
    return (
      <div className="App">
      <Particles className='particles'
              params={particlesOptions}/>
        <Navigation changeSignIn={this.changeSignIn} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} route={route} />
        {route === 'home'
          ? <div>
              <Logo />
              <Rank user={user} isSignedIn={isSignedIn} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} clearInput={this.clearInput} />
              <FaceRecognition boxArray={box} imageURL={imageURL} />
            </div>
          : (route === 'signin'
              ? <SignIn loadUser={this.loadUser} changeSignIn={this.changeSignIn} onRouteChange={this.onRouteChange} />
              : <Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange} />
            )
        } 
      </div>
    );
  }
}

export default App;
