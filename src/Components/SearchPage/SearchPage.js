import React, {Component} from 'react'
import Style from './SearchPage.css'
import Btn from '../Elements/Button/Btn'
import Input from '../Elements/Input/Input'

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: props.inputValue,
            searchData: []
        }
        this.getSearchData = this.getSearchData.bind(this);
        this.changeInputValue = this.changeInputValue.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    
    // componentWillMount(){
    //     this.getSearchData();
    // }
    changeInputValue(e){
        this.setState({inputValue: e.target.value})
        console.log(this.state.inputValue);
        
    }
    getSearchData(){
        // let inputField = document.querySelector('.input');

        fetch('https://api.github.com/search/repositories?q='+this.state.inputValue,
            {   mode:'cors',
                method: 'GET',
            })
        .then(res=>{
            res.json().then(res=>{
                this.setState({searchData:res.items})
                console.log(res);
            })
        })
    }

    deleteItem(id){
        let arr = this.state.searchData;
        arr.forEach((item,i) => {
            if(item.id === id){
                arr.splice(i, 1);
            }
        });
        this.setState({searchData: arr})
    }
    
    


    render(){
        
        let requestItemList = this.state.searchData? this.state.searchData.map((item, i)=> {
                        return(
                            <div key={i} className='search-result-box'>
                                <span className='result-item'>{item.name}</span>
                                <span className='btn-delete' onClick={()=>{this.deleteItem(item.id)}}>Delete</span>
                            </div>
                        )
        }):'';
        
        return(
            
            <div className='container'>
                        <Input 
                            myStyleGroupe="input-group"
							type="text" 
							name="Search"
							myStyleI="form_input-AUTH"
							nameL="Search Request"
							myStyleL="form_label-AUTH" 
							updateValue={this.changeInputValue} 
                            value={this.state.inputValue}
                            btnName="Search"
                            btnStyle="btn"
                            btnPress={this.getSearchData}

						/>
							
                <div>
                    {requestItemList}
                </div>

            </div>
        )
    }
}

export default SearchPage;