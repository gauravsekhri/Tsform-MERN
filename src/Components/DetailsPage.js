import React, { useEffect, useState } from 'react';
import "../Style Sheets/DetailsPage.css";
import logo from "../Utilty/logo.png";
import axios from 'axios';
import { GetAllEntries, NewSubmit } from '../Services/helper';
import CircularProgress from '@mui/material/CircularProgress';

function DetailsPage() {

    const [seconds, setSeconds] = useState(59);
    const [minutes, setMinutes] = useState(4);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const [showError, setShowError] = useState(false);
    const [showModal, setShowModal] = useState(false);


    var alldetails = {
        name: name,
        email: email,
        dob: dob,
        address: address,
        phone: phone
    };

    function resetValues(){
        setName("");
        setEmail("");
        setDob("");
        setAddress("");
        setPhone("");
    }

    function formSubmit(){
        setShowError(true)
        var notAnswered = Object.values(alldetails).filter(x => x == "").length;
        if(notAnswered == 0){
            setSubmitStep(2)
            NewSubmit(alldetails).then(y => {
                console.log(y);
                setSubmitStep(3)
            })
        }
    }

    const [alldata, setAlldata] = useState([]);
    const [submitStep, setSubmitStep] = useState(1);

    function fetchEntries(){
        GetAllEntries().then(z => {
            setAlldata(z)
            console.log(alldata)
        })
    }

    useEffect(() => {
        fetchEntries();
    },[])

    function openModal(){
        setShowModal(true);
        fetchEntries();
    }

    function CheckMailFormat(str){
        if( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( str ) ) {
            return true;
        }
        else{
            return false;
        }
    }

    var timer;

    useEffect(() => {
        timer = setInterval(() => {
           
            setSeconds(seconds-1);
            if(seconds == 0){
                if(minutes > 0){
                    setMinutes(minutes - 1);
                    setSeconds(59)
                }
                else{
                    setMinutes(0);
                    setSeconds(0)
                }
            }

        }, 1000);
        return () => clearInterval(timer)
    })

    // useEffect(() => {
        // var time = new Date().getTime();
    //     console.log((time % (1000 * 60)) / 1000);
    // console.log(time);
    //     var sec = Math.floor((time % (1000 * 60)) / 1000);
    //     setSeconds(sec)
    // },[]);

        // const useCountdown = (targetDate) => {
        //     // const countDownDate = new Date(targetDate).getTime();
        
        //     const [countDown, setCountDown] = useState(
        //         new Date().getTime()
        //     );
        
        //     useEffect(() => {
        //         setInterval(() => {
        //             setCountDown(countDown - 1);
        //         }, 1000);
            
        //         // return () => clearInterval(interval);
        //     }, [new Date().getTime()]);
        
        //     return getReturnValues(countDown);
        // };
      
        // const getReturnValues = (countDown) => {
        //     const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
        //     const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
        //     // console.log(seconds, minutes)
        //     return [minutes, seconds];
        // };

        // var time = new Date().getTime();
        // // var reqtime = Number(time) + 300000;
        // var reqtime = 5 * 60 * 1000;
        // reqtime = Number(reqtime);
        // // console.log(reqtime)
        // const [minutes, seconds] = useCountdown();
        // // 1654186009037

        // setInterval(() => {
        //     setSeconds(seconds - 1)
        // }, 1000);


    return (
        <>
            <div className='navbar'>
                <div className='nav_logo'>
                    <img src={logo}/>
                </div>
                <div className='nav_btn' onClick={() => openModal()}>View Entries</div>
            </div>
            <div className='outer_container'>
                <div className='img_container'>
                    <img src={logo}></img>
                    <div className='big_cname'>Aelum</div>
                    <div className='small_cname'>consulting</div>
                </div>

                {submitStep == 1 &&
                <div className='form_container'>
                    <div className='header_container'>
                        <div className='headertext'>Details</div>
                        <div className='timer'>{minutes}:{seconds}</div>
                    </div>
                    <hr/>
                    <div className='form_elements'>
                        <form>
                            <div className='input_label'>Name</div>
                            <input type="text" placeholder='Name' name="name" onChange={(e) => setName(e.target.value)} value={name}></input>
                            <div className='errmsg'>{showError && name.length==0 ? "Name is required." : ""}</div>

                            <div className='input_label'>E-mail</div>
                            <input type="email" placeholder='E-mail' name="email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                            <div className='errmsg'>{(showError && email.length==0) ? "Email is required." : (showError && !CheckMailFormat(email)) ? "Please enter valid email." : ""}</div>

                            <div className='input_label'>Date of Birth</div>
                            <input type="date" placeholder='DOB' name="dob" onChange={(e) => setDob(e.target.value)} value={dob}></input>
                            <div className='errmsg'>{showError && dob.length==0 ? "DOB is required." : ""}</div>


                            <div className='input_label'>Address</div>
                            <textarea rows={3} placeholder='Address' name="address" onChange={(e) => setAddress(e.target.value)} value={address}></textarea>
                            <div className='errmsg'>{showError && address.length==0 ? "Address is required." : ""}</div>


                            <div className='input_label'>Telephone Number</div>
                            <div className='phone_container'>
                                <div>+91</div>
                                <input type="number" placeholder='Telephone Number' name="phone" onChange={(e) => setPhone(e.target.value)} value={phone}></input>
                            </div>
                            <div className='errmsg'>{showError && phone.length==0 ? "Phone is required." : ""}</div>


                        </form>
                    </div>
                    <div className='button_container'>
                        <button id="submitbtn" onClick={() => formSubmit()}>Submit</button>
                        <button id="resetbtn" onClick={() => resetValues()}>Reset</button>
                    </div>
                    {minutes==0 && seconds==0 &&
                    <div className='timeup'>
                        Time up !!
                    </div>}
                </div>}

                {submitStep == 2 &&
                <div className='submit_loader'>
                    <div>
                        <CircularProgress />
                        <div>Sending Data...</div>
                    </div>
                </div>}

                {submitStep == 3 &&
                <div className='Thankyou_msg'>
                    Thank you ! <br/> <br/>
                    We will get back to you soon.
                </div>}

            </div>
            {showModal && 
                <div className='entries_modal'>
                    <div className='table_container'>
                        <div className='btnheader'>
                            <div className='modal_htext'>Total Entries</div>
                            <div>
                                <button className='modalbtn' onClick={() => fetchEntries()}>Refresh</button>
                                <button className='modalbtn' onClick={() => setShowModal(false)}>Close</button>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Date of Birth</th>
                                    <th>Address</th>
                                    <th>Telephone Number</th>
                                </tr>
                            </thead>             
                            <tbody>
                                {alldata.map((x,i) => (
                                    <tr key={i}>
                                        <td>{x.name}</td>
                                        <td>{x.email}</td>
                                        <td>{x.dob}</td>
                                        <td>{x.address}</td>
                                        <td>{x.phone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </>
    )
}

export default DetailsPage