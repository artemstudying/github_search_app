import React,{Component} from 'react';
import Btn from '../Button/Btn'

class Input extends Component{
	constructor(props){
		super(props);
		this.state = {value: props.value}
		this.updateValue = this.updateValue.bind(this);
	}
	
	updateValue(e){
		this.props.updateValue(e);
	}
	
	render(){
		const { type, name , value , id  } = this.props;
		return(
			<div className={this.props.myStyleGroupe}>
				<input
					className={this.props.myStyleI}
					id={id}
					type={this.props.type}
					name={this.props.name}
					onChange = {this.updateValue}
					value={this.state.value}
				/>
				<Btn 
					BtnName={this.props.btnName} 
					myStyle={this.props.btnStyle}
					press={this.props.btnPress}/>
			</div>
		);
	}

}

export default Input;