import { Contract } from "../models/contracts/contract";
import { IBaseActor } from "../models/contracts/actors/base";
import { IBaseReferee } from "../models/contracts/referees/base";
import {bindable, bindingMode} from 'aurelia-framework';

export class ViewModel{

    public contract: IBaseReferee;
    public actorOptions: IBaseActor[];
    constructor(){
        Contract.DataContext.getInstance().allDocs({
            include_docs: true,
            attachments: true
        }).then((results) => {
            this.actorOptions = results.rows.map((item) => <any>item.doc as IBaseActor)
                .filter(ref=> { 
                    var roles = ref.roles;
                    return ~roles.indexOf("Actor");
                });
        });
    }
    public activate(model){
        this.contract = model;
    }
}