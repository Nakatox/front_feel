import React from 'react'

const FormFeel = () => {

    const { register, handleSubmit } = useForm();
    const onSubmit = async (data)=> {
        if (!isNaN(data.note) && (data.note <10 || data.note >0)){
            let response = await createFeelAPI({"description":data.description, "note":data.note,"mood":idmood, "newDate":newDate.toISOString().split('T')[0], "isCustom":isCustom})
            setformData(data)
            if(response.status == 200){
                toast.success('Your article have been added !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                
            }else if (response.status == 400){
                if (response.error == "already"){
                    toast.error('You already have an article in this date', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                } else if (response.error == "only"){
                    toast.error('You can only have one feel per day', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }

            }else {
                toast.error('wrong information', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }else{
            toast.error('Note must be between 0 and 10', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
  return (
    <div>
        <input type="checkbox" name="" id="isCustom" onChange={()=>{setisCustom(!isCustom)}}/>
        <label got="isCustom">Set a custom date ?</label>
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>note :</p>
            <input type="number" min="0" max="10" {...register("note", {required:true})} />
            <Select options={option} onChange={(e)=>{setidmood(e.value)}}/>
            <p>description :</p>
            <input type="text" {...register("description", {required:true})}/>
            <div style={{display: isCustom ? "block" : "none"}}>
                <DatePicker
                    placeholderText='Select date'
                    onChange={(date) => setnewDate(date)}
                    selected={newDate}
                />
            </div>
            <input type="submit" value="Add article" />
        </form>
    </div>
  )
}

export default FormFeel