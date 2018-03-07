import React, {Component} from 'react';


class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData: []
        }
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
                console.log(res);
            })
        })
    }
    render(){
        return(
            <div>
                <div>Hello </div>
            </div>
        )
    }
}

export default SearchPage;