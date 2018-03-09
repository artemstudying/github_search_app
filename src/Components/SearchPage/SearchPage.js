import React, {Component} from 'react'
import Style from './SearchPage.css'
import Btn from '../Elements/Button/Btn'
import Input from '../Elements/Input/Input'

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: props.inputValue,
            searchData: [],
            itemOfData: {}
        }
        this.getSearchData = this.getSearchData.bind(this);
        this.changeInputValue = this.changeInputValue.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.changeSelectedRepo = this.changeSelectedRepo.bind(this);
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
                // this.setState({itemOfData: this.searchData[0]})
                // let data = JSON.parse('res')
                this.setState({itemOfData:res.items[0]})
                // console.log(res)
                console.log(res.items[0]);
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
    
    changeSelectedRepo(id){
        this.state.searchData.forEach((item,i)=>{
            if(item.id === id){
                this.setState({itemOfData: item})
            }
        })
    }


    render(){
        console.log(this.state.itemOfData)
        
        let requestItemList = this.state.searchData? this.state.searchData.map((item, i)=> {
                        return(
                            <div key={i} className='search-result-box'>
                                <span className='result-item'onClick={()=>{this.changeSelectedRepo(item.id)}}>{item.name}</span>
                                <span className='btn btn-delete' onClick={()=>{this.deleteItem(item.id)}}>DELETE</span>
                            </div>
                        )
        }):'';



        let selectedItem = this.state.itemOfData? 
                                    <div className='git-page-info'>
                                        <div className='name-of-repo'>
                                            <span>Name of selected Repository:</span>
                                            <h3>{this.state.itemOfData.name}</h3>
                                        </div>
                                        <a className='btn btn-repo' href={this.state.itemOfData.svn_url} target='_blank'>GitHub</a>
                                    </div>
                                :' ';
        
        return(
            
            <div className='container'>
                <div className='header-wrap'>
                    <header>
                        <h1 className='logo'>
                            GitHub Search
                        </h1>
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
                    </header>
                </div>
                <div className='selected-item-wrap'>
                    {selectedItem}
                </div>
                <div className='result-container'result>
                    {requestItemList}
                </div>

            </div>
        )
    }
}

export default SearchPage;