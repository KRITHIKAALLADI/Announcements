import * as React from 'react';
import './GetSpListItem.module.scss';
import { IGetSpListItemProps} from './IGetSpListItemProps'
//import { escape } from '@microsoft/sp-lodash-subset';
// import Plot from 'react-plotly.js';
import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
// // import {SP} from '@microsoft/sp-loader'
// import { Item } from '@pnp/sp /items';




export interface ISPList{
  id:number;
  Title: string;

}

// const [itmid, setItmid] = React.useState<any>([]);

export default class GetListItems extends React.Component<IGetSpListItemProps, ISPList> {
  constructor(props:any) {
    super(props);
    this.state = { id: 0,
      Title: "",
     
    };
  }

  private getAllItems = (): void => {
    this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('Announcements')/items?$select("id","Title")`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
      .then((response: SPHttpClientResponse) => {
        if (response.ok) {
          response.json().then((data:any) => {
             let idd:any=[];
            // var html = `<table><tr><th>ID</th><th>Full Name</th><th>Age</th></tr>`;
             data.value.map((item:any, index:any) => {
              
              
              idd.push(item.ID);
              
             });
             this.setState({
              id:idd,
             
             })
            //   html += `<tr><td>${item.ID}</td><td>${item.Title}</td><td>${item.Age}</td></li>`;
            // });
            // html += `</table>`;
            //document.getElementById("allItems").innerHTML = html;
          //   
          //   for(var key in data['sales Data']){
          //       
          //   }
         ;
          
        //  console.log(this.state.id)
        //  setItmid(this.state.id);
        //  console.log(itmid)
        })
      }else {
              alert(`Something went wrong! Check the error in the browser console.`);
          };
        
      }).catch((err:any) => {
        console.log(err);
      });
      
  }
 
  private createItem = async () => {
    try {
     
      const addItem = await sp.web.lists.getByTitle("Announcements").items.add({
      
        'Title': this.state.Title,
       
      });
      console.log(addItem);
      alert(`Item created successfully with ID: ${addItem.data.ID}`);
    }
    catch (e) {
      console.error(e);
    }
  }

  private deleteItem = async () => {
    try {
       
      const id: number = this.state.id;
      console.log(this.state.id)
      if (id > 0) {
        let deleteItem = await sp.web.lists.getByTitle("Announcements").items.getById(id).delete();
        console.log(deleteItem);
        alert(`Item ID: ${id} deleted successfully!`);
      }
      else {
        alert(`Please enter a valid item id.`);
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  private updateItem = async () => {
    try {
      const id: number =this.state.id;
      console.log(id);
      if (id > 0) {
        const itemUpdate = await sp.web.lists.getByTitle("Announcements").items.getById(id).update({
          'Title': this.state.Title,
        
        });
        console.log(itemUpdate);
        alert(`Item with ID: ${id} updated successfully!`);
      }
      else {
        alert(`Please enter a valid item id.`);
      }
    }
    catch (e) {
      console.error(e);
    }
  }
 
  
//Delete Item
  // private _getListData(): Promise<ISPLists>
  // {
  //  return this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('Sales Data')/Items?",
  //  SPHttpClient.configurations.v1
  //  )
  // //  $select=Year,SalesPercentage
  //      .then((response: SPHttpClientResponse) => 
  //      {
  //      return response.json();
  //      console.log(response.json());
  //      }).then((data:any)=>{
  //         console.log(data);
  //      });
  //  }
  
  
  public render(): React.ReactElement<IGetSpListItemProps> {
    // const onChangeHandler=((e:any)=>{
    //   this.setState({getxvalue:e.target.value,getyvalue:e.target.value});
    //   })    
    return (
      <section >
        <div className="getSPListItem">
        <div className="container">
          <div className="row">
            <div className="column">
            {/* <div className="itemField">
                
                <div className="styles.fieldLabel">ID</div>
                <select>
                  <optgroup>
                    {itmid.map((x:any)=>{
                      return(<option>{x}</option>)
                    })}
                  </optgroup>
                </select>
              </div> */}
              <div className="itemField">
                
                <div className="fieldLabel">Title</div>
                <input type="text" id='Years' onChange={(e)=>{this.setState({Title:e.target.value})}}></input>
              </div>
              {/* <div className="styles.itemField">
                <div className="styles.fieldLabel">Year</div>
                <input type="text" id='Years'   onChange={onChangeHandler}></input>
              </div> */}
              {/* <div className="itemField">
                <div className="fieldLabel">SalesPercentage</div>
                <input type="text" id='SalesPercentage'  onChange={(e)=>{this.setState({SalesPercentage:e.target.value})}}></input>
              </div> */}
             
              <div className="itemField">
                <div className="fieldLabel">ID</div>
                <input type="number" id='ID'  onChange={(e)=>{this.setState({id:Number( e.target.value)})}}></input>
              </div>
             
              <div className="buttonSection">
                <div className="button">
                  <span className="label" onClick={this.createItem}>Create</span>
                </div>
                 {/* <div className={styles.button}>
                  <span className={styles.label} onClick={this.getItemById}>Read</span>
                </div>  */}
                {/* <div className="button">
                  <span className="label" onClick={this.getAllItems}>Read All</span>
                </div> */}
                  <div className="button">
                  <span className="label" onClick={this.updateItem}>Update</span>
                </div> 
                <div className="button">
                  <span className="label" onClick={this.deleteItem}>Delete</span>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
     <div>
       {/* <button onClick={this.getAllItems}>GetBarGraph</button> */}
      {/* {console.log(this.state.getxvalue,this.state.getyvalue)}  */}
    </div>
    </section>
    );
  }
}