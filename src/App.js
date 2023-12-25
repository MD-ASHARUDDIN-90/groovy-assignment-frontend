import { useEffect, useState } from "react";
import axios from "axios";
import config from "./environment/config";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateForm from "./pages/createForm/CreateForm";
import AllForms from "./pages/form/AllForms";
import Form from "./pages/singleForm/Form";

function App() {
  const fetchData = async () => {
    const res = await axios.get(config.API_URL + "form");

    setData(res.data.forms);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [data, setData] = useState("nothing");
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreateForm />} />
        <Route path='/form' element={<AllForms />} />
        <Route path='/form/:id' element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
