import React from "react";
// import ReactDOM from "react-dom/client";
import "./Square.css";
class Square extends React.Component {
//    constructor(props) {
//        super(props);
//        this.state = {
//            squareValue: null,
//        };
//    }

//    handleClick = () => {
//        this.setState((prevState) => ({
//            squareValue:
//            prevState.squareValue === null
//            ? "X"
//            : prevState.squareValue === "X"
//            ? "O"
//            : null,
//            }));
//        };
    
//    render() {
//        return (
//            <>
//            <button className="square" onClick={this.handleClick}>
//            {this.state.squareValue}
//            </button>
//            </>
//        );
//    }
//}

render() {
    return (
        <>
        <button className="square" onClick={this.props.onClick}> 
                    {this.props.value} 
</button> 
</> 
        ); 
    } 
}

export default Square;