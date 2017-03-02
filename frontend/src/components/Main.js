require('normalize.css/normalize.css');
require('styles/App.css');
var axios = require('axios');
import React from 'react';

class AppComponent extends React.Component {
    constructor(props){
        super(props)
        this.submenu = this.submenu.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.loadPDF = this.loadPDF.bind(this);
        this.state = ({resolutions:[], results:[],filename:{pdf:''}})
    }

    submenu(event){
        var a = ['hconres', 'hjres', 'hr', 'hres', 's' , 'sconres', 'sjres', 'sres'];
        var res = a.map(item=>{
            let boundItemClick = this.openMenu.bind(this,item,event)
            return(<a href="#" key={item} onClick={boundItemClick}>{item}</a>)
        })
        this.setState({resolutions:res});
    }


    loadPDF(pdf){

    this.setState({filename:{pdf}});
    this.forceUpdate();
    }
    openMenu(event, sessionID){
        let dbTranslated;
        let context = this;
        switch(sessionID){
            case 103: dbTranslated='one03'
            break;
            case 104: dbTranslated='one04'
            break;
            case 105: dbTranslated='one05'
            break;
            case 106: dbTranslated='one06'
            break;
            case 107: dbTranslated='one07'
            break;
            case 108: dbTranslated='one08'
            break;
            case 109: dbTranslated='one09'
            break;
            case 110: dbTranslated='one10'
            break;
            case 111: dbTranslated='one11'
            break;
            case 112: dbTranslated='one12'
            break;
            case 113: dbTranslated='one13'
            break;
            case 114: dbTranslated='one14'
            break;
            case 115: dbTranslated='one15'
            break;
        }
        let r;

            

axios.get('http://cb.s4njee.com:8080/'+dbTranslated+'/'+event).then(function(response) {
            r =  response.data.map(item=>{

                
            var billt = item.bill_version_id;
            billt = billt.split("-")[0];                
            var issuedOn = item.issued_on;
            var version_code = item.version_code
                item.urls = JSON.parse(item.urls);
           var html = item.urls ? item.urls.html:''
            var pdf = item.urls ? item.urls.pdf:''
            return(
                <div className="bill">
                    <h2>{billt}</h2>
                    <h4>{issuedOn} - {version_code}</h4>
                    <a href={html} className="billLink">HTML Link</a>
                    <a href={pdf} className="billLink">PDF Link</a>
                </div>
            )
                // var billid = item.bill_version_id;
            }
            
            
            
            )
            
context.setState({results:r});
})}

  render() {
      let sessions = [103,104,105,106,107,108,109,110,111,112,113,114,115];
    return (
      <div className="index">
          <h1 className="title">Congressional Archives (1993-Present)</h1>
          <span>
              {sessions.map(item=>{
                  let sessionID = this.submenu.bind(this,item);
                  let years = ['93', '95', '97', '99', '01',' 03', '05', '07', '09', '11', '13', '15', '17', '19'];
                  let offset = item - 103;
                  return(<a href='#' key={item} onClick={sessionID}><strong>{item}</strong><div><smaller>'{years[offset]} - '{years[offset+1]}</smaller></div></a>)
              })}
          </span>
            <span>{this.state.resolutions}</span>
            <div className="sortedDiv"> (Sorted by date)</div>
            <div>{this.state.results}></div>


            
    
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
