import "./customImage.scss"

function CustomImage(props) {
    return (
        <div>
          <img src={props.picture} className="my-custom-pic"/>
        </div>
    );
  }
  
  export default CustomImage;