import {Router} from 'express';
import { pool } from '../connectingMySQL.js';
const router=Router();

router.get('/ping',async(req,resp)=>{
    try{
    const result=await pool.query('Select * from tasks');
    console.log(result);

    const [resultados]=result;
    console.log('Los datos son: ',resultados.length);
    for(let i=0;i<resultados.length;i++)
    console.log(`id: ${resultados[i].id} title: ${resultados[i].title} descripción:${resultados[i].description}`);    

    resp.json('ping');
    }catch(exeption){
        console.log(exeption);
        resp.json({'message':exeption.message});
    }
});

export default router;