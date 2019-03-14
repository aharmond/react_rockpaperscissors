import React from 'react';
import { Container, Button, Segment, Grid, Divider, Header, Icon } from 'semantic-ui-react';

class App extends React.Component {
  state = { 
    player: {choice: "", },
    opponent: {choice: "",},
    stats: {wins: 0, losses: 0, ties: 0,},
    result: '',
    choices: [
      "Rock",
      "Paper",
      "Scissors",
    ],
  };

  figureResult = () => {
    const {player, opponent, stats} = this.state
    let newResult = ''

    if(player.choice === opponent.choice) {
      newResult = "Tie!"
      stats.ties += 1
    }
    else if(
      (player.choice === "Rock" && opponent.choice === "Scissors") ||
      (player.choice === "Paper" && opponent.choice === "Rock") ||
      (player.choice === "Scissors" && opponent.choice === "Paper")
    ) {
      newResult = "Player wins!"
      stats.wins += 1
    }
    else {
      newResult = "Opponent Wins!"
      stats.losses += 1
    }
    this.setState({stats, result: newResult});
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
    this.setState({player, opponent, });
    this.figureResult();
  }

  render() {
    const { player, opponent, choices, result, stats} = this.state

    return (
      <Container style={{marginTop: "25px", }}>
        <Button.Group widths='3'>
          <Button onClick={ () => this.pickChoice(choices[0])} color="brown" icon="hand rock" size="massive" />
          <Button onClick={ () => this.pickChoice(choices[1])} color="orange" icon="hand paper" size="massive" />
          <Button onClick={ () => this.pickChoice(choices[2])} color="olive" icon="hand scissors" size="massive" />
        </Button.Group>

        <Segment inverted placeholder>
          <Grid columns={2} stackable textAlign='center'>
            <Divider inverted vertical>VS</Divider>

            <Grid.Row verticalAlign='middle'>
              <Grid.Column>
                <Header inverted icon>
                  <Icon name= {'hand ' + player.choice.toLowerCase()} />
                  Player Choice: {player.choice}
                </Header>
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

        <Segment inverted>
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
          </Grid>
        </Segment>
      </Container>
    );
  }
}

export default App;
