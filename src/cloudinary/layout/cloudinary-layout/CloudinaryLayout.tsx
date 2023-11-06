
//TODO mediante el routing del react-router que este sea la pagina que mandes a la ruta

import { CloudinaryPage } from "@/cloudinary/pages"
import { store } from "@/cloudinary/store/store"
import { Provider } from "react-redux"

export const CloudinaryLayout = () => {
    return (
        <div>
            <Provider store={store}>
                <CloudinaryPage />
            </Provider>
        </div>
    )
}
