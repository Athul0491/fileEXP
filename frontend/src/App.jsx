import { useEffect } from "react";
import { GetDisks } from "../../frontend/wailsjs/go/main/App.js";

function App() {
  useEffect(() => {
    async function getData() {
      const disks = await GetDisks();
      console.log({ disks });
    }

    getData().catch(console.error);
  }, []);

  return <div></div>;
}

export default App;
