import React, {Component} from 'react'

class MemeGen extends Component{
    constructor(){
        super()
        this.state={
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handlerChange = this.handlerChange.bind(this)
        this.handlerSubmit = this.handlerSubmit.bind(this)
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                console.log(memes[0])
                this.setState({allMemeImgs: memes})
            })
    }

    handlerChange(event){
        const {name, value} = event.target
        this.setState({
            [name] : value
        })
    }

    handlerSubmit(event){
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randImgUrl = this.state.allMemeImgs[randNum].url
        this.setState({
            randomImage: randImgUrl
        })
    }

    render(){
        return(
            <div>
                <form className="meme-form" onSubmit={this.handlerSubmit}>
                    <input 
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handlerChange}
                    
                    /> 
                                    
                    <input 
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handlerChange}
                    />


                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img 
                        src={this.state.randomImage}
                        alt="" 
                    />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>            
        )
    }
}

export default MemeGen