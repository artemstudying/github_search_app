import React , {Component} from 'react';
import BtnStyle from './Btn.css'

class Btn extends Component {
		constructor(props){
			super(props);
		this.press = this.press.bind(this);
		}
		press(e){
			this.props.press(e);
		}
		render(){
			return <div className={(this.props.myStyle)} onClick={this.press}>{this.props.BtnName}</div>
		}
		
}

export default Btn;