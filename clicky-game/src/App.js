import React, { Component } from 'react';
import './App.css';
import Wrapper from './components/Wrapper';
import GameSelect from './components/GameSelect';
import NavBar from './components/NavBar';
import gameItems from "./gameItems.json";
import TitleContent from './components/TitleContent';
import Footer from './components/Footer';


class App extends Component {

    state = {
        gameItems,
        score: 0,
        topScore: 0,
        resultText: ""
    };

    shuffle = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    resetItem = () => {
        this.shuffle(this.state.gameItems);
        let updatedState = this.state.gameItems.map(gameItem => {
            gameItem.selected = false;
            return gameItem;
        });
        this.setState({ gameItems: updatedState })
    }

    selectItem = id => {
        //Check if selected item's id has already been selected
        let count = 0;
        console.log(count)
        let updatedState = this.state.gameItems.map(gameItem => {
            if (gameItem.id === id && gameItem.selected === false) {
                gameItem.selected = true;
                count = count + 1;
            }
            return gameItem;
        });
        this.setState({ gameItems: updatedState })
        console.log(count)
        count > 0 ? this.addScore() : this.endGame();
        // console.log(updatedState);
        //If so, run endGame(), which ends game and  will show the failure message;
        //Else, run addScore(), where selected item's id will get added to the list of already selected ids, and score increases by 1,
        //and a success message will show.
        // console.log(id);
    }

    addScore = () => {
        this.setState({ score: this.state.score + 1 });
        if (this.state.score === this.state.topScore) { this.setState({ topScore: this.state.topScore + 1 }) };
        this.shuffle(this.state.gameItems);
        this.setState({ gameItems: this.state.gameItems });
        this.displayResult("Congrats, you guessed correctly.");
    }

    endGame = () => {
        this.setState({ score: 0 });
        if (this.state.score > this.state.topScore) { this.setState({ topScore: this.state.score }) }
        this.resetItem();
        this.displayResult("It looks like you messed up. Game over.");
    }

    displayResult = (returnMsg) => {
        return (this.setState({ resultText: returnMsg }))
    }

    render() {
        let shuffledItems = this.shuffle(this.state.gameItems)
        return (
            <Wrapper>

                <NavBar
                    resultText={this.state.resultText}
                    score={this.state.score}
                    topScore={this.state.topScore}
                />
                <TitleContent />
                {shuffledItems.map(gameItem => (
                    <GameSelect
                        selectItem={this.selectItem}
                        id={gameItem.id}
                        key={gameItem.id}
                        name={gameItem.name}
                        image={gameItem.image}
                        selected={gameItem.selected}
                    />
                ))}
                <Footer />

            </Wrapper>
        );
    }
}

export default App;
