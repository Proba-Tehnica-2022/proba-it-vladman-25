import "./customButton.scss"

function CustomButton(props) {
    return (
        <div className="container">
            <button onClick={props.onClick}>{props.text}</button>
        </div>
    );
  }
  
  export default CustomButton;