import React from 'react'
import Header from './NavHeader';
import {useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom';
import img from '../../img/default.jpeg';
import { compareSync } from 'bcryptjs';
const ConReq = (props) => {
    const history=useHistory();
    const [user, setuser] = useState([]);
   
    const [userdata,setuserdata]=useState([]);
    const [Ope,setOpe]=useState({
        text:"",
        dis:""
    })
    const finbatch=async()=>{
        try{
            
                // const res=await fetch("/userlog",{
                //     method:"GET",
                   
                //     headers:{
                //     Accept:"application/json",
                //     'Content-Type':'application/json'
                //     },
                   
                // });
                // const data=await res.json();
                setuserdata(props.user);     
               
            
           
            if(props.opid==1){
                setOpe({
                    text:"pending",
                    dis:"true"
                      })
                }
                else if(props.opid==0){
                    setOpe({
                        text:"Accept",
                        dis:""
                    })
                }
                else if(props.opid==2){
                    setOpe({
                        text:"View Profile",
                        dis:""
                    })
                }
           

                   
        }catch(e){
            console.log(e);
            history.push('/Login');
        }
        
    }

    useEffect(() => {
            finbatch();
           
    },[])
    const [pp,setpp]=useState([]);
    console.log(userdata);
    useEffect(async() => {

        try{
            const res=await fetch(`/find/${props.id}/${userdata._id}`,{
                method:"GET",
               
                headers:{
                Accept:"application/json",
                'Content-Type':'application/json'
                },
               
            });
            const data=await res.json();
            setuser(data);
            setpp(data.profile_pic);
          

                   
        }catch(e){
            console.log(e);
           
        }
    },[]);
    const [imge,setimge]=useState(require(`../../img/default.jpeg`).default);
    useEffect(() => {
       if(typeof(pp)!=='undefined'){
           var ar=pp[pp.length-1];
         
           if(typeof(ar)!=='undefined'){
            setimge(require(`../Pictures/${ar.pic_name}`).default);
           }
           
           
        //    if(ar.pic_name!=='undefined'){
        //     //    var pic=ar.pic_name;
        //     //    setimge(require(`../Pictures/${pic}`).default);
        //    }
       }
       else{
        console.log('undefined joined');
       }

    }, [pp])
    const Bemate=(id,uid)=>{
        if(id==0){
            
    console.log(userdata._id);
            fetch(`/bemates`,{
                method:"POST",
                headers:{
                  'Content-Type':'application/json; charset=utf-8',
                  "Access-Control-Allow-Origin": "*",
                },
                body:JSON.stringify(
                  {
                     user:userdata._id,
                     mateid:uid
                  })
            }).then((res)=>{
                console.log(res.json);
            }).catch(e=>{
                console.log(e);
            })
        }
        else if(id==2){
            history.push(`/UserDash/Mate_profile?user_req=${uid}`)
        }

        console.log(id+"this");
    }
 
    return (
        <div>
               

                
                                       <div className="d-flex justify-content-center"> <img src={imge} style={{height:"100px",width:"100px"}}/></div>
                                        <h4 onClick={()=>{ history.push(`/UserDash/Batch_Profile?uid=${user._id}&status=${userdata._id}`);}}>{user.name}</h4>
                                        <h6>{user.dept} | {user.passingYear}</h6>
                                        
                                        <div className="d-flex justify-content-center"><button type="button" className="btn btn-primary" onClick={()=>Bemate(props.opid,user._id)} disabled={props.condition.but}>{props.condition.text}</button></div>
                                       
</div>

      
    )
}

export default ConReq
