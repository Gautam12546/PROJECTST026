import ReactDOM from "react-dom";



function Model({onClose, children}){

    


    //understanding css is key to understand model
   return ReactDOM.createPortal(
 <div>
    {/* styling model like making btn right an and giving space .but still hw is fix styling of model make it responsive */}
        <div className="fixed inset-0 bg-gray-300 opacity-80" onClick={onClose}></div>
        <div className="inset-60 h-max absolute top-[20%] lg:top-10 lg:w-[30%] lg:left-[35%] w-[100%] left-0"> 
        {/* <div className="flex flex-col justify-between h-full items-center bg-red-500"> */}
        {children}
        {/* <div className="flex justify-end items-center"> */}
        {/* </div> */}
        {/* </div> */}

        </div>
    </div>,
    document.querySelector('.modal-container')
   );
}

export default Model;