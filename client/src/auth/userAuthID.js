

const AuthId = () =>{
    const userdata =  (localStorage.getItem("user"));
    if(userdata){
    const parsedData = JSON.parse(userdata)
    const MyId = parsedData.user?._id;
    return(MyId)
}
    }

    AuthId()

    export const userData = () => {
        const userdata =  (localStorage.getItem("user"));
        if(userdata){
        const parsedData = JSON.parse(userdata)
        return(parsedData?.user)
        }
    }
    userData()

export default AuthId;