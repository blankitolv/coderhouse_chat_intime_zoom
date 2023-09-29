const sweetMessage = () => {
  setTimeout(()=>{
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'CoderMessage charge, enjoy you class',
      showConfirmButton: false,
      timer: 1500
    })
  },1000)
}
// {/* <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script> */}
const scriptElement = document.createElement('script');
scriptElement.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11"
document.body.appendChild(scriptElement);
sweetMessage();