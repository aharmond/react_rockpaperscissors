import React from 'react';
import { Container, Button, Segment, Grid, Divider, Header, Icon } from 'semantic-ui-react';

class App extends React.Component {
  state = { 
    player: {choice: "", },
    opponent: {choice: "",},
    stats: {wins: 0, losses: 0, ties: 0,},
    percentage: {win: 0, loss: 0, tie: 0},
    result: '',
    resultColor: '',
    choices: [
      "Rock",
      "Paper",
      "Scissors",
    ],
    toggleMode: true,
    playerTurn: true,
  };

  figureResult = () => {
    const {player, opponent, stats, percentage} = this.state
    let newResult = ''
    let newResultColor = ''

    if (player.choice === opponent.choice) {
      newResult = "Tie!"
      newResultColor = "orange"
      stats.ties += 1
    }
    else if (
      (player.choice === "Rock" && opponent.choice === "Scissors") ||
      (player.choice === "Paper" && opponent.choice === "Rock") ||
      (player.choice === "Scissors" && opponent.choice === "Paper")
    ) {
      newResult = "Player wins!"
      newResultColor = "olive"
      stats.wins += 1
    }
    else {
      newResult = "Opponent Wins!"
      newResultColor = "red"
      stats.losses += 1
    }

    let total = stats.wins + stats.losses + stats.ties
    percentage.win = Math.floor((stats.wins / total) * 100)
    percentage.loss = Math.floor((stats.losses / total) * 100)
    percentage.tie = Math.floor((stats.ties / total) * 100)

    this.setState({stats, percentage, result: newResult, resultColor: newResultColor, });
  }

  pickChoice = (choice) => {
    const {player, opponent} = this.state

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
    this.setState({player, opponent, });
    this.figureResult();
  }

  pickMultiplayerChoice = (choice) => {
    const {player, opponent, playerTurn} = this.state

    if (playerTurn === true) {
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
          break;
      }

      this.setState({ player, playerTurn: false, })
    }

    else if (playerTurn === false) {
      switch(choice) {
        case "Rock":
          opponent.choice = "Rock"
          break;
        case "Paper":
          opponent.choice = "Paper"
          break;
        case "Scissors":
          opponent.choice = "Scissors"
          break;
        default:
          break;
      }
      this.setState({ opponent, playerTurn: true, });
      this.figureResult();
    }  
  }

  switchMode = () => this.setState({ 
    toggleMode: !this.state.toggleMode, 
    player: {choice: ""},
    player2: {choice: ""},
    opponent: {choice: ""},
    stats: {wins: 0, losses: 0, ties: 0,},
    percentage: {win: 0, loss: 0, tie: 0},
    result: '',
    resultColor: '', 
  });

  render() {
    const { player, opponent, choices, result, stats, percentage, resultColor, toggleMode, playerTurn } = this.state

    return (
      <Container style={{marginTop: "25px", }}>

        { toggleMode ? 
          <Button.Group widths='3'>
            <Button onClick={ () => this.pickChoice(choices[0])} color="brown" icon="hand rock" size="massive" />
            <Button onClick={ () => this.pickChoice(choices[1])} color="yellow" icon="hand paper" size="massive" />
            <Button onClick={ () => this.pickChoice(choices[2])} color="teal" icon="hand scissors" size="massive" />
          </Button.Group>
        :
          <Button.Group widths='3'>
            <Button onClick={ () => this.pickMultiplayerChoice(choices[0])} color="brown" icon="hand rock" size="massive" />
            <Button onClick={ () => this.pickMultiplayerChoice(choices[1])} color="yellow" icon="hand paper" size="massive" />
            <Button onClick={ () => this.pickMultiplayerChoice(choices[2])} color="teal" icon="hand scissors" size="massive" />
          </Button.Group>
        }

        <Segment inverted placeholder>
          <Grid columns={2} stackable textAlign='center'>
            <Divider inverted vertical>VS</Divider>

            <Grid.Row verticalAlign='middle'>
              <Grid.Column>
                {playerTurn ? 
                  <Header inverted icon>
                    <Icon name= {'hand ' + player.choice.toLowerCase()} />
                    Player Choice: {player.choice}
                  </Header>
                :
                  <Header inverted>
                    Waiting for opponent...
                  </Header>
                }
              </Grid.Column>
              
              <Grid.Column>
                <Header inverted icon>
                  <Icon name= {'hand ' + opponent.choice.toLowerCase()} />
                  Opponent Choice: {opponent.choice}
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment inverted color={resultColor}>
          <Header inverted textAlign='center'>
            {result}
          </Header>
        </Segment>

        <Segment inverted>
          <Grid columns={3} stackable textAlign='center'>
            <Grid.Row verticalAlign='middle'>
              <Grid.Column>
                <Header inverted>
                  Wins: {stats.wins}
                </Header>
              </Grid.Column>

              <Grid.Column>
                <Header inverted>
                  Losses: {stats.losses}
                </Header>
              </Grid.Column>

              <Grid.Column>
                <Header inverted>
                  Ties: {stats.ties}
                </Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row verticalAlign='middle'>
              <Grid.Column>
                <Header inverted>
                  {percentage.win}%
                </Header>
              </Grid.Column>

              <Grid.Column>
                <Header inverted>
                  {percentage.loss}%
                </Header>
              </Grid.Column>

              <Grid.Column>
                <Header inverted>
                  {percentage.tie}%
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment inverted>
          {toggleMode ? 
            <Button onClick={this.switchMode} fluid color="green" inverted>2 Player Mode</Button>
          :
            <Button onClick={this.switchMode} fluid color="blue" inverted>1 Player Mode</Button>
          }
        </Segment>

      </Container>
    );
  };
};

export default App;