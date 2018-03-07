import React, {Component} from 'react';
import Style from './SearchPage.css'
import Btn from '../Elements/Button/Btn'

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData: []
        }
        this.getSearchData = this.getSearchData.bind(this);
    }
    
    componentWillMount(){
        this.getSearchData();
    }
    getSearchData(){
        fetch('https://api.github.com/search/repositories?q=hello.',
            {   mode:'cors',
                method: 'GET',
            })
        .then(res=>{
            res.json().then(res=>{
                this.setState({searchData:res})
                // console.log(res);
            })
        })
    }
    render(){
        // let searchResult = this.state.searchData? this.state.searchData.item.map((item, i)=> {

        // }):' ';
        // console.log(searchResult);
        
        return(
            <div>
                <div className="input-group">
                    <label>Search Request</label>
                    <input type="text" placeholder="Search" />
                    <Btn myStyle='btn' BtnName='Search'/>
                    {/* <a className="btn">Button</a> */}
                </div>
                <div> </div>

            </div>
        )
    }
}

export default SearchPage;