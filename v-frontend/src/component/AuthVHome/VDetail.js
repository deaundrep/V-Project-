import React, { Component } from 'react'
import axios from "axios"

const recipeID = "7902536d";
const recipeKey = "35a44083dfc972140e0e16dd7a6d8388";

export class VDetail extends Component {
    state = {
        isLoading: false,
        recipeData: null,

    }

    componentDidMount = async () => {
        this.setState({
            isLoading: true,

        })
        try {
            let payload = await axios.get(
                `https://api.edamam.com/search?q=${this.props.match.params.recipe}&app_id=${recipeID}&app_key=${recipeKey}`
            )
            this.setState({
                isLoading: false,
            })
            console.log(payload)

        } catch (e) {
            console.log(e)
        }
    }

    render() {
        console.log(this.props.match.params.recipe)
        return (
            <div>
                {this.state.isLoading ? <div>....loading</div> : <div>  </div>}
            </div>
        )
    }
}

export default VDetail

