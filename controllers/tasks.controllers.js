import { pool } from '../connectingMySQL.js';

export const getTasks = async (req, resp) => {
    try{
    const result = await pool.query('Select * from tasks order by createAt ASC');
    const [resultados] = result;

    for (let i = 0; i < resultados.length; i++) {
        console.log(`id: ${resultados[i].id} title: ${resultados[i].title} description: ${resultados[i].description}`);
    }

    resp.json(resultados);  
    }catch(error){
        console.log('message Error: ',error);
        resp.status(404).json({"message": error.getMessage })
    }
};


export const getTask = async (req, resp) => {

    let id;
    if (req.params.id) {
        try {
            id = parseInt(req.params.id);
        } catch (error) {
            id = 0;
        }

        if (id > 0) {

            console.log('El id recibido es: ', id);

            const result = await pool.query('Select * from tasks where id=?', id);
            const [resultados] = result;
            for (let i = 0; i < resultados.length; i++) {
                console.log(`id: ${resultados[i].id} title: ${resultados[i].title} description: ${resultados[i].description}`);
            }
            if (resultados.length === 0) {
                return resp.status(404).json({ "message": "tarea no encontrada" });
            } else {
                return resp.json(resultados[0]);
            }

        } else {
            console.log('Se recibio un dato incorrecto como ID en la URL: ', req.params.id);
            return resp.send('Se recibio un dato incorrecto como ID en la URL');
        }

    } else {
        console.log('No se recibio dato alguno en la URL para el ID');
        return resp.send('No se recibió dato alguno en la URL para el ID');
    }

    resp.send('obteniendo una tarea por su id');
};

export const createTask = async (req, resp) => {

    let tarea;

    try {
        tarea = req.body;
    } catch (error) {
        tarea = undefined;
    }

    if (tarea) {
        console.log(tarea);

        let title;
        let description;

        try {
            title = tarea.title;
            description = tarea.description;
        } catch (error) {
            title = undefined;
            description = undefined;
        }

        if (title && description) {
            console.log("title: ", title);
            console.log("description: ", description);
            const respuesta = await pool.query('Insert into tasks(title, description) values (?,?)', [title, description]);
            console.log('La respuesta es: ', respuesta);


            let [{ insertId }] = respuesta;

            if (insertId) {
                console.log('El ID es: ', insertId);
                resp.json({ id: insertId, title, description });
            } else {
                console.log("Error interno de MYSQL al intentar registra una tarea nueva");
                resp.send('MySQL falló al momento de ingresar la tarea en la base de datos');
            }

        } else {
            console.log("no se ingresaron los datos de la tarea correctamente");
            resp.send('Error al registrar la tarea:no se ingresaron los datos de la tarea correctamente.');
        }
    }
};

export const deleteTask = async (req, resp) => {

    let id;
    if (req.params.id) {
        try {
            id = parseInt(req.params.id);
        } catch (error) {
            id = 0;
        }

        if (id > 0) {

            console.log('El id recibido es: ', id);

            const result = await pool.query('delete from tasks where id=?', id);
            //console.log('result: ',result);

            const [{ affectedRows }] = result;

            if (affectedRows === 0) {
                return resp.status(404).json({ "message": `tarea no encontrada para eliminada para el id ${id}` });
            } else {
                return resp.json({ "message": `tarea eliminada con id ${id}` });
            }

        } else {
            console.log('Se recibio un dató incorrecto como ID en la URL: ', req.params.id);
            return resp.send('Se recibio un dató incorrecto como ID en la URL');
        }

    } else {
        console.log('No se recibió dato alguno en la URL para el ID');
        return resp.send('No se recibió dato alguno en la URL para el ID');
    }
};


export const updateTask = async (req, resp) => {
    let id;
    if (req.params.id) {
        try {
            id = parseInt(req.params.id);
        } catch (error) {
            id = 0;
        }

        if (id > 0) {
            const {title, description} =req.body;
            const [respuesta]=await pool.query('update tasks set ?  where id = ?',[req.body,id]);
            console.log('la respuesta es: ',respuesta);
            return resp.json(respuesta)
        } else {
            console.log('Se recibio un dato incorrecto como ID en la URL: ', req.params.id);
            return resp.send('Se recibio un dato incorrecto como ID en la URL');
        }

    } else {
        console.log('No se recibio dato alguno en la URL para el ID');
        return resp.send('No se recibio dato alguno en la URL para el ID');
    }

};

/***Esta es mi versión*********************
export const updateTask = async (req, resp) => {

    let id;
    if (req.params.id) {
        try {
            id = parseInt(req.params.id);
        } catch (error) {
            id = 0;
        }

        if (id > 0) {

            console.log('El id recibido es: ', id);

            const result = await pool.query('Select * from tasks where id=?', id);
            const [resultados] = result;
            for (let i = 0; i < resultados.length; i++) {
                console.log(`id: ${resultados[i].id} title: ${resultados[i].title} description: ${resultados[i].description}`);
            }
            if (resultados.length === 0) {
                return resp.status(404).json({ "message": "tarea no encontrada" });
            } else {

                let tarea;

                try {
                    tarea = req.body;
                } catch (error) {
                    tarea = undefined;
                }

                if (tarea) {
                    console.log(tarea);


                    let{title,description} = tarea;                        

                    if (title || description) {
                        console.log("title: ", title);
                        console.log("description: ", description);
                        const respuesta = await pool.query('Update tasks(title, description) values (?,?)', [title, description]);
                        console.log('La respuesta es: ', respuesta);


                        let [{ insertId }] = respuesta;

                        if (insertId) {
                            console.log('El ID es: ', insertId);
                            resp.json({ id: insertId, title, description });
                        } else {
                            console.log("Error interno de MYSQL al intentar registra una tarea nueva");
                            resp.send('MySQL falló al momento de ingresar la tarea en la base de datos');
                        }

                    } else {
                        console.log("no se ingresaron los datos de la tarea correctamente");
                        resp.send('Error al registrar la tarea:no se ingresaron los datos de la tarea correctamente.');
                    }
                }


                //return resp.json(resultados[0]);
            }

        } else {
            console.log('Se recibio un dató incorrecto como ID en la URL: ', req.params.id);
            return resp.send('Se recibio un dato incorrecto como ID en la URL');
        }

    } else {
        console.log('No se recibio dato alguno en la URL para el ID');
        return resp.send('No se recibio dato alguno en la URL para el ID');
    }

};
/******************************************/


