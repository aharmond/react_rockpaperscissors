import React from 'react';
// import RPS from './RPS';
import { Container, Button } from 'semantic-ui-react';

class App extends React.Component {
  state = { 
    player: {choice: null, wins: 0},
    opponent: {choice: null, wins: 0},
    winner: false,
    choices: [
      "Rock",
      "Paper",
      "Scissors",
    ],
  };

  pickChoice = (choice) => {
    const player = this.state.player
    const opponent = this.state.opponent

    switch(choice) {
      case "Rock":
        player.choice = "Rock"
        break;
      case "Paper":
        player.choice = "Paper"
        break;
      case "Scissors":
        player.choice = "Scissors"
        break;
      default:
        debugger
        break;
    }

    switch(Math.floor(Math.random() * 3)) {
      case 0:
        opponent.choice = "Rock"
        break;
      case 1:
        opponent.choice = "Paper"
        break;
      case 2:
        opponent.choice = "Scissors"
        break;
      default:
        break;
    }
    this.setState({player, opponent, })
  }

  render() {
    return (
      <Container>
        <div>
          <Button onClick={ () => this.pickChoice(this.state.choices[0])} color="brown" icon="hand rock" />
          <Button onClick={ () => this.pickChoice(this.state.choices[1])} color="orange" icon="hand paper" />
          <Button onClick={ () => this.pickChoice(this.state.choices[2])} color="olive" icon="hand scissors" />
        </div>
      </Container>
    );
  }
}

export default App;
