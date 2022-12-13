import "./customImage.scss"

function CustomImage(props) {
    return (
        <div className="my-custom-pic">
            <img src={props.picture}/>
            <h2>{props.author}: {props.description}</h2>

        </div>
    );
  }
  
  export default CustomImage;