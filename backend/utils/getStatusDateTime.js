const getStatusDateTIme = () => {
    //Current Date and Time
    const cdt = new Date();
    const date =
      cdt.toISOString().slice(0, 10) + " " + cdt.toTimeString().slice(0, 8);
    return date;
  };
  
  export default getStatusDateTIme;